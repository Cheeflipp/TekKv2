"use server";

import { Resend } from 'resend';
import { BookingRequest } from '../lib/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmails(booking: BookingRequest) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!process.env.RESEND_API_KEY || !adminEmail) {
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
  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!process.env.RESEND_API_KEY || !adminEmail) {
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
