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

    // Gestione corretta dell'oggetto risposta con await
    const { data, error } = await resend.emails.send({
      from: 'Studio Malavasi <onboarding@resend.dev>',
      to: ['fisioterapiamalavasi@gmail.com'],
      subject: `Nuova Prenotazione: ${nome}`,
      attachments: attachments,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; padding: 20px; color: #000000; line-height: 1.5;">
          <div style="max-width: 600px; margin: 0 auto;">
            
            <div style="border-bottom: 3px solid #022166; padding-bottom: 15px; margin-bottom: 35px;">
              <h1 style="color: #022166; margin: 0; font-size: 24px; font-weight: 800;">Nuova Richiesta di Prenotazione</h1>
              <p style="color: #666666; margin: 5px 0 0 0; font-size: 14px;">Inviata dal sito fisioterapiamalavasi.it</p>
            </div>

            <div style="margin-bottom: 30px;">
              <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #022166; margin: 0 0 8px 0; letter-spacing: 1px;">Dati Anagrafici</p>
              
              <div style="margin-bottom: 15px;">
                <p style="margin: 0; font-size: 13px; color: #666666;">Paziente:</p>
                <p style="margin: 2px 0 0 0; font-size: 16px; font-weight: 600; color: #000000;">${nome}</p>
              </div>

              <div style="margin-bottom: 15px;">
                <p style="margin: 0; font-size: 13px; color: #666666;">Telefono:</p>
                <p style="margin: 2px 0 0 0; font-size: 16px; font-weight: 600; color: #000000;">${telefono}</p>
              </div>

              <div style="margin-bottom: 15px;">
                <p style="margin: 0; font-size: 13px; color: #666666;">Email:</p>
                <p style="margin: 2px 0 0 0; font-size: 16px; font-weight: 600; color: #000000;">${email}</p>
              </div>
            </div>

            <div style="margin-bottom: 35px; padding: 20px; border: 1px solid #e1e8ed; border-radius: 12px;">
              <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #022166; margin: 0 0 15px 0; letter-spacing: 1px;">Dettagli Visita</p>
              
              <p style="margin: 0 0 10px 0; font-size: 15px;"><strong>Sede:</strong> ${sede}</p>
              <p style="margin: 0; font-size: 15px;"><strong>Data e Ora:</strong> ${dataApp} alle ore ${ora}</p>
            </div>

            <div style="margin-bottom: 35px;">
              <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #022166; margin: 0 0 10px 0; letter-spacing: 1px;">Messaggio / Motivo</p>
              <div style="font-size: 15px; color: #333333; background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #022166;">
                ${motivo}
              </div>
            </div>

            ${attachments.length > 0 ? `
              <div style="margin-bottom: 35px; padding: 12px; border: 1px solid #022166; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #022166; font-weight: bold; font-size: 14px;">📎 È presente un file in allegato</p>
              </div>
            ` : ''}

            <div style="border-top: 1px solid #eeeeee; padding-top: 20px; text-align: center;">
              <p style="font-size: 11px; color: #999999; margin: 0;">© 2026 Fisioterapia Malavasi • Modena</p>
            </div>

          </div>
        </div>
      `
    });

    // Controllo se Resend ha restituito un errore
    if (error) {
      console.error("Errore Resend:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Errore invio:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}