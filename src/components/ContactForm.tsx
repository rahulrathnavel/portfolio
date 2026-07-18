"use client";

import { ArrowUpRight, LoaderCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";

const email = "rahulrathnavel15@gmail.com";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "setup">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("setup");
      return;
    }

    setStatus("sending");
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", accessKey);
    formData.append("subject", "New note from rahulrathnavel.dev");
    formData.append("from_name", "Rahul Rathnavel Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { success?: boolean };

      if (!data.success) {
        throw new Error("Web3Forms rejected the request");
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const result = {
    idle: "",
    sending: "Sending your note…",
    success: "Sent. Rahul will see it in his inbox.",
    error: "That did not send. Please use the email button instead.",
    setup: "The form is being connected. The email button works right now.",
  }[status];

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Your name
          <input autoComplete="name" name="name" placeholder="e.g. Priya from a product team" required />
        </label>
        <label>
          Your email
          <input autoComplete="email" name="email" placeholder="you@company.com" type="email" required />
        </label>
        <label>
          Your note
          <textarea name="message" placeholder="Hi Rahul, I found your SmartOps work interesting…" required />
        </label>
        <button className="button" disabled={status === "sending"} type="submit">
          {status === "sending" ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
          Send the note
        </button>
        <p aria-live="polite" className="form-result">
          {result}
        </p>
      </form>
      <div className="contact-actions">
        <a className="button secondary" href={`mailto:${email}?subject=Hello%20Rahul`}>
          Or email Rahul directly <ArrowUpRight size={16} />
        </a>
      </div>
    </>
  );
}
