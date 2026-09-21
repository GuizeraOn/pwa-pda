import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não definidos. ' +
    'Copie o arquivo .env.local.example e preencha com os valores do seu projeto.'
  )
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
  auth: {
    // Persiste a sessão no localStorage para que o usuário não precise
    // fazer login novamente ao reabrir o app/PWA
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
