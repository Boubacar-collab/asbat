"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      nom: form.get("nom"),
      email: form.get("email"),
      telephone: form.get("telephone") || null,
      sujet: form.get("sujet"),
      message: form.get("message"),
    };

    const supabase = createSupabaseBrowserClient();

    if (supabase) {
      const { error: rpcError } = await supabase.rpc("submit_contact_message", {
        p_nom: payload.nom,
        p_email: payload.email,
        p_telephone: payload.telephone,
        p_sujet: payload.sujet,
        p_message: payload.message,
      });

      if (rpcError) {
        const { error: insertError } = await supabase
          .from("contact_messages")
          .insert(payload);

        if (insertError) {
          setLoading(false);
          setError(
            "Impossible d'envoyer le message. Exécutez supabase/fix-contact-rls.sql dans Supabase, ou contactez-nous par téléphone."
          );
          return;
        }
      }
    }

    setLoading(false);
    setSent(true);
    e.target.reset();
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-asbat-green/30 bg-asbat-green/10 p-8 text-center">
        <p className="text-2xl font-semibold text-asbat-green-dark">Message envoyé !</p>
        <p className="mt-2 text-zinc-600">
          Notre équipe vous contactera dans les plus brefs délais.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-asbat-green hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="mb-1.5 block text-sm font-medium text-zinc-700">
            Nom complet
          </label>
          <input
            id="nom"
            name="nom"
            required
            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-asbat-green focus:ring-2 focus:ring-asbat-green/20"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-asbat-green focus:ring-2 focus:ring-asbat-green/20"
            placeholder="vous@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="telephone" className="mb-1.5 block text-sm font-medium text-zinc-700">
          Téléphone
        </label>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-asbat-green focus:ring-2 focus:ring-asbat-green/20"
          placeholder="+221 ..."
        />
      </div>
      <div>
        <label htmlFor="sujet" className="mb-1.5 block text-sm font-medium text-zinc-700">
          Sujet
        </label>
        <select
          id="sujet"
          name="sujet"
          required
          className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-asbat-green focus:ring-2 focus:ring-asbat-green/20"
        >
          <option value="">Choisir un sujet</option>
          <option value="construction">Construction / Rénovation</option>
          <option value="materiaux">Achat de matériaux</option>
          <option value="equipement">Location d&apos;équipement</option>
          <option value="conseil">Conseil en construction</option>
          <option value="architecture">Plans d&apos;architecture</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-zinc-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-asbat-green focus:ring-2 focus:ring-asbat-green/20"
          placeholder="Décrivez votre projet..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-asbat-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-asbat-green-dark disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}
