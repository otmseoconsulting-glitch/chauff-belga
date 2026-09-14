import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  Clock,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'
import { getAllPosts } from '@/lib/sanity/blog'

export const revalidate = 3600 // ISR 1h

export const metadata: Metadata = {
  title: 'Conseils Chauffage & Réglementation PEB en Belgique | Chauffagiste-Belga',
  description:
    'Guides pratiques rédigés par nos artisans chauffagistes agréés Cerga : obligations légales PEB, diagnostics de pannes chaudières, primes rénovation 2026 et économies d’énergie.',
  alternates: {
    canonical: 'https://chauffagiste-belga.be/conseils',
  },
}

export default async function ConseilsPage() {
  const posts = await getAllPosts()
  const [featuredPost, ...otherPosts] = posts

  const breadcrumbItems = [
    { label: 'Guides & Conseils Chauffage', href: '/conseils' },
  ]

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-default py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-12 md:py-16 border-b border-slate-200/80 bg-white">
        <div className="container-default">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-blue font-bold text-xs uppercase tracking-wider mb-4 border border-blue-100">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              Centre de ressources techniques Belgique
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
              Guides, réglementation PEB et conseils de chauffagistes agréés
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Retrouvez l’ensemble des règles officielles belges, des diagnostics de pannes de chaudière et les conseils d’artisans certifiés Cerga pour optimiser votre confort et votre facture énergétique.
            </p>
          </div>
        </div>
      </section>

      {/* Main Articles Container */}
      <section className="py-12 md:py-16">
        <div className="container-default">
          {/* Featured Article Card */}
          {featuredPost && (
            <div className="mb-12">
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl transition duration-300 grid grid-cols-1 lg:grid-cols-12 group">
                <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight group-hover:text-brand-blue transition mb-4">
                      <Link href={`/conseils/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-dark text-white font-bold flex items-center justify-center text-sm">
                        {featuredPost.author.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{featuredPost.author.name}</div>
                        <div className="text-[11px] text-slate-500">{featuredPost.author.role}</div>
                      </div>
                    </div>

                    <Link
                      href={`/conseils/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-primary-hover transition"
                    >
                      <span>Lire l&apos;article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </Link>
                  </div>
                </div>

                {/* Right Visual Banner */}
                <div className="lg:col-span-5 bg-linear-to-br from-[#082B55] to-[#051C38] p-8 md:p-12 flex flex-col justify-between text-white relative">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                      <Sparkles className="w-4 h-4" />
                      Guide de référence
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Conformité et obligations PEB en Wallonie & à Bruxelles
                    </h3>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                      Évitez les refus d&apos;assurance incendie en respectant les fréquences de contrôle légal avec un chauffagiste certifié Cerga.
                    </p>
                  </div>

                  <div className="pt-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Validé par un auditeur agréé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Other Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition flex flex-col justify-between group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-brand-blue font-bold rounded-full border border-blue-100">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue transition mb-2.5 line-clamp-2">
                    <Link href={`/conseils/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium">
                    Par {post.author.name}
                  </div>
                  <Link
                    href={`/conseils/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary-hover transition"
                  >
                    <span>Consulter</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Editorial Call to Action Banner */}
          <div className="mt-16 bg-brand-dark text-white rounded-3xl p-8 md:p-12 shadow-xl border border-brand-navy flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                Intervention partout en Belgique
              </span>
              <h3 className="text-2xl md:text-3xl font-black mb-2">
                Besoin d&apos;un chauffagiste agréé Cerga chez vous ?
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Nos artisans se déplacent en moins de 2 heures pour les urgences ou sous 24h pour vos entretiens et devis gratuits.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/devis"
                className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3.5 rounded-xl transition text-center text-sm shadow-md"
              >
                Demander un devis gratuit
              </Link>
              <a
                href="tel:0475123456"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition text-center text-sm border border-white/20"
              >
                Permanence 24/7 : 0475 12 34 56
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance Bar */}
      <ReassuranceBar />
    </div>
  )
}
