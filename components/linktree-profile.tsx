'use client'

import { useState } from 'react'
import { Instagram, Facebook, Mail, ExternalLink, X, Send, Phone, User, MessageSquare, Tag } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useConfetti, ConfettiOverlay } from '../components/ConfettiOverlay'
import { HarlequinHat } from "../components/HarlequinHat"

const EMAILJS_SERVICE = 'service_zw5sudt'
const EMAILJS_TEMPLATE = 'template_864uopk'
const EMAILJS_KEY = 'gBgx7V1bFvZfAmAXP'

export function LinktreeProfile() {
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const { pieces, spawn } = useConfetti()

  const [formData, setFormData] = useState({
    user_name: '',
    user_subject: '',
    user_email: '',
    user_phone: '',
    message: '',
  })

  const handleScreenClick = (e: React.MouseEvent | React.TouchEvent) => {
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent)
    spawn(point.clientX, point.clientY)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    emailjs
      .send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        name: 'Lead Linktree (Newsletter)',
        email,
        type: 'cliente',
        message: 'Nuevo suscriptor desde Link in Bio',
      }, EMAILJS_KEY)
      .then(() => {
        alert('Gracias! Te enviamos el catalogo pronto')
        setEmail('')
      })
      .catch(() => alert('Hubo un error al enviar'))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    emailjs
      .send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        name: formData.user_name,
        subject: formData.user_subject,
        email: formData.user_email,
        phone: formData.user_phone,
        message: formData.message,
        type: 'consulta_contacto',
      }, EMAILJS_KEY)
      .then(() => {
        alert('Mensaje enviado con exito! Nos contactaremos pronto.')
        setFormData({ user_name: '', user_subject: '', user_email: '', user_phone: '', message: '' })
        setIsModalOpen(false)
      })
      .catch(() => alert('No se pudo enviar el mensaje. Intenta de nuevo.'))
      .finally(() => setIsSending(false))
  }

  return (
    <div
      style={{ background: '#11332c' }}
      className="min-h-screen flex flex-col items-center px-3 py-5 overflow-auto font-sans select-none"
      onClick={handleScreenClick}
    >
      <ConfettiOverlay pieces={pieces} />

      {/* Decorative background stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {STAR_POSITIONS.map((s, i) => (
          <div
            key={i}
            className="absolute text-yellow-400"
            style={{
              left: s.x,
              top: s.y,
              fontSize: s.size,
              animation: `star-twinkle ${s.dur}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
              opacity: 0.15,
            }}
          >
            ★
          </div>
        ))}
      </div>

      <div className="w-full max-w-sm flex flex-col gap-2.5 relative" style={{ zIndex: 1 }}>

        {/* Header */}
        <section
          style={{ background: '#275140', border: '1px solid rgba(255,215,0,0.2)' }}
          className="rounded-2xl p-5 text-center relative overflow-hidden"
        >
          {/* Subtle Argentine stripe accent top */}
          <div className="absolute top-0 left-0 right-0 h-[3px] flex">
            <div className="flex-1" style={{ background: '#74ACDF' }} />
            <div className="flex-1" style={{ background: '#FFFFFF' }} />
            <div className="flex-1" style={{ background: '#74ACDF' }} />
          </div>

          <div className="flex justify-center mb-3 float-up">
            <img src="/qv-logo-claro.png" alt="Logo Quedé Verde" className="h-32 object-contain" />
          </div>
          <p className="text-[9px] font-light tracking-[3px] uppercase mb-5" style={{ color: '#8bab9c' }}>
            mates · termos · accesorios
          </p>

          {/* World Cup badge */}
          <div className="flex justify-center mb-4">
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase"
              style={{
                background: 'linear-gradient(90deg, #74ACDF 0%, #FFFFFF 50%, #74ACDF 100%)',
                color: '#003870',
                border: '1px solid #FFD700',
                boxShadow: '0 2px 10px rgba(255,215,0,0.3)',
              }}
            >
              <span>★</span>
              <span>Argentina Campeona</span>
              <span>★</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <WebsiteButton href="https://quedeverde.shop/" />
            <LinkButton href="https://www.instagram.com/quedeverde.pna/" variant="outline">
              INSTAGRAM
            </LinkButton>
            <LinkButton
              href="https://wa.me/5493436959359?text=Hey!%20Hola,%20me%20interesan%20tus%20productos%20"
              variant="outline"
            >
              WHATSAPP
            </LinkButton>
          </div>
        </section>

        {/* Mailing */}
        <section
          style={{ background: '#1e4538', border: '1px solid #2d5c48' }}
          className="rounded-2xl p-4"
        >
          <h2 className="text-center font-serif text-lg font-normal mb-1" style={{ color: '#dcceb6' }}>
            Queres un descuento?
          </h2>
          <p className="text-[11px] text-center font-light mb-3 leading-relaxed" style={{ color: '#8bab9c' }}>
            Dejanos tu mail y te enviamos el catalogo + un codigo especial
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="Tu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 rounded-lg px-3 py-2 text-[11px] outline-none"
              style={{ background: '#11332c', border: '1px solid #2d5c48', color: '#dcceb6' }}
              required
            />
            <button
              type="submit"
              className="rounded-lg px-3 py-2 text-[10px] font-medium tracking-wide uppercase shrink-0"
              style={{ background: '#dcceb6', color: '#11332c' }}
            >
              Enviar
            </button>
          </form>
        </section>

        {/* HOT SALE */}
        <a
          href="https://quedeverde.shop"
          target="_blank"
          rel="noopener noreferrer"
          className="hot-sale-btn rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-transform hover:scale-[1.02] relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #003870 0%, #005faf 40%, #003870 100%)',
            border: '2px solid #FFD700',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Flag stripes */}
          <div className="absolute top-0 left-0 right-0 h-[4px] flex">
            <div className="flex-1" style={{ background: '#74ACDF' }} />
            <div className="flex-1" style={{ background: '#FFFFFF' }} />
            <div className="flex-1" style={{ background: '#74ACDF' }} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[4px] flex">
            <div className="flex-1" style={{ background: '#74ACDF' }} />
            <div className="flex-1" style={{ background: '#FFFFFF' }} />
            <div className="flex-1" style={{ background: '#74ACDF' }} />
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span style={{ fontSize: 22 }}>🔥</span>
            <span
              className="font-serif font-black tracking-wide"
              style={{
                fontSize: 30,
                background: 'linear-gradient(90deg, #FFD700 0%, #FFF5A0 40%, #FFD700 70%, #FFF5A0 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gold-shimmer 2s linear infinite',
              }}
            >
              HOT SALE
            </span>
            <span style={{ fontSize: 22 }}>🔥</span>
          </div>
          <p className="text-[9px] font-bold tracking-[3px] uppercase" style={{ color: '#74ACDF' }}>
            Ofertas especiales · Solo por tiempo limitado
          </p>
        </a>

        {/* Links adicionales */}
        <section style={{ background: '#dcceb6' }} className="rounded-2xl p-4">
          <div className="flex flex-col gap-2">
            <div className="relative">
              <LinkButton href="#" variant="dark">Catalogo 2026</LinkButton>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] px-2 py-0.5 rounded-full bg-black/20 text-[#11332c] font-semibold tracking-widest">
                Proximamente
              </span>
            </div>
            <div className="relative">
              <LinkButton href="#" variant="darkOutline">Novedades</LinkButton>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] px-2 py-0.5 rounded-full bg-black/20 text-[#275140] font-semibold tracking-widest">
                Proximamente
              </span>
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="text-center py-2">
          <p className="text-[10px] uppercase tracking-[3px] mb-3" style={{ color: '#4d7a68' }}>Seguinos en redes</p>
          <p className="text-[10px] tracking-[3px] mb-3" style={{ color: '#4d7a68' }}>
            PAGINA CREADA POR{' '}
            <a
              href="https://www.instagram.com/webi.by.grauberg/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
              style={{ color: '#ffffff' }}
              onClick={(e) => e.stopPropagation()}
            >
              Webi<span style={{ color: '#facc15' }}>.</span>
            </a>
          </p>
          <div className="flex justify-center gap-2.5">
            <SocialIcon href="https://www.instagram.com/quedeverde.pna/" icon={<Instagram className="w-4 h-4" />} label="Instagram" />
            <SocialIcon href="#" icon={<Facebook className="w-4 h-4" />} label="Facebook" />
            <button
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(true) }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ background: '#1e4538', color: '#dcceb6' }}
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Tap hint */}
        <p className="text-center text-[9px] tracking-widest pb-2" style={{ color: '#2d5c48' }}>
          Toca la pantalla para celebrar
        </p>
      </div>

      {/* Modal de contacto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 backdrop-blur-md bg-[#11332c]/60"
            onClick={() => setIsModalOpen(false)}
          />
          <div
            style={{ background: '#1e4538', border: '1px solid #2d5c48' }}
            className="relative w-full max-w-sm rounded-[2rem] p-6 shadow-2xl"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#11332c]/50 text-[#dcceb6]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-serif text-2xl mb-1 text-[#dcceb6] text-center">Contacto</h3>
            <p className="text-[10px] uppercase tracking-widest text-center mb-6" style={{ color: '#8bab9c' }}>
              Envianos tu consulta
            </p>
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 text-[#dcceb6]">
              <ModalInput icon={<User className="w-3.5 h-3.5 opacity-40" />} type="text" placeholder="Nombre" required value={formData.user_name} onChange={(v) => setFormData({ ...formData, user_name: v })} />
              <ModalInput icon={<Mail className="w-3.5 h-3.5 opacity-40" />} type="email" placeholder="Email" required value={formData.user_email} onChange={(v) => setFormData({ ...formData, user_email: v })} />
              <ModalInput icon={<Phone className="w-3.5 h-3.5 opacity-40" />} type="tel" placeholder="Telefono (opcional)" value={formData.user_phone} onChange={(v) => setFormData({ ...formData, user_phone: v })} />
              <ModalInput icon={<Tag className="w-3.5 h-3.5 opacity-40" />} type="text" placeholder="Asunto" required value={formData.user_subject} onChange={(v) => setFormData({ ...formData, user_subject: v })} />
              <div className="relative">
                <MessageSquare className="absolute left-3 top-2.5 w-3.5 h-3.5 opacity-40" />
                <textarea
                  required
                  placeholder="Tu mensaje..."
                  rows={4}
                  className="w-full pl-9 pr-4 py-2 bg-[#11332c] border border-[#2d5c48] rounded-xl text-xs outline-none focus:border-[#dcceb6]/50 transition-colors resize-none text-[#dcceb6]"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-[#dcceb6] text-[#11332c] rounded-xl text-[11px] font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all shadow-lg"
              >
                {isSending ? 'Enviando...' : (<><Send className="w-3.5 h-3.5" />Enviar Mensaje</>)}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── WEBSITE button with harlequin hat and gold border ─────────────────────

function WebsiteButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="relative flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl text-[11px] font-medium tracking-widest uppercase group transition-all hover:opacity-90"
      style={{
        background: 'transparent',
        border: '2px solid #FFD700',
        color: '#FFD700',
        boxShadow: '0 0 12px rgba(255,215,0,0.25), inset 0 0 8px rgba(255,215,0,0.05)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Hat floats above-left */}
      <span className="absolute -top-5 left-4">
        <HarlequinHat size={26} />
      </span>
      <span>WEBSITE</span>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
    </a>
  )
}

