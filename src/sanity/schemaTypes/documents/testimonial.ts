import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "orderRank",
      title: "Order",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "couple",
      title: "Client Name",
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
      name: "quote",
      title: "Quote",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "couple",
      subtitle: "eventType.pt",
    },
  },
});
