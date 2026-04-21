import Link from "next/link";
import type {
  PortfolioItem,
  ServicePackage,
  SiteData,
  VenueItem,
} from "@/lib/content";
import { t } from "@/lib/content";
import { getRoutePath, type Locale } from "@/lib/i18n";
import { getSanityImageUrl } from "@/lib/sanity/config";
import { ContactForm } from "@/components/contact-form";
import { HomeHeroSlideshow } from "@/components/home-hero-slideshow";

const editorialWeddingImages = {
  about: "/editorial/9ac2d7c6-f57d-4133-aecc-2529a0f2a980.jpeg",
  contact: "/editorial/contact-enquiry-table.jpg",
  homeGallery: [
    "/editorial/home-gallery-music.jpg",
    "/editorial/home-gallery-seating-plan.jpg",
    "/editorial/home-gallery-cocktail.jpg",
    "/editorial/home-gallery-dance.jpg",
  ],
  homePhilosophy: "/editorial/home-philosophy-altar.jpg",
  homeSlideshow: [
    "https://images.unsplash.com/photo-1763140615918-a4af28eb6a71?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    "/editorial/Annie-e-Luiz-1298-scaled.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Casa_de_Mateus_%2848504881532%29.jpg/3840px-Casa_de_Mateus_%2848504881532%29.jpg",
    "/editorial/home-slideshow-678.jpg",
    "https://fzakyfrczlpejyvjjblm.supabase.co/storage/v1/object/public/portfolio1/images-ready-31-03/loc-alentejo-herdade-estate.webp",
    "/editorial/morazzo-algarve-beach.jpg",
    "/editorial/noivos-beijando-se-nas-vinhas-com-vista-maravilhosa-para-o-rio-douro.jpg",
  ],
  servicesTop:
    "https://images.unsplash.com/photo-1750683556183-9e26ad49f6c5?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
  venuesHero:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Casa_de_Mateus_%2848504881532%29.jpg/3840px-Casa_de_Mateus_%2848504881532%29.jpg",
  venueRegions: {
    algarve:
      "https://fzakyfrczlpejyvjjblm.supabase.co/storage/v1/object/public/portfolio1/images-ready-31-03/loc-algarve-west-limestone-arch.webp",
    alentejo:
      "https://fzakyfrczlpejyvjjblm.supabase.co/storage/v1/object/public/portfolio1/images-ready-31-03/loc-alentejo-herdade-estate.webp",
    cascais:
      "https://fzakyfrczlpejyvjjblm.supabase.co/storage/v1/object/public/portfolio1/images-ready-31-03/loc-cascais-santa-marta-lighthouse.webp",
    comporta:
      "https://fzakyfrczlpejyvjjblm.supabase.co/storage/v1/object/public/portfolio1/images-ready-31-03/loc-comporta-beach-dunes.webp",
    douro:
      "https://fzakyfrczlpejyvjjblm.supabase.co/storage/v1/object/public/portfolio1/images-ready-31-03/loc-douro-valley-terraces-autumn.webp",
    lisbon:
      "https://fzakyfrczlpejyvjjblm.supabase.co/storage/v1/object/public/portfolio1/images-ready-31-03/loc-lisbon-panoramic-golden-hour.webp",
    porto:
      "https://fzakyfrczlpejyvjjblm.supabase.co/storage/v1/object/public/portfolio1/images-ready-31-03/loc-porto-ribeira-golden-hour.webp",
    sintra:
      "https://fzakyfrczlpejyvjjblm.supabase.co/storage/v1/object/public/portfolio1/images-ready-31-03/loc-sintra-monserrate-palace.webp",
  },
};

type LocalizedCopy = Record<Locale, string>;

type VenueReason = {
  accent: string;
  eyebrow: LocalizedCopy;
  title: LocalizedCopy;
  description: LocalizedCopy;
};

type VenueRegionGuide = {
  accent: string;
  fallbackImage: string;
  eyebrow: LocalizedCopy;
  title: LocalizedCopy;
  summary: LocalizedCopy;
  description: LocalizedCopy;
  note: LocalizedCopy;
};

type VenueSelectionFactor = {
  title: LocalizedCopy;
  description: LocalizedCopy;
};

type VenueSeasonWindow = {
  accent: string;
  eyebrow: LocalizedCopy;
  title: LocalizedCopy;
  description: LocalizedCopy;
  note: LocalizedCopy;
};

type VenueSeasonMatrixRow = {
  title: LocalizedCopy;
  spring: boolean;
  summer: boolean;
  autumn: boolean;
  winter: boolean;
};

const venueReasons: VenueReason[] = [
  {
    accent: "palette-gold",
    eyebrow: {
      pt: "Luz e clima",
      en: "Light and climate",
    },
    title: {
      pt: "Luz bonita, dias longos e margem para desenhar melhor o ritmo do casamento.",
      en: "Beautiful light, longer days, and more room to shape the rhythm of the celebration.",
    },
    description: {
      pt: "Grande parte do país permite cerimónias, cocktails e jantares no exterior durante uma janela ampla do ano, com uma luz muito forte para fotografia e para um ambiente mais calmo ao fim da tarde.",
      en: "Much of the country supports outdoor ceremonies, cocktails, and dinners through a broad part of the year, with excellent light for photography and a calmer late-afternoon atmosphere.",
    },
  },
  {
    accent: "palette-sage",
    eyebrow: {
      pt: "Variedade de cenários",
      en: "Variety of settings",
    },
    title: {
      pt: "Há costa, cidade, vinha, serra e campo sem perder coerência estética no país.",
      en: "You can move between coast, city, vineyards, hills, and countryside without losing aesthetic coherence.",
    },
    description: {
      pt: "É possível trabalhar palácios, hotéis à beira-mar, quintas históricas, herdades e vinhas de forma muito distinta, o que ajuda a alinhar o lugar com a escala, a linguagem visual e o tom do fim de semana.",
      en: "You can work across palaces, coastal hotels, historic estates, countryside properties, and vineyards in very different ways, which makes it easier to align the place with the scale, visual language, and tone of the wedding weekend.",
    },
  },
  {
    accent: "palette-blush",
    eyebrow: {
      pt: "Experiência dos convidados",
      en: "Guest experience",
    },
    title: {
      pt: "O local deixa de ser só cenário e passa a sustentar a experiência completa do destino.",
      en: "The venue stops being a backdrop and starts carrying the full destination experience.",
    },
    description: {
      pt: "Quando a região certa é bem escolhida, tudo ganha mais fluidez: chegadas simples, melhor oferta hoteleira, deslocações equilibradas e uma sensação de destino que prolonga a celebração para lá do próprio dia.",
      en: "When the right region is chosen, everything gains more flow: simpler arrivals, stronger hotel inventory, balanced transfers, and a destination feeling that extends the celebration beyond the wedding day itself.",
    },
  },
];

