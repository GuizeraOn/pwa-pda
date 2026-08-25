function Eyebrow({ children }) {
  return <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'hsl(var(--accent))' }}>{children}</p>
}
function H1({ children }) {
  return <h1 className="font-display font-bold text-[1.65rem] text-foreground leading-snug text-balance mb-4">{children}</h1>
}
function H2({ children }) {
  return <h2 className="font-display font-semibold text-[1.15rem] text-foreground mt-7 mb-2.5">{children}</h2>
}
function P({ children }) {
  return <p className="text-[.92rem] leading-[1.72] mb-3.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{children}</p>
}
function Tip({ label, children }) {
  return (
    <div className="rounded-[12px] p-3.5 mb-2.5 border" style={{ background: 'hsl(var(--green-pale))', borderColor: 'hsl(var(--border))' }}>
      <p className="text-xs font-bold tracking-wide uppercase mb-1" style={{ color: 'hsl(var(--primary))' }}>{label}</p>
      <p className="text-[.9rem] leading-snug" style={{ color: 'hsl(var(--muted-foreground))' }}>{children}</p>
    </div>
  )
}
function Warn({ title, children }) {
  return (
    <div className="my-4 py-3.5 px-4 rounded-r-[12px] border-l-[3px]" style={{ background: 'hsl(var(--accent-pale))', borderColor: 'hsl(var(--accent))' }}>
      <p className="text-xs font-bold mb-1" style={{ color: 'hsl(var(--accent))' }}>{title}</p>
      <p className="text-[.88rem]" style={{ color: 'hsl(var(--muted-foreground))' }}>{children}</p>
    </div>
  )
}
function IngList({ items }) {
  return (
    <ul className="flex flex-col gap-2.5 my-4">
      {items.map(([amount, name], i) => (
        <li key={i} className="flex items-start gap-3 p-3.5 rounded-[12px] border" style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
          <span className="text-sm font-bold shrink-0 w-[68px]" style={{ color: 'hsl(var(--accent))' }}>{amount}</span>
          <span className="text-[.92rem] text-foreground leading-snug">{name}</span>
        </li>
      ))}
    </ul>
  )
}

export function Bonus1() {
  return (
    <>
      <Eyebrow>Bono 1 · Descanso Reparador</Eyebrow>
      <H1>Ritual Nocturno para Dormir Mejor</H1>
      <P>La calidad del sueño impacta directamente en la inflamación y la recuperación. Este ritual de 20 minutos puede transformar tu descanso.</P>
      <H2>El ritual completo</H2>
      <Tip label="60 min antes de dormir">Apaga o atenúa todas las pantallas. La luz azul inhibe la melatonina, la hormona que señala al cuerpo que es hora de dormir.</Tip>
      <Tip label="45 min antes">Prepara una infusión de manzanilla, valeriana o pasiflora. Son calmantes naturales sin efectos secundarios ni dependencia.</Tip>
      <Tip label="30 min antes">Aplica 3 gotas de aceite esencial de lavanda en las muñecas y en la almohada. Si no tienes, una bolsita de lavanda seca funciona igual.</Tip>
      <Tip label="15 min antes — Respiración 4-7-8">Inhala por 4 segundos, sostén 7, exhala por 8. Repite 4 veces. Activa el nervio vago y desactiva el sistema nervioso simpático.</Tip>
      <Warn title="✨ Combinación ganadora">
        Tomar el Protocolo del Vinagre en horario nocturno + este ritual puede mejorar la calidad del sueño en 3–5 días. El cuerpo descansado procesa mejor los nutrientes.
      </Warn>
    </>
  )
}

export function Bonus2() {
  return (
    <>
      <Eyebrow>Bono 2 · Movilidad y Bienestar</Eyebrow>
      <H1>Alivio Natural para las Articulaciones</H1>
      <P>El vinagre de manzana tiene propiedades antiinflamatorias comprobadas que se complementan con estas técnicas locales.</P>
      <H2>Compresas de vinagre (uso externo)</H2>
      <Tip label="Preparación">Mezcla 1 parte de vinagre de manzana con 1 parte de agua tibia. Empapa un trapo limpio, escúrrelo y aplica sobre la articulación dolorida por 20 minutos.</Tip>
      <Warn title="⚠️ Solo uso externo">Esta compresa es adicional al protocolo oral. No aplicar sobre heridas abiertas o piel irritada.</Warn>
      <H2>Movimientos articulares suaves</H2>
      <IngList items={[
        ['🔄', 'Rotaciones de tobillo: 10 por cada lado, mañana y noche'],
        ['🤲', 'Apertura y cierre de manos: 20 repeticiones'],
        ['🦵', 'Extensión de rodilla sentado: 15 repeticiones sin sobrecargar'],
      ]} />
      <H2>Alimentos antiinflamatorios clave</H2>
      <P>Omega-3 (sardinas, nueces, semillas de lino), cúrcuma con pimienta negra y jengibre fresco son los aliados más potentes para las articulaciones junto con el protocolo.</P>
    </>
  )
}

export function Bonus3() {
  return (
    <>
      <Eyebrow>Bono 3 · Energía y Metabolismo</Eyebrow>
      <H1>Activa tu Metabolismo</H1>
      <P>El ácido acético del vinagre tiene un efecto directo sobre el metabolismo de la glucosa. Estos complementos amplifican ese efecto de forma natural.</P>
      <H2>Los 3 cambios más efectivos</H2>
      <Tip label="Cambio 1 — Proteína en el desayuno">Empieza el día con 20–30 g de proteína (2 huevos, yogur griego o legumbres). Estabiliza el azúcar en sangre durante toda la mañana.</Tip>
      <Tip label="Cambio 2 — Caminata post-comida">10 minutos de caminata suave después de la comida principal reduce los picos de glucosa hasta un 30%. No es ejercicio — es fisiología básica.</Tip>
      <Tip label="Cambio 3 — Vinagre antes de carbohidratos">Si comes pan, arroz o papas, toma el protocolo 15 minutos antes. El ácido acético ralentiza la digestión de los almidones.</Tip>
      <Warn title="⚠️ La trampa de los jugos">Los jugos de fruta concentran el azúcar y pueden contrarrestar los efectos del vinagre sobre la glucosa. Come la fruta entera.</Warn>
      <H2>Suplementos naturales complementarios</H2>
      <IngList items={[
        ['🌿', 'Canela de Ceilán — regula el azúcar en sangre'],
        ['🧪', 'Magnesio glicinato — mejora la sensibilidad a la insulina'],
        ['💊', 'Berberina — actúa de forma similar al vinagre sobre el metabolismo'],
      ]} />
    </>
  )
}
