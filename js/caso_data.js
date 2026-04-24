/* ══════════════════════════════════════════════════════════════
   caso_data.js — Datos editables del caso pedagógico GPF
   
   INSTRUCCIONES
   ─────────────
   1. Edita los textos directamente en este archivo.
   2. Para cambiar imágenes: reemplaza el archivo en imagenes/
      y actualiza la ruta en el objeto CASO_DATA.imagenes.*
   3. Para agregar/quitar hechos: edita el array situacion.hechos
   4. Para cambiar las opciones de decisión: edita desarrollo.opciones
   5. Para modificar preguntas: edita evaluacion.preguntas
      — "correcta" es el ÍNDICE (0, 1 o 2) de la opción correcta
   
   CARPETA DE IMÁGENES
   ───────────────────
   imagenes/placeholder_1.png  →  portada hero full-width
   imagenes/placeholder_2.png  →  fondo sección contexto
   imagenes/placeholder_3.png  →  card "El territorio"
   imagenes/placeholder_4.png  →  card "El cierre"
   imagenes/placeholder_5.png  →  card "Los actores"
   imagenes/placeholder_6.png  →  imagen feedback decisión correcta
   
   Para reemplazar: pon tu foto en imagenes/ con el mismo nombre
   (o cambia la ruta abajo). Formatos admitidos: jpg, png, webp, png.
══════════════════════════════════════════════════════════════ */