const venueRegions: VenueRegionGuide[] = [
  {
    accent: "palette-gold",
    fallbackImage: editorialWeddingImages.venueRegions.cascais,
    eyebrow: {
      pt: "Costa clássica e hotéis junto ao mar",
      en: "Classic coast and hotels by the sea",
    },
    title: {
      pt: "Cascais",
      en: "Cascais",
    },
    summary: {
      pt: "Costa atlântica elegante, hotéis fortes e boa fluidez para um fim de semana junto ao mar.",
      en: "Elegant Atlantic coast, strong hotels, and an easy flow for a wedding weekend by the sea.",
    },
    description: {
      pt: "Uma boa escolha para casais que querem mar, luz atlântica, serviço de hotelaria forte e uma leitura costeira mais polida.",
      en: "A strong choice for couples who want the sea, Atlantic light, strong hotel service, and a more polished coastal feeling.",
    },
    note: {
      pt: "Resulta muito bem em destination weddings elegantes com welcome drinks e brunch no dia seguinte.",
      en: "It works especially well for elegant destination weddings with welcome drinks and a next-day brunch.",
    },
  },
  {
    accent: "palette-gold",
    fallbackImage: editorialWeddingImages.venueRegions.porto,
    eyebrow: {
      pt: "Cidade granítica, rio e património",
      en: "Granite city, river, and heritage",
    },
    title: {
      pt: "Porto",
      en: "Porto",
    },
    summary: {
      pt: "Cidade histórica com rio, gastronomia forte e uma atmosfera urbana cheia de carácter.",
      en: "A historic riverside city with strong gastronomy and an urban atmosphere full of character.",
    },
    description: {
      pt: "Uma direção forte para casamentos com arquitetura histórica, peso gastronómico, hotéis urbanos e uma cidade que participa visualmente na celebração.",
      en: "A strong direction for weddings with historic architecture, strong gastronomy, urban hotels, and a city that participates visually in the celebration.",
    },
    note: {
      pt: "Boa escolha para programas entre cidade, caves, rio e diferentes momentos distribuídos ao longo do fim de semana.",
      en: "A strong choice for celebrations spread between the city, cellars, the river, and different moments across the weekend.",
    },
  },
  {
    accent: "palette-sage",
    fallbackImage: editorialWeddingImages.venueRegions.sintra,
    eyebrow: {
      pt: "Palácios, jardins e neblina cénica",
      en: "Palaces, gardens, and cinematic mist",
    },
    title: {
      pt: "Sintra",
      en: "Sintra",
    },
    summary: {
      pt: "Palácios, jardins e floresta para casamentos românticos e mais cinematográficos.",
      en: "Palaces, gardens, and forest scenery for romantic weddings with a more cinematic mood.",
    },
    description: {
      pt: "Ideal para casamentos com atmosfera romântica, vegetação madura, património histórico e uma sensação mais cenográfica desde a chegada.",
      en: "Ideal for romantic weddings shaped by mature greenery, historic heritage, and a more scenographic sense of arrival.",
    },
    note: {
      pt: "Faz muito sentido para celebrações mais editoriais, com cerimónia exterior e jantar num enquadramento mais dramático.",
      en: "A strong fit for more editorial celebrations with an outdoor ceremony and a more dramatic dinner setting.",
    },
  },
  {
    accent: "palette-gold",
    fallbackImage: editorialWeddingImages.venueRegions.comporta,
    eyebrow: {
      pt: "Dunas, pinhal e luxo discreto",
      en: "Dunes, pine groves, and understated luxury",
    },
    title: {
      pt: "Comporta",
      en: "Comporta",
    },
    summary: {
      pt: "Dunas, pinhal e luxo discreto para celebrações leves, naturais e sofisticadas.",
      en: "Dunes, pine groves, and understated luxury for celebrations that feel light, natural, and refined.",
    },
    description: {
      pt: "Uma região interessante para casamentos com linguagem mais descontraída, produção sofisticada e uma relação muito forte com a natureza.",
      en: "An appealing region for weddings with a more relaxed language, refined production, and a very strong relationship with nature.",
    },
    note: {
      pt: "Combina bem com celebrações pequenas a médias, pôr do sol forte e uma estética contemporânea com textura natural.",
      en: "A strong fit for small to medium celebrations, strong sunset atmosphere, and a contemporary aesthetic with natural texture.",
    },
  },
  {
    accent: "palette-sage",
    fallbackImage: editorialWeddingImages.venueRegions.algarve,
    eyebrow: {
      pt: "Falésias, mar e longos dias no exterior",
      en: "Cliffs, sea, and long outdoor days",
    },
    title: {
      pt: "Algarve",
      en: "Algarve",
    },
    summary: {
      pt: "Falésias, mar aberto e hotéis preparados para vários dias de celebração.",
      en: "Cliffs, open sea, and hotels well suited to multi-day celebrations.",
    },
    description: {
      pt: "A região funciona muito bem para destination weddings com vários dias, luz muito aberta, hotéis fortes e um tom mais solar.",
      en: "The region works especially well for multi-day destination weddings, wide open light, strong hotel infrastructure, and a sunnier tone.",
    },
    note: {
      pt: "Muito interessante para programas alargados, cerimónias junto ao mar e celebrações com forte relação com exterior.",
      en: "Especially compelling for longer programs, ceremonies by the sea, and celebrations with a strong connection to outdoor living.",
    },
  },
  {
    accent: "palette-blush",
    fallbackImage: editorialWeddingImages.venueRegions.lisbon,
    eyebrow: {
      pt: "Capital histórica e chegada simples",
      en: "Historic capital and easy arrivals",
    },
    title: {
      pt: "Lisboa",
      en: "Lisbon",
    },
    summary: {
      pt: "Capital histórica com hotéis fortes, acessos simples e uma energia mais cosmopolita.",
      en: "A historic capital with strong hotels, easy access, and a more cosmopolitan rhythm.",
    },
    description: {
      pt: "Boa direção para casamentos com hotéis fortes, vista de cidade, património urbano e um ritmo mais cosmopolita sem perder elegância.",
      en: "A strong direction for weddings with excellent hotels, city views, urban heritage, and a more cosmopolitan rhythm without losing elegance.",
    },
    note: {
      pt: "Funciona muito bem para convidados internacionais e programas repartidos por vários pontos da cidade.",
      en: "Especially strong for international guests and celebrations spread across several points in the city.",
    },
  },
  {
    accent: "palette-sage",
    fallbackImage: editorialWeddingImages.venueRegions.douro,
    eyebrow: {
      pt: "Vinhas em socalcos e vistas cinematográficas",
      en: "Terraced vineyards and cinematic views",
    },
    title: {
      pt: "Douro",
      en: "Douro",
    },
    summary: {
      pt: "Vinhas e rio como pano de fundo para uma experiência de destino mais marcada.",
      en: "Vineyards and river views as the backdrop for a more defined destination experience.",
    },
    description: {
      pt: "Perfeito para casamentos onde a paisagem é protagonista, com vinhas, curvas do rio e uma sensação de viagem mais marcada.",
      en: "Perfect for weddings where the landscape is the protagonist, with vineyards, river curves, and a stronger sense of travel.",
    },
    note: {
      pt: "Resulta especialmente bem em fins de semana de casamento com jantar de destino e narrativa mais cinematográfica.",
      en: "It performs especially well for destination wedding weekends with a more cinematic dinner narrative.",
    },
  },
  {
    accent: "palette-blush",
    fallbackImage: editorialWeddingImages.venueRegions.alentejo,
    eyebrow: {
      pt: "Paisagem aberta e ritmo lento",
      en: "Open landscapes and a slower rhythm",
    },
    title: {
      pt: "Alentejo",
      en: "Alentejo",
    },
    summary: {
      pt: "Paisagem aberta, ritmo lento e mesas longas num ambiente quente e intimista.",
      en: "Open landscapes, a slower rhythm, and long tables in a warm and intimate setting.",
    },
    description: {
      pt: "Perfeito para celebrações mais intimistas, mesas longas no exterior e uma estética orgânica, quente e descontraída sem perder sofisticação.",
      en: "Perfect for more intimate celebrations, long outdoor tables, and an organic, warm, and relaxed aesthetic without losing sophistication.",
    },
    note: {
      pt: "Resulta muito bem em casamentos com foco na comida, no convívio e numa experiência de fim de semana mais lenta.",
      en: "It works especially well for weddings centered on food, conversation, and a slower full-weekend experience.",
    },
  },
];

