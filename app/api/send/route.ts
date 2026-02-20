import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Modificato qui per evitare l'errore di Vercel in fase di Build
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, telefono, motivo, sede, data, ora } = body;

    const { data: resData, error } = await resend.emails.send({
      from: 'Studio Malavasi <onboarding@resend.dev>',
      to: ['thinh.dutong00@gmail.com'], 
      subject: `Nuova Prenotazione: ${nome}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nuova richiesta di prenotazione</h2>
          <p><strong>Paziente:</strong> ${nome}</p>
          <p><strong>Telefono:</strong> ${telefono}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sede:</strong> ${sede}</p>
          <p><strong>Appuntamento:</strong> ${data} alle ore ${ora}</p>
          <p><strong>Motivo della visita:</strong> ${motivo}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">Ricevuto da info.fisioterapiamalavasi.it</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json(resData);
  } catch (error) {
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}