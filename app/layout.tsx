import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Montserrat } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RAW — Consultoría Creativa de Élite',
  description:
    'Elevamos marcas a través de dirección de arte meticulosa, diseño de alta gama e identidades visuales que trascienden lo ordinario. Especializados en estética minimalista y ejecución técnica superior.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`scroll-smooth ${jakarta.variable} ${montserrat.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=satoshi@700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased noise-overlay" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
