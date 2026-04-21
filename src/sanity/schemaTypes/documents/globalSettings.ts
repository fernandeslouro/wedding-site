import { defineField, defineType } from "sanity";

export const globalSettings = defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "story",
      title: "Story",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "baseLocation",
      title: "Base Location",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "responseNote",
      title: "Response Note",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "servicePitch",
      title: "Service Pitch",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "showInstagram",
      title: "Show Instagram section",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "showTestimonials",
      title: "Show testimonials section",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "brandName",
      subtitle: "contactEmail",
    },
  },
});
