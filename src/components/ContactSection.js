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
          Deje de pagar precios de ciudad por tiempos de respuesta lentos. Contáctenos hoy para recibir su presupuesto de diseño y producción en tiempo récord.
        </p>
        <div className="space-y-4 text-left bg-white p-8 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-t-4 border-t-[#1A1A1A]">
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