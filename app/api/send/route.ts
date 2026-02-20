import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, telefono, motivo, sede, data, ora } = body;

    const { data: resData, error } = await resend.emails.send({
      from: 'Studio Malavasi <onboarding@resend.dev>',
      to: ['thinh.dutong00@gmail.com'], // La tua email dove riceverai le notifiche
      subject: `Nuova Prenotazione: ${nome}`,
      html: `
        <h2>Dettagli Prenotazione</h2>
        <p><strong>Paziente:</strong> ${nome}</p>
        <p><strong>Telefono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sede:</strong> ${sede}</p>
        <p><strong>Data:</strong> ${data} alle ore ${ora}</p>
        <p><strong>Motivo:</strong> ${motivo}</p>
      `,
    });

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json(resData);
  } catch (error) {
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}