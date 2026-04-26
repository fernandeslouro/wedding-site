"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type SubmissionState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type FieldErrors = {
  message?: string;
};

const copy = {
  pt: {
    heading: "Conta-me a tua ideia",
    submit: "Enviar pedido",
    sending: "A enviar...",
    successEmail:
      "Pedido enviado. Receberás uma resposta inicial assim que a disponibilidade for revista.",
    successLog:
      "Pedido registado. O envio por email ainda não está configurado, por isso esta submissão ficou guardada localmente.",
    error:
      "Não foi possível enviar o formulário. Tenta novamente dentro de momentos.",
    validation: {
      messageMinLength: "A mensagem deve ter pelo menos 10 caracteres.",
    },
    fields: {
      name: "Nome",
      email: "E-mail",
      phone: "Telefone",
      phoneCountry: "Indicativo",
      phoneCountryPlaceholder: "+351",
      phonePlaceholder: "Número de telefone",
      type: "Tipo de evento",
      date: "Data prevista do evento",
      location: "Local / região",
      guests: "Número de convidados",
      budget: "Orçamento aproximado",
      message: "Mensagem",
      optional: "Opcional",
    },
    options: {
      wedding: "Casamento",
      intimate: "Evento íntimo",
      dinner: "Jantar privado",
      baptism: "Batizado",
      proposal: "Pedido de casamento",
      baby: "Chá de bebé",
      other: "Outro",
    },
  },
  en: {
    heading: "Tell me about your celebration",
    submit: "Send enquiry",
    sending: "Sending...",
    successEmail:
      "Your enquiry has been sent. You will receive an initial reply once availability has been reviewed.",
    successLog:
      "Your enquiry has been recorded. Email delivery is not configured yet, so this submission was stored locally in the server logs.",
    error:
      "The form could not be sent. Please try again in a moment.",
    validation: {
      messageMinLength: "Message must be at least 10 characters.",
    },
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      phoneCountry: "Dial code",
      phoneCountryPlaceholder: "+351",
      phonePlaceholder: "Phone number",
      type: "Event type",
      date: "Preferred date",
      location: "Venue / region",
      guests: "Guest count",
      budget: "Approximate budget",
      message: "Message",
      optional: "Optional",
    },
    options: {
      wedding: "Wedding",
      intimate: "Intimate event",
      dinner: "Private dinner",
      baptism: "Baptism",
      proposal: "Marriage proposal",
      baby: "Baby shower",
      other: "Other",
    },
  },
};

const initialState: SubmissionState = { status: "idle" };

export function ContactForm({ locale }: { locale: Locale }) {
  const [state, setState] = useState<SubmissionState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validateMessage(value: string) {
    return value.trim().length >= 10
      ? undefined
      : copy[locale].validation.messageMinLength;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const messageError = validateMessage(String(payload.message ?? ""));

    if (messageError) {
      setFieldErrors({ message: messageError });
      setState({ status: "idle" });
      return;
    }

    setFieldErrors({});
    setState({ status: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        delivery?: "email" | "log";
      };

      if (!response.ok || !result.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      setState({
        status: "success",
        message:
          result.delivery === "email"
            ? copy[locale].successEmail
            : copy[locale].successLog,
      });
    } catch (error) {
      console.error(error);
      setState({
        status: "error",
        message: copy[locale].error,
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>{copy[locale].fields.name}</span>
          <input name="name" required type="text" />
        </label>

        <label>
          <span>{copy[locale].fields.email}</span>
          <input name="email" required type="email" />
        </label>

        <label>
          <span>{copy[locale].fields.phone}</span>
          <div className="phone-field">
            <input
              className="phone-country-code"
              aria-label={copy[locale].fields.phoneCountry}
              defaultValue={copy[locale].fields.phoneCountryPlaceholder}
              inputMode="tel"
              name="phoneCountry"
              placeholder={copy[locale].fields.phoneCountryPlaceholder}
              type="text"
            />
            <input
              aria-label={copy[locale].fields.phone}
              inputMode="tel"
              name="phone"
              placeholder={copy[locale].fields.phonePlaceholder}
              type="tel"
            />
          </div>
        </label>

        <label>
          <span>{copy[locale].fields.type}</span>
          <select defaultValue="" name="eventType" required>
            <option disabled value="">
              {copy[locale].fields.type}
            </option>
            <option value="wedding">{copy[locale].options.wedding}</option>
            <option value="intimate">{copy[locale].options.intimate}</option>
            <option value="dinner">{copy[locale].options.dinner}</option>
            <option value="baptism">{copy[locale].options.baptism}</option>
            <option value="proposal">{copy[locale].options.proposal}</option>
            <option value="baby">{copy[locale].options.baby}</option>
            <option value="other">{copy[locale].options.other}</option>
          </select>
        </label>

        <label>
          <span>{copy[locale].fields.date}</span>
          <input name="eventDate" type="date" />
        </label>

        <label>
          <span>{copy[locale].fields.location}</span>
          <input name="location" required type="text" />
        </label>

        <label>
          <span>{copy[locale].fields.guests}</span>
          <input name="guestCount" type="text" />
        </label>

        <label>
          <span>{copy[locale].fields.budget}</span>
          <input name="budget" placeholder={copy[locale].fields.optional} type="text" />
        </label>
      </div>

      <label>
        <span>{copy[locale].fields.message}</span>
        <textarea
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          aria-invalid={fieldErrors.message ? "true" : "false"}
          className={fieldErrors.message ? "field-error-input" : undefined}
          minLength={10}
          name="message"
          onChange={(event) => {
            const nextError = validateMessage(event.currentTarget.value);
            setFieldErrors((current) =>
              current.message === nextError ? current : { ...current, message: nextError },
            );
          }}
          required
          rows={6}
        />
        {fieldErrors.message ? (
          <p className="field-error-message" id="message-error">
            {fieldErrors.message}
          </p>
        ) : null}
      </label>

      <label className="honeypot" aria-hidden="true">
        <span>Company</span>
        <input autoComplete="off" name="company" tabIndex={-1} type="text" />
      </label>

      <button
        className="button button-primary"
        disabled={state.status === "loading"}
        type="submit"
      >
        {state.status === "loading"
          ? copy[locale].sending
          : copy[locale].submit}
      </button>

      {state.status === "success" ? (
        <p className="form-feedback form-feedback-success">{state.message}</p>
      ) : null}

      {state.status === "error" ? (
        <p className="form-feedback form-feedback-error">{state.message}</p>
      ) : null}
    </form>
  );
}
