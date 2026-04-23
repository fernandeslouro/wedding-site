import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const CONTACT_EMAIL_TO = "mariamoinhos.eventos@outlook.com";

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phoneCountry: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  eventType: z.string().min(1),
  eventDate: z.string().optional().or(z.literal("")),
  location: z.string().min(2),
  guestCount: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
  message: z.string().min(10),
  company: z.string().optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = inquirySchema.parse(json);
    const formattedPhone = payload.phone
      ? [payload.phoneCountry, payload.phone].filter(Boolean).join(" ")
      : "-";

    if (payload.company) {
      return NextResponse.json({ ok: true, delivery: "log" });
    }

    const from =
      process.env.CONTACT_EMAIL_FROM ??
      "MM Eventos <onboarding@resend.dev>";

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from,
        to: CONTACT_EMAIL_TO,
        replyTo: payload.email,
        subject: `Novo pedido de contacto: ${payload.name}`,
        text: [
          `Nome: ${payload.name}`,
          `Email: ${payload.email}`,
          `Telefone: ${formattedPhone}`,
          `Tipo de evento: ${payload.eventType}`,
          `Data prevista do evento: ${payload.eventDate || "-"}`,
          `Local / região: ${payload.location}`,
          `Convidados: ${payload.guestCount || "-"}`,
          `Orçamento: ${payload.budget || "-"}`,
          "",
          payload.message,
        ].join("\n"),
      });

      return NextResponse.json({ ok: true, delivery: "email" });
    }

    console.info("Contact inquiry received without email delivery:", payload);
    return NextResponse.json({ ok: true, delivery: "log" });
  } catch (error) {
    console.error("Contact form failed:", error);
    return NextResponse.json(
      { ok: false, message: "Unable to process contact request." },
      { status: 400 },
    );
  }
}
