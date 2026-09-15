// CLIENT: interactive AI triage chat widget
'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  MessageSquare,
  X,
  Send,
  Phone,
  AlertTriangle,
  Loader2,
  Wrench,
  Flame,
  ShieldCheck,
} from 'lucide-react'
import { CONTACT } from '@/lib/constants/contact'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isEmergency?: boolean
}

const QUICK_PROMPTS = [
  'Pression trop basse (< 1 bar)',
  'Code erreur F28 / allumage',
  'Entretien annuel PEB',
  'Radiateur reste froid',
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Bonjour ! Je suis l’assistant technique Chauffagiste-Belga. Décrivez-moi votre panne ou choisissez un motif ci-dessous pour un pré-diagnostic immédiat.',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSend = async (userText: string) => {
    const trimmed = userText.trim()
    if (!trimmed || isLoading) return

    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.content,
          isEmergency: Boolean(data.isEmergency),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Notre permanence technique d'urgence est joignable directement au ${CONTACT.phone.display} (7j/7).`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 print:hidden">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-[92vw] sm:w-[380px] h-[520px] flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-brand-dark text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center font-black text-sm">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-brand-dark" />
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">Diagnostic Chauffage</div>
                <div className="text-[11px] text-slate-300">Permanent technique 24/7</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${CONTACT.phone.e164}`}
                className="flex items-center justify-center h-8 w-8 bg-[#FF5400] hover:bg-[#E04B00] text-white rounded-full transition shadow-sm"
                title={`Appeler l'astreinte au ${CONTACT.phone.display}`}
                aria-label="Appeler d'urgence"
              >
                <Phone className="w-4 h-4 fill-white" />
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition"
                aria-label="Fermer le chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F7F9FC] text-xs md:text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed shadow-xs ${
                    m.role === 'user'
                      ? 'bg-brand-dark text-white rounded-br-none'
                      : m.isEmergency
                      ? 'bg-red-50 text-red-900 border-2 border-red-500 rounded-bl-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  {m.isEmergency && (
                    <div className="flex items-center gap-1 text-primary font-bold text-xs uppercase mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Danger immédiat
                    </div>
                  )}
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 flex items-center gap-2 text-xs text-slate-500">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-blue" />
                  <span>Analyse technique en cours...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-brand-blue text-slate-700 px-3 py-1.5 rounded-full transition shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(input)
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question technique..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-brand-blue focus:bg-white transition text-slate-900"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl transition disabled:opacity-40 shrink-0"
              aria-label="Envoyer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-[#FF5400] hover:bg-[#E04B00] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2.5 group border-2 border-white/40 hover:scale-105 active:scale-95"
          aria-label="Ouvrir le chat de diagnostic technique"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white" />
          </div>
          <span className="hidden sm:inline text-xs font-extrabold tracking-wide pr-1">
            Diagnostic 24/7
          </span>
        </button>
      )}
    </div>
  )
}
