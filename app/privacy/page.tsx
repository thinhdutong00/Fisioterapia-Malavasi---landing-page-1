"use client";

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans p-8 md:p-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#55B4FF] font-bold mb-12 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Torna al sito
        </Link>
        
        <h1 className="text-4xl font-black text-[#022166] mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 leading-relaxed text-slate-600">
          <section>
            <h2 className="text-xl font-bold text-[#022166] mb-4">1. Titolare del Trattamento</h2>
            <p>
              Il Titolare del trattamento è il <strong>Dott. Mirco Malavasi</strong>, <br />
              Sede legale: Via S. Forti, n. 41 - 41016 Novi di Modena (MO)<br />
              P.IVA: 03890170362<br />
              Email: <a href="mailto:fisioterapiamalavasi@gmail.com" className="text-[#55B4FF]">fisioterapiamalavasi@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#022166] mb-4">2. Tipologia di Dati Trattati</h2>
            <p>
              Attraverso il modulo di prenotazione, raccogliamo dati personali (Nome, Email, Telefono) 
              e dati sensibili relativi allo stato di salute (motivo della visita e referti medici caricati volontariamente dall'utente).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#022166] mb-4">3. Finalità del Trattamento</h2>
            <p>
              I dati sono trattati esclusivamente per:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Gestire le richieste di prenotazione e ricontattare l'utente.</li>
              <li>Valutare la documentazione clinica per la corretta erogazione della prestazione fisioterapica.</li>
              <li>Adempiere agli obblighi fiscali e di legge.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#022166] mb-4">4. Base Giuridica</h2>
            <p>
              Il trattamento dei dati sanitari avviene solo previo <strong>consenso esplicito</strong> dell'interessato, 
              espresso tramite la spunta della checkbox nel modulo di contatto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#022166] mb-4">5. Conservazione dei Dati</h2>
            <p>
              I dati saranno conservati per il tempo necessario a gestire la richiesta. In caso di instaurazione di un rapporto terapeutico, 
              i dati saranno conservati secondo i termini di legge per la documentazione sanitaria (10 anni).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#022166] mb-4">6. Diritti dell'Interessato</h2>
            <p>
              Hai il diritto di richiedere l'accesso, la rettifica o la cancellazione dei tuoi dati. 
              Puoi esercitare questi diritti scrivendo a: <strong>fisioterapiamalavasi@gmail.com</strong>.
            </p>
          </section>
        </div>

        <footer className="mt-20 pt-8 border-t border-slate-100 text-sm text-slate-400 italic">
          Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
        </footer>
      </div>
    </main>
  );
}