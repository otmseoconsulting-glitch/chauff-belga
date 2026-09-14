'use client'

import { useEffect } from 'react'
import { EmergencyCTA } from '@/components/ui/EmergencyCTA'
import { H1, BodyLarge } from '@/components/ui/Typography'
import { RotateCcw } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error)
  }, [error])

  return (
    <main className="container-narrow py-20 text-center space-y-6">
      <p className="text-emergency-red font-bold text-sm tracking-widest uppercase">
        Incident technique
      </p>

      <H1>Une erreur inattendue est survenue</H1>

      <BodyLarge className="mx-auto text-gray-600">
        Notre équipe technique a été notifiée. Pour toute demande urgente de dépannage chaudière, veuillez nous contacter directement par téléphone.
      </BodyLarge>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <EmergencyCTA />
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 border border-gray-300 hover:border-trust-blue text-gray-800 hover:text-trust-blue font-bold py-3.5 px-6 rounded-lg transition-colors min-h-[48px]"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Réessayer</span>
        </button>
      </div>
    </main>
  )
}
