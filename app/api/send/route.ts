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
      subject: `✨ Nuova Richiesta: ${nome}`,
      attachments: attachments,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f0f4f8; padding: 30px; color: #1a2a3a;">
          <div style="max-width: 650px; margin: 0 auto; background-color: rgba(255, 255, 255, 0.9); border: 1px solid #ffffff; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);">
            
            <div style="margin-bottom: 40px; text-align: left;">
              <h1 style="color: #022166; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Nuova Prenotazione</h1>
              <div style="width: 50px; hieght: 4px; border-bottom: 4px solid #55B4FF; margin-top: 10px; border-radius: 10px;"></div>
            </div>

            <div style="display: flex; flex-wrap: wrap; margin-bottom: 30px;">
              <div style="width: 100%; margin-bottom: 20px;">
                <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #55B4FF; margin: 0 0 5px 0; letter-spacing: 1px;">Paziente</p>
                <p style="font-size: 16px; color: #022166; margin: 0; font-weight: 600;">${nome}</p>
              </div>
              
              <div style="width: 48%; margin-right: 4%; margin-bottom: 20px; display: inline-block;">
                <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #55B4FF; margin: 0 0 5px 0; letter-spacing: 1px;">Telefono</p>
                <p style="font-size: 15px; color: #000000; margin: 0;">${telefono}</p>
              </div>
              
              <div style="width: 48%; margin-bottom: 20px; display: inline-block;">
                <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #55B4FF; margin: 0 0 5px 0; letter-spacing: 1px;">Email</p>
                <p style="font-size: 15px; color: #000000; margin: 0;">${email}</p>
              </div>
            </div>

            <div style="background: rgba(2, 33, 102, 0.03); border: 1px solid rgba(2, 33, 102, 0.1); border-radius: 15px; padding: 25px; margin-bottom: 30px;">
              <div style="margin-bottom: 15px;">
                <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #022166; margin: 0 0 5px 0; letter-spacing: 1px;">📍 Sede</p>
                <p style="font-size: 15px; color: #000000; margin: 0;">${sede}</p>
              </div>
              <div>
                <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #022166; margin: 0 0 5px 0; letter-spacing: 1px;">📅 Appuntamento</p>
                <p style="font-size: 15px; color: #000000; margin: 0;">${dataApp} alle ore <strong>${ora}</strong></p>
              </div>
            </div>

            <div style="margin-bottom: 30px;">
              <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #55B4FF; margin: 0 0 10px 0; letter-spacing: 1px;">Nota del Paziente</p>
              <p style="font-size: 15px; color: #444444; margin: 0; line-height: 1.6; background: #ffffff; padding: 15px; border-radius: 10px; border: 1px solid #eef2f6;">${motivo}</p>
            </div>

            ${attachments.length > 0 ? `
              <div style="border-top: 1px dashed #cbd5e1; padding-top: 20px; text-align: center;">
                <span style="background: #e0f2fe; color: #0369a1; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;">📎 File allegato presente</span>
              </div>
            ` : ''}

            <div style="margin-top: 40px; text-align: center;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0; text-transform: uppercase; letter-spacing: 2px;">© 2026 Fisioterapia Malavasi</p>
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