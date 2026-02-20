import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Leggiamo i dati come FormData (necessario per i file)
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
    
    // Se c'è un file, lo trasformiamo in un formato che Resend può inviare
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    const emailResponse = await resend.emails.send({
      from: 'Studio Malavasi <onboarding@resend.dev>',
      to: ['thinh.dutong00@gmail.com'], 
      subject: `Nuova Prenotazione: ${nome}`,
      attachments: attachments, // <--- QUI AGGIUNGIAMO L'ALLEGATO
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nuova richiesta di prenotazione</h2>
          <p><strong>Paziente:</strong> ${nome}</p>
          <p><strong>Telefono:</strong> ${telefono}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sede:</strong> ${sede}</p>
          <p><strong>Appuntamento:</strong> ${dataApp} alle ore ${ora}</p>
          <p><strong>Motivo della visita:</strong> ${motivo}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">Ricevuto da info.fisioterapiamalavasi.it</p>
        </div>
      `,
    });

    return NextResponse.json(emailResponse);
  } catch (error) {
    console.error("Errore server:", error);
    return NextResponse.json({ error: "Errore durante l'invio" }, { status: 500 });
  }
}