import { Resend } from 'resend';
import { NextResponse } from 'next/server';

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

    const data = await resend.emails.send({
      from: 'Studio Malavasi <onboarding@resend.dev>',
      to: ['thinh.dutong00@gmail.com'], 
      subject: `Nuova Prenotazione: ${nome}`,
      attachments: attachments,
      html: `
        <div style="font-family: sans-serif; color: #000000;">
          <h2 style="color: #000000; margin-bottom: 20px;">Nuova richiesta di prenotazione</h2>
          <p style="color: #000000; margin: 5px 0;"><strong>Paziente:</strong> ${nome}</p>
          <p style="color: #000000; margin: 5px 0;"><strong>Telefono:</strong> ${telefono}</p>
          <p style="color: #000000; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="color: #000000; margin: 5px 0;"><strong>Sede:</strong> ${sede}</p>
          <p style="color: #000000; margin: 5px 0;"><strong>Appuntamento:</strong> ${dataApp} alle ore ${ora}</p>
          <p style="color: #000000; margin: 5px 0;"><strong>Motivo:</strong> ${motivo}</p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Errore invio:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}