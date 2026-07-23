// Datos de ejemplo para el demo/portfolio.
// Se usan como fallback cuando Appwrite está pausado o sin conexión, para que
// la grilla de Especialidades nunca aparezca vacía. Los nombres coinciden con
// SPECIALTY_VISUALS (constants/index.ts) para que los íconos/degradados matcheen.

export const DEMO_CATEGORIES = [
  { $id: "cat-cultura", name: "Transformación y Cultura", description: "Cultura, DEI y sustentabilidad." },
  { $id: "cat-bienestar", name: "Bienestar", description: "Salud física, mental y emocional." },
  { $id: "cat-agilidad", name: "Agilidad e Innovación", description: "Metodologías ágiles e IA aplicada." },
  { $id: "cat-comunicacion", name: "Comunicación", description: "Comunicación interna y employer branding." },
  { $id: "cat-eventos", name: "Eventos & Speakers", description: "Team buildings, charlas y eventos." },
];

export const DEMO_SPECIALTIES = [
  {
    $id: "demo-1",
    name: "Diagnóstico y Transformación Cultural",
    description: "Relevamos la cultura actual de tu organización y diseñamos la transformación.",
    categories: "cat-cultura",
    price: 0,
    image_url: "",
  },
  {
    $id: "demo-2",
    name: "Programas de Bienestar Integral",
    description: "Iniciativas de salud física, mental y emocional para sostener el bienestar de tus equipos.",
    categories: "cat-bienestar",
    price: 0,
    image_url: "",
  },
  {
    $id: "demo-3",
    name: "Transformación Ágil de Equipos",
    description: "Metodologías ágiles y frameworks de trabajo para acelerar a tus equipos.",
    categories: "cat-agilidad",
    price: 0,
    image_url: "",
  },
  {
    $id: "demo-4",
    name: "Comunicación Interna y Employer Branding",
    description: "Estrategias para posicionar a tu empresa como un gran lugar para trabajar.",
    categories: "cat-comunicacion",
    price: 0,
    image_url: "",
  },
  {
    $id: "demo-5",
    name: "Team Buildings & Dinámicas Grupales",
    description: "Experiencias diseñadas para fortalecer los vínculos y la colaboración.",
    categories: "cat-eventos",
    price: 0,
    image_url: "",
  },
  {
    $id: "demo-6",
    name: "IA Aplicada a Personas",
    description: "Acompañamos la adopción de inteligencia artificial en tus procesos de RRHH.",
    categories: "cat-agilidad",
    price: 0,
    image_url: "",
  },
  {
    $id: "demo-7",
    name: "Diversidad, Equidad e Inclusión",
    description: "Programas para construir organizaciones más diversas e inclusivas.",
    categories: "cat-cultura",
    price: 0,
    image_url: "",
  },
  {
    $id: "demo-8",
    name: "Sustentabilidad y RSE",
    description: "Diseñamos e implementamos programas de sustentabilidad y responsabilidad social.",
    categories: "cat-cultura",
    price: 0,
    image_url: "",
  },
  {
    $id: "demo-9",
    name: "Speakers & Charlas Inspiracionales",
    description: "Charlas disruptivas e inspiracionales para eventos y kick-offs.",
    categories: "cat-eventos",
    price: 0,
    image_url: "",
  },
  {
    $id: "demo-10",
    name: "Producción de Eventos Corporativos",
    description: "Planificación y producción integral de eventos internos y externos.",
    categories: "cat-eventos",
    price: 0,
    image_url: "",
  },
];
