import { cache } from "react";
import {
  isSanityConfigured,
  type SanityImageSource,
} from "@/lib/sanity/config";
import { fetchFromSanity } from "@/lib/sanity/fetch";

export type LocalizedText = {
  pt: string;
  en: string;
};

export type SiteSettings = {
  brandName: string;
  tagline: LocalizedText;
  introduction: LocalizedText;
  story: LocalizedText;
  contactEmail: string;
  contactPhone: string;
  baseLocation: LocalizedText;
  responseNote: LocalizedText;
  servicePitch: LocalizedText;
  instagramUrl?: string;
  showInstagram: boolean;
  showTestimonials: boolean;
};

export type ServicePackage = {
  _id?: string;
  slug: string;
  accent: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  idealFor: LocalizedText;
  includes: LocalizedText[];
};

export type PortfolioItem = {
  _id?: string;
  slug: string;
  accent: string;
  fallbackImage?: string;
  title: LocalizedText;
  summary: LocalizedText;
  story: LocalizedText;
  location: LocalizedText;
  guestCount: string;
  eventType: LocalizedText;
  highlights: LocalizedText[];
  gallery?: SanityImageSource[];
};

export type VenueItem = {
  _id?: string;
  slug: string;
  accent: string;
  fallbackImage?: string;
  name: string;
  region: LocalizedText;
  style: LocalizedText;
  capacity: string;
  description: LocalizedText;
  bestFor: LocalizedText;
  notes: LocalizedText[];
  gallery?: SanityImageSource[];
};

export type TestimonialItem = {
  _id?: string;
  couple: string;
  eventType: LocalizedText;
  quote: LocalizedText;
};

export type SiteData = {
  settings: SiteSettings;
  services: ServicePackage[];
  portfolio: PortfolioItem[];
  venues: VenueItem[];
  testimonials: TestimonialItem[];
};

type PartialSiteData = Partial<SiteData>;

const siteDataQuery = `{
  "settings": *[_type == "globalSettings"][0],
  "services": *[_type == "servicePackage"] | order(orderRank asc) {
    ...,
    "slug": slug.current
  },
  "portfolio": *[_type == "portfolioItem" && published != false] | order(featured desc, orderRank asc, _createdAt desc) {
    ...,
    "slug": slug.current
  },
  "venues": *[_type == "venue" && published != false] | order(featured desc, orderRank asc, _createdAt desc) {
    ...,
    "slug": slug.current
  },
  "testimonials": *[_type == "testimonial" && published != false] | order(orderRank asc, _createdAt desc)
}`;

