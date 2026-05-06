"use client"

import { useState } from "react"
import { Instagram, Facebook, Mail, ExternalLink, X, Send, Phone, User, MessageSquare, Tag } from "lucide-react"
import emailjs from "@emailjs/browser"

export function LinktreeProfile() {
  const [email, setEmail] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Estado para el formulario de contacto
  const [formData, setFormData] = useState({
    user_name: "",
    user_subject: "",
    user_email: "",
    user_phone: "",
    message: "",
  })

  // Manejo de suscripción rápida (Newsletter)
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    emailjs
      .send(
        "service_zw5sudt",
        "template_864uopk",
        {
          name: "Lead Linktree (Newsletter)",
          email: email,
          type: "cliente",
          message: "Nuevo suscriptor desde Link in Bio 🌿",
        },
        "gBgx7V1bFvZfAmAXP"
      )
      .then(() => {
        alert("¡Gracias! Te enviamos el catálogo pronto 🌿")
        setEmail("")
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("Hubo un error al enviar 😢")
      })
  }

  // Manejo de envío de Formulario Completo
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    emailjs
      .send(
        "service_zw5sudt",
        "template_864uopk", // Usando el mismo template; asegúrate que los campos coincidan en EmailJS
        {
          name: formData.user_name,
          subject: formData.user_subject,
          email: formData.user_email,
          phone: formData.user_phone,
          message: formData.message,
          type: "consulta_contacto"
        },
        "gBgx7V1bFvZfAmAXP"
      )
      .then(() => {
        alert("¡Mensaje enviado con éxito! Nos contactaremos pronto. 🌿")
        setFormData({ user_name: "", user_subject: "", user_email: "", user_phone: "", message: "" })
        setIsModalOpen(false)
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("No se pudo enviar el mensaje. Intentá de nuevo.")
      })
      .finally(() => setIsSending(false))
  }

  return (
    <div style={{ background: "#11332c" }} className="min-h-screen flex flex-col items-center px-3 py-5 overflow-auto font-sans">
      <div className="w-full max-w-sm flex flex-col gap-2.5">

        {/* Header */}
        <section style={{ background: "#275140" }} className="rounded-2xl p-5 text-center">
          <div className="flex justify-center mb-3">
            <img
              src="/qv-logo-claro.png"
              alt="Logo Quedé Verde"
              className="h-32 object-contain"
            />
          </div>
          <p className="text-[9px] font-light tracking-[3px] uppercase mb-5" style={{ color: "#8bab9c" }}>
            mates · termos · accesorios
          </p>
          <div className="flex flex-col gap-2">
            <LinkButton href="https://quedeverde.com.ar/" variant="outline">WEBSITE</LinkButton>
            <LinkButton href="https://www.instagram.com/quedeverde.pna/" variant="outline">INSTAGRAM</LinkButton>
            <LinkButton 
              href="https://wa.me/5493436959359?text=Hey!%20Hola,%20me%20interesan%20tus%20productos%20😊" 
              variant="outline"
            >
              WHATSAPP
            </LinkButton>
          </div>
        </section>

        {/* Mailing */}
        <section
          style={{ background: "#1e4538", border: "1px solid #2d5c48" }}
          className="rounded-2xl p-4"
        >
          <h2 className="text-center font-serif text-lg font-normal mb-1" style={{ color: "#dcceb6" }}>
            ¿Querés un descuento?
          </h2>
          <p className="text-[11px] text-center font-light mb-3 leading-relaxed" style={{ color: "#8bab9c" }}>
            Dejanos tu mail y te enviamos el catálogo + un código especial
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="Tu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 rounded-lg px-3 py-2 text-[11px] outline-none"
              style={{ background: "#11332c", border: "1px solid #2d5c48", color: "#dcceb6" }}
              required
            />
            <button
              type="submit"
              className="rounded-lg px-3 py-2 text-[10px] font-medium tracking-wide uppercase shrink-0"
              style={{ background: "#dcceb6", color: "#11332c" }}
            >
              Enviar
            </button>
          </form>
        </section>

        {/* Links adicionales */}
        <section style={{ background: "#dcceb6" }} className="rounded-2xl p-4">
          <div className="flex flex-col gap-2">
            <LinkButton href="#" variant="dark">Catálogo 2026</LinkButton>
            <LinkButton href="#" variant="darkOutline">Novedades</LinkButton>
          </div>
        </section>

        {/* Promo */}
        <div className="grid grid-cols-2 gap-2">
          <div style={{ background: "#dcceb6" }} className="rounded-2xl p-4 flex flex-col items-center text-center">
            <img src="/qv-icono-oscuro.png" alt="Icono" className="h-8 w-8 mb-2 object-contain" />
            <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#6b5e4e" }}>Usá el código</p>
            <p className="text-sm font-semibold tracking-wide mb-3" style={{ color: "#11332c" }}>QVERDE26</p>
            <button
              className="w-full rounded-lg py-1.5 text-[9px] font-medium tracking-widest uppercase"
              style={{ background: "#11332c", color: "#dcceb6" }}
            >
              Shop Now
            </button>
          </div>
          <div style={{ background: "#275140" }} className="rounded-2xl p-4 flex items-center justify-center">
            <p className="font-serif text-2xl leading-tight text-center font-normal" style={{ color: "#dcceb6" }}>
              15% off<br />1ra compra.
            </p>
          </div>
        </div>

        {/* Social */}
        <section className="text-center py-2">
          <p className="text-[10px] uppercase tracking-[3px] mb-3" style={{ color: "#4d7a68" }}>Seguinos en redes</p>
          <p className="text-[10px] tracking-[3px] mb-3" style={{ color: "#4d7a68" }}>
            PAGINA CREADA POR{" "}
            <a
              href="https://www.instagram.com/webi.by.grauberg/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
              style={{ color: "#ffffff" }}
            >
              Webi<span style={{ color: "#facc15" }}>.</span>
            </a>
          </p>        
          <div className="flex justify-center gap-2.5">
            <SocialIcon href="https://www.instagram.com/quedeverde.pna/" icon={<Instagram className="w-4 h-4" />} label="Instagram" />
            <SocialIcon href="#" icon={<Facebook className="w-4 h-4" />} label="Facebook" />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ background: "#1e4538", color: "#dcceb6" }}
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      {/* MODAL DE CONTACTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 backdrop-blur-md bg-[#11332c]/60" 
            onClick={() => setIsModalOpen(false)}
          />
          <div 
            style={{ background: "#1e4538", border: "1px solid #2d5c48" }}
            className="relative w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-in zoom-in duration-300"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#11332c]/50 text-[#dcceb6]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif text-2xl mb-1 text-[#dcceb6] text-center">Contacto</h3>
            <p className="text-[10px] uppercase tracking-widest text-center mb-6" style={{ color: "#8bab9c" }}>
              Envianos tu consulta
            </p>

            <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 text-[#dcceb6]">
              {/* Nombre */}
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-3.5 h-3.5 opacity-40" />
                <input
                  required
                  type="text"
                  placeholder="Nombre"
                  className="w-full pl-9 pr-4 py-2 bg-[#11332c] border border-[#2d5c48] rounded-xl text-xs outline-none focus:border-[#dcceb6]/50 transition-colors"
                  value={formData.user_name}
                  onChange={(e) => setFormData({...formData, user_name: e.target.value})}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 opacity-40" />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full pl-9 pr-4 py-2 bg-[#11332c] border border-[#2d5c48] rounded-xl text-xs outline-none focus:border-[#dcceb6]/50 transition-colors"
                  value={formData.user_email}
                  onChange={(e) => setFormData({...formData, user_email: e.target.value})}
                />
              </div>

              {/* Teléfono */}
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-3.5 h-3.5 opacity-40" />
                <input
                  type="tel"
                  placeholder="Teléfono (opcional)"
                  className="w-full pl-9 pr-4 py-2 bg-[#11332c] border border-[#2d5c48] rounded-xl text-xs outline-none focus:border-[#dcceb6]/50 transition-colors"
                  value={formData.user_phone}
                  onChange={(e) => setFormData({...formData, user_phone: e.target.value})}
                />
              </div>

              {/* Asunto */}
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 opacity-40" />
                <input
                  required
                  type="text"
                  placeholder="Asunto"
                  className="w-full pl-9 pr-4 py-2 bg-[#11332c] border border-[#2d5c48] rounded-xl text-xs outline-none focus:border-[#dcceb6]/50 transition-colors"
                  value={formData.user_subject}
                  onChange={(e) => setFormData({...formData, user_subject: e.target.value})}
                />
              </div>

              {/* Mensaje */}
              <div className="relative">
                <MessageSquare className="absolute left-3 top-2.5 w-3.5 h-3.5 opacity-40" />
                <textarea
                  required
                  placeholder="Tu mensaje..."
                  rows={4}
                  className="w-full pl-9 pr-4 py-2 bg-[#11332c] border border-[#2d5c48] rounded-xl text-xs outline-none focus:border-[#dcceb6]/50 transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-[#dcceb6] text-[#11332c] rounded-xl text-[11px] font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all shadow-lg"
              >
                {isSending ? "Enviando..." : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function LinkButton({
  href,
  children,
  variant = "outline",
}: {
  href: string
  children: React.ReactNode
  variant?: "outline" | "dark" | "darkOutline"
}) {
  const styles: Record<string, React.CSSProperties> = {
    outline: { background: "transparent", border: "1px solid #dcceb6", color: "#dcceb6" },
    dark: { background: "#275140", border: "none", color: "#dcceb6" },
    darkOutline: { background: "transparent", border: "1px solid #275140", color: "#275140" },
  }

  return (
    <a
      href={href}
      className="flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl text-[11px] font-medium tracking-widest uppercase group transition-opacity hover:opacity-80"
      style={styles[variant]}
    >
      {children}
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
    </a>
  )
}

function SocialIcon({
  href,
  icon,
  label
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
      style={{ background: "#1e4538", color: "#dcceb6" }}
    >
      {icon}
    </a>
  )
}