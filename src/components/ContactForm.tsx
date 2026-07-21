"use client";

import { ArrowUpRight, LoaderCircle, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { profile } from "@/config/portfolioData";

type ContactFormProps = {
  language?: "en" | "ta";
};

export default function ContactForm({ language = "en" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "setup">("idle");
  const tamil = language === "ta";

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

      if (!data.success) throw new Error("Web3Forms rejected the request");

      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const result = (tamil ? {
    error: "Send aagala. Email button use pannunga.",
    idle: "",
    sending: "Note anuppitu irukku...",
    setup: "Form connect aagitu irukku. Email button ippo work aagum.",
    success: "Sent. Rahul inbox-la paapaar.",
  } : {
    idle: "",
    sending: "Sending your note...",
    success: "Sent. Rahul will see it in his inbox.",
    error: "That did not send. Please use the email button instead.",
    setup: "The form is being connected. The email button works right now.",
  })[status];

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          {tamil ? "Ungal peru" : "Your name"}
          <input autoComplete="name" name="name" placeholder={tamil ? "e.g. Priya, product team" : "e.g. Priya from a product team"} required />
        </label>
        <label>
          {tamil ? "Ungal email" : "Your email"}
          <input autoComplete="email" name="email" placeholder="you@company.com" type="email" required />
        </label>
        <label>
          {tamil ? "Ungal note" : "Your note"}
          <textarea name="message" placeholder={tamil ? "Hi Rahul, SmartOps work interesting-aa irundhuchu..." : "Hi Rahul, I found your SmartOps work interesting..."} required />
        </label>
        <button className="button" disabled={status === "sending"} type="submit">
          {status === "sending" ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
          {tamil ? "Note anuppunga" : "Send the note"}
        </button>
        <p aria-live="polite" className="form-result">{result}</p>
      </form>
      <div className="contact-actions">
        <a className="button secondary" href={`mailto:${profile.email}?subject=Hello%20Rahul`}>
          {tamil ? "Illa na Rahul-kku direct email pannunga" : "Or email Rahul directly"} <ArrowUpRight size={16} />
        </a>
      </div>
    </>
  );
}