export const fallbackSiteData: SiteData = {
  settings: {
    brandName: "Maria Moinhos Eventos",
    tagline: {
      pt: "Momentos para a vida",
      en: "Moments for a lifetime",
    },
    introduction: {
      pt: "Planeamento e direção criativa para casamentos e outros eventos personalizados, vividos com calma, elegância e presença.",
      en: "Planning and creative direction for weddings and other bespoke events, experienced with calm, elegance, and presence.",
    },
    story: {
      pt: "",
      en: "MM Eventos was created around a simple belief: to calm the process and bring elegance to every detail of weddings and other bespoke events, through close guidance, serene direction, and attention to what truly matters.",
    },
    contactEmail: "mariamoinhos.eventos@outlook.com",
    contactPhone: "+351 966 862 556",
    baseLocation: {
      pt: "Base em Portugal, com foco inicial em celebrações no país.",
      en: "Based in Portugal, with an initial focus on celebrations across the country.",
    },
    responseNote: {
      pt: "Depois do teu pedido, receberás uma resposta inicial com disponibilidade e próximos passos.",
      en: "After your enquiry, you will receive an initial reply with availability and the next steps.",
    },
    servicePitch: {
      pt: "",
      en: "Three levels of support shaped around the rhythm and scale of each celebration.",
    },
    showInstagram: false,
    showTestimonials: false,
  },
  services: [
    {
      slug: "signature-planning",
      accent: "accent-terracotta",
      eyebrow: {
        pt: "Pacote 01",
        en: "Package 01",
      },
      title: {
        pt: "Planeamento integral",
        en: "Full Planning",
      },
      description: {
        pt: "Acompanhamento completo para casamentos e outros eventos personalizados, com direção criativa, organização estruturada e presença próxima ao longo de todo o processo.",
        en: "Full planning for weddings and other bespoke events, with creative direction, structured organisation, and close guidance throughout the entire process.",
      },
      idealFor: {
        pt: "Ideal para quem pretende delegar a organização com confiança e manter uma visão coerente do início ao fim.",
        en: "Ideal for those who want to delegate the planning with confidence while keeping a clear and cohesive vision from beginning to end.",
      },
      includes: [
        {
          pt: "Reuniões recorrentes, definição do conceito e atmosfera pretendida",
          en: "Recurring meetings, concept development, and definition of the desired atmosphere",
        },
        {
          pt: "Seleção e gestão de fornecedores, com acompanhamento próximo",
          en: "Supplier selection and management, with close follow-up",
        },
        {
          pt: "Visita técnica, cronograma, organização do espaço e coordenação operacional do dia",
          en: "Site visit, timeline, layout planning, and on-the-day coordination",
        },
      ],
    },
    {
      slug: "guided-planning",
      accent: "accent-olive",
      eyebrow: {
        pt: "Pacote 02",
        en: "Package 02",
      },
      title: {
        pt: "Planeamento parcial",
        en: "Partial Planning",
      },
      description: {
        pt: "Apoio parcial para quem já iniciou o processo, mas precisa de estrutura, afinação estética e uma voz experiente para fechar decisões.",
        en: "Partial planning support for those who have already started the process but need structure, aesthetic refinement, and an experienced voice to help finalise decisions.",
      },
      idealFor: {
        pt: "Ideal para quem quer continuar envolvido na organização, com acompanhamento profissional nas etapas mais importantes.",
        en: "Ideal for those who want to stay involved in the planning while receiving professional guidance at the most important stages.",
      },
      includes: [
        {
          pt: "Revisão do plano, prioridades e alinhamento geral do evento",
          en: "Review of the existing plan, priorities, and overall event direction",
        },
        {
          pt: "Apoio na decisão de fornecedores-chave e afinação estética",
          en: "Support with key supplier decisions and aesthetic refinement",
        },
        {
          pt: "Visita técnica, cronograma, organização do espaço e coordenação operacional do dia (opcional)",
          en: "Site visit, timeline, layout planning, and optional on-the-day coordination",
        },
      ],
    },
    {
      slug: "styling-coordination",
      accent: "accent-noir",
      eyebrow: {
        pt: "Pacote 03",
        en: "Package 03",
      },
      title: {
        pt: "Coordenação do dia",
        en: "On-the-Day Coordination",
      },
      description: {
        pt: "Coordenação do dia para qualquer tipo de celebração já organizada, garantindo ambiente, fluidez e presença no momento certo.",
        en: "On-the-day coordination for already planned celebrations, ensuring the right atmosphere, a smooth flow, and discreet support at the right moments.",
      },
      idealFor: {
        pt: "Ideal para quem procura viver o evento com tranquilidade, sabendo que toda a operação está acompanhada com atenção e discrição.",
        en: "Ideal for those who want to enjoy the event with peace of mind, knowing the full operation is being managed with care and discretion.",
      },
      includes: [
        {
          pt: "Visita técnica e preparação final do cronograma",
          en: "Site visit and final timeline preparation",
        },
        {
          pt: "Ponto de contacto para equipa, fornecedores e logística do evento",
          en: "Main point of contact for the team, suppliers, and event logistics",
        },
        {
          pt: "Coordenação operacional do dia, assegurando fluidez e serenidade",
          en: "On-the-day coordination to ensure a calm and seamless flow",
        },
      ],
    },
  ],
  portfolio: [
    {
      slug: "quinta-da-luz",
      accent: "palette-gold",
      fallbackImage:
        "https://images.unsplash.com/photo-1758810410416-0d4dd2a7a6cc?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      title: {
        pt: "Quinta da Luz",
        en: "Quinta da Luz",
      },
      summary: {
        pt: "Uma cerimónia ao ar livre com flores soltas, luz suave e um ambiente sereno.",
        en: "An outdoor ceremony with loose florals, soft light, and a calm atmosphere.",
      },
      story: {
        pt: "Projeto editorial pensado para um casal que queria um cenário romântico, fluido e naturalmente elegante, com a cerimónia como centro visual do dia.",
        en: "An editorial concept designed for a couple who wanted a romantic, fluid, and naturally elegant setting, with the ceremony as the visual center of the day.",
      },
      location: {
        pt: "Sintra, Portugal",
        en: "Sintra, Portugal",
      },
      guestCount: "80",
      eventType: {
        pt: "Casamento",
        en: "Wedding",
      },
      highlights: [
        {
          pt: "Cerimónia exterior com arco floral delicado",
          en: "Outdoor ceremony with a delicate floral arch",
        },
        {
          pt: "Paleta clara e luz suave ao fim da tarde",
          en: "Light palette and soft late-afternoon light",
        },
        {
          pt: "Ambiente desenhado para um dia leve e sem excesso",
          en: "An atmosphere shaped for a day that feels light and unforced",
        },
      ],
    },
    {
      slug: "dinner-under-olive-trees",
      accent: "palette-sage",
      fallbackImage:
        "https://images.unsplash.com/photo-1773005695300-14b62bc85ba0?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      title: {
        pt: "Jantar de casamento à luz das velas",
        en: "Candlelit Wedding Dinner",
      },
      summary: {
        pt: "Um jantar de casamento à luz das velas, pensado para conversas demoradas e um ambiente envolvente.",
        en: "A candlelit wedding dinner designed for long conversations and an enveloping atmosphere.",
      },
      story: {
        pt: "Conceito editorial para uma receção de casamento com flores texturadas, velas e uma mesa longa desenhada para parecer íntima e sofisticada.",
        en: "An editorial concept for a wedding reception with textured florals, candlelight, and a long table designed to feel intimate and refined.",
      },
      location: {
        pt: "Comporta, Portugal",
        en: "Comporta, Portugal",
      },
      guestCount: "24",
      eventType: {
        pt: "Receção de casamento",
        en: "Wedding reception",
      },
      highlights: [
        {
          pt: "Mesa longa com flores, velas e detalhe delicado",
          en: "A long table with florals, candlelight, and delicate detail",
        },
        {
          pt: "Composição pensada para uma receção íntima e elegante",
          en: "A composition shaped for an intimate and elegant reception",
        },
        {
          pt: "Atmosfera calorosa com linguagem visual editorial",
          en: "A warm atmosphere with an editorial visual language",
        },
      ],
    },
    {
      slug: "sunset-welcome-dinner",
      accent: "palette-blush",
      fallbackImage:
        "https://images.unsplash.com/photo-1763140615918-a4af28eb6a71?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      title: {
        pt: "Jantar de boas-vindas ao pôr do sol",
        en: "Sunset Welcome Dinner",
      },
      summary: {
        pt: "Um momento íntimo de casal, captado com suavidade e um tom profundamente romântico.",
        en: "An intimate couple moment captured with softness and a deeply romantic tone.",
      },
      story: {
        pt: "Uma referência visual para casamentos com direção delicada, onde a fotografia do casal vive em diálogo com a direção estética, a luz e a emoção do dia.",
        en: "A visual reference for weddings led with delicacy, where couple photography sits in dialogue with styling, light, and the emotion of the day.",
      },
      location: {
        pt: "Ericeira, Portugal",
        en: "Ericeira, Portugal",
      },
      guestCount: "18",
      eventType: {
        pt: "Retrato de casamento",
        en: "Wedding portrait",
      },
      highlights: [
        {
          pt: "Retrato editorial com enquadramento suave",
          en: "Editorial portraiture with soft framing",
        },
        {
          pt: "Linguagem visual romântica e contemporânea",
          en: "A romantic and contemporary visual language",
        },
        {
          pt: "Atmosfera emocional sem excesso visual",
          en: "An emotional atmosphere without visual excess",
        },
      ],
    },
  ],
  venues: [
    {
      slug: "palacio-do-vale",
      accent: "palette-gold",
      fallbackImage:
        "https://images.unsplash.com/photo-1768594266667-50aaa727ebf5?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      name: "Palácio do Vale",
      region: {
        pt: "Centro de Portugal",
        en: "Central Portugal",
      },
      style: {
        pt: "Solar histórico com jardins formais",
        en: "Historic estate with formal gardens",
      },
      capacity: "Até 120 convidados",
      description: {
        pt: "Uma opção elegante para casamentos com forte componente editorial, boa circulação entre cerimónia, cocktail e jantar.",
        en: "An elegant option for weddings with a strong editorial feel and good flow between ceremony, cocktail hour, and dinner.",
      },
      bestFor: {
        pt: "Casamentos clássicos com jantar exterior e desenho de produção sofisticado.",
        en: "Classic weddings with outdoor dining and a refined production language.",
      },
      notes: [
        {
          pt: "Luz muito favorável ao final do dia",
          en: "Excellent late-afternoon light",
        },
        {
          pt: "Bom equilíbrio entre arquitectura e natureza",
          en: "Strong balance between architecture and landscape",
        },
        {
          pt: "Adequado para cerimónia, cocktail e jantar no mesmo local",
          en: "Suitable for ceremony, cocktail, and dinner on-site",
        },
      ],
    },
    {
      slug: "quinta-das-figueiras",
      accent: "palette-sage",
      fallbackImage:
        "https://images.unsplash.com/photo-1769230369906-74309b25d113?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      name: "Quinta das Figueiras",
      region: {
        pt: "Alentejo",
        en: "Alentejo",
      },
      style: {
        pt: "Quinta rústica contemporânea",
        en: "Contemporary rustic estate",
      },
      capacity: "Até 90 convidados",
      description: {
        pt: "Espaço com caráter descontraído e elegante, ideal para longos jantares e celebrações intimistas.",
        en: "A relaxed yet elegant venue, ideal for long dinners and intimate celebrations.",
      },
      bestFor: {
        pt: "Casamentos pequenos, jantares de celebração e eventos privados com ambiente natural.",
        en: "Smaller weddings, celebration dinners, and private events with a natural atmosphere.",
      },
      notes: [
        {
          pt: "Paisagem envolvente muito forte",
          en: "Strong surrounding landscape",
        },
        {
          pt: "Excelente para mesas longas no exterior",
          en: "Excellent for long outdoor tables",
        },
        {
          pt: "Ideal para uma narrativa visual mediterrânica",
          en: "Ideal for a Mediterranean visual story",
        },
      ],
    },
    {
      slug: "casa-marinha",
      accent: "palette-blush",
      fallbackImage:
        "https://images.unsplash.com/photo-1735588170697-3fa2844102ad?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      name: "Casa Marinha",
      region: {
        pt: "Costa Atlântica",
        en: "Atlantic Coast",
      },
      style: {
        pt: "Casa contemporânea junto ao mar",
        en: "Contemporary coastal villa",
      },
      capacity: "Até 40 convidados",
      description: {
        pt: "Uma proposta mais reservada para microcasamentos, almoços especiais e celebrações privadas muito pessoais.",
        en: "A more private setting for micro weddings, intimate lunches, and highly personal celebrations.",
      },
      bestFor: {
        pt: "Eventos pequenos com direção estética apurada e sensação de casa.",
        en: "Small-scale events with strong styling and a sense of home.",
      },
      notes: [
        {
          pt: "Escala ideal para eventos muito íntimos",
          en: "Perfect scale for deeply intimate events",
        },
        {
          pt: "Boa relação entre interiores e terraço",
          en: "Strong connection between interiors and terrace",
        },
        {
          pt: "Excelente para produção minimal mas sofisticada",
          en: "Excellent for minimal yet sophisticated production",
        },
      ],
    },
  ],
  testimonials: [
    {
      couple: "Espaço reservado",
      eventType: {
        pt: "Testemunhos em breve",
        en: "Testimonials coming soon",
      },
      quote: {
        pt: "Esta área está preparada para receber feedback real assim que os primeiros eventos forem publicados.",
        en: "This area is ready to receive real client feedback as soon as the first events are published.",
      },
    },
  ],
};

