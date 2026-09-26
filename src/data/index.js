export const RECIPE_ITEMS = [
  { icon: '🫙', text: '2 cdas vinagre de manzana orgánico' },
  { icon: '🫚', text: '1 cda jengibre fresco rallado' },
  { icon: '🍋', text: 'Jugo de ½ limón' },
  { icon: '💧', text: '200 ml agua tibia' },
]

export const PHASE_RECIPES = {
  1: [
    { icon: '🫙', text: '2 cdas vinagre de manzana orgánico' },
    { icon: '🫚', text: '1 cda jengibre fresco rallado' },
    { icon: '🍋', text: 'Jugo de ½ limón' },
    { icon: '💧', text: '200 ml agua tibia' },
  ],
  2: [
    { icon: '🫙', text: '2 cdas vinagre de manzana orgánico' },
    { icon: '🫚', text: '1 cda jengibre fresco rallado' },
    { icon: '🍋', text: 'Jugo de ½ limón' },
    { icon: '💧', text: '200 ml agua tibia' },
    { icon: '🌿', text: '1 pizca de cúrcuma en polvo', isNew: true },
  ],
  3: [
    { icon: '🫙', text: '2 cdas vinagre de manzana orgánico' },
    { icon: '🫚', text: '1 cda jengibre fresco rallado' },
    { icon: '🍋', text: 'Jugo de ½ limón' },
    { icon: '💧', text: '200 ml agua tibia' },
    { icon: '🌿', text: '1 pizca de cúrcuma en polvo' },
    { icon: '🍯', text: '1 cdita de miel cruda', isNew: true },
  ],
}

export const LESSONS = [
  {
    id: 0,
    unlockDay: 0,
    eyebrow: 'Lección 1',
    title: '🫙 La Receta — 3 ingredientes y cómo prepararlos',
    desc: 'La receta completa: ingredientes exactos, proporciones y preparación',
    badge: 'Empieza aquí',
    pdf: '/pdfs/Vinagre-de-Manzana-ACV-para-Protocolos-de-Pulmon-La-Leccion-para-Principiantes.pdf',
  },
  {
    id: 1,
    unlockDay: 3,
    eyebrow: 'Lección 2',
    title: '⏰ El mejor horario para tomarla',
    desc: 'El horario ideal para maximizar cada dosis',
    lockQuote: { text: 'Quienes conocen su horario exacto duplican sus resultados.', author: 'Dra. Patricia Sánchez' },
    pdf: '/pdfs/Leccion-Diaria-Cuando-Tomar-tu-Protocolo-de-Vinagre-de-Manzana.pdf',
  },
  {
    id: 2,
    unlockDay: 5,
    eyebrow: 'Lección 3',
    title: '⚡ Qué comer para acelerar los resultados',
    desc: 'El protocolo completo de 21 días paso a paso',
    lockQuote: { text: 'Los que llegan hasta aquí sienten la diferencia más rápido.', author: 'Dr. Vargas' },
    pdf: '/pdfs/Protocolo-21-Dias-de-Vinagre-de-Sidra-de-Manzana-Guia-para-Resultados-Mas-Rapidos.pdf',
  },
  {
    id: 3,
    unlockDay: 7,
    eyebrow: 'Lección 4',
    title: '❌ Los errores que arruinan el protocolo',
    desc: 'La limpieza profunda que potencia el protocolo',
    lockQuote: { text: 'Evitar estos errores es lo que separa a los que mejoran de los que no.', author: 'Dr. Méndez' },
    pdf: '/pdfs/Programa-de-Limpieza-con-Vinagre-de-Sidra-de-Manzana.pdf',
  },
  {
    id: 4,
    unlockDay: 10,
    eyebrow: 'Lección 5',
    title: '🧫 Por qué el vinagre llega más fuerte',
    desc: 'El momento exacto que activa la absorción máxima',
    badge: 'Nuevo',
    lockQuote: { text: 'La ciencia del jengibre en pulmones cambió lo que creíamos saber.', author: 'Instituto de Bienestar Natural' },
    pdf: '/pdfs/absorcion-maxima/Guia-de-Rescate-Intestinal-Protocolo-de-Eliminacion-y-Proteccion.pdf',
  },
]

export const BONOS = [
  {
    id: 0,
    tag: 'Bono 1',
    title: 'Ritual Nocturno para Dormir Mejor',
    desc: 'Técnicas para un sueño reparador que apoya tus pulmones',
    icon: '🌙',
    gradient: 'from-[#3D3D6E] to-[#5A4A7A]',
    textColor: '#EDE8FF',
    pdf: '/pdfs/Bonificacion-Especial-Ritual-Nocturno-para-Dormir-Mejor-y-Apoyar-tus-Pulmones.pdf',
  },
  {
    id: 1,
    tag: 'Bono 2',
    title: 'Muévete Más, Sin Medicamentos',
    desc: 'Reduce la rigidez y recupera movilidad de forma natural',
    icon: '🌿',
    gradient: 'from-[#2D6248] to-[#3D8260]',
    textColor: '#E0F5EC',
    pdf: '/pdfs/Muevete-mas-y-reduce-la-rigidez-sin-medicamentos.pdf',
  },
  {
    id: 2,
    tag: 'Bono 3',
    title: 'Metabolismo a los 50',
    desc: 'Tu guía para rejuvenecer y quemar grasa de forma natural',
    icon: '🔥',
    gradient: 'from-[#7A3D20] to-[#A85C30]',
    textColor: '#FFF0E8',
    pdf: '/pdfs/Metabolismo-a-los-50-Tu-Guia-para-Rejuvenecer-y-Quemar-Grasa.pdf',
  },
]

