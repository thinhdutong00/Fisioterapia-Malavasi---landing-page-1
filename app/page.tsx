"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import CookieBanner from './components/CookieBanner';
import { 
  Activity, X, ChevronRight, Zap, UserRound, CheckCircle, 
  Phone, ArrowRight, Menu, Users, Star, MapPin, HeartPulse, 
  Calendar, Clock, Plus, ChevronLeft, Upload, FileText,
  Accessibility, HandIcon, Move, Spline, Scale,
  Stethoscope, Dumbbell, UserCheck,
  Dna, MoveVertical, Footprints, Layers,
  MessageCircle, ClipboardCheck, Quote,
  Shield 
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function FisioterapiaMalavasi() {
  // --- STATI INTERFACCIA ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mapUrl, setMapUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.216234033104!2d11.026365!3d44.838499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDUwJzE4LjYiTiAxMcKwMDEnMzQuOSJF!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit");
  const [selectedTrattamento, setSelectedTrattamento] = useState<any>(null);
  const [isHoursOpen, setIsHoursOpen] = useState(false);

  // --- STATI MODULO MULTISTEP ---
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    motivo: '', sede: '', data: '', ora: '', nome: '', telefono: '', email: '', privacy: false
  });

  // --- LOGICA CALENDARIO ---
  const oggi = new Date();
  const giorniMese = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(oggi.getDate() + i);
    return d;
  });

  const generaOrari = () => {
    const slots = [];
    const intervalli = [{ start: 9, end: 13 }, { start: 15, end: 21 }];
    intervalli.forEach(range => {
      for (let ora = range.start; ora < range.end; ora++) {
        for (let min = 0; min < 60; min += 15) {
          slots.push(`${ora.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
        }
      }
    });
    slots.push("13:00", "21:00");
    return [...new Set(slots)].sort();
  };

  const orariDisponibili = generaOrari();
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // --- LOGICA NAVBAR ---
  useEffect(() => {
    const mainContainer = document.querySelector('main');
    const controlNavbar = () => {
      if (mainContainer) {
        const currentScrollY = mainContainer.scrollTop;
        const isNearBottom = mainContainer.scrollHeight - currentScrollY - mainContainer.clientHeight < 400;
        setIsScrolled(currentScrollY > 50);
        if (isNearBottom || (currentScrollY > lastScrollY && currentScrollY > 100)) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };
    mainContainer?.addEventListener('scroll', controlNavbar);
    return () => mainContainer?.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const inviaPrenotazione = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value.toString()));
      if (file) data.append('file', file);
      const response = await fetch('/api/send', { method: 'POST', body: data });
      if (response.ok) window.location.href = 'https://fisioterapiamalavasi.it/thank-you-page/';
      else alert("Errore nell'invio.");
    } catch (error) {
      alert("Errore di connessione.");
    }
  };

  return (
    <main className="h-screen overflow-y-auto md:snap-y md:snap-mandatory scroll-smooth bg-white text-slate-800 font-sans">
      
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vm4wfzivpa");
        `}
      </Script>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-[#55B4FF]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-[#022166]/5 rounded-full blur-[100px]"></div>
      </div>

      {/* --- HEADER --- */}
      <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ease-in-out 
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        ${isScrolled ? 'py-2' : 'py-0'}`}>
        <div className={`mx-auto transition-all duration-500 px-4 md:px-6 
          ${isScrolled 
            ? 'max-w-7xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg rounded-2xl h-20' 
            : 'max-w-full bg-transparent h-24'}`}>
          <div className="h-full flex items-center w-full">
            <div className="flex items-center shrink-0">
              <img 
                src="https://raw.githubusercontent.com/thinhdutong00/image-fisioterapia-malavasi/92e18a782853772b8d90a1ef6e851630fc1492ae/CENTRO-FISIOTERAPICO-CAVEZZO-MODENA-1.webp" 
                alt="Logo" 
                className={`transition-all duration-500 object-contain ${isScrolled ? 'h-8 md:h-12' : 'h-10 md:h-16'}`}
              />
            </div>
            <nav className="hidden xl:flex items-center gap-5 ml-8 text-[11px] font-black uppercase tracking-widest text-[#022166]">
              <a href="#home" className="hover:text-[#55B4FF]">CHI SIAMO</a>
              <a href="#servizi" className="hover:text-[#55B4FF]">TRATTAMENTI</a>
              <a href="#metodo" className="text-[#55B4FF]">COME LAVORIAMO</a>
              <a href="#team" className="hover:text-[#55B4FF]">TEAM</a>
              <a href="#recensioni" className="hover:text-[#55B4FF]">RECENSIONI</a>
              <a href="#dove-siamo" className="hover:text-[#55B4FF]">DOVE SIAMO</a>
            </nav>
            <div className="flex items-center gap-3 ml-auto">
              <a href="tel:3338225464" className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[11px] border-2 border-[#022166] text-[#022166] hover:bg-[#022166] hover:text-white transition-all">
                <Phone size={14} /> <span className="hidden sm:inline">333 822 5464</span>
              </a>
              <a href="#prenota" className="hidden md:flex bg-[#022166] text-white px-5 py-2.5 rounded-xl font-bold text-[11px] hover:bg-[#55B4FF] shadow-md transition-all">
                PRENOTA ORA
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION (AGGIUNTA) --- */}
      <section id="home" className="min-h-screen w-full md:snap-start md:snap-always relative flex items-center justify-center pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#022166]/5 border border-[#022166]/10 text-[#022166] font-bold text-xs uppercase tracking-widest">
              <Zap size={14} className="text-[#55B4FF]" /> Specialisti della Riabilitazione
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#022166] leading-[1.1] tracking-tighter">
              Riconquista il tuo <span className="text-[#55B4FF]">Movimento.</span>
            </h1>
            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Il Centro Fisioterapico Malavasi a Cavezzo (MO) offre percorsi di cura personalizzati basati sulle più recenti evidenze scientifiche.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a href="#prenota" className="group flex items-center gap-3 bg-[#022166] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#55B4FF] transition-all shadow-xl shadow-[#022166]/20">
                Inizia il Recupero <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#servizi" className="text-[#022166] font-black text-sm uppercase p-4 hover:text-[#55B4FF] transition-colors">
                I Nostri Trattamenti
              </a>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://raw.githubusercontent.com/thinhdutong00/image-fisioterapia-malavasi/92e18a782853772b8d90a1ef6e851630fc1492ae/STUDIO-FISIOTERAPIA-CAVEZZO.webp" 
              alt="Studio Fisioterapia" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </section>

      {/* --- TRATTAMENTI --- */}
      <section id="servizi" className="min-h-screen w-full md:snap-start md:snap-always relative flex items-center justify-center py-24 px-4 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 w-full py-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#022166] tracking-tight mb-4">I Nostri Trattamenti</h2>
            <div className="w-20 h-1.5 bg-[#55B4FF] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, titolo: "Riabilitazione Post-Chirurgica", icona: <Accessibility size={32} />, breve: "Recupero mobilità post protesi o LCA.", colore: "from-blue-500/10" },
              { id: 2, titolo: "Trattamento Cervicalgia e Lombalgia", icona: <MoveVertical size={32} />, breve: "Soluzioni per eliminare il dolore alla colonna.", colore: "from-cyan-500/10" },
              { id: 3, titolo: "Fisioterapia Sportiva", icona: <Footprints size={32} />, breve: "Recupero traumi e ritorno in campo rapido.", colore: "from-[#55B4FF]/10" },
              { id: 4, titolo: "Cura delle Tendiniti", icona: <Dna size={32} />, breve: "Trattamento avanzato per infiammazioni croniche.", colore: "from-indigo-500/10" },
              { id: 5, titolo: "Riabilitazione Posturale", icona: <Layers size={32} />, breve: "Risoluzione di rigidità e cefalee tensive.", colore: "from-sky-500/10" },
              { id: 6, titolo: "Altri Trattamenti", icona: <Plus size={32} />, breve: "Approccio su misura per ogni tua condizione.", colore: "from-blue-400/10" }
            ].map((item) => (
              <div key={item.id} onClick={() => setSelectedTrattamento(item)} className="group relative p-8 rounded-[2.5rem] bg-white border border-slate-100 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.colore} to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#022166] text-[#55B4FF] rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110">
                    {item.icona}
                  </div>
                  <h3 className="text-xl font-black text-[#022166] mb-3 leading-tight">{item.titolo}</h3>
                  <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-2">{item.breve}</p>
                  <div className="inline-flex items-center gap-2 text-[#55B4FF] font-black text-[10px] uppercase tracking-widest">
                    Scopri i dettagli <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEZIONE STAFF --- */}
      <section id="team" className="min-h-screen w-full md:snap-start md:snap-always relative flex items-center justify-center py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto relative z-10 w-full py-10">
          <div className="text-center mb-20">
            <span className="text-[#55B4FF] font-black text-[10px] uppercase tracking-[0.3em] block mb-4">Professionalità e Competenza</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#022166] tracking-tighter mb-6">Il Nostro <span className="text-[#55B4FF]">Team</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { nome: "Mirco Malavasi", ruolo: "Fisioterapista OMPT", specialita: "Riabilitazione muscolo-scheletrica e oncologica", foto: "/mirco.webp" },
              { nome: "Alice Nanetti", ruolo: "Fisioterapista", specialita: "Riabilitazione muscolo-scheletrica e neurologica", foto: "/alice.jpg" },
              { nome: "Luca Rabaglia", ruolo: "Fisioterapista", specialita: "Riabilitazione muscolo-scheletrica e sportiva", foto: "/luca.webp" }
            ].map((membro, idx) => (
              <div key={idx} className="group bg-slate-50 rounded-[3.5rem] p-4 pb-12 transition-all duration-700 hover:shadow-xl border border-slate-100 text-center flex flex-col items-center">
                <div className="aspect-[4/4.5] w-full relative overflow-hidden rounded-[2.8rem] mb-8">
                  <img src={membro.foto} alt={membro.nome} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
                <span className="bg-[#f0f9ff] text-[#55B4FF] border border-[#55B4FF]/20 px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest mb-4">{membro.ruolo}</span>
                <h3 className="text-3xl font-black text-[#022166] mb-4 group-hover:text-[#55B4FF] transition-colors">{membro.nome}</h3>
                <p className="text-slate-500 text-sm font-bold italic max-w-[250px]">{membro.specialita}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* --- RECENSIONI --- */}
<section id="recensioni" className="min-h-screen w-full md:snap-start md:snap-always py-20 md:py-24 px-4 relative overflow-hidden bg-gradient-to-b from-white to-[#F0F4F8] flex items-center">
  <div className="max-w-7xl mx-auto w-full">
    <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 gap-8">
      <div className="text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-black text-[#022166] tracking-tight mb-4">
          La parola ai nostri <span className="text-[#55B4FF]">Pazienti</span>
        </h2>
        <p className="text-slate-500 font-medium text-lg">Esperienze reali tratte dal nostro profilo ufficiale Google Business.</p>
      </div>
      
      <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 flex items-center gap-6">
        <div className="bg-[#4285F4] p-3 rounded-xl">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.34-2 4.6-1.5 1.5-3.3 3.1-6.6 3.1-5.54 0-10.24-4.5-10.24-10.38s4.7-10.38 10.24-10.38c3.1 0 5.4 1.2 7.1 2.8l2.3-2.3c-2.4-2.2-5.5-4-9.4-4-7.3 0-13.4 6.1-13.4 13.5s6.1 13.5 13.4 13.5c4.4 0 7.7-1.5 10.2-4.1 2.6-2.6 3.4-6.3 3.4-9.2 0-.9-.08-1.7-.2-2.5h-13.4z"/>
          </svg>
        </div>
        <div>
          <div className="flex gap-1 text-yellow-400 mb-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
          </div>
          <p className="text-[#022166] font-black text-sm uppercase tracking-tighter">Eccellenza 5.0 su Google</p>
        </div>
      </div>
    </div>

    <div className="relative group px-0 md:px-16">
      {/* Maschera di sfumatura attiva solo su desktop per non coprire testo su mobile */}
      <div 
        className="md:[mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]"
      >
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
          breakpoints={{ 768: { slidesPerView: 2, spaceBetween: 30 }, 1024: { slidesPerView: 3 } }}
          className="!pb-16 md:!pb-20 !overflow-visible"
        >
          {[
            { n: "Federico Rossi", t: "Eccellente professionista. Mi ha seguito dopo un intervento al menisco con una tabella di marcia perfetta. Recupero rapido e completa mobilità riacquisita in tempi record.", d: "2 giorni fa" },
            { n: "Giulia Ferrari", t: "Il Dott. Malavasi è molto preparato e trasmette grande sicurezza. Ha risolto i miei problemi di postura e mal di schiena che mi portavo dietro da anni. Studio impeccabile.", d: "1 settimana fa" },
            { n: "Alessandro Moretti", t: "Ottima esperienza per un infortunio muscolare durante la preparazione atletica. Molto utile la Tecarterapia abbinata ai trattamenti manuali. Tornerò sicuramente.", d: "2 settimane fa" },
            { n: "Valentina Gatti", t: "Professionista serio, puntuale e molto onesto. Mi ha spiegato ogni passaggio della terapia con molta chiarezza. I dolori cervicali sono spariti dopo solo tre sedute.", d: "3 settimane fa" },
            { n: "Matteo Bianchi", t: "Ho apprezzato molto la flessibilità degli orari e la disponibilità. Trattamenti mirati ed efficaci. Uno dei migliori centri di fisioterapia della zona Modena/Cavezzo.", d: "1 mese fa" },
            { n: "Elena Piazzi", t: "Servizio a domicilio eccellente per mia madre anziana. Grande umanità e pazienza, oltre alla competenza tecnica. Un supporto fondamentale per la nostra famiglia.", d: "1 mese fa" }
          ].map((rev, i) => (
            <SwiperSlide key={i} className="h-auto px-2 md:px-0">
              <div className="bg-white p-7 md:p-10 rounded-[2.5rem] border border-slate-100 h-full flex flex-col relative shadow-lg shadow-blue-900/[0.02] hover:shadow-2xl transition-all duration-500 group">
                <div className="flex gap-0.5 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 font-medium text-base md:text-lg leading-relaxed flex-grow italic">"{rev.t}"</p>
                <div className="flex items-center gap-4 mt-8 md:mt-10 pt-6 md:pt-8 border-t border-slate-50">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#022166] to-[#0a3a8a] rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg">{rev.n[0]}</div>
                  <div>
                    <p className="font-black text-[#022166] text-base md:text-lg leading-none">{rev.n}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{rev.d}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Frecce nascoste su mobile per pulizia, visibili da md in su */}
      <button className="swiper-button-prev-custom hidden md:flex absolute top-1/2 -left-6 -translate-y-1/2 z-50 w-14 h-14 bg-white border border-slate-100 rounded-full items-center justify-center text-[#022166] shadow-2xl hover:bg-[#55B4FF] hover:text-white transition-all">
        <ChevronLeft size={28} />
      </button>
      <button className="swiper-button-next-custom hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-50 w-14 h-14 bg-white border border-slate-100 rounded-full items-center justify-center text-[#022166] shadow-2xl hover:bg-[#55B4FF] hover:text-white transition-all">
        <ChevronRight size={28} />
      </button>
      
      {/* Pagination sempre visibile per feedback su mobile */}
      <div className="swiper-pagination-custom flex justify-center mt-6 gap-2"></div>
    </div>
  </div>
</section>


{/* --- SEZIONE COME LAVORIAMO (PROCESSO) --- */}
<section id="metodo" className="min-h-screen w-full md:snap-start md:snap-always relative flex items-center justify-center py-32 px-4 overflow-hidden bg-white">
        {/* Decorazione sottile di sfondo */}
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#55B4FF]/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          {/* Header Sezione */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-1 px-3 mb-4 rounded-full bg-[#022166]/5 border border-[#022166]/10">
              <span className="text-[#022166] font-black text-[10px] uppercase tracking-[0.3em]">Protocollo Clinico</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#022166] tracking-tighter mb-6">
              Il Tuo Percorso di <span className="text-[#55B4FF]">Recupero</span>
            </h2>
            <p className="max-w-2xl mx-auto text-slate-500 font-bold text-lg leading-relaxed italic">
              Un approccio scientifico in 3 fasi per risolvere il dolore alla radice e restituirti la libertà di movimento.
            </p>
          </div>

          {/* Griglia dei Passaggi */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Linea connettiva (visibile solo su desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

            {[
              {
                fase: "01",
                titolo: "Anamnesi e Colloquio",
                desc: "Ascoltiamo la tua storia. Raccogliamo ogni dettaglio sui tuoi sintomi e sulle tue attività quotidiane per inquadrare correttamente il tuo problema clinico fin dal primo istante.",
                icon: <MessageCircle size={24} />
              },
              {
                fase: "02",
                titolo: "Esame Obiettivo e Test",
                desc: "La scienza del movimento. Attraverso test specifici, valutazioni attive e passive, individuiamo con precisione la causa della tua disfunzione muscolo-scheletrica.",
                icon: <ClipboardCheck size={24} />
              },
              {
                fase: "03",
                titolo: "Trattamento ed Autonomia",
                desc: "Risultati che durano. Combiniamo terapia manuale ed esercizi personalizzati, rendendoti protagonista e autonomo nel tuo processo di guarigione.",
                icon: <Shield size={24} />
              }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 group">
                <div className="bg-slate-50 rounded-[3rem] p-8 pb-12 border border-slate-100 transition-all duration-700 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(2,33,102,0.15)] hover:-translate-y-2 h-full flex flex-col items-center text-center">
                  
                  {/* Numero Fase e Icona */}
                  <div className="flex justify-between items-start w-full mb-8">
                    <span className="text-5xl font-black text-[#022166]/10 group-hover:text-[#55B4FF]/20 transition-colors">
                      {step.fase}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#022166] text-white flex items-center justify-center shadow-lg shadow-[#022166]/20 group-hover:bg-[#55B4FF] transition-colors duration-500">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-[#022166] mb-4 tracking-tight group-hover:text-[#55B4FF] transition-colors">
                    {step.titolo}
                  </h3>
                  
                  <p className="text-slate-500 font-bold text-sm leading-relaxed italic">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Nota finale CTA */}
          <div className="mt-20 text-center">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-6">Ogni seduta ha una durata di circa 45-60 minuti</p>
            <div className="w-16 h-1 bg-[#022166] mx-auto rounded-full opacity-20"></div>
          </div>
        </div>
      </section>


{/* --- DOVE SIAMO - FIX SCROLL LATERALE --- */}
<section id="dove-siamo" className="min-h-screen lg:h-screen w-full md:snap-start md:snap-always relative z-10 bg-white flex flex-col lg:flex-row overflow-x-hidden">
        
        {/* LATO TESTI E SELEZIONE */}
        <div className="lg:w-2/5 w-full p-6 md:p-16 lg:p-24 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
          {/* Decorazione bloccata per non creare scroll */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#55B4FF]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 w-full">
            <span className="text-[#55B4FF] font-black text-xs uppercase tracking-[0.3em] mb-4 block">Vicinanza e Accessibilità</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#022166] tracking-tight mb-4">Dove <span className="text-[#55B4FF]">Trovarci</span></h2>
            <p className="text-slate-500 font-medium mb-12 max-w-sm">Scegli la sede più vicina a te e visualizza il percorso interattivo.</p>
            
            <div className="space-y-4 w-full">
              {[
                { n: 'Cavezzo (MO)', a: 'Via I maggio, 95', u: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.425145838563!2d11.0268581766627!3d44.8333169710705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f9506637e1967%3A0xc3f6050519965f3a!2sVia%20I%20Maggio%2C%2095%2C%2041032%20Cavezzo%20MO!5e0!3m2!1sit!2sit!4v1709564800000!5m2!1sit!2sit" },
                { n: 'Rovereto sulla Secchia (MO)', a: 'Via Savino Forti, 61', u: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2837.2847594821564!2d10.957548776661955!3d44.82136127107067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f943f6f16428d%3A0x6b772c72b20755d5!2sVia%20Savino%20Forti%2C%2061%2C%2041016%20Rovereto%20Sulla%20Secchia%20MO!5e0!3m2!1sit!2sit!4v1709564900000!5m2!1sit!2sit" }
              ].map(loc => (
                <button 
                  key={loc.n} 
                  onClick={() => setMapUrl(loc.u)} 
                  className={`group w-full flex items-center gap-4 p-5 rounded-[2rem] transition-all duration-500 border ${
                    mapUrl === loc.u 
                    ? 'bg-[#022166] text-white shadow-xl border-[#022166]' 
                    : 'bg-white border-slate-100 text-[#022166]'
                  }`}
                >
                  <div className={`p-3 rounded-2xl shrink-0 transition-colors ${
                    mapUrl === loc.u ? 'bg-[#55B4FF] text-[#022166]' : 'bg-slate-100 text-[#022166]'
                  }`}>
                    <MapPin size={22} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="font-black text-base leading-none mb-1 truncate">{loc.n}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest truncate ${mapUrl === loc.u ? 'text-[#55B4FF]' : 'text-slate-400'}`}>{loc.a}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* FISARMONICA ORARI */}
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm w-full">
              <button 
                onClick={() => setIsHoursOpen(!isHoursOpen)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
                type="button"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#55B4FF]/10 rounded-xl flex items-center justify-center text-[#55B4FF]">
                    <Clock size={20} />
                  </div>
                  <span className="font-black text-[#022166] text-sm uppercase tracking-widest">Orari di Apertura</span>
                </div>
                <div className={`transition-transform duration-300 ${isHoursOpen ? 'rotate-180' : ''}`}>
                  <ChevronRight size={20} className="text-slate-400 rotate-90" />
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out ${isHoursOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="p-5 pt-0 space-y-3 border-t border-slate-50">
                  {[
                    { d: 'Lunedì', o: '09–13, 15–20' },
                    { d: 'Martedì', o: '09–13, 15–21' },
                    { d: 'Mercoledì', o: '09–13, 15–21' },
                    { d: 'Giovedì', o: '09–13, 15–21' },
                    { d: 'Venerdì', o: '09–13, 15–20' },
                    { d: 'Sabato', o: '09–13' },
                    { d: 'Domenica', o: 'Chiuso' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center gap-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter shrink-0">{item.d}</span>
                      <span className={`text-xs font-black ${item.o === 'Chiuso' ? 'text-red-400' : 'text-[#022166]'} text-right`}>{item.o}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LATO MAPPA */}
        <div className="lg:w-3/5 w-full h-[350px] lg:h-full relative bg-slate-200 overflow-hidden">
          <iframe 
            src={mapUrl} 
            className="w-full h-full grayscale-[0.2] contrast-[1.1]" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
        </div>
      </section>

{/* --- PRENOTAZIONE MULTISTEP --- */}
<section id="prenota" className="min-h-screen w-full md:snap-start md:snap-always py-32 px-6 bg-[#022166] flex flex-col items-center relative overflow-hidden">
        {/* Decorazioni di sfondo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#55B4FF]/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#55B4FF]/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-4xl w-full flex flex-col relative flex-grow justify-center">
          
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full mb-16 overflow-hidden">
            <div 
              className="h-full bg-[#55B4FF] transition-all duration-700 shadow-[0_0_10px_#55B4FF]" 
              style={{ width: `${(step / 5) * 100}%` }} 
            />
          </div>

          <div className="text-white flex flex-col">
            <div className="mb-12">
              <span className="text-[#55B4FF] font-black text-[10px] uppercase tracking-[0.3em] block mb-2">Fase {step} di 5</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Prenota la tua <span className="text-[#55B4FF]">Visita</span></h2>
            </div>

            <div className="min-h-[400px] flex flex-col justify-center">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <label className="block text-2xl font-bold mb-8 tracking-tight">Qual è il motivo della consulenza?</label>
                  <textarea 
                    className="w-full bg-white/5 border-b-2 border-white/20 p-6 rounded-t-3xl outline-none focus:border-[#55B4FF] focus:bg-white/10 transition-all min-h-[200px] text-xl placeholder:text-white/20" 
                    placeholder="Descrivi brevemente il tuo problema o dolore..." 
                    value={formData.motivo} 
                    onChange={(e) => setFormData({...formData, motivo: e.target.value})} 
                  />
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <label className="block text-2xl font-bold mb-2 tracking-tight">Hai referti o esami?</label>
                  <p className="text-[#55B4FF] mb-10 font-medium text-lg">Carica foto o PDF per aiutarci nella diagnosi (facoltativo).</p>
                  <div className="relative border-2 border-dashed border-white/20 rounded-[3rem] p-16 hover:border-[#55B4FF] hover:bg-white/5 transition-all group flex flex-col items-center justify-center cursor-pointer">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {file ? <FileText className="text-[#55B4FF]" size={40} /> : <Upload className="text-white/40 group-hover:text-[#55B4FF]" size={40} />}
                    </div>
                    <span className="font-black text-sm uppercase tracking-widest">{file ? file.name : "Trascina o seleziona file"}</span>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4 max-w-2xl mx-auto w-full">
                  <label className="block text-2xl font-bold mb-10 text-center tracking-tight">Dove preferisci riceverci?</label>
                  {['Sede Cavezzo (MO)', 'Sede Rovereto (MO)', 'Domicilio'].map((s) => (
                    <button 
                      key={s} 
                      onClick={() => setFormData({...formData, sede: s})} 
                      className={`w-full p-8 rounded-3xl border-2 font-black transition-all text-left flex justify-between items-center group ${formData.sede === s ? 'border-[#55B4FF] bg-[#55B4FF] text-[#022166] scale-[1.02]' : 'border-white/10 bg-white/5 text-white hover:border-white/40'}`}
                    >
                      <span className="text-xl uppercase tracking-tighter">{s}</span>
                      {formData.sede === s ? <CheckCircle size={28} /> : <div className="w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-[#55B4FF]" />}
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <label className="block text-2xl font-bold text-center mb-10 tracking-tight">Seleziona Data e Orario</label>
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl">
                      <div className="flex items-center justify-between mb-6 px-2">
                        <span className="text-sm font-black uppercase tracking-widest text-[#022166]">
                          {oggi.toLocaleString('it-IT', { month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center mb-4">
                        {['L', 'M', 'M', 'G', 'V', 'S', 'D'].map((g, idx) => (
                          <span key={idx} className="text-[10px] font-black text-slate-300 uppercase">{g}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {giorniMese.map((data, i) => {
                          const isoData = data.toISOString().split('T')[0];
                          const isSelected = formData.data === isoData;
                          return (
                            <button key={i} type="button" onClick={() => setFormData({...formData, data: isoData})} className={`aspect-square rounded-xl text-sm font-black transition-all flex items-center justify-center ${isSelected ? 'bg-[#55B4FF] text-white shadow-lg' : 'hover:bg-slate-100 text-[#022166]'}`}>
                              {data.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#55B4FF] block">Fasce orarie</span>
                      <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                        {orariDisponibili.map((ora) => (
                          <button key={ora} type="button" onClick={() => setFormData({...formData, ora: ora})} className={`p-4 rounded-xl border-2 text-sm font-black transition-all text-center ${formData.ora === ora ? 'border-[#55B4FF] bg-[#55B4FF] text-[#022166]' : 'border-white/10 bg-white/5 text-white hover:border-white/40'}`}>
                            {ora}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 max-w-xl mx-auto w-full text-center">
                  <label className="block text-2xl font-bold mb-10 tracking-tight">Ultimo passaggio: i tuoi contatti</label>
                  <input type="text" placeholder="Nome e Cognome" className="w-full bg-white/5 border-b-2 border-white/20 p-5 outline-none focus:border-[#55B4FF] transition-all text-xl font-bold text-white placeholder:text-white/20" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
                  <div className="grid md:grid-cols-2 gap-8">
                    <input type="tel" placeholder="Cellulare" className="bg-transparent border-b-2 border-white/20 p-5 outline-none focus:border-[#55B4FF] transition-all text-xl font-bold text-white placeholder:text-white/20" value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
                    <input type="email" placeholder="Email" className="bg-transparent border-b-2 border-white/20 p-5 outline-none focus:border-[#55B4FF] transition-all text-xl font-bold text-white placeholder:text-white/20" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <label className="flex items-center gap-4 cursor-pointer pt-12 group">
                    <input type="checkbox" className="w-6 h-6 rounded-lg accent-[#55B4FF] border-2 border-white/20 bg-transparent" checked={formData.privacy} onChange={(e) => setFormData({...formData, privacy: e.target.checked})} />
                    <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors text-left font-medium">Acconsento al trattamento dei dati personali in conformità alla <Link href="/privacy" className="underline text-[#55B4FF]">Privacy Policy</Link>.</span>
                  </label>
                </div>
              )}
            </div>

            <div className="mt-20 mb-24 flex gap-6 shrink-0">
              {step > 1 && (
                <button onClick={prevStep} className="p-6 border-2 border-white/10 rounded-full text-white hover:border-[#55B4FF] hover:text-[#55B4FF] transition-all">
                  <ChevronLeft size={32} />
                </button>
              )}
              <button 
                onClick={step === 5 ? inviaPrenotazione : nextStep}
                disabled={(step === 3 && !formData.sede) || (step === 4 && (!formData.data || !formData.ora)) || (step === 5 && (!formData.nome || !formData.privacy))}
                className="flex-1 bg-[#55B4FF] text-[#022166] py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:shadow-[0_20px_40px_rgba(85,180,255,0.3)] transition-all disabled:opacity-20 active:scale-95"
              >
                {step === 5 ? 'Invia Richiesta' : 'Continua'}
              </button>
            </div>
          </div>
        </div>

        {/* --- FOOTER POSIZIONATO IN FONDO E PIÙ CHIARO --- */}
        <footer className="w-full pt-16 pb-12 text-center bg-transparent mt-auto border-t border-white/5">
          <p className="text-slate-400 font-black tracking-widest text-[10px] uppercase mb-4 opacity-80">
            © 2026 Fisioterapia Malavasi • Via I Maggio n°95 Cavezzo (MO) | P. IVA 03890170362
          </p>
          <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest">
            <Link href="/privacy" className="text-slate-500 hover:text-[#55B4FF] transition-colors">Privacy Policy</Link>
            <Link href="/cookie" className="text-slate-500 hover:text-[#55B4FF] transition-colors">Cookie Policy</Link>
          </div>
          <p className="mt-6 text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">MAGO DIGITAL™ STUDIO</p>
        </footer>
      </section>

{/* --- MODALE TRATTAMENTI AGGIORNATA --- */}
{selectedTrattamento && (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
    {/* Overlay con blur */}
    <div 
      className="absolute inset-0 bg-[#022166]/60 backdrop-blur-xl" 
      onClick={() => setSelectedTrattamento(null)}
    ></div>
    
    {/* Contenitore Modale */}
    <div className="relative bg-white rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 max-w-2xl w-full max-h-[90vh] shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col overflow-hidden">
      
      {/* Bottone Chiusura - Ottimizzato per dita su mobile */}
      <button 
        onClick={() => setSelectedTrattamento(null)} 
        className="absolute top-4 right-4 md:top-10 md:right-10 p-2 text-[#022166] hover:rotate-90 transition-transform z-10 bg-slate-100 md:bg-transparent rounded-full"
      >
        <X size={28} />
      </button>

      {/* Area Contenuto Scrollabile */}
      <div className="overflow-y-auto pr-2 custom-scrollbar">
        <div className="text-[#55B4FF] mb-4 md:mb-8">
          {/* Ridimensionamento icona modale */}
{React.cloneElement(selectedTrattamento.icona as React.ReactElement<any>, { size: 48 })}
        </div>
        
        <h3 className="text-2xl md:text-4xl font-black text-[#022166] mb-4 md:mb-8 tracking-tighter leading-tight">
          {selectedTrattamento.titolo}
        </h3>
        
        <div className="w-12 h-1 bg-[#55B4FF] mb-6 rounded-full"></div>
        
        <p className="text-slate-600 text-base md:text-xl leading-relaxed mb-10 font-medium">
          {selectedTrattamento.descrizione}
        </p>
      </div>

      {/* Footer Modale Fisso */}
      <div className="pt-4 mt-auto">
        <a 
          href="#prenota" 
          onClick={() => setSelectedTrattamento(null)} 
          className="block w-full text-center bg-[#022166] text-white py-4 md:py-6 rounded-2xl md:rounded-full font-black uppercase tracking-widest hover:bg-[#55B4FF] transition-all shadow-xl text-sm md:text-base"
        >
          Prenota Visita
        </a>
      </div>
    </div>
  </div>
)}
      
      <CookieBanner />
    </main>
  );
}