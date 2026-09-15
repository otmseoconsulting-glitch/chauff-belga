import { Star, CheckCircle2, User } from 'lucide-react'

interface CommuneReviewsDarkProps {
  communeName: string
}

export function CommuneReviewsDark({ communeName }: CommuneReviewsDarkProps) {
  const reviews = [
    {
      name: 'Sophie L.',
      locality: `${communeName} & environs`,
      service: 'Dépannage chaudière',
      comment:
        'Intervention très rapide et technicien très professionnel. Problème de vanne 3 voies résolu en moins d’une heure !',
    },
    {
      name: 'Marc D.',
      locality: `${communeName}`,
      service: 'Entretien chaudière',
      comment:
        'Équipe au top, très sympathique et explications claires. Attestation PEB remise immédiatement pour mon assurance.',
    },
    {
      name: 'Julie T.',
      locality: `Secteur ${communeName}`,
      service: 'Installation chaudière',
      comment:
        'Excellent service, travail propre et soigné. Le technicien était ponctuel et très compétent sur notre modèle à condensation.',
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-[#051C38] text-white">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading + Stars */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-3">
              Ils nous font confiance
            </h2>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-slate-300 font-bold">| 4,9/5 sur Google</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              +1 200 avis clients vérifiés partout en Belgique
            </p>
          </div>

          {/* Right Column: 3 White Review Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="bg-white text-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* User info */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                      <User className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-brand-dark block leading-tight">
                        {rev.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {rev.locality}
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center text-amber-500 mb-2.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                    « {rev.comment} »
                  </p>
                </div>

                {/* Footer Badges */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-[10px]">
                  <span className="font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-md">
                    {rev.service}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    Client vérifié
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
