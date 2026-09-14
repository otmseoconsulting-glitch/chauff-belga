import Link from 'next/link'
import { Flame, CheckCircle2, Wrench, Hammer, Gauge, Layers, ArrowRight, Check } from 'lucide-react'

const SERVICES = [
  {
    id: 'depannage',
    title: 'Dépannage chauffage',
    description: 'Panne totale, fuite, perte de pression ou arrêt chaudière.',
    icon: Flame,
    price: 'Dès 95 €',
    badge: 'Urgence ≤ 2h',
    badgeType: 'emergency',
    features: [
      'Diagnostic immédiat & recherche de panne',
      'Déplacement 7j/7 et 24h/24 dans toute la Belgique',
      'Pièces d\'origine constructeur garanties',
    ],
    brands: 'Vaillant • Bulex • Viessmann • Bosch',
    href: '/#devis',
  },
  {
    id: 'entretien',
    title: 'Entretien chaudière',
    description: 'Contrôle périodique annuel ou biennal certifié Cerga.',
    icon: CheckCircle2,
    price: 'Dès 120 €',
    badge: 'Obligatoire PEB',
    badgeType: 'compliance',
    isPopular: true,
    features: [
      'Attestation légale remise immédiatement',
      'Nettoyage corps de chauffe & brûleur',
      'Mesure combustion & sécurité monoxyde (CO)',
    ],
    brands: 'Gaz & Mazout (toutes marques agréées)',
    href: '/#devis',
  },
  {
    id: 'installation',
    title: 'Installation chauffage',
    description: 'Chaudières condensation haute performance & pompes à chaleur.',
    icon: Wrench,
    price: 'Sur devis gratuit',
    badge: 'Éligible primes',
    badgeType: 'prime',
    features: [
      'Dimensionnement thermique sur-mesure',
      'Assistance complète primes Renolution / Habitation',
      'Garantie constructeur & installation 2 ans',
    ],
    brands: 'Viessmann • Daikin • Vaillant • Buderus',
    href: '/#devis',
  },
  {
    id: 'reparation',
    title: 'Réparation chaudière',
    description: 'Remise en état de vos composants hydrauliques et électroniques.',
    icon: Hammer,
    price: 'Dès 85 €',
    badge: 'Toutes pannes',
    badgeType: 'standard',
    features: [
      'Remplacement circulateur, vanne, vase d\'expansion',
      'Résolution codes erreurs (F28, F75, EA...)',
      'Devis préalable transparent avant travaux',
    ],
    brands: 'ACV • Junkers • Weishaupt • Ferroli',
    href: '/#devis',
  },
  {
    id: 'thermostat',
    title: 'Régulation & thermostat',
    description: 'Optimisation de chauffe et maîtrise de vos factures énergétiques.',
    icon: Gauge,
    price: 'Dès 110 €',
    badge: 'Économies -25%',
    badgeType: 'eco',
    features: [
      'Installation thermostats connectés intelligents',
      'Placement vannes thermostatiques haute précision',
      'Programmation multizone pour un confort parfait',
    ],
    brands: 'Tado • Nest • Netatmo • Honeywell',
    href: '/#devis',
  },
  {
    id: 'chauffage-sol',
    title: 'Chauffage au sol',
    description: 'Installation, désembouage et équilibrage de plancher chauffant.',
    icon: Layers,
    price: 'Sur devis gratuit',
    badge: 'Confort doux',
    badgeType: 'standard',
    features: [
      'Désembouage & rinçage hydrodynamique du réseau',
      'Pose de serpentins basse température neufs',
      'Régulation de débit pour une chaleur uniforme',
    ],
    brands: 'Rehau • Giacomini • Begetube • Comap',
    href: '/#devis',
  },
]

export function ServicesGrid() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-default">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E5232E] block mb-2">
              Nos services
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-black text-[#102A43] tracking-tight leading-tight">
              Tous vos besoins en <span className="text-[#E5232E]">chauffage</span>
            </h2>
            <p className="text-[15px] sm:text-base text-[#64748B] max-w-2xl mt-2 font-normal leading-relaxed">
              Un service complet pour votre confort thermique, de l&apos;installation à l&apos;entretien de votre système de chauffage.
            </p>
          </div>

          <Link
            href="/#services"
            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#102A43] hover:text-[#E5232E] group shrink-0 self-start md:self-end border-b-2 border-[#E5232E] pb-0.5 transition-colors"
          >
            <span>Découvrir tous nos services</span>
            <ArrowRight className="h-4 w-4 text-[#E5232E] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Services Cards Grid: Clean icon-driven presentation, high-conversion CRO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                href={service.href}
                className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border transition-all duration-300 ${
                  service.isPopular
                    ? 'border-[#155EEF]/50 shadow-md ring-1 ring-[#155EEF]/20'
                    : 'border-slate-200/80 shadow-subtle hover:shadow-card-hover hover:border-[#155EEF]/40'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Price & Badges */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF] group-hover:bg-red-50 group-hover:text-[#E5232E] transition-colors duration-200 shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[14px] font-black text-[#102A43] tracking-tight">
                        {service.price}
                      </span>
                      
                      {service.badgeType === 'emergency' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-red-50 text-[#E5232E] border border-red-200/70">
                          {service.badge}
                        </span>
                      )}
                      {service.badgeType === 'compliance' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                          {service.badge}
                        </span>
                      )}
                      {service.badgeType === 'prime' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-sky-50 text-[#155EEF] border border-sky-200/70">
                          {service.badge}
                        </span>
                      )}
                      {service.badgeType === 'eco' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200/70">
                          {service.badge}
                        </span>
                      )}
                      {service.badgeType === 'standard' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold text-slate-600 bg-slate-100">
                          {service.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="font-display font-extrabold text-[20px] text-[#102A43] group-hover:text-[#E5232E] transition-colors mb-2 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-[13px] sm:text-[14px] text-[#64748B] font-normal leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* 3 Actionable Micro-Bullet Features */}
                  <div className="space-y-2.5 mb-6">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-[12px] sm:text-[13px] text-slate-700">
                        <Check className="h-4 w-4 text-[#155EEF] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer: Compatible Brands + Action Link */}
                <div className="pt-4 border-t border-slate-100 mt-2">
                  <div className="text-[11px] text-slate-500 font-medium truncate mb-3">
                    <span className="text-slate-400">Marques : </span>
                    {service.brands}
                  </div>

                  <div className="flex items-center justify-between text-[13px] font-bold text-[#082B55] group-hover:text-[#E5232E] transition-colors">
                    <span>Demander un devis gratuit</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
