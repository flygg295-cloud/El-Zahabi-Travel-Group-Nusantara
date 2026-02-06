import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'El-Zahabi Travel - Travel Booking Platform',
  description: 'Book flights and hotels easily with El-Zahabi Travel',
  keywords: 'travel, booking, flights, hotels, tickets',
  authors: [{ name: 'El-Zahabi Travel' }],
  openGraph: {
    title: 'El-Zahabi Travel - Travel Booking Platform',
    description: 'Book flights and hotels easily with El-Zahabi Travel',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
