import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "./lib/booking-context";
import { AuthProvider } from "./lib/auth-context";
import { ToastProvider } from "./lib/toast-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TekK - Fleksibel Arbejdskraft",
  description: "Fleksibel arbejdskraft til dine projekter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body className={`${inter.className} bg-slate-900 text-slate-200 antialiased selection:bg-orange-500 selection:text-white`}>
        <ToastProvider>
          <AuthProvider>
            <BookingProvider>
              {children}
            </BookingProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
