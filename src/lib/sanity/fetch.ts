import "server-only";

import { isSanityConfigured, sanityConfig } from "@/lib/sanity/config";

export async function fetchFromSanity<T>(query: string) {
  if (!isSanityConfigured) {
    return null;
  }

  const { createClient } = await import("next-sanity");
  const client = createClient(sanityConfig);

  return client.fetch<T>(query, {}, { next: { revalidate: 60 } });
}
