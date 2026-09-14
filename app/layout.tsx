import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EmergencyBar } from '@/components/layout/EmergencyBar'
import { CookieBanner } from '@/components/ui/CookieBanner'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://chauffagiste-belga.be'),
  title: {
    template: '%s | Chauffagiste-Belga',
    default: 'Chauffagiste-Belga — Spécialiste du Chauffage en Belgique',
  },
  description:
    'Chauffagiste agréé en Belgique. Dépannage chaudière ≤ 24h, entretien certifié PEB, installation et pompes à chaleur. Intervention rapide à Bruxelles, Brabant flamand et Wallonie.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be',
  },
  openGraph: {
    title: 'Chauffagiste-Belga — Spécialiste du Chauffage en Belgique',
    description: 'Dépannage, entretien et installation de chauffage dans toute la Belgique.',
    url: 'https://chauffagiste-belga.be',
    siteName: 'Chauffagiste-Belga',
    locale: 'fr_BE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#082B55',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr-BE" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <meta name="geo.region" content="BE" />
        <meta name="geo.placename" content="Belgium" />
      </head>
      <body className="bg-white text-[#102A43] font-body antialiased flex flex-col min-h-screen selection:bg-[#082B55] selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <EmergencyBar />
        <CookieBanner />
      </body>
    </html>
  )
}
