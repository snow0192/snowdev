import type { Translation } from "./en";

export const pt: Translation = {
  meta: {
    title: "Snow — Desenvolvedor Full Stack & Cloud",
    description:
      "Snow é um desenvolvedor Full Stack focado em software moderno, infraestrutura de cloud, ferramentas para desenvolvedores e sistemas escaláveis.",
  },
  nav: {
    about: "Sobre",
    stack: "Stack",
    projects: "Projetos",
    goatrealm: "GoatRealm",
    contact: "Contato",
    menu: "Menu",
    close: "Fechar",
  },
  hero: {
    status: "Construindo coisas que importam",
    title: "Construo software que vai além da interface.",
    subtitle:
      "Desenvolvedor Full Stack focado em infraestrutura de cloud, ferramentas para desenvolvedores, automação e sistemas modernos. Levo ideias do conceito ao código, ao deploy e a um produto real.",
    ctaPrimary: "Vamos conversar",
    ctaSecondary: "Ver projetos",
    scroll: "Rolar",
    metaLine: 'const snow = { focus: ["Full-Stack", "Cloud", "DevTools"] }',
  },
  about: {
    eyebrow: "01 — Sobre",
    title: "Eu construo coisas que realmente existem.",
    body: "Sou um desenvolvedor focado em construir aplicações modernas, ferramentas para desenvolvedores, automação e sistemas baseados em cloud. Gosto de levar uma ideia do conceito ao código, ao deploy e, eventualmente, a um produto real — experimentando constantemente novas tecnologias, arquiteturas e ideias.",
    philosophyLabel: "Filosofia",
    philosophy: ["Construir.", "Quebrar.", "Aprender.", "Melhorar.", "Publicar."],
    exploringLabel: "Explorando agora",
    exploring: [
      "Infraestrutura de cloud & AWS",
      "System design & arquitetura de backend",
      "Design de APIs & aplicações escaláveis",
      "Ferramentas de IA para devs",
      "Cibersegurança & infraestrutura",
      "Open source & experiência do desenvolvedor",
    ],
  },
  stack: {
    eyebrow: "02 — Stack",
    title: "Ferramentas com que construo.",
    sub: "As tecnologias que uso para desenhar, construir e publicar software de ponta a ponta.",
    categories: {
      languages: "Linguagens",
      frontend: "Frontend",
      backend: "Backend & APIs",
      cloud: "Cloud & Infraestrutura",
      tools: "Ferramentas & Ambiente",
    },
  },
  goatrealm: {
    eyebrow: "03 — Ecossistema",
    title: "Construindo o GoatRealm.",
    description:
      "O GoatRealm é um ecossistema de tecnologia que estou construindo em torno de software, aplicações, SaaS, automação, ferramentas para desenvolvedores e infraestrutura de cloud — produtos que vivem além de um único repositório.",
    areasLabel: "O que vive dentro",
    areas: [
      "Aplicações",
      "SaaS",
      "Automação",
      "Developer Tools",
      "Cloud",
      "Infraestrutura",
    ],
    techLabel: "Construído com",
    note: "Onde vivem os projetos maiores",
    cta: "Explorar GoatRealm",
  },
  projects: {
    eyebrow: "04 — Projetos Selecionados",
    title: "Trabalhos selecionados.",
    sub: "Projetos que desenhei, construí e publiquei. Open source, licença MIT e totalmente documentados.",
    stackLabel: "Stack",
    viewGithub: "Ver no GitHub",
    vision: {
      name: "Vision Secret",
      category: "Segurança · Ferramenta para devs",
      description:
        "Um CLI com foco em privacidade que escaneia código-fonte em busca de secrets, credenciais e configurações sensíveis vazadas — feito para desenvolvedores e pipelines de CI/CD.",
      features: [
        "Static scanning & análise de entropia",
        "Confidence scoring & tratamento de falsos positivos",
        "Saída JSON + SARIF 2.1.0",
        "Integração com GitHub Code Scanning",
        ".secretignore & configuração personalizada",
        "Zero requisições de rede · Sem telemetria",
      ],
    },
    http: {
      name: "HTTP Security Analyzer",
      category: "Segurança · Análise Web",
      description:
        "Um scanner CLI defensivo que analisa a configuração de segurança HTTP de qualquer site que você possua: headers, HTTPS, TLS, cookies e CORS — com nota de 0 a 100 e exit codes prontos para CI.",
      features: [
        "12 famílias de regras de security headers",
        "Análise de TLS, cookies & CORS",
        "Nota de segurança de 0 a 100",
        "Saída JSON + SARIF 2.1.0",
        "Batch scanning & gating para CI",
        "260+ testes · TypeScript estrito",
      ],
    },
    discord: {
      name: "Discord Quest Research",
      category: "Pesquisa · Engenharia Reversa",
      description:
        "Pesquisa experimental sobre o funcionamento interno de um cliente JavaScript de grande porte: runtime do Webpack, descoberta de módulos, arquitetura orientada a eventos e gerenciamento de estado.",
      features: [
        "Análise do runtime do Webpack",
        "Descoberta de módulos & stores internas",
        "Estudo de arquitetura orientada a eventos",
        "Educacional & sem afiliação",
      ],
    },
  },
  github: {
    title: "Mais experimentos, código e ideias.",
    sub: "Repositórios open source, pesquisas e coisas com que estou brincando.",
    cta: "Visitar GitHub",
  },
  journey: {
    eyebrow: "05 — Jornada",
    title: "O caminho até aqui.",
    steps: [
      {
        title: "Exploração",
        text: "Comecei com TypeScript e desenvolvimento web moderno — aprendendo ao publicar coisas pequenas.",
      },
      {
        title: "Developer tools",
        text: "Desenhei e publiquei CLIs de segurança com TypeScript estrito, testes e CI.",
      },
      {
        title: "GoatRealm",
        text: "Comecei a construir um ecossistema em torno de aplicações, SaaS, automação e infraestrutura de cloud.",
      },
      {
        title: "Cloud & infraestrutura",
        text: "AWS, Cloudflare, Docker, Linux — saindo de escrever código para operar sistemas.",
      },
      {
        title: "Próximos passos",
        text: "System design, arquiteturas escaláveis e ferramentas de IA para desenvolvedores.",
      },
    ],
  },
  contact: {
    eyebrow: "06 — Contato",
    title: "Tem algo que vale a pena construir?",
    sub: "Vamos transformar uma ideia em algo real.",
    cta: "Entrar em contato",
    directSub:
      "Prefere email? Escreva direto pra mim — mesma resposta em 48h, sem formulário.",
    githubLabel: "GitHub",
    goatrealmLabel: "GoatRealm",
    formTitle: "Ou envie uma solicitação de projeto",
    formSub:
      "Conte sobre o seu projeto, prazo e objetivos. Costumo responder em até 48 horas.",
    name: "Nome",
    namePlaceholder: "Seu nome",
    email: "Email",
    emailPlaceholder: "voce@exemplo.com",
    type: "Tipo de projeto",
    typeOptions: {
      project: "Projeto de software",
      website: "Site / aplicação web",
      automation: "Automação / ferramenta",
      other: "Outra coisa",
    },
    budget: "Orçamento (opcional)",
    budgetOptions: {
      none: "Ainda não sei",
      small: "Até R$ 10.000",
      medium: "R$ 10.000 – R$ 50.000",
      large: "R$ 50.000+",
    },
    message: "Mensagem",
    messagePlaceholder: "O que você está construindo? Quanto mais detalhe, melhor.",
    submit: "Enviar solicitação",
    sending: "Enviando…",
    successTitle: "Solicitação enviada",
    successText:
      "Obrigado! Sua solicitação chegou na minha caixa de entrada. Vou responder o quanto antes.",
    again: "Enviar outra",
    sendError:
      "Algo deu errado. Tente novamente, ou me envie um email diretamente.",
    required: "Obrigatório",
    invalidEmail: "Endereço de email inválido",
  },
  bigCta: {
    title: "Construindo algo maior?",
    text: "Para produtos maiores, projetos de software, infraestrutura ou soluções voltadas a negócios, visite o GoatRealm.",
    cta: "Visitar GoatRealm",
  },
  footer: {
    role: "Desenvolvedor Full Stack · Cloud",
    github: "GitHub",
    goatrealm: "GoatRealm",
    contact: "Contato",
    copyright: "© 2026 Snow. Feito com TypeScript.",
    tagline: "Build. Learn. Ship.",
  },
};