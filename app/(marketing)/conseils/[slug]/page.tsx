import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Clock,
  UserCheck,
  Calendar,
  ShieldCheck,
  Phone,
  ArrowRight,
  AlertTriangle,
  Info,
  CheckCircle2,
  Share2,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'
import { ReassuranceBar } from '@/components/sections/ReassuranceBar'
import { getPostBySlug, getAllPostSlugs } from '@/lib/sanity/blog'
import { CONTACT } from '@/lib/constants/contact'

export const revalidate = 3600 // ISR 1h

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}

  const canonicalUrl = `https://chauffagiste-belga.be/conseils/${post.slug}`

  return {
    title: `${post.title} | Chauffagiste-Belga`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Guides & Conseils Chauffage', href: '/conseils' },
    { label: post.title, href: `/conseils/${post.slug}` },
  ]

  // Schema graph for Article and FAQPage
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Chauffagiste-Belga',
      url: 'https://chauffagiste-belga.be',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://chauffagiste-belga.be/conseils/${post.slug}`,
    },
  }

  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <JsonLd schema={articleSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      <div className="bg-[#F7F9FC] min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="container-default py-3">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Article Header */}
        <header className="bg-white border-b border-slate-200 py-10 md:py-14">
          <div className="container-default max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                Publié le {formattedDate}
              </span>
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 font-medium">
              {post.excerpt}
            </p>

            {/* Author Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-brand-dark text-white font-black flex items-center justify-center text-base shrink-0">
                {post.author.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900 text-sm">{post.author.name}</div>
                <div className="text-xs text-slate-500">{post.author.role}</div>
                {post.author.certifications && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {post.author.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-brand-blue"
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Article Body & Sidebar Grid */}
        <section className="py-12 md:py-16">
          <div className="container-default max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Content Column (8 cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-6">
                {post.content.map((block, idx) => {
                  if (block.type === 'heading2') {
                    return (
                      <h2
                        key={idx}
                        className="text-2xl font-black text-brand-dark tracking-tight pt-4 border-t border-slate-100 first:border-0 first:pt-0"
                      >
                        {block.text}
                      </h2>
                    )
                  }
                  if (block.type === 'heading3') {
                    return (
                      <h3 key={idx} className="text-lg font-bold text-brand-dark pt-2">
                        {block.text}
                      </h3>
                    )
                  }
                  if (block.type === 'warning') {
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm leading-relaxed flex items-start gap-3 my-4"
                      >
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>{block.text}</div>
                      </div>
                    )
                  }
                  if (block.type === 'callout') {
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-blue-50 border-l-4 border-brand-blue text-brand-navy text-sm leading-relaxed flex items-start gap-3 my-4"
                      >
                        <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                        <div>{block.text}</div>
                      </div>
                    )
                  }
                  if (block.type === 'list' && block.items) {
                    return (
                      <ul key={idx} className="space-y-2.5 my-4">
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <p key={idx} className="text-slate-700 text-base leading-relaxed">
                      {block.text}
                    </p>
                  )
                })}

                {/* FAQ Section */}
                {post.faq && post.faq.length > 0 && (
                  <div className="pt-8 border-t border-slate-200 mt-10">
                    <h2 className="text-xl font-black text-brand-dark tracking-tight mb-4">
                      Foire Aux Questions sur ce thème
                    </h2>
                    <div className="space-y-4">
                      {post.faq.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200"
                        >
                          <h3 className="font-bold text-slate-900 text-sm mb-2">
                            {item.question}
                          </h3>
                          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar CTA Column (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Emergency Card */}
                <div className="bg-brand-dark text-white rounded-2xl p-6 shadow-md border border-brand-navy">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                    <Clock className="w-4 h-4" />
                    Dépannage d&apos;urgence ≤ 2h
                  </div>
                  <h3 className="font-black text-lg mb-2">
                    Votre chaudière est en panne ?
                  </h3>
                  <p className="text-slate-300 text-xs mb-4 leading-relaxed">
                    Artisans d&apos;astreinte 24/7 sur toute la Belgique. Diagnostic clair et prix transparents.
                  </p>
                  <a
                    href={`tel:${CONTACT.phone.e164}`}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition text-sm shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                    <span>0475 12 34 56</span>
                  </a>
                </div>

                {/* Quote CTA Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
                  <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-slate-900 text-base mb-1">
                    Devis gratuit & sans engagement
                  </h3>
                  <p className="text-slate-500 text-xs mb-4">
                    Recevez une estimation officielle sous 24h pour votre entretien ou remplacement.
                  </p>
                  <Link
                    href="/devis"
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-navy text-white font-bold py-3 px-4 rounded-xl transition text-xs shadow-sm"
                  >
                    <span>Faire une demande</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Back to Hub */}
                <div className="text-center">
                  <Link
                    href="/conseils"
                    className="text-xs font-bold text-slate-600 hover:text-brand-blue transition inline-flex items-center gap-1"
                  >
                    ← Tous les guides conseils
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reassurance Bar */}
        <ReassuranceBar />
      </div>
    </>
  )
}
