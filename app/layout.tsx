import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1a1a2e',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://paintingguessr.com'),
  title: {
    default: 'PaintingGuessr – Guess Where & When Famous Paintings Were Created',
    template: '%s | PaintingGuessr',
  },
  description:
    'Free art history guessing game. See a famous painting, guess where in the world and when it was painted. 5 rounds, educational, and fun. Play the daily challenge now.',
  applicationName: 'PaintingGuessr',
  authors: [{ name: 'PaintingGuessr', url: 'https://paintingguessr.com' }],
  keywords: [
    'painting guessing game',
    'art history quiz',
    'guess the painting',
    'art geography game',
    'famous paintings quiz',
    'art education game',
    'free art game online',
  ],
  creator: 'PaintingGuessr',
  publisher: 'PaintingGuessr',
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'PaintingGuessr',
    title: 'PaintingGuessr – Guess Where & When Famous Paintings Were Created',
    description:
      'Free art history guessing game. See a famous painting, guess the location and year. Play the daily challenge!',
    url: 'https://paintingguessr.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PaintingGuessr — guess the location and year of famous paintings',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaintingGuessr – Art History Guessing Game',
    description:
      'Can you guess where and when famous paintings were created? Play free.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎨</text></svg>',
  },
  category: 'games',
};

const globalJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://paintingguessr.com/#website',
      name: 'PaintingGuessr',
      url: 'https://paintingguessr.com',
      description:
        'Free art history guessing game where you guess the location and time period of famous paintings.',
      publisher: { '@id': 'https://paintingguessr.com/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://paintingguessr.com/#organization',
      name: 'PaintingGuessr',
      url: 'https://paintingguessr.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://paintingguessr.com/logo.png',
        width: 512,
        height: 512,
      },
    },
    {
      '@type': ['WebApplication', 'VideoGame'],
      '@id': 'https://paintingguessr.com/#game',
      name: 'PaintingGuessr',
      url: 'https://paintingguessr.com',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      genre: ['Educational', 'Trivia', 'Art'],
      gamePlatform: 'Web Browser',
      numberOfPlayers: { '@type': 'QuantitativeValue', value: 1 },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      author: { '@id': 'https://paintingguessr.com/#organization' },
      description:
        'Guess the location and year of famous paintings from history. 5 rounds per game, covering art from the Renaissance to modern day.',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7232104123745299"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