const venueSelectionFactors: VenueSelectionFactor[] = [
  {
    title: {
      pt: "Quem são os convidados e como chegam",
      en: "Who the guests are and how they arrive",
    },
    description: {
      pt: "Se muitos convidados vêm do estrangeiro, regiões com acesso simples e boa oferta hoteleira tendem a funcionar melhor. Em grupos mais pequenos, zonas mais reservadas tornam-se mais viáveis.",
      en: "If many guests are travelling from abroad, regions with straightforward access and strong hotel inventory usually work best. For smaller groups, quieter areas become more viable.",
    },
  },
  {
    title: {
      pt: "A escala da celebração",
      en: "The scale of the celebration",
    },
    description: {
      pt: "Nem todas as regiões servem o mesmo número de convidados com a mesma facilidade. Um casamento de 30 pessoas pede escolhas diferentes de um fim de semana com 120.",
      en: "Not every region serves the same guest count equally well. A 30-person wedding calls for different decisions than a full weekend for 120 guests.",
    },
  },
  {
    title: {
      pt: "A linguagem visual que procuras",
      en: "The visual language you want",
    },
    description: {
      pt: "Sintra, litoral, Alentejo ou cidade contam histórias muito diferentes. A região certa ajuda a alinhar arquitetura, paisagem, ambiente e fotografia logo desde o início.",
      en: "Sintra, the coast, Alentejo, or a city setting each tell a different story. The right region helps align architecture, landscape, styling, and photography from the start.",
    },
  },
  {
    title: {
      pt: "O ritmo do fim de semana",
      en: "The rhythm of the weekend",
    },
    description: {
      pt: "Quando existem jantar de boas-vindas, almoço do dia seguinte ou vários momentos, a escolha da região deve apoiar deslocações curtas, boa experiência de estadia e uma sequência natural entre eventos.",
      en: "When the celebration includes a welcome dinner, brunch, or several moments, the region should support short transfers, a comfortable stay, and a natural flow between events.",
    },
  },
];

