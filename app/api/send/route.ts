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
      subject: `📧 Nuova Prenotazione: ${nome}`,
      attachments: attachments,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f9; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #e1e8ed;">
            
            <div style="background-color: #022166; padding: 30px; text-align: center;">
              <h1 style="color: #55B4FF; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">Nuova Prenotazione</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.8;">Ricevuta dal sito web ufficiale</p>
            </div>

            <div style="padding: 40px; color: #022166;">
              <div style="margin-bottom: 30px; border-bottom: 2px solid #f0f4f8; padding-bottom: 20px;">
                <h2 style="font-size: 18px; margin-bottom: 15px;">Dati del Paziente</h2>
                <p style="margin: 8px 0;"><strong>👤 Nome:</strong> <span style="color: #444;">${nome}</span></p>
                <p style="margin: 8px 0;"><strong>📞 Telefono:</strong> <span style="color: #444;">${telefono}</span></p>
                <p style="margin: 8px 0;"><strong>✉️ Email:</strong> <span style="color: #444;">${email}</span></p>
              </div>

              <div style="margin-bottom: 30px; border-bottom: 2px solid #f0f4f8; padding-bottom: 20px;">
                <h2 style="font-size: 18px; margin-bottom: 15px;">Dettagli Appuntamento</h2>
                <p style="margin: 8px 0;"><strong>📍 Sede:</strong> <span style="color: #444;">${sede}</span></p>
                <p style="margin: 8px 0;"><strong>📅 Data:</strong> <span style="color: #444;">${dataApp}</span></p>
                <p style="margin: 8px 0;"><strong>⏰ Orario:</strong> <span style="color: #444;">${ora}</span></p>
              </div>

              <div>
                <h2 style="font-size: 18px; margin-bottom: 15px;">Motivo della Visita</h2>
                <div style="background-color: #f9fbfc; padding: 20px; border-radius: 12px; border-left: 4px solid #55B4FF; color: #444; font-style: italic; line-height: 1.6;">
                  "${motivo}"
                </div>
              </div>
              
              ${attachments.length > 0 ? `
                <div style="margin-top: 30px; padding: 15px; background-color: #eef9ff; border-radius: 8px; border: 1px solid #55B4FF; text-align: center;">
                  <p style="margin: 0; color: #022166; font-weight: bold;">📎 Un file è stato allegato a questa email</p>
                </div>
              ` : ''}
            </div>

            <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e1e8ed;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">
                © 2026 Fisioterapia Malavasi • Modena
              </p>
            </div>
          </div>
        </div>
      `
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Errore invio:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}