"use server";

import { Resend } from 'resend';
import { BookingRequest } from '../lib/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmails(booking: BookingRequest) {
  const adminEmail = process.env.ADMIN_EMAIL;
  // If no API key or admin email is set, we just log it and return success 
  // so we don't break the app while waiting for the domain.
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
    // We don't want to block the booking if email fails, so we return success: false 
    // but handle it gracefully on the client.
    return { success: false, error: "Kunne ikke sende email." };
  }
}
