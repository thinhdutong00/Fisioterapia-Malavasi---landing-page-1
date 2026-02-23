"use client";

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans p-8 md:p-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#55B4FF] font-bold mb-12 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Torna al sito
        </Link>
        
        <h1 className="text-4xl font-black text-[#022166] mb-8">Cookie Policy</h1>
        
        <div className="space-y-8 leading-relaxed text-slate-600">
          <section>
            <h2 className="text-xl font-bold text-[#022166] mb-4">Cosa sono i Cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti visitati dall'utente inviano al suo terminale, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#022166] mb-4">Tipologie di Cookie che utilizziamo</h2>
            <ul className="list-disc ml-6 space-y-4">
              <li>
                <strong>Cookie Tecnici:</strong> Necessari per il corretto funzionamento del modulo di prenotazione e della navigazione (non richiedono consenso).
              </li>
              <li>
                <strong>Cookie Statistici (Google Analytics):</strong> Utilizzati per capire quante persone visitano il sito in forma aggregata e anonima.
              </li>
              <li>
                <strong>Cookie di Marketing (Google & Meta Ads):</strong> Poiché utilizziamo campagne pubblicitarie, questi cookie tracciano le conversioni (es. quante persone cliccano su "Invia" dopo aver visto un annuncio).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#022166] mb-4">Come gestire i Cookie</h2>
            <p>
              L'utente può gestire le preferenze relative ai cookie direttamente all'interno del proprio browser o tramite il banner di consenso presente sul sito. Disabilitando i cookie tecnici, alcune funzioni del sito (come il modulo di prenotazione) potrebbero non funzionare correttamente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#022166] mb-4">Titolare del Trattamento</h2>
            <p>Dott. Mirco Malavasi - Via S. Forti, n. 41 - 41016 Novi di Modena (MO)</p>
          </section>
        </div>
      </div>
    </main>
  );
}