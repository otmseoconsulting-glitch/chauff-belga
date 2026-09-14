import Link from 'next/link'
import { EmergencyCTA } from '@/components/ui/EmergencyCTA'
import { H1, BodyLarge } from '@/components/ui/Typography'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="container-narrow py-20 text-center space-y-6">
      <p className="text-emergency-red font-bold text-base tracking-widest uppercase">
        Erreur 404 — Page introuvable
      </p>

      <H1>Cette page n'existe pas ou a été déplacée</H1>

      <BodyLarge className="mx-auto text-gray-600">
        Vous cherchez un chauffagiste en Belgique pour un dépannage ou un entretien ? Nos techniciens interviennent dans toutes les communes belges.
      </BodyLarge>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <EmergencyCTA />
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-gray-300 hover:border-trust-blue text-gray-800 hover:text-trust-blue font-bold py-3.5 px-6 rounded-lg transition-colors min-h-[48px]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour à l'accueil</span>
        </Link>
      </div>
    </main>
  )
}
