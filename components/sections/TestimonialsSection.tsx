import { Star, CheckCircle2 } from 'lucide-react'

const REVIEWS = [
  {
    author: 'Thomas D.',
    location: 'Bruxelles',
    initials: 'TD',
    quote: 'Intervention très rapide pour une panne de chaudière en plein hiver. Technicien professionnel et sympathique.',
    service: 'Dépannage chaudière',
  },
  {
    author: 'Sophie L.',
    location: 'Wavre',
    initials: 'SL',
    quote: 'Entretien annuel de ma chaudière parfait. Équipe sérieuse et ponctuelle. Je recommande !',
    service: 'Entretien chaudière',
  },
  {
    author: 'Marc B.',
    location: 'Louvain-la-Neuve',
    initials: 'MB',
    quote: 'Installation d\'une pompe à chaleur très bien réalisée. Travail propre et explications claires.',
    service: 'Installation pompe à chaleur',
  },
]

export function TestimonialsSection() {
  return (
    <section id="avis" className="py-16 bg-white">
      <div className="container-default">
        <div className="rounded-2xl bg-[#082B55] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#155EEF]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#E5232E]/10 blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-700/60">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ils nous font confiance
              </h2>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="font-display text-3xl sm:text-4xl font-black text-white leading-none">4,8/5</span>
              <div className="flex flex-col">
                <div className="flex text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <span className="text-[12px] text-slate-300 font-medium mt-0.5">+ 1 200 avis Google</span>
              </div>
            </div>
          </div>

          {/* 3 Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.author}
                className="flex flex-col justify-between bg-white text-[#102A43] p-6 sm:p-7 rounded-xl shadow-lg border border-slate-100"
              >
                <div>
                  {/* Author Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#082B55] font-black text-xs">
                      {review.initials}
                    </div>
                    <div>
                      <span className="block font-bold text-[#102A43] text-[14px]">{review.author}</span>
                      <span className="block text-[12px] text-[#64748B]">{review.location}</span>
                    </div>
                    <div className="ml-auto flex text-[#F59E0B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                      ))}
                    </div>
                  </div>

                  {/* Review Quote */}
                  <p className="text-[14px] text-slate-700 leading-relaxed italic mb-6 font-normal">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 text-[11px]">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#082B55] font-semibold">
                    {review.service}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
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
