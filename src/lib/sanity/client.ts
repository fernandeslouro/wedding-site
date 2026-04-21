export type SanityImageSource = {
  asset?: {
    _ref?: string;
  };
};

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "pending-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-02-06",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
};

export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET,
);

function parseSanityImageRef(ref: string) {
  const match = /^image-([a-zA-Z0-9_-]+)-(\d+x\d+)-([a-z0-9]+)$/.exec(ref);

  if (!match) {
    return null;
  }

  const [, assetId, dimensions, format] = match;

  return {
    assetId,
    dimensions,
    format,
  };
}

export function getSanityImageUrl(source: unknown, width = 1600) {
  if (!isSanityConfigured || !source || typeof source !== "object") {
    return null;
  }

  const ref = (source as SanityImageSource).asset?._ref;

  if (!ref) {
    return null;
  }

  const parsed = parseSanityImageRef(ref);

  if (!parsed) {
    return null;
  }

  const baseUrl = `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${parsed.assetId}-${parsed.dimensions}.${parsed.format}`;

  return `${baseUrl}?w=${width}&auto=format`;
}

export async function fetchFromSanity<T>(query: string) {
  if (!isSanityConfigured) {
    return null;
  }

  const { createClient } = await import("next-sanity");
  const client = createClient(sanityConfig);

  return client.fetch<T>(query, {}, { next: { revalidate: 60 } });
}
