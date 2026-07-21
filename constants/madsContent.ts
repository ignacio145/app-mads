// Contenido estático extraído de mads.land, adaptado a formato app.
// No viene de Appwrite: son secciones institucionales/informativas del sitio.

export const TICKER_ITEMS = [
    "Broker de RRHH",
    "+50 consultoras especializadas",
    "Un solo punto de contacto",
    "Rápidas y pragmáticas",
    "Con foco en el negocio",
];

export const ABOUT = {
    eyebrow: "Qué somos",
    title: "Somos tu ",
    titleHighlight: "broker",
    titleEnd: " de RRHH.",
    description:
        "Centralizamos todas tus necesidades en un solo lugar. Te conectamos con más de 50 consultoras especializadas, para que no tengas que gestionar múltiples proveedores.",
    quoteLine1: "Vos nos contás tu necesidad.",
    quoteLine2: "Nosotras resolvemos. Somos tu primer mensaje siempre.",
};

export interface ValueProp {
    icon: string;
    title: string;
    description: string;
}

export const VALUE_PROPS: ValueProp[] = [
    {
        icon: "🎯",
        title: "1 necesidad, varias opciones",
        description:
            "Te presentamos de 1 a 3 opciones de consultoras con abordajes y metodologías distintas, para que elijas la que mejor se adapte a tu cultura.",
    },
    {
        icon: "⚡",
        title: "Somos veloces",
        description:
            "Estamos disponibles 24/7. Soluciones rápidas y ágiles para todas tus necesidades, cuando lo necesites.",
    },
    {
        icon: "🧾",
        title: "Facturación unificada",
        description:
            "Accedé a las 50 consultoras que representamos sin dar de alta a ningún proveedor adicional. Solo das de alta a MADS y listo.",
    },
    {
        icon: "🤝",
        title: "Trabajamos para tu satisfacción",
        description:
            "Te acompañamos durante todo el proceso y cerramos cada proyecto con una reunión de aprendizaje.",
    },
    {
        icon: "📊",
        title: "Información de mercado real",
        description:
            "Trabajamos con empresas de distintos rubros y dimensiones, lo que nos da una mirada integral al momento de diagnosticar tu necesidad.",
    },
];

export interface MethodStep {
    number: number;
    title: string;
    description: string;
}

export const METHOD_STEPS: MethodStep[] = [
    { number: 1, title: "Entendemos", description: "Escuchamos, analizamos y transformamos tu necesidad en acciones concretas y accionables." },
    { number: 2, title: "Curamos", description: "Seleccionamos las consultoras dentro de nuestro ecosistema con mejor fit técnico, metodológico y cultural para tu organización." },
    { number: 3, title: "Diseñamos", description: "Construimos junto a los consultores las propuestas metodológicas y económicas más adecuadas para tu necesidad." },
    { number: 4, title: "Conectamos", description: "Facilitamos los encuentros con las diferentes consultoras para que puedas escuchar de ellas sus propuestas." },
    { number: 5, title: "Elegís tu consultor", description: "Acompañamos en la evaluación y ayudamos a definir la mejor alternativa para tu necesidad." },
    { number: 6, title: "Garantizamos", description: "Te acompañamos en todo el proceso, monitoreamos los avances y velamos por el cumplimiento de los objetivos." },
    { number: 7, title: "Potenciamos", description: "Capitalizamos los aprendizajes del proyecto y generamos aprendizajes para tus próximas necesidades." },
];

export interface EcosystemProfile {
    id: string;
    title: string;
    description: string;
    bullets: string[];
    icon: string;
    colors: [string, string];
}

