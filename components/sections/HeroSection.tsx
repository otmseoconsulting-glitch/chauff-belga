import { Phone, ArrowRight, ShieldCheck, Clock, UserCheck, FileText, Star } from 'lucide-react'
import { PostalLookup } from '@/components/forms/PostalLookup'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F9FC] pt-10 pb-14 lg:pt-16 lg:pb-20 border-b border-slate-200/70">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: 45% width (lg:col-span-6 or lg:col-span-5) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Small red uppercase eyebrow */}
            <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] mb-3.5">
              Spécialiste du chauffage en Belgique
            </span>

            {/* Main Editorial H1 */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#102A43] tracking-tight leading-[1.1] mb-5">
              Votre <span className="text-[#E5232E]">chauffage</span> entre de bonnes mains
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-[17px] text-[#64748B] max-w-xl font-normal leading-relaxed mb-8">
              Dépannage, entretien, installation : notre équipe de chauffagistes intervient rapidement dans toute la Belgique.
            </p>

            {/* Horizontal Trust Feature Row: 4 cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8">
              {/* Feature 1 */}
              <div className="flex flex-col items-start p-3 bg-white rounded-xl border border-slate-200/80 shadow-subtle">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#155EEF] mb-2">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-bold text-[#102A43] leading-tight">Intervention rapide</span>
                <span className="text-[11px] text-[#64748B] font-medium mt-0.5">≤ 24h</span>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-start p-3 bg-white rounded-xl border border-slate-200/80 shadow-subtle">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#155EEF] mb-2">
                  <UserCheck className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-bold text-[#102A43] leading-tight">Techniciens agréés</span>
                <span className="text-[11px] text-[#64748B] font-medium mt-0.5">& expérimentés</span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-start p-3 bg-white rounded-xl border border-slate-200/80 shadow-subtle">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#155EEF] mb-2">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-bold text-[#102A43] leading-tight">Devis gratuit</span>
                <span className="text-[11px] text-[#64748B] font-medium mt-0.5">& transparent</span>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-start p-3 bg-white rounded-xl border border-slate-200/80 shadow-subtle">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#155EEF] mb-2">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-bold text-[#102A43] leading-tight">Garantie</span>
                <span className="text-[11px] text-[#64748B] font-medium mt-0.5">2 ans</span>
              </div>
            </div>

            {/* Two CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-7">
              {/* PRIMARY RED */}
              <a
                href="tel:0475123456"
                className="inline-flex items-center justify-center gap-2.5 bg-[#E5232E] hover:bg-[#D01B25] text-white font-bold px-7 py-4 rounded-full shadow-cta-red transition-all duration-200 text-[15px]"
              >
                <Phone className="h-4 w-4 fill-white" />
                <span>Appeler maintenant 0475 12 34 56</span>
              </a>

              {/* SECONDARY WHITE / OUTLINE */}
              <a
                href="#devis"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#102A43] font-semibold px-7 py-4 rounded-full border border-slate-300 shadow-subtle transition-colors duration-200 text-[15px] group"
              >
                <span>Demander un devis gratuit</span>
                <ArrowRight className="h-4 w-4 text-[#64748B] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Postal Code Real-Time Detector */}
            <div className="w-full max-w-lg mb-7">
              <PostalLookup
                placeholder="Votre code postal (ex: 1000, 4000, 7000...)"
                buttonLabel="Trouver"
              />
            </div>

            {/* Social Proof: 5 yellow/orange stars */}
            <div className="flex items-center gap-2 text-[13px] sm:text-[14px] text-[#64748B] font-medium">
              <div className="flex items-center text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <span className="font-extrabold text-[#102A43]">4,8/5</span>
              <span>sur Google</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#64748B] font-semibold">+ 1 200 avis clients</span>
            </div>

          </div>

          {/* Right Column: 55% width (lg:col-span-6 or lg:col-span-7) */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-2xl bg-[#082B55] aspect-4/3 sm:aspect-5/4 lg:aspect-4/3 flex items-center justify-center border border-slate-700/50">
              
              {/* Premium Realistic Commercial Photography Visual representation */}
              <div className="absolute inset-0 bg-linear-to-tr from-[#051C38] via-[#082B55] to-[#123E73] opacity-95" />

              {/* Technical Equipment & Heating Infrastructure Visual */}
              <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between text-slate-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 bg-[#051C38]/80 px-3.5 py-1.5 rounded-lg border border-slate-700/60 backdrop-blur-xs">
                    <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-ping" />
                    <span className="text-xs font-mono font-medium text-emerald-300">Technicien Cerga en intervention</span>
                  </div>
                </div>

                <div className="my-auto text-center px-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/20 border border-red-500/30 text-[#E5232E] mb-3 shadow-inner">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <p className="text-white font-display font-black text-xl tracking-tight">Chauffagistes Certifiés Cerga & GI/GII</p>
                  <p className="text-slate-300 text-[13px] mt-1.5 max-w-sm mx-auto">
                    Installation et maintenance chaudières à condensation, radiateurs et pompes à chaleur
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/80 pt-3.5">
                  <span className="font-medium text-slate-300">Bruxelles • Brabant • Wallonie</span>
                  <span className="font-bold text-white tracking-wide">Chauffagiste-Belga</span>
                </div>
              </div>

              {/* Upper Right Floating Badge: INTERVENTION RAPIDE ≤ 24h */}
              <div className="absolute top-4 right-4 z-20 bg-[#082B55]/95 border border-slate-600/80 text-white rounded-xl p-3.5 shadow-2xl backdrop-blur-xs flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#155EEF]/20 text-[#155EEF]">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold tracking-wider text-[#155EEF] uppercase">Intervention rapide</span>
                  <span className="text-[17px] font-black text-white leading-none my-0.5">≤ 24h</span>
                  <span className="text-[10px] text-slate-300">dans toute la Belgique</span>
                </div>
              </div>

              {/* Lower Overlay Card: Belgian Flag Coverage */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 bg-white text-[#102A43] rounded-xl p-3.5 shadow-xl border border-slate-200/90 flex items-center gap-3">
                {/* Belgian Flag Roundel */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border border-slate-300 shrink-0 shadow-xs">
                  <div className="grid grid-cols-3 h-full w-full">
                    <div className="bg-black h-full w-full" />
                    <div className="bg-[#FFD100] h-full w-full" />
                    <div className="bg-[#E5232E] h-full w-full" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#64748B]">Nos équipes interviennent à</span>
                  <span className="text-[13px] font-bold text-[#102A43] leading-tight">
                    Bruxelles, Brabant flamand et Wallonie
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
