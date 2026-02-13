import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PaintingGuessr — Guess the Painting',
  description:
    'A browser-based guessing game where you identify where and when famous paintings were created. Test your art history knowledge!',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎨</text></svg>',
  },
  openGraph: {
    title: 'PaintingGuessr',
    description: 'Guess where and when famous paintings were created!',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