const venueSeasonWindows: VenueSeasonWindow[] = [
  {
    accent: "palette-gold",
    eyebrow: {
      pt: "Abril - junho",
      en: "April - June",
    },
    title: {
      pt: "Primavera luminosa e equilibrada",
      en: "Bright and balanced spring",
    },
    description: {
      pt: "É uma das alturas mais seguras para jardins, cerimónias exteriores e programas mais extensos ao longo do dia, com paisagem ainda verde e temperaturas mais estáveis.",
      en: "This is one of the strongest periods for gardens, outdoor ceremonies, and longer celebration schedules, with greener landscapes and more stable temperatures.",
    },
    note: {
      pt: "Boa opção para casamentos com muitos momentos no exterior e convidados internacionais.",
      en: "A strong option for weddings with multiple outdoor moments and international guests.",
    },
  },
  {
    accent: "palette-blush",
    eyebrow: {
      pt: "Julho - agosto",
      en: "July - August",
    },
    title: {
      pt: "Luz intensa e cerimónias mais tardias",
      en: "Stronger light and later ceremonies",
    },
    description: {
      pt: "Funciona muito bem em zonas costeiras e propriedades preparadas para calor, desde que o cronograma proteja os convidados com sombra, água e uma cerimónia mais perto do fim da tarde.",
      en: "It works especially well in coastal areas and properties that handle heat well, as long as the schedule protects guests with shade, water, and a later ceremony time.",
    },
    note: {
      pt: "Pede mais atenção a conforto térmico, logística de montagem e timing de fotografia.",
      en: "It requires closer attention to thermal comfort, setup logistics, and photography timing.",
    },
  },
  {
    accent: "palette-sage",
    eyebrow: {
      pt: "Setembro - outubro",
      en: "September - October",
    },
    title: {
      pt: "Uma das melhores janelas para destination weddings",
      en: "One of the best windows for destination weddings",
    },
    description: {
      pt: "Continua a existir boa luz, o mar ainda está mais apelativo e o ambiente geral tende a ser mais suave. É uma época muito forte para fins de semana de casamento em Portugal.",
      en: "The light remains strong, the sea is often more inviting, and the overall atmosphere is softer. It is a particularly strong period for wedding weekends in Portugal.",
    },
    note: {
      pt: "Excelente equilíbrio entre clima, estética da paisagem e conforto dos convidados.",
      en: "Excellent balance between weather, landscape aesthetics, and guest comfort.",
    },
  },
  {
    accent: "palette-gold",
    eyebrow: {
      pt: "Novembro - março",
      en: "November - March",
    },
    title: {
      pt: "Celebrações mais intimistas e híbridas",
      en: "More intimate and hybrid celebrations",
    },
    description: {
      pt: "Faz mais sentido para produções menores, espaços com interiores fortes e programas que combinem momentos dentro e fora sem depender totalmente do exterior.",
      en: "This period makes more sense for smaller productions, venues with strong interiors, and schedules that can combine indoor and outdoor moments without depending entirely on open air.",
    },
    note: {
      pt: "Época indicada para casamentos com linguagem mais privada, urbana ou histórica.",
      en: "Well suited to weddings with a more private, urban, or historic character.",
    },
  },
];

const venueSeasonMatrix: VenueSeasonMatrixRow[] = [
  {
    title: {
      pt: "Cascais",
      en: "Cascais",
    },
    spring: true,
    summer: true,
    autumn: true,
    winter: true,
  },
  {
    title: {
      pt: "Lisboa",
      en: "Lisbon",
    },
    spring: true,
    summer: true,
    autumn: true,
    winter: true,
  },
  {
    title: {
      pt: "Sintra",
      en: "Sintra",
    },
    spring: true,
    summer: false,
    autumn: true,
    winter: false,
  },
  {
    title: {
      pt: "Comporta",
      en: "Comporta",
    },
    spring: true,
    summer: true,
    autumn: true,
    winter: false,
  },
  {
    title: {
      pt: "Algarve",
      en: "Algarve",
    },
    spring: true,
    summer: true,
    autumn: true,
    winter: false,
  },
  {
    title: {
      pt: "Porto",
      en: "Porto",
    },
    spring: true,
    summer: true,
    autumn: true,
    winter: false,
  },
  {
    title: {
      pt: "Douro",
      en: "Douro",
    },
    spring: true,
    summer: false,
    autumn: true,
    winter: false,
  },
  {
    title: {
      pt: "Alentejo",
      en: "Alentejo",
    },
    spring: true,
    summer: false,
    autumn: true,
    winter: false,
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="section-copy">{description}</p> : null}
    </div>
  );
}

function EditorialMedia({
  accent,
  image,
  fallbackImage,
  label,
  tall = false,
}: {
  accent: string;
  image?: unknown;
  fallbackImage?: string;
  label: string;
  tall?: boolean;
}) {
  const imageUrl = image ? getSanityImageUrl(image, 1600) : null;
  const imageSource = imageUrl ?? fallbackImage ?? null;

  return (
    <div
      aria-label={label}
      className={`editorial-media ${accent}${tall ? " is-tall" : ""}`}
    >
      {imageSource ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          aria-hidden="true"
          className="editorial-media-image"
          loading="lazy"
          src={imageSource}
        />
      ) : null}
    </div>
  );
}

function ServiceCard({
  locale,
  service,
}: {
  locale: Locale;
  service: ServicePackage;
}) {
  return (
    <article className={`service-card ${service.accent}`}>
      <p className="eyebrow">{t(service.eyebrow, locale)}</p>
      <h3>{t(service.title, locale)}</h3>
      <p>{t(service.description, locale)}</p>
      <p className="card-note">{t(service.idealFor, locale)}</p>
      <ul className="feature-list">
        {service.includes.map((item) => (
          <li key={`${service.slug}-${item.pt}`}>{t(item, locale)}</li>
        ))}
      </ul>
    </article>
  );
}

function PortfolioCard({
  locale,
  item,
}: {
  locale: Locale;
  item: PortfolioItem;
}) {
  return (
    <article className="showcase-card">
      <EditorialMedia
        accent={item.accent}
        image={item.gallery?.[0]}
        fallbackImage={item.fallbackImage}
        label={t(item.eventType, locale)}
      />
      <div className="showcase-copy">
        <p className="eyebrow">{t(item.location, locale)}</p>
        <h3>{t(item.title, locale)}</h3>
        <p>{t(item.summary, locale)}</p>
        <div className="meta-row">
          <span>{item.guestCount}</span>
          <span>{t(item.eventType, locale)}</span>
        </div>
        <Link href={getRoutePath(locale, "portfolio", item.slug)}>
          {locale === "pt" ? "Ver projeto" : "View project"}
        </Link>
      </div>
    </article>
  );
}

function VenueReasonCard({
  locale,
  reason,
}: {
  locale: Locale;
  reason: VenueReason;
}) {
  return (
    <article className="venue-reason-card">
      <p className="eyebrow">{t(reason.eyebrow, locale)}</p>
      <h3>{t(reason.title, locale)}</h3>
      <p>{t(reason.description, locale)}</p>
    </article>
  );
}

