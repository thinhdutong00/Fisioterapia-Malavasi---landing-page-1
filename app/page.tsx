"use client";

import React, { useState, useEffect } from 'react';
import { 
  Activity, X, ChevronRight, Zap, UserRound, CheckCircle, 
  Phone, ArrowRight, Menu, Users, Star, MapPin, HeartPulse, 
  Calendar, Clock, ChevronLeft, Upload, FileText 
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

  // --- LOGICA NAVBAR ---
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

// --- FUNZIONE INVIO EMAIL RESEND ---
  const inviaPrenotazione = async () => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
    <main className="min-h-screen bg-[#F0F4F8] text-slate-800 font-sans scroll-smooth">
      
      {/* BACKGROUND DECORATIONS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-[#55B4FF]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-[#022166]/5 rounded-full blur-[100px]"></div>
      </div>

      {/* --- HEADER --- */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm h-24 flex items-center">
          <div className="w-full flex items-center px-4 md:px-6">
            <div className="flex items-center shrink-0">
              <img 
                src="https://raw.githubusercontent.com/thinhdutong00/image-fisioterapia-malavasi/92e18a782853772b8d90a1ef6e851630fc1492ae/CENTRO-FISIOTERAPICO-CAVEZZO-MODENA-1.webp" 
                alt="Logo Fisioterapia Malavasi" 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>

            <nav className="hidden xl:flex items-center gap-6 2xl:gap-10 text-[11px] 2xl:text-[12px] font-black uppercase tracking-[0.15em] text-[#022166] ml-8">
              <a href="#home" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">CHI SIAMO</a>
              <a href="#servizi" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">I NOSTRI TRATTAMENTI</a>
              <a href="#recensioni" className="hover:text-[#55B4FF] transition-all whitespace-nowrap">RECENSIONI DEI PAZIENTI</a>
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
      <section id="home" className="relative pt-36 pb-24 px-4 md:px-8 overflow-hidden bg-[#022166]">
        <div className="absolute inset-0 z-0">
          <img src="https://github.com/thinhdutong00/image-fisioterapia-malavasi/blob/main/1.png?raw=true" alt="Sfondo Anatomia" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#022166]/80 via-[#022166]/60 to-[#022166]/90"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
            <Activity size={14} className="text-[#55B4FF]" />
            Eccellenza nella Riabilitazione a Modena
          </div>
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
            Riprendi in mano il tuo <br /><span className="text-[#55B4FF]">Benessere.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Specialisti in fisioterapia e riabilitazione funzionale. Un approccio clinico su misura per tornare a muoverti senza dolore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#prenota" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#55B4FF] text-[#022166] px-9 py-4.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all group">
              Inizia il Percorso <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </a>
            <a href="#servizi" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-9 py-4.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
              I nostri trattamenti
            </a>
          </div>
        </div>
      </section>

      {/* --- TRATTAMENTI --- */}
      <section id="servizi" className="relative py-24 px-4 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#022166] tracking-tight mb-4">I Nostri Trattamenti</h2>
            <div className="w-20 h-1.5 bg-[#55B4FF] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, titolo: "Riabilitazione Post-Operatoria", icona: <Activity size={32} />, breve: "Recupero funzionale guidato dopo interventi chirurgici.", descrizione: "Percorsi basati su protocolli scientifici per ripristinare mobilità e forza.", colore: "from-blue-500/20 to-transparent" },
              { id: 2, titolo: "Terapia Manuale", icona: <UserRound size={32} />, breve: "Mobilizzazioni avanzate per il dolore articolare.", descrizione: "Manipolazioni mirate per cervicalgie e lombalgie croniche.", colore: "from-cyan-500/20 to-transparent" },
              { id: 3, titolo: "Fisioterapia Sportiva", icona: <Zap size={32} />, breve: "Trattamento infortuni e performance.", descrizione: "Gestione specifica per atleti e programmi di ritorno allo sport.", colore: "from-[#55B4FF]/20 to-transparent" },
              { id: 4, titolo: "Osteopatia", icona: <HeartPulse size={32} />, breve: "Approccio olistico per l'equilibrio.", descrizione: "Trattamenti manuali per risolvere restrizioni di mobilità globali.", colore: "from-indigo-500/20 to-transparent" },
              { id: 5, titolo: "Massoterapia", icona: <Users size={32} />, breve: "Massaggio terapeutico decontratturante.", descrizione: "Riduzione del dolore muscolare e miglioramento della circolazione.", colore: "from-sky-500/20 to-transparent" },
              { id: 6, titolo: "Tecarterapia", icona: <Zap size={32} />, breve: "Tecnologia per la biorigenerazione.", descrizione: "Accelera i processi riparativi per infiammazioni e traumi.", colore: "from-blue-400/20 to-transparent" }
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

      {/* RECENSIONI - SVANIMENTO SOLO SINISTRA */}
      <section id="recensioni" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-white to-[#F0F4F8]">
        <div className="max-w-7xl mx-auto">
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

      {/* --- DOVE SIAMO --- */}
      <section id="dove-siamo" className="py-24 px-4 relative z-10 bg-slate-50">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 lg:flex gap-12 items-center shadow-2xl">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-black text-[#022166] mb-8">Le Nostre Sedi</h3>
            {[
              { n: 'Cavezzo (MO)', a: 'Via I maggio, 95', u: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.21!2d11.0263!3d44.8384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f985b9b870d85%3A0x6ec07c46c36729a6!2sVia%201%C2%B0%20Maggio%2C%2095%2C%2041032%20Cavezzo%20MO!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit" },
              { n: 'Rovereto sulla Secchia (MO)', a: 'Via Savino Forti, 61', u: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2837.21!2d10.9500!3d44.8450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f999999999999%3A0x9999999999999999!2sVia%20Savino%20Forti%2C%2061%2C%2041030%20Rovereto%20Sulla%20Secchia%20MO!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit" }
            ].map(loc => (
              <button key={loc.n} onClick={() => setMapUrl(loc.u)} className={`w-full flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all ${mapUrl === loc.u ? 'bg-white border-[#55B4FF] shadow-lg' : 'bg-transparent border-transparent hover:bg-slate-50'}`}>
                <div className={`p-4 rounded-xl shrink-0 ${mapUrl === loc.u ? 'bg-[#55B4FF] text-white' : 'bg-[#022166] text-white'}`}><MapPin size={24} /></div>
                <div className="text-left"><p className="font-black text-[#022166] text-lg">{loc.n}</p><p className="text-xs text-slate-500 font-medium">{loc.a}</p></div>
              </button>
            ))}
          </div>
          <div className="flex-1 h-[450px] mt-10 lg:mt-0 rounded-[2rem] overflow-hidden border-[10px] border-white/60 shadow-xl relative">
            <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
          </div>
        </div>
      </section>

      {/* --- SEZIONE PRENOTAZIONE MULTISTEP (5 STEP) --- */}
      <section id="prenota" className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto bg-[#022166] rounded-[3rem] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-white/10">
            <div className="h-full bg-[#55B4FF] transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }}></div>
          </div>

          <div className="p-8 md:p-16 text-white">
            <div className="mb-10 text-center">
              <span className="text-[#55B4FF] font-black text-xs uppercase tracking-[0.2em]">Step {step} di 5</span>
              <h2 className="text-3xl font-black mt-2">Prenota la tua visita</h2>
            </div>

            <div className="min-h-[400px] flex flex-col justify-center">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <label className="block text-xl font-bold mb-6">Per quale motivo richiedi la visita?</label>
                  <textarea className="w-full bg-white/10 border border-white/20 p-5 rounded-2xl outline-none focus:bg-white focus:text-[#022166] transition-all min-h-[150px]" placeholder="Descrivi brevemente il tuo problema..." value={formData.motivo} onChange={(e) => setFormData({...formData, motivo: e.target.value})} />
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center">
                  <label className="block text-xl font-bold mb-4">Hai referti o esami?</label>
                  <p className="text-white/60 mb-8 font-medium">Facoltativo: carica una foto o un PDF.</p>
                  <div className="relative border-2 border-dashed border-white/20 rounded-[2rem] p-12 hover:border-[#55B4FF] transition-colors group">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    <div className="flex flex-col items-center">
                      {file ? <FileText className="text-[#55B4FF] mb-4" size={48} /> : <Upload className="text-white/40 group-hover:text-[#55B4FF] mb-4" size={48} />}
                      <span className="font-bold text-sm uppercase tracking-widest">{file ? file.name : "Carica file"}</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                  <label className="block text-xl font-bold mb-6 text-center">Dove preferisci effettuare la visita?</label>
                  {['Sede Cavezzo (MO)', 'Sede Rovereto (MO)', 'Domicilio'].map((s) => (
                    <button key={s} onClick={() => setFormData({...formData, sede: s})} className={`w-full p-6 rounded-2xl border-2 font-black transition-all text-left flex justify-between items-center ${formData.sede === s ? 'border-[#55B4FF] bg-[#55B4FF] text-[#022166]' : 'border-white/10 bg-white/5 text-white hover:border-white/30'}`}>
                      {s} {formData.sede === s && <CheckCircle size={20} />}
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 4: CALENDARIO E ORARIO PREMIUM */}
              {step === 4 && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <label className="block text-xl font-bold text-center mb-8">Seleziona Data e Orario</label>
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div className="bg-white/5 p-4 rounded-[2rem] border border-white/10">
                      <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-xs font-black uppercase tracking-widest text-[#55B4FF]">
                          {oggi.toLocaleString('it-IT', { month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                 {['L', 'M', 'M', 'G', 'V', 'S', 'D'].map((g, idx) => (
  <span key={idx} className="text-[10px] font-bold opacity-40 uppercase">{g}</span>
))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {giorniMese.map((data, i) => {
                          const isoData = data.toISOString().split('T')[0];
                          const isSelected = formData.data === isoData;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setFormData({...formData, data: isoData})}
                              className={`aspect-square rounded-xl text-sm font-bold transition-all flex items-center justify-center
                                ${isSelected 
                                  ? 'bg-[#55B4FF] text-[#022166] shadow-lg shadow-[#55B4FF]/20 scale-110' 
                                  : 'hover:bg-white/10 text-white'}`}
                            >
                              {data.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

<div className="space-y-4">
  <span className="text-xs font-black uppercase tracking-widest text-[#55B4FF] block mb-2">Orari disponibili</span>
  {/* AGGIUNTO: max-h e overflow per gestire molti orari */}
  <div className="grid grid-cols-3 gap-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
    {orariDisponibili.map((ora) => (
      <button
        key={ora}
        type="button"
        onClick={() => setFormData({...formData, ora: ora})}
        className={`p-3 rounded-xl border-2 text-sm font-bold transition-all text-center
          ${formData.ora === ora 
            ? 'border-[#55B4FF] bg-[#55B4FF] text-[#022166]' 
            : 'border-white/10 bg-white/5 text-white hover:border-white/30'}`}
      >
        {ora}
      </button>
    ))}
  </div>
</div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                  <label className="block text-xl font-bold mb-6 text-center">Dati di contatto</label>
                  <input type="text" placeholder="Nome e Cognome" className="w-full bg-white/10 border border-white/20 p-5 rounded-2xl outline-none focus:bg-white focus:text-[#022166] transition-all" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="tel" placeholder="Telefono" className="bg-white/10 border border-white/20 p-5 rounded-2xl outline-none focus:bg-white focus:text-[#022166] transition-all" value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
                    <input type="email" placeholder="Email" className="bg-white/10 border border-white/20 p-5 rounded-2xl outline-none focus:bg-white focus:text-[#022166] transition-all" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer pt-4">
                    <input type="checkbox" className="w-5 h-5 rounded accent-[#55B4FF]" checked={formData.privacy} onChange={(e) => setFormData({...formData, privacy: e.target.checked})} />
                    <span className="text-xs text-white/60">Accetto la privacy policy</span>
                  </label>
                </div>
              )}
            </div>

            <div className="mt-12 flex gap-4">
              {step > 1 && <button onClick={prevStep} className="p-5 border-2 border-white/10 rounded-2xl text-white hover:bg-white/10"><ChevronLeft size={24} /></button>}
              <button 
               onClick={step === 5 ? inviaPrenotazione : nextStep}
                disabled={
                  (step === 3 && !formData.sede) || 
                  (step === 4 && (!formData.data || !formData.ora)) ||
                  (step === 5 && (!formData.nome || !formData.privacy))
                }
                className="flex-1 bg-[#55B4FF] text-[#022166] py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-30"
              >
                {step === 5 ? 'Invia' : 'Continua'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- MODALE TRATTAMENTI --- */}
      {selectedTrattamento && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#022166]/60 backdrop-blur-md" onClick={() => setSelectedTrattamento(null)}></div>
          <div className="relative bg-white rounded-[3rem] p-8 md:p-12 max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedTrattamento(null)} className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-[#022166] hover:bg-red-500 hover:text-white transition-colors"><X size={24} /></button>
            <div className="text-[#55B4FF] mb-6">{selectedTrattamento.icona}</div>
            <h3 className="text-3xl font-black text-[#022166] mb-6">{selectedTrattamento.titolo}</h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{selectedTrattamento.descrizione}</p>
            <a href="#prenota" onClick={() => setSelectedTrattamento(null)} className="block w-full text-center bg-[#022166] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#55B4FF]">Prenota Visita</a>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center border-t border-white/20 bg-white/40 backdrop-blur-md">
        <p className="text-[#022166] font-black tracking-widest text-[10px] uppercase">© 2026 Fisioterapia Malavasi • Modena</p>
      </footer>
    </main>
  );
}