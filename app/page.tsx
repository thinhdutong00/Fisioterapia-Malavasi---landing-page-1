"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import CookieBanner from './components/CookieBanner';
import {
  Activity, X, ChevronRight, Zap, UserRound, CheckCircle,
  Phone, ArrowRight, Menu, Users, Star, Home, MapPin, HeartPulse,
  Calendar, Clock, Plus, ChevronLeft, Upload, FileText,
  Accessibility, HandIcon, Move, Spline, Scale,
  Stethoscope, Dumbbell, UserCheck,
  Dna, MoveVertical, Footprints, Layers,
  MessageCircle, ClipboardCheck, Quote,
  Shield
} from 'lucide-react';

// AGGIUNGI QUESTO:
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
const [mounted, setMounted] = useState(false);
  // --- STATI MODULO MULTISTEP ---
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    motivo: '',
    sede: '',
    data: '',
    ora: '',
    nome: '',
    telefono: '',
    email: '',
    privacy: false
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
          const h = ora.toString().padStart(2, '0');
          const m = min.toString().padStart(2, '0');
          slots.push(`${h}:${m}`);
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
    setMounted(true);
    const mainContainer = document.querySelector('main');
    const controlNavbar = () => {
      if (mainContainer) {
        const currentScrollY = mainContainer.scrollTop;
        const scrollHeight = mainContainer.scrollHeight;
        const clientHeight = mainContainer.clientHeight;
        const isNearBottom = scrollHeight - currentScrollY - clientHeight < 400;
        
        setIsScrolled(currentScrollY > 50);

        if (isNearBottom) {
          setIsVisible(false);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
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

  // --- FUNZIONE INVIO EMAIL ---
  const inviaPrenotazione = async () => {
    try {
      const data = new FormData();
      data.append('nome', formData.nome);
      data.append('email', formData.email);
      data.append('telefono', formData.telefono);
      data.append('sede', formData.sede);
      data.append('data', formData.data);
      data.append('ora', formData.ora);
      data.append('motivo', formData.motivo || ""); 
      
      if (file) data.append('file', file);

      const response = await fetch('/api/send', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        window.location.href = 'https://fisioterapiamalavasi.it/thank-you-page/';
      } else {
        alert("Errore nell'invio. Riprova tra poco.");
      }
    } catch (error) {
      alert("Errore di connessione.");
    }
  };

  return (
    <main className="h-screen overflow-y-auto md:snap-y md:snap-mandatory scroll-smooth bg-[#F0F4F8] text-slate-800 font-sans">
      
      {/* BACKGROUND DECORATIONS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-[#55B4FF]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-[#022166]/5 rounded-full blur-[100px]"></div>
      </div>

{/* --- HEADER DINAMICO --- */}
      <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        ${isScrolled ? 'py-2' : 'py-0'}`}>

        <div className={`mx-auto transition-all duration-500 px-4 md:px-6
          ${isScrolled
            ? 'max-w-7xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl h-20'
            : 'max-w-full bg-transparent h-24'}`}>

          <div className="h-full flex items-center w-full">
<div className="flex items-center shrink-0">
              <Image
                src="https://raw.githubusercontent.com/thinhdutong00/image-fisioterapia-malavasi/92e18a782853772b8d90a1ef6e851630fc1492ae/CENTRO-FISIOTERAPICO-CAVEZZO-MODENA-1.webp"
                alt="Logo Fisioterapia Malavasi"
                width={256}
                height={64}
                className={`transition-all duration-500 object-contain w-auto ${
                  isScrolled ? 'h-8 md:h-12 brightness-100' : 'h-10 md:h-16 brightness-0 invert'
                }`}
                priority={true}
                loading="eager"
              />
            </div>

            <nav className={`hidden xl:flex items-center gap-5 2xl:gap-8 text-[11px] 2xl:text-[12px] font-black uppercase tracking-[0.15em] ml-8 transition-colors duration-500
              ${isScrolled ? 'text-[#022166]' : 'text-white'}`}>
              <a href="#home" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">CHI SIAMO</a>
              <a href="#servizi" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">TRATTAMENTI</a>
              <a href="#metodo" className="hover:text-[#55B4FF] transition-all whitespace-nowrap text-[#55B4FF]">COME LAVORIAMO</a>
              <a href="#team" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">TEAM</a>
              <a href="#recensioni" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">RECENSIONI</a>
              <a href="#dove-siamo" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">DOVE SIAMO</a>
            </nav>

            <div className="flex items-center gap-2 md:gap-3 ml-auto shrink-0">
              <a href="tel:3338225464" className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl font-bold text-[11px] transition-all whitespace-nowrap border-2
                ${isScrolled
                  ? 'bg-white border-[#022166] text-[#022166] hover:bg-[#022166] hover:text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#022166]'}`}>
                <Phone size={14} /> <span className="hidden sm:inline">333 822 5464</span>
              </a>

              <a href="#prenota" className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[11px] transition-all shadow-md whitespace-nowrap
                ${isScrolled
                  ? 'bg-[#022166] text-white hover:bg-[#55B4FF]'
                  : 'bg-[#55B4FF] text-[#022166] hover:bg-white'}`}>
                PRENOTA ORA
              </a>

<button 
  className={`xl:hidden p-1 transition-colors ${isScrolled ? 'text-[#022166]' : 'text-white'}`} 
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  aria-label="Apri menu di navigazione"
>
  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
</button>
            </div>
          </div>
        </div>
      </header>

{/* --- MENU MOBILE OVERLAY --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[150] bg-[#022166] flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in-95 duration-300 xl:hidden">
          {/* Bottone chiusura con aria-label per accessibilità */}
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="absolute top-8 right-8 text-white p-2"
            aria-label="Chiudi menu navigazione"
          >
            <X size={40} />
          </button>
          
          <nav className="flex flex-col items-center gap-8 text-white font-black text-2xl uppercase tracking-widest">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Chi Siamo</a>
            <a href="#servizi" onClick={() => setIsMenuOpen(false)}>Trattamenti</a>
            <a href="#metodo" onClick={() => setIsMenuOpen(false)}>Metodo</a>
            <a href="#team" onClick={() => setIsMenuOpen(false)}>Team</a>
            <a href="#recensioni" onClick={() => setIsMenuOpen(false)}>Recensioni</a>
            <a href="#dove-siamo" onClick={() => setIsMenuOpen(false)}>Dove Siamo</a>
          </nav>
          
          <a 
            href="#prenota" 
            onClick={() => setIsMenuOpen(false)} 
            className="mt-4 bg-[#55B4FF] text-[#022166] px-10 py-4 rounded-2xl font-black text-lg"
          >
            PRENOTA ORA
          </a>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section id="home" className="h-screen w-full md:snap-start md:snap-always relative flex items-center justify-center px-4 md:px-8 overflow-hidden bg-[#022166]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://github.com/thinhdutong00/image-fisioterapia-malavasi/blob/main/1.png?raw=true"
            alt="Sfondo Anatomia"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#022166]/80 via-[#022166]/60 to-[#022166]/90"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center py-20">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
            <div className="relative h-5 w-10">
              <Image
                src="https://github.com/thinhdutong00/Fisioterapia-Malavasi---landing-page-1/blob/main/public/Progetto%20senza%20titolo%20-%202026-02-23T223838.202.png?raw=true"
                alt="Logo Malavasi"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            LA SCIENZA PENSATA PER IL TUO BENESSERE
          </div>

          <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tighter">
            Fisioterapia e Riabilitazione <br />
            <span className="text-[#55B4FF]">a Cavezzo</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Valutazioni precise e trattamenti fisioterapici basati su evidenze scientifiche, pensati per ridurre il dolore, migliorare la mobilità e accompagnarti verso un recupero stabile e reale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#prenota" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#55B4FF] text-[#022166] px-9 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all group shadow-lg shadow-[#55B4FF]/20">
              Inizia il Percorso <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </a>
            <a href="#servizi" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-9 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
              I nostri trattamenti
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/30 hidden md:block">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </section>

{/* --- TRATTAMENTI --- */}
<section id="servizi" className="min-h-screen w-full snap-start snap-always relative flex items-center justify-center py-24 px-4 bg-white/5 backdrop-blur-sm overflow-hidden">
  <div className="max-w-7xl mx-auto relative z-10 w-full py-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-black text-[#022166] tracking-tight mb-4">I Nostri Trattamenti</h2>
      <div className="w-20 h-1.5 bg-[#55B4FF] mx-auto rounded-full"></div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { id: 1, titolo: "Riabilitazione Post-Chirurgica", icona: <Accessibility size={32} />, breve: "Percorsi specialistici per il recupero della mobilità dopo interventi di protesi (anca/ginocchio) o ricostruzione legamentosa (LCA).", descrizione: "L'intervento chirurgico è solo il primo passo: il vero successo dipende dalla riabilitazione. Seguo protocolli basati sulle più recenti evidenze scientifiche per ridurre l'infiammazione, recuperare la forza muscolare e restituirti la piena autonomia nel minor tempo possibile. Non lasciare che la cicatrice limiti il tuo movimento.", colore: "from-blue-500/20 to-transparent" },
        { id: 2, titolo: "Trattamento Cervicalgia, Lombalgia ed Ernie del Disco", icona: <MoveVertical size={32} />, breve: "Soluzioni efficaci per eliminare il dolore alla colonna vertebrale, sciatalgie e tensioni muscolari legate alla postura.", descrizione: "Il mal di schiena non deve diventare una condizione normale della tua vita. Attraverso tecniche di terapia manuale e manipolazioni mirate, agisco sulla causa del dolore (sia essa meccanica, posturale o compressiva) per liberare le articolazioni e rilassare i tessuti profondi. Torna a muoverti senza paura di rimanere bloccato.", colore: "from-cyan-500/20 to-transparent" },
        { id: 3, titolo: "Fisioterapia Sportiva e Recupero Traumi da Sport", icona: <Footprints size={32} />, breve: "Trattamento specialistico per distorsioni alla caviglia, lesioni muscolari e problematiche articolari della spalla.", descrizione: "Per uno sportivo, ogni giorno fermo è un giorno perso. Mi occupo del trattamento di traumi acuti e cronici, applicando tecniche che accelerano la riparazione dei tessuti e prevengono future recidive. Dalla gestione della fase acuta al ritorno in campo, ogni fase è monitorata per garantirti la massima performance.", colore: "from-[#55B4FF]/20 to-transparent" },
        { id: 4, titolo: "Cura delle Tendiniti e Infiammazioni Croniche", icona: <Dna size={32} />, breve: "Trattamento per dolore al gomito (epicondilite), tendine d'Achille e fascite plantare con approcci conservativi avanzati.", descrizione: "Le tendinopatie richiedono pazienza e competenza specifica: il riposo assoluto spesso non basta. Utilizzo un approccio combinato di terapia manuale ed esercizio terapeutico per rieducare il tendine al carico, eliminando quel dolore persistente che ostacola i tuoi gesti quotidiani o la tua corsa.", colore: "from-indigo-500/20 to-transparent" },
        { id: 5, titolo: "Riabilitazione Cefalee e vertigini", icona: <Scale size={32} />, breve: "Trattamento specialistico per emicrania tensionali, vertigini posizionali e disturbi dell'equilibrio di origine cervicale.", descrizione: "Il mal di testa e il senso di sbandamento non sono fatalità, ma spesso derivano da disfunzioni del sistema cervicale o vestibolare. Attraverso manovre specifiche e rieducazione mirata, agisco sulla causa dei tuoi sintomi per restituirti stabilità e una mente libera dal dolore cronico. Non lasciare che le vertigini limitino la tua libertà: prenota un consulto per ritrovare il tuo equilibrio.", colore: "from-sky-500/20 to-transparent" },
        { id: 6, titolo: "Fisioterapia a Domicilio", icona: <Home size={32} />, breve: "Il professionista direttamente a casa tua per pazienti con ridotta mobilità, post-operatori o anziani.", descrizione: "Se il dolore o le difficoltà motorie ti impediscono di raggiungere lo studio, sarò io a venire da te. Offro un servizio domiciliare completo a Cavezzo e zone limitrofe, portando tutta l'attrezzatura e le competenze necessarie per iniziare subito il tuo percorso di guarigione nell'ambiente confortevole di casa tua. La tua riabilitazione non deve aspettare: contattami per organizzare la tua prima seduta a domicilio.", colore: "from-blue-400/20 to-transparent" }
      ].map((item) => (
        <div key={item.id} onClick={() => setSelectedTrattamento(item)} className="group relative p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-white/60 cursor-pointer transition-all duration-500 hover:bg-white hover:-translate-y-2 hover:shadow-2xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${item.colore} rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity`}></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-[#022166] text-[#55B4FF] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#022166]/20 transition-transform group-hover:scale-110">
              {item.icona}
            </div>
            <h3 className="text-xl font-black text-[#022166] mb-3 leading-tight">{item.titolo}</h3>
            <p className="text-slate-600 text-sm font-medium mb-6 line-clamp-2">{item.breve}</p>
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
            <Image 
              src={membro.foto} 
              alt={membro.nome} 
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
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
<div className="flex-shrink-0 w-12 h-12 bg-[#4285F4] rounded-xl flex items-center justify-center">
  <svg 
    className="w-6 h-6 text-white" 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
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
            { n: "Rosalba Cantuti", t: "Lo studio Malavasi è molto serio e professionale, Mirco segue molto bene il paziente e da’ consigli utili x continuare a migliorare nel percorso di riabilitazione.", d: "2 settimane fa" },
            { n: "Samuele Pini", t: "Mi sono rotto il crociato e subito ho deciso di iniziare il mio percorso preoperatorio grazie al quale ho potuto affrontare la riabilitazione molto meglio, psicologicamente più sollevato. Grazie al Dott. Mirco e al suo staff, dotato di ottima preparazione", d: "1 mese fa" },
            { n: "Federico Zagni", t: "Professionista e collega di alto livello! Grande empatia e professionalità!", d: "3 settimane fa" },
            { n: "Alessandro Papazzoni", t: "Ci sono andato per la mia caviglia e mi hanno aiutato con molta cura e attenzione, in più sono migliorato velocemente.", d: "10 mesi fa" },
            { n: "Elisa Cavazzoli", t: "Con Mirco mi sono trovata bene fin da subito. È ATTENTO e molto preparato nonostante la giovane età. Con i giusti esercizi e le giuste tempistiche sono riuscita a gestire e risolvere il mio problema, sono molto contenta! Consigliatissimo a tutti!!", d: "1 anno fa" },
            { n: "Edoardo Marchesi", t: "Ho portato mia mamma da lui perchè aveva male al piede destro faceva fatica a camminare, a scendere le scale non se ne parla e dopo due infiltrazioni di cortisone non era migliorata, quindi si è decisa ad andarci con ottimi risultati non solo il piede non le duole più, ma ha acquisito un po' più di sicurezza nel camminare e a fare le scale. Grazie Mirco", d: "1 anno fa" }
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
            title="Mappa Sedi Studio Fisioterapia Malavasi"
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
                  <label className="block text-2xl font-bold mb-8 tracking-tight">Qual è il motivo della visita?</label>
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
            <Link href="/privacy" className="text-slate-600 hover:text-[#55B4FF] transition-colors">Privacy Policy</Link>
            <Link href="/cookie" className="text-slate-600 hover:text-[#55B4FF] transition-colors">Cookie Policy</Link>
          </div>
          <p className="mt-6 text-[9px] text-slate-700 font-bold uppercase tracking-[0.3em]">MAGO DIGITAL™ STUDIO</p>
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