function VenueRegionCard({
  locale,
  region,
}: {
  locale: Locale;
  region: VenueRegionGuide;
}) {
  return (
    <details className={`venue-region-item ${region.accent}`}>
      <summary className="venue-region-toggle">
        <EditorialMedia
          accent={region.accent}
          fallbackImage={region.fallbackImage}
          label={t(region.title, locale)}
        />
        <div className="venue-region-toggle-copy">
          <h3>{t(region.title, locale)}</h3>
        </div>
        <span aria-hidden="true" className="venue-region-plus">
          +
        </span>
      </summary>
      <div className="venue-region-panel">
        <p className="venue-region-summary">{t(region.summary, locale)}</p>
      </div>
    </details>
  );
}

function VenueGuideItem({
  index,
  locale,
  factor,
}: {
  index: number;
  locale: Locale;
  factor: VenueSelectionFactor;
}) {
  return (
    <article className="venue-guide-item">
      <span className="venue-guide-index">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h3>{t(factor.title, locale)}</h3>
        <p>{t(factor.description, locale)}</p>
      </div>
    </article>
  );
}

function VenueSeasonCard({
  locale,
  item,
}: {
  locale: Locale;
  item: VenueSeasonWindow;
}) {
  return (
    <article className="season-card">
      <p className="eyebrow">{t(item.eyebrow, locale)}</p>
      <h3>{t(item.title, locale)}</h3>
      <p className="card-note">{t(item.note, locale)}</p>
    </article>
  );
}

function HomeEditorialGallery({
  locale,
}: {
  locale: Locale;
}) {
  const copy =
    locale === "pt"
      ? {
          eyebrow: "",
          title: "Casamentos com elegância, detalhe e atmosfera.",
          description: "",
          notes: ["Cerimónia", "Receção", "Lugar", "Atmosfera"],
        }
      : {
          eyebrow: "",
          title: "Weddings with elegance, detail, and atmosphere.",
          description: "",
          notes: ["Ceremony", "Reception", "Place", "Atmosphere"],
        };

  const imageBlocks = [
    {
      accent: "palette-gold",
      fallbackImage: editorialWeddingImages.homeGallery[0],
      label: copy.notes[0],
    },
    {
      accent: "palette-blush",
      fallbackImage: editorialWeddingImages.homeGallery[1],
      label: copy.notes[2],
    },
    {
      accent: "palette-sage",
      fallbackImage: editorialWeddingImages.homeGallery[2],
      label: copy.notes[1],
    },
    {
      accent: "palette-gold",
      fallbackImage: editorialWeddingImages.homeGallery[3],
      label: copy.notes[3],
    },
  ];

  return (
    <section className="section-shell section">
      <div className="gallery-intro">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
      </div>

      <div className="home-gallery-grid">
        {imageBlocks.map((block, index) => (
          <EditorialMedia
            accent={block.accent}
            fallbackImage={block.fallbackImage}
            image={block.image}
            key={`${block.label}-${index}`}
            label={block.label}
            tall={block.tall}
          />
        ))}
      </div>
    </section>
  );
}

