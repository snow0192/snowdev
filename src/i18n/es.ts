import type { Translation } from "./en";

export const es: Translation = {
  meta: {
    title: "Snow — Desarrollador Full Stack & Cloud",
    description:
      "Snow es un desarrollador Full Stack enfocado en software moderno, infraestructura cloud, herramientas para desarrolladores y sistemas escalables.",
  },
  nav: {
    about: "Sobre mí",
    stack: "Stack",
    projects: "Proyectos",
    goatrealm: "GoatRealm",
    contact: "Contacto",
    menu: "Menú",
    close: "Cerrar",
  },
  hero: {
    status: "Construyendo cosas que importan",
    title: "Construyo software que va más allá de la interfaz.",
    subtitle:
      "Desarrollador Full Stack enfocado en infraestructura cloud, herramientas para desarrolladores, automatización y sistemas modernos. Llevo ideas del concepto al código, al deploy y a un producto real.",
    ctaPrimary: "Hablemos",
    ctaSecondary: "Ver proyectos",
    scroll: "Scroll",
    metaLine: 'const snow = { focus: ["Full-Stack", "Cloud", "DevTools"] }',
  },
  about: {
    eyebrow: "01 — Sobre mí",
    title: "Construyo cosas que realmente existen.",
    body: "Soy un desarrollador enfocado en construir aplicaciones modernas, herramientas para desarrolladores, automatización y sistemas basados en cloud. Disfruto llevar una idea del concepto al código, al deploy y, finalmente, a un producto real — experimentando constantemente con nuevas tecnologías, arquitecturas e ideas.",
    philosophyLabel: "Filosofía",
    philosophy: ["Construir.", "Romper.", "Aprender.", "Mejorar.", "Publicar."],
    exploringLabel: "Explorando ahora",
    exploring: [
      "Infraestructura cloud & AWS",
      "System design & arquitectura de backend",
      "Diseño de APIs & aplicaciones escalables",
      "Herramientas de IA para devs",
      "Ciberseguridad & infraestructura",
      "Open source & experiencia del desarrollador",
    ],
  },
  stack: {
    eyebrow: "02 — Stack",
    title: "Herramientas con las que construyo.",
    sub: "Las tecnologías que uso para diseñar, construir y publicar software de principio a fin.",
    categories: {
      languages: "Lenguajes",
      frontend: "Frontend",
      backend: "Backend & APIs",
      cloud: "Cloud & Infraestructura",
      tools: "Herramientas & Entorno",
    },
  },
  goatrealm: {
    eyebrow: "03 — Ecosistema",
    title: "Construyendo GoatRealm.",
    description:
      "GoatRealm es un ecosistema tecnológico que estoy construyendo alrededor de software, aplicaciones, SaaS, automatización, herramientas para desarrolladores e infraestructura cloud — productos que viven más allá de un único repositorio.",
    areasLabel: "Lo que vive dentro",
    areas: [
      "Aplicaciones",
      "SaaS",
      "Automatización",
      "Developer Tools",
      "Cloud",
      "Infraestructura",
    ],
    techLabel: "Construido con",
    note: "Donde viven los proyectos más grandes",
    cta: "Explorar GoatRealm",
  },
  projects: {
    eyebrow: "04 — Proyectos Seleccionados",
    title: "Trabajos seleccionados.",
    sub: "Proyectos que diseñé, construí y publiqué. Open source, licencia MIT y totalmente documentados.",
    stackLabel: "Stack",
    viewGithub: "Ver en GitHub",
    vision: {
      name: "Vision Secret",
      category: "Seguridad · Herramienta para devs",
      description:
        "Un CLI con foco en privacidad que escanea código fuente en busca de secrets, credenciales y configuración sensible filtrada — hecho para desarrolladores y pipelines de CI/CD.",
      features: [
        "Static scanning & análisis de entropía",
        "Confidence scoring & manejo de falsos positivos",
        "Salida JSON + SARIF 2.1.0",
        "Integración con GitHub Code Scanning",
        ".secretignore & configuración personalizada",
        "Cero peticiones de red · Sin telemetría",
      ],
    },
    http: {
      name: "HTTP Security Analyzer",
      category: "Seguridad · Análisis Web",
      description:
        "Un scanner CLI defensivo que analiza la configuración de seguridad HTTP de cualquier sitio que poseas: headers, HTTPS, TLS, cookies y CORS — con puntaje de 0 a 100 y exit codes listos para CI.",
      features: [
        "12 familias de reglas de security headers",
        "Análisis de TLS, cookies & CORS",
        "Puntaje de seguridad de 0 a 100",
        "Salida JSON + SARIF 2.1.0",
        "Batch scanning & gating para CI",
        "260+ tests · TypeScript estricto",
      ],
    },
    discord: {
      name: "Discord Quest Research",
      category: "Investigación · Ingeniería Inversa",
      description:
        "Investigación experimental sobre el funcionamiento interno de un cliente JavaScript de gran tamaño: runtime de Webpack, descubrimiento de módulos, arquitectura orientada a eventos y gestión de estado.",
      features: [
        "Análisis del runtime de Webpack",
        "Descubrimiento de módulos & stores internas",
        "Estudio de arquitectura orientada a eventos",
        "Educativo & sin afiliación",
      ],
    },
  },
  github: {
    title: "Más experimentos, código e ideas.",
    sub: "Repositorios open source, investigaciones y cosas con las que estoy jugando.",
    cta: "Visitar GitHub",
  },
  journey: {
    eyebrow: "05 — Trayectoria",
    title: "El camino hasta ahora.",
    steps: [
      {
        title: "Exploración",
        text: "Empecé con TypeScript y desarrollo web moderno — aprendiendo al publicar cosas pequeñas.",
      },
      {
        title: "Developer tools",
        text: "Diseñé y publiqué CLIs de seguridad con TypeScript estricto, tests y CI.",
      },
      {
        title: "GoatRealm",
        text: "Empecé a construir un ecosistema alrededor de aplicaciones, SaaS, automatización e infraestructura cloud.",
      },
      {
        title: "Cloud & infraestructura",
        text: "AWS, Cloudflare, Docker, Linux — pasando de escribir código a operar sistemas.",
      },
      {
        title: "Lo que viene",
        text: "System design, arquitecturas escalables y herramientas de IA para desarrolladores.",
      },
    ],
  },
  contact: {
    eyebrow: "06 — Contacto",
    title: "¿Tienes algo que valga la pena construir?",
    sub: "Convirtamos una idea en algo real.",
    cta: "Ponte en contacto",
    directSub:
      "¿Prefieres email? Escríbeme directamente — misma respuesta en 48h, sin formularios.",
    githubLabel: "GitHub",
    goatrealmLabel: "GoatRealm",
    formTitle: "O envía una solicitud de proyecto",
    formSub:
      "Cuéntame sobre tu proyecto, plazos y objetivos. Suelo responder en menos de 48 horas.",
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    email: "Email",
    emailPlaceholder: "tu@ejemplo.com",
    type: "Tipo de proyecto",
    typeOptions: {
      project: "Proyecto de software",
      website: "Sitio web / aplicación",
      automation: "Automatización / herramienta",
      other: "Otra cosa",
    },
    budget: "Presupuesto (opcional)",
    budgetOptions: {
      none: "Aún no lo sé",
      small: "Menos de US$ 2.000",
      medium: "US$ 2.000 – US$ 10.000",
      large: "US$ 10.000+",
    },
    message: "Mensaje",
    messagePlaceholder: "¿Qué estás construyendo? Cualquier detalle ayuda.",
    submit: "Enviar solicitud",
    sending: "Enviando…",
    successTitle: "Solicitud enviada",
    successText:
      "¡Gracias! Tu solicitud llegó a mi bandeja de entrada. Te responderé lo antes posible.",
    again: "Enviar otra",
    sendError:
      "Algo salió mal. Inténtalo de nuevo o escríbeme directamente.",
    required: "Obligatorio",
    invalidEmail: "Dirección de email inválida",
  },
  bigCta: {
    title: "¿Construyendo algo más grande?",
    text: "Para productos más grandes, proyectos de software, infraestructura o soluciones orientadas a negocio, visita GoatRealm.",
    cta: "Visitar GoatRealm",
  },
  footer: {
    role: "Desarrollador Full Stack · Cloud",
    github: "GitHub",
    goatrealm: "GoatRealm",
    contact: "Contacto",
    copyright: "© 2026 Snow. Hecho con TypeScript.",
    tagline: "Build. Learn. Ship.",
  },
};