// ─── Generic link button ────────────────────────────────────────────────────

function LinkButton({
  href,
  children,
  variant = 'outline',
}: {
  href: string
  children: React.ReactNode
  variant?: 'outline' | 'dark' | 'darkOutline'
}) {
  const styles: Record<string, React.CSSProperties> = {
    outline: { background: 'transparent', border: '1px solid #dcceb6', color: '#dcceb6' },
    dark: { background: '#275140', border: 'none', color: '#dcceb6' },
    darkOutline: { background: 'transparent', border: '1px solid #275140', color: '#275140' },
  }
  return (
    <a
      href={href}
      className="flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl text-[11px] font-medium tracking-widest uppercase group transition-opacity hover:opacity-80"
      style={styles[variant]}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
    </a>
  )
}

// ─── Social icon ────────────────────────────────────────────────────────────

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
      style={{ background: '#1e4538', color: '#dcceb6' }}
      onClick={(e) => e.stopPropagation()}
    >
      {icon}
    </a>
  )
}

// ─── Modal input ────────────────────────────────────────────────────────────

function ModalInput({
  icon, type, placeholder, required, value, onChange,
}: {
  icon: React.ReactNode
  type: string
  placeholder: string
  required?: boolean
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-2.5">{icon}</span>
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 bg-[#11332c] border border-[#2d5c48] rounded-xl text-xs outline-none focus:border-[#dcceb6]/50 transition-colors text-[#dcceb6]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

// ─── Static star decoration positions ───────────────────────────────────────

const STAR_POSITIONS = [
  { x: '8%', y: '5%', size: 12, dur: 2.1, delay: 0 },
  { x: '88%', y: '4%', size: 10, dur: 3.2, delay: 0.5 },
  { x: '95%', y: '18%', size: 8, dur: 2.7, delay: 1.1 },
  { x: '3%', y: '22%', size: 9, dur: 3.5, delay: 0.3 },
  { x: '92%', y: '40%', size: 11, dur: 2.4, delay: 0.8 },
  { x: '5%', y: '55%', size: 7, dur: 3.0, delay: 1.4 },
  { x: '90%', y: '62%', size: 10, dur: 2.8, delay: 0.2 },
  { x: '7%', y: '78%', size: 8, dur: 3.3, delay: 0.9 },
  { x: '93%', y: '80%', size: 9, dur: 2.2, delay: 1.6 },
  { x: '50%', y: '2%', size: 7, dur: 3.8, delay: 0.6 },
]
