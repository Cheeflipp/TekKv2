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

  try {
    // 1. Send email to Admin
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: adminEmail,
      subject: `Ny Booking Forespørgsel: ${booking.date} - ${booking.name}`,
      html: `
        <h2>Ny Booking Forespørgsel</h2>
        <p><strong>Dato:</strong> ${booking.date}</p>
        <p><strong>Navn:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email || 'Ikke oplyst'}</p>
        <p><strong>Telefon:</strong> ${booking.phone}</p>
        <p><strong>Adresse:</strong> ${booking.address || 'Ikke oplyst'}</p>
        <p><strong>Timer:</strong> ${booking.hours}</p>
        <p><strong>Estimeret Pris:</strong> ${booking.price} kr.</p>
        <p><strong>Beskrivelse:</strong><br/> ${booking.description || 'Ingen beskrivelse'}</p>
        <br/>
        <p>Log ind på admin panelet for at godkende eller afvise.</p>
      `
    });

    // 2. Send confirmation email to Customer (if they provided an email)
    if (booking.email) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: booking.email,
        subject: `Bekræftelse på booking forespørgsel hos TekK`,
        html: `
          <h2>Hej ${booking.name}</h2>
          <p>Tak for din forespørgsel på fleksibel arbejdskraft hos TekK.</p>
          <p>Vi har modtaget din anmodning for datoen <strong>${booking.date}</strong>.</p>
          <p><strong>Detaljer:</strong></p>
          <ul>
            <li>Timer: ${booking.hours}</li>
            <li>Estimeret pris: ${booking.price} kr.</li>
          </ul>
          <p>Vi vender tilbage til dig hurtigst muligt med en endelig bekræftelse.</p>
          <br/>
          <p>Med venlig hilsen,<br/>TekK</p>
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

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: adminEmail,
      subject: `Ny Kontakthenvendelse fra: ${data.name}`,
      html: `
        <h2>Ny Kontakthenvendelse (TekK)</h2>
        <p><strong>Navn:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email || 'Ikke oplyst'}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
        <p><strong>Besked:</strong></p>
        <p>${data.message.replace(/\n/g, '<br/>') || 'Ingen besked'}</p>
      `
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error: "Kunne ikke sende email." };
  }
}
