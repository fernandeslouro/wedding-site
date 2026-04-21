import { StudioOnboarding } from "@/components/studio-onboarding";
import { isSanityConfigured } from "@/lib/sanity/config";

export default async function StudioPage() {
  if (!isSanityConfigured) {
    return <StudioOnboarding />;
  }

  const [{ NextStudio }, { default: config }] = await Promise.all([
    import("next-sanity/studio"),
    import("../../../../sanity.config"),
  ]);

  return <NextStudio config={config} />;
}
