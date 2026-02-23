"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CookieBanner from './components/CookieBanner';
import { 
  Activity, X, ChevronRight, Zap, UserRound, CheckCircle, 
  Phone, ArrowRight, Menu, Users, Star, MapPin, HeartPulse, 
  Calendar, Clock, Plus, ChevronLeft, Upload, FileText,
  Accessibility, HandIcon, Move, Spline, Scale,
  Stethoscope, Dumbbell, UserCheck,
  // Nuove icone per approccio biomeccanico
  Dna, MoveVertical, Footprints, Layers
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
  const [mapUrl, setMapUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.216234033104!2d11.026365!3d44.838499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDUwJzE4LjYiTiAxMcKwMDEnMzQuOSJF!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit");
  const [selectedTrattamento, setSelectedTrattamento] = useState<any>(null);
  const [isHoursOpen, setIsHoursOpen] = useState(false);

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

  // --- LOGICA CALENDARIO PREMIUM ---
  const oggi = new Date();
  const giorniMese = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(oggi.getDate() + i);
    return d;
  });

  // Genera orari 9-13 e 15-21 ogni 15 minuti
  const generaOrari = () => {
    const slots = [];
    const intervalli = [
      { start: 9, end: 13 },
      { start: 15, end: 21 }
    ];

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

// --- LOGICA NAVBAR (CORRETTA PER SNAP SCROLL) ---
  useEffect(() => {
    const mainContainer = document.querySelector('main');
    
    const controlNavbar = () => {
      if (mainContainer) {
        const currentScrollY = mainContainer.scrollTop;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
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

// --- FUNZIONE INVIO EMAIL RESEND ---
const inviaPrenotazione = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value.toString());
      });
      if (file) {
        data.append('file', file);
      }
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
      alert("Errore di connessione. Controlla la tua rete.");
    }
  };

  return (
    // AGGIUNTO: Snap-y e overflow per gestire le slide
    <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#F0F4F8] text-slate-800 font-sans">
      
      {/* BACKGROUND DECORATIONS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-[#55B4FF]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-[#022166]/5 rounded-full blur-[100px]"></div>
      </div>

{/* --- HEADER --- */}
      <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm h-24 flex items-center pointer-events-auto">
          <div className="w-full flex items-center px-4 md:px-6">
            <div className="flex items-center shrink-0">
              <img 
                src="https://raw.githubusercontent.com/thinhdutong00/image-fisioterapia-malavasi/92e18a782853772b8d90a1ef6e851630fc1492ae/CENTRO-FISIOTERAPICO-CAVEZZO-MODENA-1.webp" 
                alt="Logo Fisioterapia Malavasi" 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>

            <nav className="hidden xl:flex items-center gap-5 2xl:gap-8 text-[11px] 2xl:text-[12px] font-black uppercase tracking-[0.15em] text-[#022166] ml-8">
              <a href="#home" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">CHI SIAMO</a>
              <a href="#servizi" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">TRATTAMENTI</a>
              <a href="#team" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">TEAM</a>
              <a href="#recensioni" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">RECENSIONI</a>
              <a href="#dove-siamo" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">DOVE SIAMO</a>
            </nav>

            <div className="flex items-center gap-3 ml-auto shrink-0">
              <a href="tel:3338225464" className="flex items-center gap-2 bg-white border-2 border-[#022166] text-[#022166] px-4 py-2.5 rounded-xl font-bold text-[11px] hover:bg-[#022166] hover:text-white transition-all whitespace-nowrap">
                <Phone size={14} /> <span className="hidden lg:inline">333 822 5464</span>
              </a>
              <a href="#prenota" className="flex items-center gap-2 bg-[#022166] text-white px-5 py-2.5 rounded-xl font-bold text-[11px] hover:bg-[#55B4FF] transition-all shadow-md whitespace-nowrap">
                PRENOTA ORA
              </a>
              <button className="xl:hidden text-[#022166] ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="home" className="h-screen w-full snap-start snap-always relative flex items-center justify-center px-4 md:px-8 overflow-hidden bg-[#022166]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://github.com/thinhdutong00/image-fisioterapia-malavasi/blob/main/1.png?raw=true" 
            alt="Sfondo Anatomia" 
            className="w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#022166]/80 via-[#022166]/60 to-[#022166]/90"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
            <Activity size={14} className="text-[#55B4FF]" />
            LA SCIENZA PENSATA PER IL TUO BENESSERE
          </div>
          
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
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
              { id: 1, titolo: "Riabilitazione Post-Chirurgica (Protesi e LCA)", icona: <Accessibility size={32} />, breve: "Percorsi specialistici per il recupero della mobilità dopo interventi di protesi (anca/ginocchio) o ricostruzione legamentosa (LCA).", descrizione: "L'intervento chirurgico è solo il primo passo: il vero successo dipende dalla riabilitazione. Seguo protocolli basati sulle più recenti evidenze scientifiche per ridurre l'infiammazione, recuperare la forza muscolare e restituirti la piena autonomia nel minor tempo possibile. Non lasciare che la cicatrice limiti il tuo movimento.", colore: "from-blue-500/20 to-transparent" },
              { id: 2, titolo: "Trattamento Cervicalgia, Lombalgia ed Ernie del Disco", icona: <MoveVertical size={32} />, breve: "Soluzioni efficaci per eliminare il dolore alla colonna vertebrale, sciatalgie e tensioni muscolari legate alla postura.", descrizione: "Il mal di schiena non deve diventare una condizione normale della tua vita. Attraverso tecniche di terapia manuale e manipolazioni mirate, agisco sulla causa del dolore (sia essa meccanica, posturale o compressiva) per liberare le articolazioni e rilassare i tessuti profondi. Torna a muoverti senza paura di rimanere bloccato.", colore: "from-cyan-500/20 to-transparent" },
              { id: 3, titolo: "Fisioterapia Sportiva e Recupero Traumi da Sport", icona: <Footprints size={32} />, breve: "Trattamento specialistico per distorsioni alla caviglia, lesioni muscolari e problematiche articolari della spalla.", descrizione: "Per uno sportivo, ogni giorno fermo è un giorno perso. Mi occupo del trattamento di traumi acuti e cronici, applicando tecniche che accelerano la riparazione dei tessuti e prevengono future recidive. Dalla gestione della fase acuta al ritorno in campo, ogni fase è monitorata per garantirti la massima performance.", colore: "from-[#55B4FF]/20 to-transparent" },
              { id: 4, titolo: "Cura delle Tendiniti e Infiammazioni Croniche", icona: <Dna size={32} />, breve: "Trattamento per dolore al gomito (epicondilite), tendine d'Achille e fascite plantare con approcci conservativi avanzati.", descrizione: "Le tendinopatie richiedono pazienza e competenza specifica: il riposo assoluto spesso non basta. Utilizzo un approccio combinato di terapia manuale ed esercizio terapeutico per rieducare il tendine al carico, eliminando quel dolore persistente che ostacola i tuoi gesti quotidiani o la tua corsa.", colore: "from-indigo-500/20 to-transparent" },
              { id: 5, titolo: "Riabilitazione Posturale e Cefalee Muscolo-Tensive", icona: <Layers size={32} />, breve: "Risoluzione di rigidità, formicolii e cefalee causate da posture prolungate davanti al PC o stress lavorativo.", descrizione: "Ore trascorse in smartworking o alla guida creano squilibri che sfociano in mal di testa e pesantezza alle spalle. Il mio intervento mira a riequilibrare le catene muscolari e a darti gli strumenti ergonomici per proteggere il tuo corpo durante il lavoro. Riconquista una postura naturale e senza tensioni.", colore: "from-sky-500/20 to-transparent" },
              { id: 6, titolo: "Altri Trattamenti", icona: <Plus size={32} />, breve: "Descrivici la tua condizione per un approccio su misura.", descrizione: "Ogni corpo ha una storia unica e non tutte le patologie rientrano in categorie standard. Che si tratti di dolori articolari diffusi, riabilitazione neurologica, problemi post-traumatici complessi o semplicemente il desiderio di un check-up preventivo, sono qui per ascoltarti. Utilizzeremo il modulo di prenotazione per analizzare il tuo caso specifico ancora prima del tuo arrivo in studio.", colore: "from-blue-400/20 to-transparent" }
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
      <section id="team" className="min-h-screen w-full snap-start snap-always relative flex items-center justify-center py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 w-full py-10">
          <div className="text-center mb-16">
            <span className="text-[#55B4FF] font-black text-xs uppercase tracking-[0.3em] mb-4 block">Professionalità e Competenza</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#022166] tracking-tight mb-4">Il Nostro Team</h2>
            <div className="w-20 h-1.5 bg-[#55B4FF] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                nome: "Mirco Malavasi", 
                ruolo: "Fisioterapista OMPT", 
                specialita: "Specializzato in riabilitazione muscolo-scheletrica e fisioterapia oncologica", 
                foto: "/mirco.webp" 
              },
              { 
                nome: "Alice Nanetti", 
                ruolo: "Fisioterapista", 
                specialita: "Specializzata in riabilitazione muscolo-scheletrica e fisioterapia neurologica", 
                foto: "/alice.jpg" 
              },
              { 
                nome: "Luca Rabaglia", 
                ruolo: "Fisioterapista", 
                specialita: "Specializzato in riabilitazione muscolo-scheletrica e fisioterapia sportiva", 
                foto: "/luca.webp" 
              }
            ].map((membro, idx) => (
              <div key={idx} className="group relative bg-white/40 backdrop-blur-md border border-white/60 rounded-[3rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={membro.foto} 
                    alt={membro.nome} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#022166]/80 via-transparent to-transparent opacity-60"></div>
                </div>
                
                <div className="p-8 relative">
                  <div className="absolute -top-12 left-8 bg-[#55B4FF] text-[#022166] px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                    {membro.ruolo}
                  </div>
                  <h3 className="text-2xl font-black text-[#022166] mb-2">{membro.nome}</h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {membro.specialita}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RECENSIONI --- */}
      <section id="recensioni" className="h-screen w-full snap-start snap-always py-24 px-4 relative overflow-hidden bg-gradient-to-b from-white to-[#F0F4F8] flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
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

          <div className="relative group px-4 md:px-16">
            <div 
              style={{ 
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 15%)' 
              }}
            >
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next-custom',
                  prevEl: '.swiper-button-prev-custom',
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
                breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                className="!pb-20 !overflow-visible"
              >
                {[
                  { n: "Federico Rossi", t: "Eccellente professionista. Mi ha seguito dopo un intervento al menisco con una tabella di marcia perfetta. Recupero rapido e completa mobilità riacquisita in tempi record.", d: "2 giorni fa" },
                  { n: "Giulia Ferrari", t: "Il Dott. Malavasi è molto preparato e trasmette grande sicurezza. Ha risolto i miei problemi di postura e mal di schiena che mi portavo dietro da anni. Studio impeccabile.", d: "1 settimana fa" },
                  { n: "Alessandro Moretti", t: "Ottima esperienza per un infortunio muscolare durante la preparazione atletica. Molto utile la Tecarterapia abbinata ai trattamenti manuali. Tornerò sicuramente.", d: "2 settimane fa" },
                  { n: "Valentina Gatti", t: "Professionista serio, puntuale e molto onesto. Mi ha spiegato ogni passaggio della terapia con molta chiarezza. I dolori cervicali sono spariti dopo solo tre sedute.", d: "3 settimane fa" },
                  { n: "Matteo Bianchi", t: "Ho apprezzato molto la flessibilità degli orari e la disponibilità. Trattamenti mirati ed efficaci. Uno dei migliori centri di fisioterapia della zona Modena/Cavezzo.", d: "1 mese fa" },
                  { n: "Elena Piazzi", t: "Servizio a domicilio eccellente per mia madre anziana. Grande umanità e pazienza, oltre alla competenza tecnica. Un supporto fondamentale per la nostra famiglia.", d: "1 mese fa" }
                ].map((rev, i) => (
                  <SwiperSlide key={i} className="h-auto">
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 h-full flex flex-col relative shadow-lg shadow-blue-900/[0.02] hover:shadow-2xl transition-all duration-500 group">
                      <div className="flex gap-0.5 text-yellow-400 mb-6">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                      <p className="text-slate-700 font-medium text-lg leading-relaxed flex-grow italic">"{rev.t}"</p>
                      <div className="flex items-center gap-4 mt-10 pt-8 border-t border-slate-50">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#022166] to-[#0a3a8a] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">{rev.n[0]}</div>
                        <div>
                          <p className="font-black text-[#022166] text-lg leading-none">{rev.n}</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5">{rev.d}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <button className="swiper-button-prev-custom absolute top-1/2 -left-2 md:-left-6 -translate-y-1/2 z-50 w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center text-[#022166] shadow-2xl hover:bg-[#55B4FF] hover:text-white transition-all">
              <ChevronLeft size={28} />
            </button>
            <button className="swiper-button-next-custom absolute top-1/2 -right-2 md:-right-6 -translate-y-1/2 z-50 w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center text-[#022166] shadow-2xl hover:bg-[#55B4FF] hover:text-white transition-all">
              <ChevronRight size={28} />
            </button>
            <div className="swiper-pagination-custom flex justify-center mt-10 gap-2"></div>
          </div>
        </div>
      </section>

{/* --- DOVE SIAMO - CREATIVE SPLIT LAYOUT --- */}
      <section id="dove-siamo" className="h-screen w-full snap-start snap-always relative z-10 bg-white flex flex-col lg:flex-row overflow-hidden">
        
        {/* LATO TESTI E SELEZIONE */}
        <div className="lg:w-2/5 w-full p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#55B4FF]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <span className="text-[#55B4FF] font-black text-xs uppercase tracking-[0.3em] mb-4 block">Vicinanza e Accessibilità</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#022166] tracking-tight mb-4">Dove <span className="text-[#55B4FF]">Trovarci</span></h2>
            <p className="text-slate-500 font-medium mb-12 max-w-sm">Scegli la sede più vicina a te e visualizza il percorso interattivo.</p>
            
            <div className="space-y-4">
              {[
                { n: 'Cavezzo (MO)', a: 'Via I maggio, 95', u: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.425145838563!2d11.0268581766627!3d44.8333169710705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f9506637e1967%3A0xc3f6050519965f3a!2sVia%20I%20Maggio%2C%2095%2C%2041032%20Cavezzo%20MO!5e0!3m2!1sit!2sit!4v1709564800000!5m2!1sit!2sit" },
                { n: 'Rovereto sulla Secchia (MO)', a: 'Via Savino Forti, 61', u: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2837.2847594821564!2d10.957548776661955!3d44.82136127107067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f943f6f16428d%3A0x6b772c72b20755d5!2sVia%20Savino%20Forti%2C%2061%2C%2041016%20Rovereto%20Sulla%20Secchia%20MO!5e0!3m2!1sit!2sit!4v1709564900000!5m2!1sit!2sit" }
              ].map(loc => (
                <button 
                  key={loc.n} 
                  onClick={() => setMapUrl(loc.u)} 
                  className={`group w-full flex items-center gap-6 p-6 rounded-[2.5rem] transition-all duration-500 ${
                    mapUrl === loc.u 
                    ? 'bg-[#022166] text-white shadow-2xl shadow-blue-900/20 translate-x-4' 
                    : 'bg-white border border-slate-100 text-[#022166] hover:border-[#55B4FF]/30 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-4 rounded-2xl shrink-0 transition-colors ${
                    mapUrl === loc.u ? 'bg-[#55B4FF] text-[#022166]' : 'bg-slate-100 text-[#022166] group-hover:bg-[#55B4FF]/10'
                  }`}>
                    <MapPin size={24} />
                  </div>
                  <div className="text-left">
                    <p className={`font-black text-lg leading-none mb-1 ${mapUrl === loc.u ? 'text-white' : 'text-[#022166]'}`}>{loc.n}</p>
                    <p className={`text-xs font-bold uppercase tracking-widest ${mapUrl === loc.u ? 'text-[#55B4FF]' : 'text-slate-400'}`}>{loc.a}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* FISARMONICA ORARI */}
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all duration-300">
              <button 
                onClick={() => setIsHoursOpen(!isHoursOpen)}
                className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
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
              
              <div className={`transition-all duration-500 ease-in-out ${isHoursOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="p-6 pt-0 space-y-3 border-t border-slate-50">
                  {[
                    { d: 'Lunedì', o: '09–13, 15–20' },
                    { d: 'Martedì', o: '09–13, 15–21' },
                    { d: 'Mercoledì', o: '09–13, 15–21' },
                    { d: 'Giovedì', o: '09–13, 15–21' },
                    { d: 'Venerdì', o: '09–13, 15–20' },
                    { d: 'Sabato', o: '09–13' },
                    { d: 'Domenica', o: 'Chiuso' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{item.d}</span>
                      <span className={`text-sm font-black ${item.o === 'Chiuso' ? 'text-red-400' : 'text-[#022166]'}`}>{item.o}</span>
                    </div>
                  ))}
                  
                  <div className="pt-2">
                    <a 
                      href="#prenota" 
                      onClick={() => setIsHoursOpen(false)} 
                      className="inline-flex items-center gap-2 text-[10px] font-black text-[#55B4FF] uppercase tracking-widest italic hover:text-[#022166] transition-colors"
                    >
                      <Zap size={12} /> Riceviamo solo su appuntamento
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LATO MAPPA (FULL HEIGHT) */}
        <div className="lg:w-3/5 w-full h-full relative group bg-slate-200">
          <div className="absolute inset-0 bg-[#022166]/5 pointer-events-none z-10"></div>
          <iframe 
            src={mapUrl} 
            className="w-full h-full grayscale-[0.2] contrast-[1.1] relative z-0 transition-all duration-700 group-hover:grayscale-0" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
        </div>
      </section>

{/* --- PRENOTAZIONE MULTISTEP --- */}
      <section id="prenota" className="min-h-screen w-full snap-start snap-always py-32 px-6 bg-[#022166] flex flex-col items-center relative overflow-hidden">
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

      {/* --- MODALE TRATTAMENTI --- */}
      {selectedTrattamento && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#022166]/60 backdrop-blur-xl" onClick={() => setSelectedTrattamento(null)}></div>
          <div className="relative bg-white rounded-[4rem] p-10 md:p-16 max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedTrattamento(null)} className="absolute top-10 right-10 p-2 text-[#022166] hover:rotate-90 transition-transform"><X size={32} /></button>
            <div className="text-[#55B4FF] mb-8">{selectedTrattamento.icona}</div>
            <h3 className="text-4xl font-black text-[#022166] mb-8 tracking-tighter">{selectedTrattamento.titolo}</h3>
            <p className="text-slate-500 text-xl leading-relaxed mb-10 font-medium">{selectedTrattamento.descrizione}</p>
            <a href="#prenota" onClick={() => setSelectedTrattamento(null)} className="block w-full text-center bg-[#022166] text-white py-6 rounded-full font-black uppercase tracking-widest hover:bg-[#55B4FF] transition-all shadow-xl">Prenota Visita</a>
          </div>
        </div>
      )}
      
      <CookieBanner />
    </main>
  );
}