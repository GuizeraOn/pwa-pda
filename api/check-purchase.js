import { GoogleAuth } from 'google-auth-library'

// ─────────────────────────────────────────────
// Cache simples em memória (por warm-up da função)
// ─────────────────────────────────────────────
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutos
const purchaseCache = new Map() // email → { authorized, expiresAt }

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function normalizeEmail(email) {
  return (email ?? '').trim().toLowerCase()
}

async function fetchSheetsData(auth, spreadsheetId) {
  const token = await auth.getAccessToken()
  // Lê apenas as colunas E-mail (col I = índice 8) e Status (col M = índice 12)
  // Intervalo A:M para pegar todas as colunas necessárias da aba db_vendas
  const range = encodeURIComponent('db_vendas!A:M')
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Google Sheets API error ${res.status}: ${text}`)
  }

  const json = await res.json()
  return json.values ?? []
}

// ─────────────────────────────────────────────
// Handler principal
// ─────────────────────────────────────────────
export default async function handler(req, res) {
  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body ?? {}
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email inválido' })
  }

  const emailNorm = normalizeEmail(email)

  // ── Verifica cache em memória ──
  const cached = purchaseCache.get(emailNorm)
  if (cached && cached.expiresAt > Date.now()) {
    return res.status(200).json({ authorized: cached.authorized, source: 'cache' })
  }

  // ── Inicializa Google Auth ──
  let serviceAccount
  try {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON não definida')
    serviceAccount = typeof raw === 'string' ? JSON.parse(raw) : raw
  } catch (err) {
    console.error('[check-purchase] Erro ao parsear service account:', err.message)
    return res.status(500).json({ error: 'Configuração do servidor inválida' })
  }

  const spreadsheetId = process.env.SPREADSHEET_ID
  if (!spreadsheetId) {
    return res.status(500).json({ error: 'SPREADSHEET_ID não definido' })
  }

  try {
    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const rows = await fetchSheetsData(auth, spreadsheetId)

    // Primeira linha é o cabeçalho — ignora
    // Coluna E-mail = índice 8 (col I), Status = índice 12 (col M)
    const EMAIL_COL = 8
    const STATUS_COL = 12

    let authorized = false
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      const rowEmail = normalizeEmail(row[EMAIL_COL] ?? '')
      const rowStatus = (row[STATUS_COL] ?? '').trim()

      if (rowEmail === emailNorm && rowStatus === 'Aprovado') {
        authorized = true
        break
      }
    }

    // Salva no cache
    purchaseCache.set(emailNorm, { authorized, expiresAt: Date.now() + CACHE_TTL_MS })

    return res.status(200).json({ authorized })
  } catch (err) {
    console.error('[check-purchase] Erro ao consultar planilha:', err.message)
    return res.status(500).json({ error: 'Erro ao verificar compra. Tente novamente.' })
  }
}
