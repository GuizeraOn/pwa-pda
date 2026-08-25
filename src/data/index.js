export const LESSONS = [
  {
    id: 0,
    eyebrow: 'Lección 1',
    title: 'ACV para Protocolos de Pulmón',
    desc: 'La lección para principiantes — qué es y cómo funciona',
    pdf: '/pdfs/Vinagre-de-Manzana-ACV-para-Protocolos-de-Pulmon-La-Leccion-para-Principiantes.pdf',
  },
  {
    id: 1,
    eyebrow: 'Lección 2',
    title: 'Cuándo Tomar tu Protocolo',
    desc: 'El horario ideal para maximizar cada dosis',
    pdf: '/pdfs/Leccion-Diaria-Cuando-Tomar-tu-Protocolo-de-Vinagre-de-Manzana.pdf',
  },
  {
    id: 2,
    eyebrow: 'Lección 3',
    title: 'Guía para Resultados Más Rápidos',
    desc: 'El protocolo completo de 21 días paso a paso',
    pdf: '/pdfs/Protocolo-21-Dias-de-Vinagre-de-Sidra-de-Manzana-Guia-para-Resultados-Mas-Rapidos.pdf',
  },
  {
    id: 3,
    eyebrow: 'Lección 4',
    title: 'Programa de Limpieza con Vinagre',
    desc: 'La limpieza profunda que potencia el protocolo',
    pdf: '/pdfs/Programa-de-Limpieza-con-Vinagre-de-Sidra-de-Manzana.pdf',
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
