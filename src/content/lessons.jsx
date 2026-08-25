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

export function Lesson1() {
  return (
    <>
      <Eyebrow>Lección 1 · La Base del Protocolo</Eyebrow>
      <H1>La Receta Exacta</H1>
      <P>Esta preparación es el corazón del protocolo. La clave está en la precisión — ni más ni menos — y en la calidad del vinagre.</P>
      <H2>Ingredientes</H2>
      <IngList items={[
        ['2 cdas.', 'Vinagre de manzana crudo, sin filtrar, con "la madre"'],
        ['200 ml', 'Agua tibia (no caliente, no fría)'],
        ['1 cdita.', <>Miel de abeja cruda <span style={{ color: 'hsl(var(--muted-foreground))' }}>(opcional)</span></>],
        ['1 pizca', <>Cayena <span style={{ color: 'hsl(var(--muted-foreground))' }}>(opcional, potencia el efecto)</span></>],
      ]} />
      <H2>Preparación</H2>
      <Tip label="Paso 1">Calienta el agua hasta que esté tibia — como para hacer un té pero sin hervir.</Tip>
      <Tip label="Paso 2">Agrega las 2 cucharadas de vinagre y mezcla bien con una cuchara.</Tip>
      <Tip label="Paso 3">Añade miel y cayena si deseas. Mezcla hasta disolver completamente.</Tip>
      <Tip label="Paso 4">Bebe lentamente, sin prisa. Puedes usar pajita para proteger el esmalte dental.</Tip>
      <Warn title="⚠️ Nunca tomes el vinagre puro">
        El agua tibia es esencial para proteger el esmalte dental y el esófago. Siempre diluido.
      </Warn>
      <H2>¿Qué vinagre comprar?</H2>
      <P>Busca vinagre de manzana orgánico, crudo y sin filtrar. El líquido debe tener un sedimento oscuro en el fondo — eso es "la madre" y es lo que tiene los beneficios activos. Si el vinagre es completamente transparente, no sirve para este protocolo.</P>
    </>
  )
}

export function Lesson2() {
  return (
    <>
      <Eyebrow>Lección 2 · El Momento Correcto</Eyebrow>
      <H1>El Mejor Horario para Tomarla</H1>
      <P>El horario puede marcar una diferencia real en los resultados. Elige el que mejor encaje con tu rutina y mantenlo todos los días.</P>
      <H2>Opción 1: Por la mañana (recomendado)</H2>
      <Tip label="Ideal si tienes estómago fuerte">Toma la preparación al despertar, 20–30 minutos antes del desayuno. En ayunas, la absorción es máxima y el efecto sobre el azúcar en sangre es mejor.</Tip>
      <H2>Opción 2: Antes de dormir</H2>
      <Tip label="Ideal si tienes estómago sensible">30 minutos antes de acostarte. Muchos usuarios reportan mejor sueño con este horario, especialmente combinado con el Ritual Nocturno del Bono 1.</Tip>
      <H2>Lo que debes evitar</H2>
      <IngList items={[
        ['❌', 'Tomar en el medio de las comidas'],
        ['❌', 'Cambiar el horario cada día'],
        ['❌', 'Más de una toma al día en las primeras 2 semanas'],
      ]} />
      <Warn title="💡 Después de tomar la preparación">
        Espera 30 minutos antes de cepillar los dientes. El vinagre ablanda temporalmente el esmalte — cepillarlo inmediatamente puede dañarlo. Puedes enjuagar con agua simple.
      </Warn>
    </>
  )
}

export function Lesson3() {
  return (
    <>
      <Eyebrow>Lección 3 · Acelera tu Progreso</Eyebrow>
      <H1>Cómo Potenciar los Resultados</H1>
      <P>El protocolo funciona solo. Pero combinado con estos hábitos, los resultados pueden llegar mucho más rápido y ser más duraderos.</P>
      <H2>Alimentos que potencian</H2>
      <IngList items={[
        ['🧄', 'Ajo crudo — antiinflamatorio natural muy potente'],
        ['🫚', 'Aceite de oliva extra virgen — grasas antiinflamatorias'],
        ['🍋', 'Limón fresco — vitamina C para el sistema inmune'],
        ['🥦', 'Verduras de hoja verde — magnesio y antioxidantes'],
        ['🫐', 'Frutos rojos — flavonoides antiinflamatorios'],
      ]} />
      <H2>Hidratación</H2>
      <Tip label="Meta diaria">Al menos 8 vasos de agua al día. El vinagre trabaja mejor cuando el cuerpo está bien hidratado. La sed entre comidas es señal de que necesitas más agua.</Tip>
      <H2>Movimiento suave</H2>
      <P>No se requiere ejercicio intenso. 15–20 minutos de caminata al día son suficientes para activar la circulación y potenciar los efectos antiinflamatorios del protocolo.</P>
      <Warn title="🌟 La diferencia real">
        Las personas que combinan el protocolo con buena hidratación y caminatas diarias reportan resultados en la primera semana. Solo con la preparación, los cambios se notan hacia el día 10–14.
      </Warn>
    </>
  )
}

export function Lesson4() {
  return (
    <>
      <Eyebrow>Lección 4 · Evita estos Errores</Eyebrow>
      <H1>Errores que Debes Evitar</H1>
      <P>Estos son los errores más comunes que retrasan los resultados. Conocerlos de antemano te ahorra tiempo y frustración.</P>
      <H2>Error #1: Tomar el vinagre puro</H2>
      <Warn title="⚠️ Nunca sin diluir">El vinagre puro puede dañar el esmalte dental y el esófago de forma permanente. Siempre en 200 ml de agua tibia.</Warn>
      <H2>Error #2: Doblar la dosis</H2>
      <P>Más no es mejor. 2 cucharadas al día es la dosis exacta. Más cantidad puede causar acidez, náuseas y desbalances en el pH digestivo.</P>
      <H2>Error #3: Ser inconsistente</H2>
      <Tip label="La realidad">Un día sin tomar no arruina el protocolo. Pero 3 días seguidos sin tomarlo reinicia el proceso de adaptación biológica. La constancia diaria genera el efecto acumulativo.</Tip>
      <H2>Error #4: Esperar resultados en 2 días</H2>
      <P>Los cambios biológicos toman tiempo. La mayoría nota diferencias entre el día 5 y el día 10. El día 21 es cuando el cuerpo ha completado un ciclo completo de adaptación.</P>
      <H2>Error #5: Mezclarlo con ciertos medicamentos</H2>
      <Warn title="⚠️ Consulta a tu médico si tomas">
        Anticoagulantes, diuréticos o medicamentos para la diabetes. El vinagre puede potenciar sus efectos y requiere ajuste de dosis médica.
      </Warn>
    </>
  )
}
