import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Usiamo la chiave che hai messo su Vercel
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const nome = formData.get('nome') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string;
    const motivo = formData.get('motivo') as string;
    const sede = formData.get('sede') as string;
    const dataApp = formData.get('data') as string;
    const ora = formData.get('ora') as string;
    const file = formData.get('file') as File | null;

    let attachments = [];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Usiamo una costante per la risposta e aggiungiamo await
    const { data, error } = await resend.emails.send({
      from: 'Studio Malavasi <onboarding@resend.dev>',
      to: ['fisioterapiamalavasi@gmail.com'], 
      subject: `Nuova Prenotazione: ${nome}`,
      attachments: attachments,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #022166;">Nuova Richiesta di Prenotazione</h2>
          <p><strong>Paziente:</strong> ${nome}</p>
          <p><strong>Telefono:</strong> ${telefono}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sede:</strong> ${sede}</p>
          <p><strong>Data:</strong> ${dataApp} ore ${ora}</p>
          <p><strong>Messaggio:</strong> ${motivo}</p>
        </div>
      `
    });

    if (error) {
      console.error("Errore Resend:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Errore Generale:", err);
    return NextResponse.json({ error: "Errore durante l'invio" }, { status: 500 });
  }
}