export const ECOSYSTEM_PROFILES: EcosystemProfile[] = [
    {
        id: "innovacion",
        title: "Innovación y nuevas miradas",
        description: "Perfiles que desafían el status quo y traen enfoques frescos a problemas complejos.",
        bullets: [
            "Visión estratégica de RRHH",
            "Acompañamiento a alta dirección",
            "Transformación organizacional",
            "Foco en resultados de negocio",
        ],
        icon: "💡",
        colors: ["#E91E8C", "#7C3AED"],
    },
    {
        id: "experiencia",
        title: "Experiencia aplicada",
        description: "Consultores con trayectoria probada en organizaciones de cualquier escala y complejidad.",
        bullets: [
            "Proyectos en multinacionales y pymes",
            "Experiencia multisectorial",
            "Gestión de proyectos complejos",
            "Resultados medibles y sostenidos",
        ],
        icon: "🏆",
        colors: ["#4C5FD9", "#14B8A6"],
    },
    {
        id: "liderazgo",
        title: "Liderazgo estratégico",
        description: "Especialistas que conectan la gestión de personas con los objetivos del negocio.",
        bullets: [
            "Visión estratégica de RRHH",
            "Acompañamiento a alta dirección",
            "Transformación organizacional",
            "Foco en resultados de negocio",
        ],
        icon: "🧭",
        colors: ["#14B8A6", "#4C5FD9"],
    },
    {
        id: "metodologias",
        title: "Metodologías certificadas",
        description: "Una red respaldada por certificaciones internacionales y marcos de trabajo probados.",
        bullets: [
            "Certificaciones internacionales",
            "Marcos ágiles y de transformación",
            "Modelos de assessment validados",
            "Estándares de calidad globales",
        ],
        icon: "📜",
        colors: ["#7C3AED", "#E91E8C"],
    },
];

export interface Testimonial {
    name: string;
    company: string;
    tag: string;
    quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        name: "Francisco Gordillo",
        company: "Puma",
        tag: "Desarrollo Organizacional",
        quote: "Trabajamos junto a MADS en todo lo que es desarrollo de habilidades y gestión del talento para todos los colaboradores de la organización. MADS se adapta a nuestras necesidades y principalmente a nuestra cultura organizacional.",
    },
    {
        name: "Magdalena Fernández de Peón",
        company: "Penguin Random House",
        tag: "Diversidad",
        quote: "Trabajar con MADS está siendo una experiencia sumamente enriquecedora y transformadora para nuestra organización. Su profesionalismo, conocimiento y dedicación han sido clave para nuestro éxito.",
    },
    {
        name: "Eliana Trujillo",
        company: "YPF",
        tag: "Liderazgo y Bienestar",
        quote: "Para mí es un placer que MADS nos acompañe. Recomiendo la vinculación con MADS ya que han sido grandes partners para nosotros y hemos llegado a grandes y hermosos resultados.",
    },
    {
        name: "Mariela Camacci",
        company: "Banco Macro",
        tag: "Cultura",
        quote: "MADS es flexible. Nos acompaña ajustando la propuesta, que sea innovadora e inclusive nos desafía a nosotros desde nuestros roles. Hacemos un gran equipo.",
    },
];

export interface Faq {
    question: string;
    answer: string;
}

export const FAQS: Faq[] = [
    {
        question: "¿Es más caro contratar a MADS?",
        answer: "No. El costo de contratar a través de MADS es el mismo que contratar directamente a la consultora. MADS abona sus honorarios a partir de los de la consultora seleccionada, sin que eso impacte en tu presupuesto.",
    },
    {
        question: "¿MADS participa de los proyectos?",
        answer: "Sí, en momentos estratégicos para asegurar tu satisfacción. No desaparecemos cuando arranca el proyecto: estamos presentes en los hitos clave para garantizar que el resultado esté a la altura de lo que necesitás.",
    },
    {
        question: "¿MADS hace competir a las consultoras entre sí?",
        answer: "No de forma desleal. MADS abona honorarios de participación a las consultoras que no ganaron el proyecto. Eso garantiza que todas participen con seriedad y que nuestra red siga creciendo con las mejores.",
    },
    {
        question: "¿Tengo una necesidad que no está en el mapa, qué hago?",
        answer: "MADS siempre resuelve tu necesidad. Somos tu primer mensaje. Si no tenemos la solución en nuestra red hoy, la buscamos. Nuestro trabajo es encontrar el equipo exacto para cada desafío.",
    },
    {
        question: "Si me gustó una consultora, ¿puedo pedirla directamente?",
        answer: "Sí. Si en un proyecto anterior trabajaste con una consultora y querés volver a contratarla o referirla, el contacto sigue siendo con MADS. Somos el único interlocutor, siempre.",
    },
];
