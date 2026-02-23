"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già espresso una scelta
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    // Salva la scelta localmente
    localStorage.setItem("cookieConsent", "accepted");

    // Comunica il consenso a Google Consent Mode v2
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_ads_personalization': 'granted',
        'analytics_storage': 'granted'
      });
      
      // Invia un evento personalizzato per attivare eventuali tag di tracciamento
      (window as any).dataLayer.push({
        event: 'consent_granted'
      });
    }

    setShowBanner(false);
  };

  const declineAll = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[200] bg-[#022166] border border-white/10 rounded-[2rem] p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white/90 text-sm md:text-base leading-relaxed text-center md:text-left">
          <p>
            Utilizziamo i cookie per migliorare la tua esperienza e per le nostre campagne pubblicitarie (Google & Meta Ads). 
            Puoi accettare tutti i cookie o leggere la nostra{" "}
            <Link href="/cookie" className="text-[#55B4FF] underline font-bold">Cookie Policy</Link>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button 
            onClick={declineAll}
            className="px-6 py-3 rounded-xl border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Rifiuta
          </button>
          <button 
            onClick={acceptAll}
            className="px-6 py-3 rounded-xl bg-[#55B4FF] text-[#022166] font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-[#55B4FF]/20"
          >
            Accetta Tutti
          </button>
        </div>
      </div>
    </div>
  );
}