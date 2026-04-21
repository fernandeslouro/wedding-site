import { defineField, defineType } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  fields: [
    defineField({
      name: "orderRank",
      title: "Order",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.pt",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accent",
      title: "Accent Style",
      type: "string",
      options: {
        list: ["palette-gold", "palette-sage", "palette-blush"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
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
      name: "location",
      title: "Location",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "guestCount",
      title: "Guest Count",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: "title.pt",
      subtitle: "location.pt",
      media: "gallery.0",
    },
  },
});
