import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "./lib/booking-context";
import { AuthProvider } from "./lib/auth-context";
import { ToastProvider } from "./lib/toast-context";
import { ThemeProvider } from "./lib/theme-context";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });

export const metadata: Metadata = {
  title: "TekK - Din Freelance Tekniker",
  description: "TekK - Tekniske kompetencer, indlejning, energioptimering samt reparation af hvidevarer og TV.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <BookingProvider>
                {children}
              </BookingProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
