"use server";

import { Resend } from 'resend';
import { BookingRequest } from '../lib/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmails(booking: BookingRequest) {
  const adminEmail = process.env.ADMIN_EMAIL || 'cwk@tekk.dk';
  if (!process.env.RESEND_API_KEY) {
    console.log("Email integration not fully configured yet. Skipping email sending for booking:", booking);
    return { success: true, message: "Email skipped (missing config)" };
  }

  const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  // Tilføj afsender-navn, hvis der bruges eget domæne
  const formattedFrom = emailFrom.includes('@tekk.dk') ? `Christian Wessel Knaack <${emailFrom}>` : emailFrom;

  try {
    // 1. Send email to Admin
    await resend.emails.send({
      from: formattedFrom,
      to: adminEmail,
      subject: `Ny Booking Forespørgsel: ${booking.date} - ${booking.name}`,
      html: `
        <h2>Ny Booking Forespørgsel</h2>
        <p><strong>Dato:</strong> ${booking.date}</p>
        <p><strong>Tidsrum:</strong> ${booking.startTime || 'Ikke angivet'} - ${booking.endTime || 'Ikke angivet'}</p>
        <p><strong>Navn:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email || 'Ikke oplyst'}</p>
        <p><strong>Telefon:</strong> ${booking.phone}</p>
        <p><strong>Adresse:</strong> ${booking.address || 'Ikke oplyst'}</p>
        <p><strong>Timer:</strong> ${booking.hours}</p>
        <p><strong>Estimeret Pris (ekskl. moms):</strong> ${booking.price} kr.</p>
        <p><strong>Beskrivelse:</strong><br/> ${booking.description || 'Ingen beskrivelse'}</p>
        <br/>
        <p>Log ind på admin panelet for at godkende eller afvise.</p>
      `
    });

    // 2. Send confirmation email to Customer (if they provided an email)
    if (booking.email) {
      const numericPrice = parseFloat(booking.price.replace(/\./g, '').replace(',', '.'));
      const formatCurrency = (val: number) => new Intl.NumberFormat('da-DK').format(val);
      const priceWithVAT = formatCurrency(numericPrice * 1.25);

      await resend.emails.send({
        from: formattedFrom,
        to: booking.email,
        subject: `Bekræftelse på booking forespørgsel hos TekK`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; line-height: 1.5; color: #333;">
            <h2>Hej ${booking.name}</h2>
            <p>Tak for din forespørgsel hos TekK.</p>
            <p>Jeg har modtaget din anmodning for datoen <strong>${booking.date}</strong>.</p>
            
            <p><strong>Detaljer:</strong></p>
            <ul style="background: #f8f9fa; padding: 15px 15px 15px 35px; border-radius: 5px;">
              <li>Tidsrum: ${booking.startTime || 'Ikke angivet'} - ${booking.endTime || 'Ikke angivet'}</li>
              <li>Timer: ${booking.hours}</li>
              <li>Adresse: ${booking.address || 'Ikke oplyst'}</li>
              <li>Estimeret pris ekskl. moms: ${booking.price} kr.</li>
              <li>Estimeret pris inkl. moms: ${priceWithVAT} kr.</li>
            </ul>
            
            <p>Jeg vender tilbage til dig hurtigst muligt med en endelig bekræftelse.</p>
            
            <br/>
            <p>Med venlig hilsen,<br/>
            <strong>Christian Wessel Knaack</strong><br/>
            TekK</p>
          </div>
        `
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Kunne ikke sende email." };
  }
}

export async function sendContactEmail(data: { name: string, phone: string, email?: string, message: string }) {
  const adminEmail = process.env.ADMIN_EMAIL || 'cwk@tekk.dk';
  
  if (!process.env.RESEND_API_KEY) {
    console.log("Email integration not fully configured yet. Skipping standard contact email:", data);
    return { success: true, message: "Email skipped (missing config)" };
  }

  const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const formattedFrom = emailFrom.includes('@tekk.dk') ? `TekK Hjemmeside <${emailFrom}>` : emailFrom;

  try {
    await resend.emails.send({
      from: formattedFrom,
      to: adminEmail,
      subject: `Ny Kontakthenvendelse fra: ${data.name}`,
      html: `
        <h2>Ny Kontakthenvendelse (TekK)</h2>
        <p><strong>Navn:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email || 'Ikke oplyst'}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
        <p><strong>Besked:</strong></p>
        <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;">${data.message.replace(/\n/g, '<br/>') || 'Ingen besked'}</p>
      `
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error: "Kunne ikke sende email." };
  }
}

export async function sendRepairEmail(data: {
  deviceType: string;
  brand: string;
  modelNumber?: string;
  issueDescription: string;
  serviceType?: string;
  name: string;
  phone: string;
  email: string;
  city?: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || 'cwk@tekk.dk';

  if (!process.env.RESEND_API_KEY) {
    console.log("Email integration not fully configured yet. Logging repair request:", data);
    return { success: true, message: "Logged without Resend key" };
  }

  const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const formattedFrom = emailFrom.includes('@tekk.dk') ? `TekK Reparation <${emailFrom}>` : emailFrom;

  try {
    await resend.emails.send({
      from: formattedFrom,
      to: adminEmail,
      subject: `Ny Reparationsforespørgsel: ${data.deviceType} (${data.brand}) - ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; line-height: 1.5; color: #333;">
          <h2 style="color: #c29b62; border-bottom: 2px solid #eee; padding-bottom: 8px;">Ny Hvidevare / TV Reparationsforespørgsel</h2>
          
          <h3 style="margin-top: 16px;">Apparatdetaljer</h3>
          <ul style="background: #f8f9fa; padding: 15px 15px 15px 35px; border-radius: 5px; list-style-type: square;">
            <li><strong>Type:</strong> ${data.deviceType}</li>
            <li><strong>Mærke / Brand:</strong> ${data.brand}</li>
            <li><strong>Modelnummer:</strong> ${data.modelNumber || 'Ikke oplyst'}</li>
            <li><strong>Foretrukken service:</strong> ${data.serviceType || 'Ikke specificeret'}</li>
          </ul>

          <h3>Fejlbeskrivelse & Symptomer</h3>
          <p style="background: #fff8f0; border-left: 4px solid #c29b62; padding: 12px 15px; border-radius: 4px; white-space: pre-wrap;">${data.issueDescription}</p>

          <h3>Kundeoplysninger</h3>
          <ul style="background: #f8f9fa; padding: 15px 15px 15px 35px; border-radius: 5px;">
            <li><strong>Navn:</strong> ${data.name}</li>
            <li><strong>Telefon:</strong> <a href="tel:${data.phone}">${data.phone}</a></li>
            <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
            <li><strong>By / Postnummer:</strong> ${data.city || 'Ikke angivet'}</li>
          </ul>
        </div>
      `
    });

    // Send confirmation to customer if email is provided
    if (data.email) {
      await resend.emails.send({
        from: formattedFrom,
        to: data.email,
        subject: `TekK - Vi har modtaget din reparationsforespørgsel (${data.deviceType})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; line-height: 1.6; color: #333;">
            <h2>Hej ${data.name}</h2>
            <p>Mange tak for din henvendelse vedrørende reparation af dit apparat (<strong>${data.brand} ${data.deviceType}</strong>).</p>
            <p>Jeg har modtaget dine oplysninger og vil gennemgå fejlbeskrivelsen snarest muligt for at vurdere reservedele, pris og reparationsmuligheder.</p>
            <p>Jeg kontakter dig hurtigst muligt pr. telefon eller mail.</p>
            <br/>
            <p>Med venlig hilsen,<br/>
            <strong>Christian Wessel Knaack</strong><br/>
            TekK | Tlf. 31 69 44 02<br/>
            <a href="mailto:cwk@tekk.dk">cwk@tekk.dk</a></p>
          </div>
        `
      }).catch(err => console.warn("Failed sending customer confirmation:", err));
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send repair email:", error);
    return { success: false, error: "Kunne ikke sende email." };
  }
}

export async function sendEnergyInquiryEmail(data: {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  facilityType: string;
  focusAreas?: string;
  message?: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || 'cwk@tekk.dk';

  if (!process.env.RESEND_API_KEY) {
    console.log("Email integration not fully configured yet. Logging energy inquiry:", data);
    return { success: true, message: "Logged without Resend key" };
  }

  const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const formattedFrom = emailFrom.includes('@tekk.dk') ? `TekK Energioptimering <${emailFrom}>` : emailFrom;

  try {
    await resend.emails.send({
      from: formattedFrom,
      to: adminEmail,
      subject: `Ny Energioptimeringshenvendelse fra: ${data.companyName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; line-height: 1.5; color: #333;">
          <h2 style="color: #c29b62;">Ny Energioptimeringsforespørgsel</h2>
          <p><strong>Virksomhed:</strong> ${data.companyName}</p>
          <p><strong>Kontaktperson:</strong> ${data.contactPerson}</p>
          <p><strong>Telefon:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Type af facilitet:</strong> ${data.facilityType}</p>
          <p><strong>Fokusområder:</strong> ${data.focusAreas || 'Generel energiscreening'}</p>
          <p><strong>Besked / Noter:</strong></p>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;">${data.message?.replace(/\n/g, '<br/>') || 'Ingen yderligere besked'}</p>
        </div>
      `
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send energy email:", error);
    return { success: false, error: "Kunne ikke sende email." };
  }
}