var CASO_DATA = {

  /* ── META ─────────────────────────────────────────────────── */
  meta: {
    modulo:   "Módulo 7 · Fiscalización en áreas protegidas",
    codigo:   "CASO-07",
    duracion: "15 min",
    nivel:    "Intermedio",
  },

  /* ── IMÁGENES ─────────────────────────────────────────────── */
  imagenes: {
    hero:        "imagenes/placeholder_1.png",  // Hero portada
    contextoBg:  "imagenes/placeholder_2.png",  // Fondo sección contexto
    territorio:  "imagenes/placeholder_3.png",  // Card El territorio
    cierre:      "imagenes/placeholder_4.png",  // Card El cierre
    actores:     "imagenes/placeholder_5.png",  // Card Los actores
    decision:    "imagenes/placeholder_6.png",  // Feedback decisión correcta
  },

  /* ── PORTADA ──────────────────────────────────────────────── */
  portada: {
    titulo:    "El guardaparque que llegó tarde",
    subtitulo: "Un grupo de turistas, un sendero cerrado y una decisión que lo cambió todo",
    lead:      "Son las 14:30 del sábado. Carlos lleva seis horas de turno en el sector Pucón. La radio suena: dos personas fueron vistas ingresando al sendero Cráter del Villarrica, clausurado desde ayer por alerta naranja del SERNAGEOMIN.",
    ficha: [
      { label: "Área",         value: "Parque Nacional Villarrica" },
      { label: "Situación",    value: "Acceso no autorizado" },
      { label: "Normativa",    value: "Ley 21.600 · Arts. 108, 110, 115, 118, 122" },
      { label: "Protagonista", value: "Carlos · GPF 6 años" },
    ],
  },

  /* ── 01 · APERTURA — CONTEXTO ─────────────────────────────── */
  contexto: {
    titulo:    "El contexto",
    subtitulo: "Lo que Carlos sabe cuando recibe el llamado.",
    bloques: [
      {
        num:     "01",
        heading: "El territorio",
        texto:   "El Parque Nacional Villarrica, 63.000 hectáreas de bosque andino patagónico. El sector Pucón concentra el 70% del flujo turístico. Tres senderos principales, uno de ellos —el Cumulvolcánico— asciende hasta los 1.800 metros bordeando cráteres activos.",
        imagen:  "imagenes/placeholder_3.png",
        imgAlt:  "Vista aérea del Parque Nacional Villarrica",
      },
      {
        num:     "02",
        heading: "El cierre",
        texto:   "El sendero fue clausurado a las 09:00 hrs del viernes por alerta naranja del SERNAGEOMIN. Cartelería oficial en el acceso principal y cadena física. El acceso secundario, por el sector poniente, no tiene señalética permanente — una brecha conocida desde hace meses.",
        imagen:  "imagenes/placeholder_4.png",
        imgAlt:  "Cartelería de cierre en acceso al sendero",
      },
      {
        num:     "03",
        heading: "Los actores",
        texto:   "Carlos: guardaparque con 6 años de experiencia, turno largo, solo en el sector. Dos jóvenes con equipo de trekking, identificados como turistas. Una testigo dice que los vio \"saltar la cadena\"; otra versión indica que entraron por el acceso secundario.",
        imagen:  "imagenes/placeholder_5.png",
        imgAlt:  "GPF en puesto de control",
      },
    ],
  },

  /* ── 01 · APERTURA — SITUACIÓN ───────────────────────────── */
  situacion: {
    titulo:    "La situación",
    subtitulo: "Tres versiones sobre un mismo hecho. ¿Con qué información toma Carlos la decisión?",
    alerta:    "Carlos tiene que decidir en los próximos 5 minutos.",
    hechos: [
      { hora: "14:25", texto: "Una turista llama al guardaparque informando que vio a dos personas cruzar la cadena del acceso principal." },
      { hora: "14:28", texto: "Un tercero contradice la versión: dice haberlos visto ingresar por el acceso poniente, donde no hay señalética." },
      { hora: "14:30", texto: "Carlos recibe el reporte por radio. No hay otros GPF en el sector. Jefatura no responde por radio." },
    ],
  },

  /* ── 02 · DESARROLLO ─────────────────────────────────────── */
  desarrollo: {
    titulo:    "El desarrollo del caso",
    subtitulo: "Carlos tiene que decidir ahora. Ponte en su lugar.",
    pregunta:  "¿Qué haces en los próximos 5 minutos?",
    contexto:  "La radio con jefatura no responde. Los turistas pueden estar a más de 800 metros del acceso principal. No hay otros GPF en el sector. El protocolo y tu criterio entran en tensión.",
    cierreReal: "En el caso real, Carlos eligió la opción A: ingresó solo sin informar. Los turistas cooperaron, pero el informe posterior omitió el acta de infracción. Dos omisiones que la supervisión detectó semanas después.",
    opciones: [
      {
        id:          "op-a",
        icono:       "🚶",
        titulo:      "Ingresar solo al sendero",
        descripcion: "Entrar a buscarlos de inmediato para evitar que suban más.",
        feedback: {
          tono:        "warning",
          etiqueta:    "Decisión intuitiva, protocolo en riesgo",
          titulo:      "Actuaste antes de informar",
          texto:       "Los alcanzas a 800m del acceso y los retiras sin incidentes. Pero ingresaste solo a un sector con alerta naranja del SERNAGEOMIN sin reportar tu posición ni solicitar autorización. El Art. 109 de la Ley 21.600 establece que la fiscalización debe ejercerse dentro del marco de atribuciones del Servicio, lo que incluye el deber de coordinación. La buena intención no exime del procedimiento.",
          aprendizaje: "El protocolo de comunicación previa protege al GPF tanto como a los turistas. Sin registro, no hay respaldo.",
          imagen:      null,
          imgAlt:      null,
        },
      },
      {
        id:          "op-b",
        icono:       "📞",
        titulo:      "Insistir por radio con jefatura",
        descripcion: "Seguir intentando contacto antes de actuar.",
        feedback: {
          tono:        "ok",
          etiqueta:    "Decisión correcta según protocolo",
          titulo:      "Cumpliste el deber de comunicación",
          texto:       "Logras contacto 8 minutos después. La jefatura autoriza el ingreso, coordina apoyo desde el sector vecino y queda constancia de la acción. Los turistas alcanzaron los 1.200m — mayor exposición al riesgo, pero tu actuación queda respaldada. El acta que levantes tendrá plena validez: el Art. 110 de la Ley 21.600 te reconoce como ministro de fe, y el Art. 122 establece que el acta inicia el procedimiento sancionatorio.",
          aprendizaje: "El tiempo invertido en comunicar no es tiempo perdido: es blindaje institucional y coordinación efectiva.",
          imagen:      "imagenes/placeholder_6.png",
          imgAlt:      "GPF coordinando por radio con jefatura",
        },
      },
      {
        id:          "op-c",
        icono:       "⏳",
        titulo:      "Esperar en el acceso principal",
        descripcion: "Quedarte en la entrada a que bajen por su cuenta.",
        feedback: {
          tono:        "bad",
          etiqueta:    "Omisión de fiscalización",
          titulo:      "Evitaste el riesgo, pero también el deber",
          texto:       "Los turistas bajan por el acceso poniente sin cruzarse contigo. No hay acta, no hay registro, no hay acción fiscalizadora. Se incumple el deber de fiscalización activa del GPF: el Art. 108 lit. q) de la Ley 21.600 prohíbe expresamente transitar en lugares no habilitados, y el Art. 115 lit. a) establece que contravenir ese artículo es infracción. Sin acta, el hecho no existe institucionalmente.",
          aprendizaje: "La pasividad en terreno es una forma de omisión. Fiscalizar exige presencia y registro, no solo vigilancia.",
          imagen:      null,
          imgAlt:      null,
        },
      },
    ],
  },

  /* ── MARCO NORMATIVO ──────────────────────────────────────── */
  marcoNormativo: [
    { tag: "Ley 21.600", articulo: "Art. 108 lit. q)", texto: "Prohíbe a toda persona ajena a la administración transitar o pernoctar en sectores no habilitados o autorizados. El sendero cerrado por alerta naranja cae directamente en esta prohibición." },
    { tag: "Ley 21.600", articulo: "Art. 110",         texto: "Los funcionarios de fiscalización tienen calidad de ministros de fe. Los hechos que consten en el acta de fiscalización constituyen presunción legal de haberse cometido la infracción." },
    { tag: "Ley 21.600", articulo: "Art. 115 lit. a)", texto: "Constituye infracción en áreas protegidas contravenir las prohibiciones establecidas en el Art. 108. El ingreso a sendero cerrado se tipifica aquí." },
    { tag: "Ley 21.600", articulo: "Art. 118",         texto: "Clasifica las infracciones en gravísimas, graves o leves según el daño al ecosistema. El ingreso sin daño ambiental constatado se tipifica como infracción leve." },
    { tag: "Ley 21.600", articulo: "Art. 122",         texto: "Los fiscalizadores que constaten hechos que puedan constituir infracciones levantarán un acta objetiva y detallada. Con esa acta podrá iniciarse el procedimiento administrativo sancionador." },
  ],

  /* ── 03 · EVALUACIÓN LEGAL ────────────────────────────────── */
  evaluacion: {
    titulo:    "Evaluación legal",
    subtitulo: "Tres preguntas sobre la Ley 21.600 aplicada al caso.",
    // "correcta" = índice (0, 1 ó 2) de la opción correcta
    preguntas: [
      {
        id:       "p1",
        norma:    "Ley 21.600 · Art. 108 lit. q)",
        texto:    "Los turistas ingresaron al sendero Cráter del Villarrica clausurado por alerta naranja. ¿Cuál es la prohibición de la Ley 21.600 que contravinieron?",
        correcta: 1,
        opciones: [
          { texto: "Causaron daño ambiental al ecosistema del parque al transitar por el sendero.", feedback: "El daño ambiental determina la gravedad de la infracción (Art. 118), no su tipificación. La infracción se configura por el ingreso a zona no habilitada, con o sin daño." },
          { texto: "Transitaron en un lugar no habilitado o autorizado, lo que prohíbe expresamente el Art. 108 lit. q) de la Ley 21.600.", feedback: "Correcto. El Art. 108 lit. q) prohíbe pernoctar, transitar o instalarse en sectores no habilitados. El sendero clausurado por alerta naranja es precisamente ese tipo de sector." },
          { texto: "Ingresaron sin pagar el derecho de acceso al parque, infringiendo la normativa tarifaria.", feedback: "El cobro de entrada corresponde al Art. 108 lit. r), que es una prohibición separada. En este caso la infracción relevante es el acceso a zona clausurada, no el pago de entrada." },
        ],
      },
      {
        id:       "p2",
        norma:    "Ley 21.600 · Art. 122",
        texto:    "Los turistas cooperaron y abandonaron el sendero voluntariamente. Según el Art. 122 de la Ley 21.600, ¿qué debe hacer Carlos al constatar los hechos?",
        correcta: 2,
        opciones: [
          { texto: "No es necesario levantar acta si el infractor abandonó el área sin resistencia.", feedback: "El Art. 122 no establece excepciones basadas en la actitud del infractor. El deber de levantar acta opera desde que se constatan hechos que puedan constituir infracción, independientemente de la cooperación posterior." },
          { texto: "Debe consultar a jefatura antes de levantar el acta para determinar si la infracción es leve, grave o gravísima.", feedback: "La clasificación de la infracción (Art. 118) es posterior al acta, no previa. Carlos debe levantar el acta con los hechos objetivos; es el procedimiento sancionador el que determinará la categoría." },
          { texto: "Debe levantar un acta de fiscalización describiendo objetivamente los hechos e identificando a los presuntos infractores.", feedback: "Correcto. El Art. 122 establece exactamente ese deber: el acta debe ser objetiva, detallada e identificar al infractor. Con esa sola acta puede iniciarse el procedimiento administrativo sancionador." },
        ],
      },
      {
        id:       "p3",
        norma:    "Ley 21.600 · Arts. 110, 115 y 118",
        texto:    "Carlos levanta el acta. Los turistas no causaron daño ambiental visible. ¿Cómo se califica esta infracción según la Ley 21.600?",
        correcta: 0,
        opciones: [
          { texto: "Infracción leve: contraviene el Art. 108 (tipificada en Art. 115 lit. a), pero sin daño ambiental constatado, lo que la sitúa en la categoría leve del Art. 118.", feedback: "Correcto. El Art. 118 N°3 define como leves las conductas que contravienen preceptos obligatorios sin constituir infracción gravísima o grave. Sin daño ambiental constatable, el ingreso al sendero es infracción leve." },
          { texto: "Infracción grave: el ingreso a zona de riesgo volcánico siempre se clasifica como grave por el peligro potencial.", feedback: "La clasificación de gravedad en el Art. 118 no se basa en el riesgo para el infractor, sino en el daño al ecosistema y los servicios ecosistémicos. Sin daño ambiental, no aplica la categoría grave." },
          { texto: "No existe infracción porque los turistas corrigieron voluntariamente la conducta al retirarse.", feedback: "La infracción se configuró en el momento del ingreso al sendero clausurado, independientemente de la conducta posterior. El Art. 110 establece que el acta del ministro de fe constituye presunción legal de la infracción." },
        ],
      },
    ],
  },

};