function mergeWithFallback<T extends object>(fallback: T, input?: Partial<T>) {
  if (!input) {
    return fallback;
  }

  return {
    ...fallback,
    ...input,
  };
}

function mergeCollectionBySlug<T extends { slug: string }>(
  fallback: T[],
  input?: T[],
) {
  if (!input || input.length === 0) {
    return fallback;
  }

  return input.map((item) => {
    const fallbackItem = fallback.find((entry) => entry.slug === item.slug);

    if (!fallbackItem) {
      return item;
    }

    return {
      ...fallbackItem,
      ...item,
    };
  });
}

export const getSiteData = cache(async (): Promise<SiteData> => {
  if (!isSanityConfigured) {
    return fallbackSiteData;
  }

  try {
    const content = await fetchFromSanity<PartialSiteData>(siteDataQuery);

    if (!content) {
      return fallbackSiteData;
    }

    return {
      settings: mergeWithFallback(fallbackSiteData.settings, content.settings),
      services: mergeCollectionBySlug(fallbackSiteData.services, content.services),
      portfolio: mergeCollectionBySlug(
        fallbackSiteData.portfolio,
        content.portfolio,
      ),
      venues: mergeCollectionBySlug(fallbackSiteData.venues, content.venues),
      testimonials:
        content.testimonials && content.testimonials.length > 0
          ? content.testimonials
          : fallbackSiteData.testimonials,
    };
  } catch (error) {
    console.error("Failed to load Sanity content. Falling back to local copy.", error);
    return fallbackSiteData;
  }
});

export function t(value: LocalizedText, locale: "pt" | "en") {
  return value[locale];
}
