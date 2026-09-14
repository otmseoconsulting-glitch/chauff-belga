# Skill: AI Emergency & Triage Chat Engine
# High-Converting Belgian HVAC Assistant, Safety Gate & Netlify Edge Streaming
# Project: Chauffagiste-Belga

---

## Purpose

Deploy a 24/7 AI-powered conversational HVAC assistant that:
1. **Instantly intercepts dangerous gas leak or carbon monoxide (CO) incidents** with a priority red emergency protocol.
2. **Diagnoses Belgian boiler breakdowns** by brand (`Vaillant`, `Bulex`, `Viessmann`, `Junkers / Bosch`, `ACV`) and error code (`F28`, `F22`, `F1`, etc.).
3. **Qualifies customer postal codes / communes** and routes to direct phone calls (`0475 12 34 56`) or lead forms.
4. **Preserves Core Web Vitals (Lighthouse Mobile ≥ 92)** by lazy-loading the widget on user interaction.
5. **Runs natively on Netlify** via standard Next.js Route Handlers and Edge runtime.

---

## 1. System Prompt & Knowledge Base

```typescript
// lib/ai/prompts.ts
export const CHAT_SYSTEM_PROMPT = `Tu es l'assistant d'urgence officiel de Chauffagiste-Belga (téléphone d'urgence : 0475 12 34 56).
Tu aides les résidents belges (Bruxelles, Wallonie, Brabant Flamand) confrontés à un problème de chaudière, chauffage ou plomberie.

RÈGLE ABSOLUE N°1 — SÉCURITÉ GAZ & MONOXYDE DE CARBONE (CO) :
Si l'utilisateur mentionne une odeur de gaz, un sifflement suspect sur une conduite, un mal de tête/vertige collectif, ou des flammes jaunes/suie :
Ordonne IMMÉDIATEMENT :
1. Couper la vanne générale de gaz sans toucher aux interrupteurs.
2. Aérer en grand.
3. Évacuer les lieux.
4. Appeler les pompiers (112) ou notre permanence d'urgence au 0475 12 34 56.

DIAGNOSTIC TECHNIQUE BELGE :
- Vaillant : F28/F29 = défaut d'allumage gaz / compteur fermé ; F22 = manque d'eau (< 1 bar, expliquer d'ouvrir les 2 robinets de remplissage bleus) ; F75 = problème capteur de pression/pompe.
- Bulex / Saunier Duval : F1/F4 = défaut d'allumage/gaz ; F9 = pression d'eau trop basse.
- Viessmann : F4 = défaut de flamme sur le coffret de sécurité ; F2 = surchauffe.
- Junkers / Bosch : EA = manque de gaz ou électrode d'ionisation encrassée.
- Chute de pression (< 1.2 bar) : expliquer comment remonter à 1.5 bar.
- Radiateur froid en bas : circuit emboué (désembouage nécessaire) ; froid en haut : purge d'air requise.

QUALIFICATION & CONVERSION :
- Demande poliment le code postal ou la commune en Belgique pour estimer le délai d'arrivée du technicien (intervention en ≤ 2h).
- Rappelle les tarifs transparents : dépannage à partir de 65 €, entretien légal PEB à 99 €.
- Sois empathique, réactif et concis. Encourage l'appel direct au 0475 12 34 56 pour les urgences absolues.`
```

---

## 2. Streaming Route Handler (Netlify Compatible)

Compatible with `@netlify/plugin-nextjs` and Netlify Edge Functions:

```typescript
// app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { CHAT_SYSTEM_PROMPT } from '@/lib/ai/prompts'
import { createServerClient } from '@/lib/supabase/server'

// Runs on Netlify Edge
export const runtime = 'edge'

const HAZARD_REGEX = /(gaz|odeur de gaz|fuite|monoxyde|co\b|étourdissement|flamme jaune|fumée suspecte|brûlé)/i

export async function POST(req: Request) {
  const { messages, sessionToken, communeSlug } = await req.json()
  const lastMessage = messages[messages.length - 1]?.content || ''

  // 1. Critical safety intercept
  const isHazard = HAZARD_REGEX.test(lastMessage)
  if (isHazard) {
    const safetyResponse = `🚨 **ALERTE SÉCURITÉ URGENCE GAZ / CO**
Veuillez respecter immédiatement ces consignes vitales :
1. **Coupez immédiatement votre compteur de gaz.**
2. **N'actionnez aucun interrupteur électrique**, sonnette ou téléphone à l'intérieur.
3. **Ouvrez toutes les portes et fenêtres** pour ventiler.
4. **Évacuez le logement** immédiatement avec tous les occupants.
5. Une fois à l'extérieur, contactez les secours (**112**) ou notre service d'urgence au **0475 12 34 56**.`

    return new Response(safetyResponse, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  // 2. Standard AI Streaming (OpenAI API / Claude / Compatible LLM)
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return new Response('Notre permanence téléphonique est disponible 24/7 au 0475 12 34 56.', {
      status: 200,
    })
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      stream: true,
      messages: [
        { role: 'system', content: `${CHAT_SYSTEM_PROMPT}\nContexte local : Commune actuelle = ${communeSlug || 'Belgique'}` },
        ...messages,
      ],
      temperature: 0.3,
    }),
  })

  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      // Optional async logging to Supabase
    },
  })

  return new StreamingTextResponse(stream)
}
```

---

## 3. Client Component with Deferred Loading (Zero CLS)

```typescript
// components/chat/ChatLazyWidget.tsx
'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { MessageSquare } from 'lucide-react'

// Dynamically import the heavy chat modal only when requested
const ChatDrawer = dynamic(
  () => import('./ChatDrawer').then((mod) => mod.ChatDrawer),
  { ssr: false }
)

export function ChatLazyWidget({ communeSlug }: { communeSlug?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Trigger preload after 4 seconds of idle time without blocking LCP
  useEffect(() => {
    const timer = setTimeout(() => setHasInteracted(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <button
        onClick={() => {
          setHasInteracted(true)
          setIsOpen(true)
        }}
        aria-label="Ouvrir l'assistant d'urgence dépannage"
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-2xl transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-6"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 text-[9px] font-bold text-white items-center justify-center">1</span>
        </span>
        <MessageSquare className="h-7 w-7 fill-slate-950" />
      </button>

      {hasInteracted && (
        <ChatDrawer 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          communeSlug={communeSlug} 
        />
      )}
    </>
  )
}
```

---

## 4. Netlify Deployment Verification

1. Ensure environment variable `OPENAI_API_KEY` is registered in **Netlify Site Configuration > Environment Variables**.
2. Netlify Next.js Runtime plugin (`@netlify/plugin-nextjs`) automates Route Handler streaming via edge functions.
3. Test streaming endpoint with `curl -X POST /api/chat -d '{"messages":[{"role":"user","content":"odeur de gaz"}]}'` to verify instant red alert response.