export const ABSORCION_PROTOCOLS = [
  { id: 0, title: 'El Protocolo de los 7 Días', subtitle: 'El núcleo · Plan día a día',       icon: '📋', size: 'large', pdf: '/pdfs/absorcion-maxima/Protocolo-de-Vitalidad-Pulmonar-Tu-Guia-de-7-Dias.pdf' },
  { id: 1, title: 'Mapa de Bactericidas',        subtitle: 'Alimentos que amplifican el ACV',  icon: '🗺️', size: 'small', pdf: '/pdfs/absorcion-maxima/Guia-de-Optimizacion-Vinagre-de-Manzana-y-Restauracion-Intestinal.pdf' },
  { id: 2, title: 'Test de la Microbiota',        subtitle: 'Evalúa tu nivel de partida',       icon: '🌡️', size: 'small', pdf: '/pdfs/absorcion-maxima/Tu-Mapa-Hacia-el-Bienestar-Guia-de-Autoevaluacion-Gut.pdf' },
]

export const ABSORCION_BONUSES = [
  { id: 0, title: 'Código Articular',            subtitle: 'Recupera tu flexibilidad natural', icon: '🦴', secret: false, pdf: '/pdfs/absorcion-maxima/Tu-Intestino-y-tus-Articulaciones-El-Eje-que-Define-tu-Movilidad.pdf' },
  { id: 1, title: 'Truco de la Mente Despierta', subtitle: 'Optimiza tu foco y energía',       icon: '🧠', secret: false, pdf: '/pdfs/absorcion-maxima/Restauracion-Intestinal-El-Protocolo-para-tu-Segundo-Cerebro.pdf' },
  { id: 2, title: 'El Día Cero',                  subtitle: 'El secreto que lo cambia todo',    icon: '🔐', secret: true,  pdf: '/pdfs/absorcion-maxima/Preparacion-Maestra-Tu-Guia-Secreta-para-el-Primer-Dia.pdf' },
]

export const RITUAL_PROTOCOLS = [
  { id: 0, title: 'El Shot Activador',    subtitle: 'Ritual de 60 segundos',  icon: '💛', pdf: '/pdfs/ritual/Protocolo-Matutino-de-Limpieza-Pulmonar.pdf' },
  { id: 1, title: 'Mapa de Alimentos',    subtitle: 'Apaga el fuego interno', icon: '🗺️', pdf: '/pdfs/ritual/Guia-Antiinflamatoria-para-tu-Protocolo-Respiratorio.pdf' },
  { id: 2, title: 'La Ventana de 20 Min', subtitle: 'El timing exacto',       icon: '⏱️', pdf: '/pdfs/ritual/Sincronia-Metabolica-Guia-para-tu-Protocolo-de-Vinagre-y-Antiinflamatorios.pdf' },
  { id: 3, title: 'Termómetro',           subtitle: 'Mide tu inflamación',    icon: '🌡️', pdf: '/pdfs/ritual/Guia-de-Autoevaluacion-Apagando-el-Fuego-Interno.pdf' },
]

export const RITUAL_BONUSES = [
  { id: 0, title: 'Articulaciones Sin Fuego',          subtitle: 'Recupera tu movilidad', icon: '🦴', pdf: '/pdfs/ritual/De-la-Respiracion-al-Movimiento-Tu-Protocolo-de-Recuperacion-Integral.pdf' },
  { id: 1, title: 'Audio de Respiración Regenerativa', subtitle: 'Ejercicio guiado',      icon: '🎧', pdf: null },
  { id: 2, title: 'El Secreto del Día Cuatro',         subtitle: 'Bono exclusivo',        icon: '🔐', pdf: '/pdfs/ritual/El-bonus-que-nadie-te-da-el-ajuste-del-dia-4-que-despega-tu-limpieza-pulmonar.pdf' },
]

export const ACHIEVEMENTS = [
  { id: 'd1',   icon: '🌱', name: 'Primer Paso',       desc: 'Completaste tu primer día',     condition: (days) => days[0] },
  { id: 'w1',   icon: '⭐', name: 'Primera Semana',    desc: '7 días consecutivos',            condition: (days) => days.slice(0,7).every(Boolean) },
  { id: 'mid',  icon: '🏅', name: 'Mitad del Camino',  desc: '10 días completados',            condition: (days) => days.slice(0,10).every(Boolean) },
  { id: 'done', icon: '🏆', name: 'Protocolo Completo',desc: '¡21 días — lo lograste!',        condition: (days) => days.every(Boolean) },
]

export const QUOTES = [
  { text: 'Cada día que tomas tu preparación es un paso hacia la salud que mereces.', author: 'Dr. Méndez, Médico naturista' },
  { text: 'Los pequeños hábitos son la base de los grandes cambios.', author: 'Programa Protocolo del Vinagre' },
  { text: 'Tu sistema respiratorio te lo agradecerá. Sigue adelante.', author: 'María G., 63 años' },
  { text: 'La constancia es la madre de los resultados. Ya llevas varios días — ¡continúa!', author: 'Testimonio de usuario' },
]

export const SYMPTOM_DAYS = [3, 7, 21]

export const SYMPTOM_QUESTIONS = {
  3:  '¿Cómo te has sentido en estos primeros días?',
  7:  '¿Cómo está tu respiración después de 7 días?',
  21: '¿Cómo te sientes al completar el protocolo?',
}

export const EMOJI_SCALE = ['😞', '😕', '😐', '🙂', '😄']
