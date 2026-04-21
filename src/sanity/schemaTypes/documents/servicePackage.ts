import { defineField, defineType } from "sanity";

export const servicePackage = defineType({
  name: "servicePackage",
  title: "Service Package",
  type: "document",
  fields: [
    defineField({
      name: "orderRank",
      title: "Order",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1),
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
        list: ["accent-terracotta", "accent-olive", "accent-noir"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "idealFor",
      title: "Ideal For",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "includes",
      title: "Includes",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: {
    select: {
      title: "title.pt",
      subtitle: "eyebrow.pt",
    },
  },
});
