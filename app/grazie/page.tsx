export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl p-10 text-center border border-slate-100">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">Richiesta Ricevuta!</h1>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          Il Dr. Malavasi o la segreteria ti contatteranno entro le prossime **24 ore** per confermare l'appuntamento.
        </p>

        <a 
          href="/" 
          className="block w-full py-4 px-6 bg-[#04285F] hover:bg-blue-900 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-blue-900/20"
        >
          Torna alla Home
        </a>
      </div>
    </div>
  );
}