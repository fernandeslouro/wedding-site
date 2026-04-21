import { defineField, defineType } from "sanity";

export const venue = defineType({
  name: "venue",
  title: "Venue",
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
        source: "name",
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
      name: "name",
      title: "Venue Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bestFor",
      title: "Best For",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Notes",
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
      title: "name",
      subtitle: "region.pt",
      media: "gallery.0",
    },
  },
});
