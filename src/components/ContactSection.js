"use client";

import { useState } from 'react';

export default function ContactSection() {
  const [message, setMessage] = useState('');
  const phone = (process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573001234567').replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message || 'Hola, estoy interesado en sus servicios de diseño y producción.')}`;

  return (
    <section id="contacto" className="py-20 sm:py-28 bg-[#f7f7f7] min-h-screen flex items-center">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-4xl sm:text-5xl text-center mb-6 text-[#1A1A1A]" style={{fontFamily: 'Bebas Neue, sans-serif'}}>
          CONFÍE EN LA <span className="text-[#CC0000]">EFICIENCIA</span>.
        </h2>
        <p className="text-xl text-[#556270] mb-10" style={{fontFamily: 'Inter, sans-serif'}}>
          Deje de pagar precios de ciudad por tiempos de respuesta lentos. Contáctenos hoy para recibir su presupuesto de diseño y producción en tiempo récord para <strong>camisetas personalizadas Putumayo</strong>, <strong>uniformes deportivos baratos Mocoa</strong> o <strong>estampados al por mayor Pasto</strong>.
        </p>
        <div className="space-y-4 text-left bg-white p-8 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-t-4 border-t-[#1A1A1A]">
          <div className="text-sm text-[#556270] space-y-2" style={{fontFamily: 'Inter, sans-serif'}}>
            <p>Atendemos desde Sibundoy, Putumayo, y despachamos a todo el sur de Colombia. Escríbenos cuando necesites uniformes, regalos corporativos o diseño de marca.</p>
            <p>
              <strong className="text-[#1A1A1A]">Contacto directo:</strong> <a href="mailto:bayrondavid@moralisimo.com" className="text-[#CC0000] underline">bayrondavid@moralisimo.com</a>
            </p>
            <ul className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-[#1A1A1A]">
              <li><a href="https://www.instagram.com/_moralisimo" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#F7F7F7] rounded-full hover:bg-[#CC0000] hover:text-white transition">Instagram</a></li>
              <li><a href="https://www.tiktok.com/@moralisimo" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#F7F7F7] rounded-full hover:bg-[#CC0000] hover:text-white transition">TikTok</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61579614505129" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#F7F7F7] rounded-full hover:bg-[#CC0000] hover:text-white transition">Facebook</a></li>
            </ul>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#1A1A1A]">Describa su Proyecto (Identidad, Uniformes, Merchandising)</label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ej: Necesito diseño de logo y 50 camisetas personalizadas..."
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-[#CC0000] focus:border-[#CC0000]"
              style={{fontFamily: 'Inter, sans-serif'}}
            />
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block px-4 py-3 bg-[#25D366] text-white text-lg font-bold uppercase tracking-wider rounded-lg transition duration-300 hover:bg-[#128C7E] transform hover:scale-[1.01] text-center"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            ENVIAR POR WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}