export function HomePage({
  locale,
  data,
}: {
  locale: Locale;
  data: SiteData;
}) {
  const copy =
    locale === "pt"
      ? {
          eyebrow: "",
          title: "Momentos para a vida.",
          intro: "",
          primaryCta: "Descobrir serviços",
          secondaryCta: "Marcar o evento",
          philosophy: "Filosofia",
          philosophyTitle: "Um planeamento romântico, sereno e pensado ao detalhe.",
          philosophyBody:
            "Mais do que organizar um dia especial, a proposta é criar uma atmosfera bonita, harmoniosa e verdadeiramente memorável — sem excessos, sem pressa, com espaço para viver cada momento.",
          philosophyParagraphs: [
            "A MM Eventos nasce de uma vontade simples: tornar todo o processo mais tranquilo, leve e bem conduzido. Cada casamento e cada evento é acompanhado de forma próxima e personalizada, com elegância, sensibilidade e atenção ao que realmente importa.",
            "O acompanhamento pode começar muito antes do grande dia, através de uma organização completa, cuidada em cada detalhe, ou acontecer apenas no próprio dia, assegurando que tudo decorre com serenidade, fluidez e discrição. Em qualquer formato, o objetivo é o mesmo: permitir que os noivos vivam o momento com confiança e tranquilidade.",
          ],
        }
      : {
          eyebrow: "",
          title: "Moments for a lifetime.",
          intro: "",
          primaryCta: "Discover services",
          secondaryCta: "Book the event",
          philosophy: "Philosophy",
          philosophyTitle: "Romantic, serene planning with every detail considered.",
          philosophyBody:
            "More than organising a special day, the proposal is to create a beautiful, harmonious, and truly memorable atmosphere — without excess, without haste, with room to live each moment.",
          philosophyParagraphs: [
            "MM Eventos was born from a simple wish: to make the whole process more peaceful, light, and well guided. Every wedding and every event is followed closely and personally, with elegance, sensitivity, and attention to what truly matters.",
            "The support can begin long before the big day, through a complete organisation carefully shaped in every detail, or happen only on the day itself, ensuring everything unfolds with serenity, flow, and discretion. In any format, the goal is the same: to allow the couple to live the moment with confidence and peace of mind.",
          ],
        };
  const heroSlides = editorialWeddingImages.homeSlideshow.map((src) => ({
    src,
  }));

  return (
    <>
      <section className="hero-section">
        <div className="hero-stage">
          <HomeHeroSlideshow slides={heroSlides} />

          <div className="hero-stage-overlay">
            <div className="section-shell hero-stage-shell">
              <div className="hero-stage-copy">
                {copy.eyebrow ? <p className="eyebrow">{copy.eyebrow}</p> : null}
                <h1>{copy.title}</h1>
                {copy.intro ? <p className="lead">{copy.intro}</p> : null}

                <div className="button-row">
                  <Link
                    className="button button-primary"
                    href={getRoutePath(locale, "services")}
                  >
                    {copy.primaryCta}
                  </Link>
                  <Link
                    className="button button-secondary"
                    href={getRoutePath(locale, "contact")}
                  >
                    {copy.secondaryCta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeEditorialGallery
        locale={locale}
      />

      <section className="section-shell section home-philosophy">
        <div className="philosophy-copy">
          <SectionHeading
            eyebrow={copy.philosophy}
            title={copy.philosophyTitle}
            description={copy.philosophyBody}
          />
          {copy.philosophyParagraphs.map((paragraph) => (
            <p className="section-copy" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="philosophy-image-stack">
          <EditorialMedia
            accent="palette-blush"
            fallbackImage={editorialWeddingImages.homePhilosophy}
            label=""
            tall
          />
        </div>
      </section>
    </>
  );
}

export function AboutPage({
  locale,
  data,
}: {
  locale: Locale;
  data: SiteData;
}) {
  const copy =
    locale === "pt"
      ? {
          eyebrow: "Sobre",
          title: "Planeamento sereno, elegante e próximo.",
          intro: "",
          photoLabel: "Imagem editorial de casamento",
          storyPrelude: [
            "Chamo-me Maria.",
            "Tenho uma paixão genuína pela indústria dos eventos e por tudo o que ela representa: detalhe, emoção, beleza e significado. Sou portuguesa, mas vivi no Reino Unido e na Dinamarca, experiências que alargaram o meu olhar e reforçaram o meu gosto por viajar, descobrir novas culturas, apreciar a gastronomia, estar em família e partilhar tempo de qualidade com amigos.",
            "Para mim, cada evento é único, porque cada pessoa também o é. Acredito que não existem ideias erradas quando são pensadas com intenção, sensibilidade e verdade. Por isso, ofereço um serviço profundamente personalizado, construído com proximidade, escuta e confiança, porque sei que estou a ajudar a dar forma a um dos dias mais especiais da vida de alguém.",
            "Além de casamentos, organizo também batizados, renovações de votos, pedidos de casamento, viagens intimistas e outros momentos especiais. Conto com uma vasta rede de parceiros, que se adapta ao estilo, à dimensão e à essência de cada evento.",
            "Mais do que uma organizadora de eventos, procuro criar experiências totalmente personalizadas, desenhadas à medida de cada cliente e daquilo que o torna único.",
          ],
        }
      : {
          eyebrow: "About",
          title: "Serene, elegant, and personal planning.",
          intro: "",
          photoLabel: "Editorial wedding image",
          storyPrelude: [
            "My name is Maria.",
            "I have a genuine passion for the events industry and for everything it represents: detail, emotion, beauty, and meaning. I am Portuguese, but I lived in the United Kingdom and Denmark, experiences that broadened my perspective and deepened my love for travel, discovering new cultures, enjoying gastronomy, being with family, and sharing quality time with friends.",
            "To me, every event is unique, because every person is unique as well. I believe there are no wrong ideas when they are shaped with intention, sensitivity, and truth. That is why I offer a deeply personal service, built on closeness, listening, and trust, because I know I am helping shape one of the most special days in someone’s life.",
            "Alongside weddings, I also organise baptisms, vow renewals, marriage proposals, intimate trips, and other meaningful moments. I work with a wide network of partners, adapted to the style, scale, and essence of each event.",
            "More than an event planner, I seek to create fully tailored experiences, designed around each client and what makes them unique.",
          ],
        };

  return (
    <section className="section-shell page-shell about-page">
      <div className="about-grid">
        <EditorialMedia
          accent="palette-blush"
          fallbackImage={editorialWeddingImages.about}
          label={copy.photoLabel}
          tall
        />

        <div className="about-copy">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.intro}
          />

          <article className="about-story-card">
            {copy.storyPrelude.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}

export function ServicesPage({
  locale,
  data,
}: {
  locale: Locale;
  data: SiteData;
}) {
  const copy =
    locale === "pt"
      ? {
          eyebrow: "Serviços",
          title: "Três pacotes para responder a diferentes níveis de apoio.",
          intro: "",
          extrasTitle: "Eventos que também entram na mesma estrutura",
          imageLabel: "Imagem panorâmica da página de serviços",
          extras: [
            "Casamentos e microcasamentos",
            "Jantares privados e celebrações familiares",
            "Batizados",
            "Chá de bebé",
            "Renovação de votos",
            "Aniversários",
            "Eventos íntimos",
            "Pedidos de casamento",
            "Outros, porque o céu é o limite",
          ],
        }
      : {
          eyebrow: "Services",
          title: "Three packages designed for different levels of support.",
          intro: "",
          extrasTitle: "Events that also fit within the same structure",
          imageLabel: "Panoramic image for the services page",
          extras: [
            "Weddings and micro weddings",
            "Private dinners and family celebrations",
            "Baptisms",
            "Baby showers",
            "Vow renewals",
            "Birthdays",
            "Intimate events",
            "Marriage proposals",
            "Others, because the sky is the limit",
          ],
        };

  return (
    <>
      <section
        aria-label={copy.imageLabel}
        className="services-top-media-shell"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          className="services-top-media-image"
          loading="lazy"
          src={editorialWeddingImages.servicesTop}
        />
      </section>

      <section className="section-shell page-shell services-page">
        <div className="services-intro">
          <div className="services-intro-copy">
            <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
            {copy.intro ? <p className="section-copy">{copy.intro}</p> : null}
          </div>
        </div>

        <div className="service-grid">
          {data.services.map((service) => (
            <ServiceCard key={service.slug} locale={locale} service={service} />
          ))}
        </div>

        <div className="section">
          <SectionHeading
            eyebrow={locale === "pt" ? "Outros eventos personalizados" : "Other bespoke events"}
            title={copy.extrasTitle}
          />
          <div className="chip-row">
            {copy.extras.map((item) => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function PortfolioPage({
  locale,
  data,
}: {
  locale: Locale;
  data: SiteData;
}) {
  return (
    <section className="section-shell page-shell">
      <SectionHeading
        eyebrow={locale === "pt" ? "Portefólio" : "Portfolio"}
        title={
          locale === "pt"
            ? "Uma seleção de atmosferas para comunicar a assinatura do estúdio."
            : "A selection of atmospheres that communicate the studio's signature."
        }
      />
      <div className="showcase-grid">
        {data.portfolio.map((item) => (
          <PortfolioCard key={item.slug} item={item} locale={locale} />
        ))}
      </div>
    </section>
  );
}

export function PortfolioDetailPage({
  locale,
  item,
}: {
  locale: Locale;
  item: PortfolioItem;
}) {
  return (
    <section className="section-shell page-shell detail-page">
      <div className="detail-hero">
        <div>
          <p className="eyebrow">{t(item.location, locale)}</p>
          <h1>{t(item.title, locale)}</h1>
          <p className="lead">{t(item.story, locale)}</p>
        </div>
        <EditorialMedia
          accent={item.accent}
          image={item.gallery?.[0]}
          fallbackImage={item.fallbackImage}
          label={t(item.eventType, locale)}
          tall
        />
      </div>

      <div className="meta-panel">
        <span>{item.guestCount}</span>
        <span>{t(item.eventType, locale)}</span>
      </div>

      <div className="section-split">
        <div className="quote-card">
          <p>{t(item.summary, locale)}</p>
        </div>
        <ul className="feature-list">
          {item.highlights.map((highlight) => (
            <li key={highlight.pt}>{t(highlight, locale)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function VenuesPage({
  locale,
}: {
  locale: Locale;
  data: SiteData;
}) {
  const copy =
    locale === "pt"
      ? {
          eyebrow: "",
          title: "Wedding Regions",
          imageLabel: "Imagem panorâmica da página de locais",
          introLead:
            "Portugal é um dos destinos de casamento mais exclusivos da Europa.",
          introBody: [
            "Entre a luz atlântica, os palácios históricos, as vinhas e a costa deslumbrante, o país oferece cenários de rara beleza aliados a uma hotelaria de excelência.",
            "A poucas horas das principais capitais europeias e com ligações diretas dos EUA, Portugal combina mais de 300 dias de sol por ano, clima ameno e uma época de casamentos que se estende de abril a novembro.",
            "Face a destinos como França ou Itália, oferece um nível excecional de qualidade com melhor relação valor: gastronomia distinta, vinhos de classe mundial, flores magníficas e uma hospitalidade genuína e sofisticada.",
          ],
          introFacts: [
            {
              value: "300+",
              label: "dias de sol por ano",
            },
            {
              value: "Abr - Nov",
              label: "época alargada para casamentos",
            },
            {
              value: "Europa + EUA",
              label: "ligações simples para convidados internacionais",
            },
          ],
          reasonsEyebrow: "Porque Portugal",
          reasonsTitle: "Porque é que Portugal continua a ser uma escolha tão forte para destination weddings.",
          reasonsDescription:
            "O valor do local não está só na imagem. Está também na forma como a região segura a logística, a estadia e a experiência completa dos convidados.",
          selectionEyebrow: "Curadoria do local",
          selectionTitle:
            "Como fechamos a direção certa antes das visitas aos espaços.",
          selectionDescription:
            "A região certa não aparece só pela beleza da fotografia. Ela tem de encaixar no perfil dos convidados, na escala da celebração, na linguagem visual e no desenho do fim de semana.",
          selectionPhotoLabel:
            "Paisagem de apoio à secção de escolha de região",
          timingEyebrow: "Época e ritmo",
          timingTitle:
            "A melhor época depende da região, do calor e do peso do exterior no casamento.",
          timingDescription:
            "A tabela ajuda a perceber rapidamente onde cada região funciona melhor ao longo do ano.",
          timingTableHeaders: {
            region: "Região",
            spring: "Abr - Jun",
            summer: "Jul - Ago",
            autumn: "Set - Out",
            winter: "Nov - Mar",
          },
          timingTableLegend: "● = janela forte",
          consultantsEyebrow: "Shortlist privada",
          consultantsTitle:
            "A shortlist certa começa quando lugar, logística e atmosfera ficam alinhados.",
          consultantsDescription:
            "Se fizer sentido, o próximo passo é montar uma shortlist privada com base em número de convidados, orçamento, deslocações, hotelaria e linguagem visual do casamento.",
          consultantsAction: "Pedir shortlist",
        }
      : {
          eyebrow: "",
          title: "Wedding Regions",
          imageLabel: "Panoramic image for the locations page",
          introLead:
            "Portugal is one of the most exclusive wedding destinations in Europe.",
          introBody: [
            "Between Atlantic light, historic palaces, vineyards, and a dramatic coastline, the country offers rare beauty paired with excellent hospitality.",
            "Only a few hours from Europe’s main capitals and with direct connections from the US, Portugal combines more than 300 days of sunshine a year, mild weather, and a wedding season that runs from April through November.",
            "Compared with destinations such as France or Italy, it offers an exceptional level of quality with stronger value: distinctive gastronomy, world-class wines, beautiful flowers, and hospitality that feels genuine and refined.",
          ],
          introFacts: [
            {
              value: "300+",
              label: "days of sunshine a year",
            },
            {
              value: "Apr - Nov",
              label: "extended wedding season",
            },
            {
              value: "Europe + US",
              label: "easy access for international guests",
            },
          ],
          reasonsEyebrow: "Why Portugal",
          reasonsTitle:
            "Why Portugal remains such a strong choice for destination weddings.",
          reasonsDescription:
            "The value is not only visual. It is also in how the region supports logistics, hospitality, and the full guest experience.",
          selectionEyebrow: "Venue sourcing",
          selectionTitle:
            "How the right direction is set before venue visits begin.",
          selectionDescription:
            "The right region does not come from photography alone. It has to fit the guest profile, celebration scale, visual language, and how the weekend is meant to unfold.",
          selectionPhotoLabel: "Landscape supporting the region selection section",
          timingEyebrow: "Season & rhythm",
          timingTitle:
            "The best season depends on the region, the heat, and how outdoor the wedding needs to feel.",
          timingDescription:
            "The table gives a faster read on where each region performs best through the year.",
          timingTableHeaders: {
            region: "Region",
            spring: "Apr - Jun",
            summer: "Jul - Aug",
            autumn: "Sep - Oct",
            winter: "Nov - Mar",
          },
          timingTableLegend: "● = strong window",
          consultantsEyebrow: "Private shortlist",
          consultantsTitle:
            "The right shortlist starts when place, logistics, and atmosphere line up together.",
          consultantsDescription:
            "If helpful, the next step is building a private shortlist based on guest count, budget, transfers, hotel inventory, and the intended visual language of the wedding.",
          consultantsAction: "Request shortlist",
        };

  return (
    <>
      <section
        aria-label={copy.imageLabel}
        className="venues-top-media-shell"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          className="venues-top-media-image"
          loading="lazy"
          src={editorialWeddingImages.venuesHero}
        />
      </section>

      <section className="section-shell page-shell venues-page">
        <div className="venues-intro" id="venue-regions">
          <div className="venues-intro-copy venues-opening-copy">
            <div className="venues-opening-main">
              <p className="venues-opening-lead">{copy.introLead}</p>
              <div className="venues-opening-body">
                {copy.introBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="venues-opening-facts">
              {copy.introFacts.map((fact) => (
                <article className="venues-opening-fact" key={fact.value}>
                  <span className="venues-opening-fact-value">{fact.value}</span>
                  <p>{fact.label}</p>
                </article>
              ))}
            </div>
          </div>
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
          />
          <div className="venue-region-list">
            {venueRegions.map((region) => (
              <VenueRegionCard
                key={region.title.pt}
                locale={locale}
                region={region}
              />
            ))}
          </div>
        </div>

        <div className="section venues-supporting-copy">
          <div className="venues-reasons">
            {venueReasons.map((reason) => (
              <VenueReasonCard
                key={reason.title.pt}
                locale={locale}
                reason={reason}
              />
            ))}
          </div>
        </div>

        <div className="section">
          <div className="venue-guide-layout">
            <EditorialMedia
              accent="palette-gold"
              fallbackImage={editorialWeddingImages.venueRegions.douro}
              label={copy.selectionPhotoLabel}
            />

            <div className="venue-guide-copy">
              <SectionHeading
                eyebrow={copy.selectionEyebrow}
                title={copy.selectionTitle}
                description={copy.selectionDescription}
              />
              <div className="venue-guide-list">
                {venueSelectionFactors.map((factor, index) => (
                  <VenueGuideItem
                    factor={factor}
                    index={index}
                    key={factor.title.pt}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="section season-section">
          <div className="season-layout">
            <div className="season-copy">
              <SectionHeading
                eyebrow={copy.timingEyebrow}
                title={copy.timingTitle}
                description={copy.timingDescription}
              />
              <div className="season-notes">
                {venueSeasonWindows.map((item) => (
                  <VenueSeasonCard
                    item={item}
                    key={item.title.pt}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
            <div className="season-table-shell">
              <table className="season-table">
                <thead>
                  <tr>
                    <th>{copy.timingTableHeaders.region}</th>
                    <th>{copy.timingTableHeaders.spring}</th>
                    <th>{copy.timingTableHeaders.summer}</th>
                    <th>{copy.timingTableHeaders.autumn}</th>
                    <th>{copy.timingTableHeaders.winter}</th>
                  </tr>
                </thead>
                <tbody>
                  {venueSeasonMatrix.map((row) => (
                    <tr key={row.title.pt}>
                      <td>{t(row.title, locale)}</td>
                      <td>{row.spring ? <span className="season-table-dot" /> : null}</td>
                      <td>{row.summer ? <span className="season-table-dot" /> : null}</td>
                      <td>{row.autumn ? <span className="season-table-dot" /> : null}</td>
                      <td>{row.winter ? <span className="season-table-dot" /> : null}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="season-table-legend">{copy.timingTableLegend}</p>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="venue-consultant-card">
            <div className="venue-consultant-copy">
              <p className="eyebrow">{copy.consultantsEyebrow}</p>
              <h2>{copy.consultantsTitle}</h2>
              <p>{copy.consultantsDescription}</p>
            </div>
            <Link
              className="venue-consultant-link"
              href={getRoutePath(locale, "contact")}
            >
              {copy.consultantsAction}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function VenueDetailPage({
  locale,
  item,
}: {
  locale: Locale;
  item: VenueItem;
}) {
  return (
    <section className="section-shell page-shell detail-page">
      <div className="detail-hero">
        <div>
          <p className="eyebrow">{t(item.region, locale)}</p>
          <h1>{item.name}</h1>
          <p className="lead">{t(item.description, locale)}</p>
        </div>
        <EditorialMedia
          accent={item.accent}
          image={item.gallery?.[0]}
          fallbackImage={item.fallbackImage}
          label={t(item.style, locale)}
          tall
        />
      </div>

      <div className="meta-panel">
        <span>{item.capacity}</span>
        <span>{t(item.style, locale)}</span>
      </div>

      <div className="section-split">
        <div className="quote-card">
          <p>{t(item.bestFor, locale)}</p>
        </div>
        <ul className="feature-list">
          {item.notes.map((note) => (
            <li key={note.pt}>{t(note, locale)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ContactPage({
  locale,
  data,
}: {
  locale: Locale;
  data: SiteData;
}) {
  const copy =
    locale === "pt"
      ? {
          eyebrow: "Pedido de orçamento",
          title: "Pedido de orçamento para casamentos e outros eventos personalizados.",
          detailsTitle: "Contacto direto",
          noteTitle: "O que acontece depois",
          brand: "MM Eventos",
        }
      : {
          eyebrow: "Budget request",
          title: "Budget request for weddings and other bespoke events.",
          detailsTitle: "Direct contact",
          noteTitle: "What happens next",
          brand: "MM Eventos",
        };

  return (
    <section className="section-shell page-shell contact-page">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
      />

      <div className="contact-layout">
        <div className="contact-aside">
          <EditorialMedia
            accent="palette-sage"
            fallbackImage={editorialWeddingImages.contact}
            label=""
            tall
          />

          <aside className="contact-card">
            <p className="eyebrow">{copy.detailsTitle}</p>
            <h3>{copy.brand}</h3>
            <a href={`mailto:${data.settings.contactEmail}`}>
              {data.settings.contactEmail}
            </a>
            <a href={`tel:${data.settings.contactPhone.replace(/\s+/g, "")}`}>
              {data.settings.contactPhone}
            </a>

            <div className="contact-note">
              <p className="eyebrow">{copy.noteTitle}</p>
              <p>{data.settings.responseNote[locale]}</p>
            </div>
          </aside>
        </div>

        <ContactForm locale={locale} />
      </div>
    </section>
  );
}
