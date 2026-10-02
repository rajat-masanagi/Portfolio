import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { assetPath } from '@/lib/paths';
import localFont from 'next/font/local';
import './globals.css';
const inter = localFont({ src: '../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', variable: '--font-inter', display: 'swap' });
const newsreader = localFont({ src: '../node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2', variable: '--font-newsreader', display: 'swap' });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Rajat Masanagi — Software Developer', template: '%s — Rajat Masanagi' },
  description: 'Software developer based in Mumbai. Explore Rajat Masanagi’s work in distributed systems, geospatial intelligence, and AI workflows.',
  openGraph: { title: 'Rajat Masanagi', description: 'Software Developer', type: 'website', images: [{ url: assetPath('/images/social-preview.jpg'), width: 1200, height: 630, alt: 'Rajat Masanagi — Software Developer' }] },
  twitter: { card: 'summary_large_image' },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" className={`${inter.variable} ${newsreader.variable}`}><body style={{ '--texture-image': `url("${assetPath('/images/charcoal-pastel.webp')}")` } as CSSProperties}><a href="#main" className="skip-link">Skip to content</a>{children}</body></html>;
}
