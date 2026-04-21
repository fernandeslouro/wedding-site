import { globalSettings } from "./documents/globalSettings";
import { portfolioItem } from "./documents/portfolioItem";
import { servicePackage } from "./documents/servicePackage";
import { testimonial } from "./documents/testimonial";
import { venue } from "./documents/venue";
import { localizedString, localizedText } from "./objects";

export const schemaTypes = [
  localizedString,
  localizedText,
  globalSettings,
  servicePackage,
  portfolioItem,
  venue,
  testimonial,
];
