export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-[0_10px_30px_rgba(26,26,26,0.08)]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-4xl sm:text-5xl font-extrabold tracking-widest leading-none flex items-end border-b-4 border-[#CC0000]" style={{fontFamily: 'Bebas Neue, sans-serif'}}>
              <span className="text-[#1A1A1A]">M</span>
              <span className="text-[#CC0000]">S</span>
              <span className="text-[#1A1A1A]">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl text-black leading-none" style={{fontFamily: 'Bebas Neue, sans-serif'}}>MORALISIMO</span>
              <span className="text-sm text-gray-600 tracking-wider leading-none mt-1" style={{fontFamily: 'Inter, sans-serif'}}>Print Studio</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium" style={{fontFamily: 'Inter, sans-serif'}}>
            <a href="#pvp" className="text-gray-700 hover:text-black transition duration-300">Nuestra Ventaja</a>
            <a href="#servicios" className="text-gray-700 hover:text-black transition duration-300">Servicios</a>
            <a href="#contacto" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-red-700 transition duration-300">Solicitar Presupuesto</a>
          </nav>
          <button className="md:hidden text-2xl text-black">☰</button>
        </div>
      </header>

      <main>
        <section className="bg-white pt-16 pb-20 sm:pt-24 sm:pb-32 border-b-8 border-[#CC0000]">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl tracking-wide mb-4 text-[#1A1A1A]" style={{fontFamily: 'Bebas Neue, sans-serif'}}>
              <span className="text-[#CC0000]">IDENTIDAD</span> PROFESIONAL <br className="hidden sm:inline" /> EN HORAS.
            </h1>
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-[#556270] mb-10" style={{fontFamily: 'Inter, sans-serif'}}>
              Somos <span className="font-bold text-[#1A1A1A]">MORALISIMO Print Studio</span>. Seriedad técnica, eficiencia operativa y producción local. La calidad corporativa que necesita, al precio que solo la estructura de costo mínimo permite.
            </p>
            <a href="#contacto" className="inline-block px-10 py-4 bg-[#CC0000] text-white text-lg font-bold uppercase tracking-wider rounded-xl transition duration-300 hover:bg-red-800 transform hover:scale-105 shadow-xl" style={{fontFamily: 'Inter, sans-serif'}}>
              Solicite su Diseño Express
            </a>
          </div>
        </section>

        <section id="pvp" className="py-20 sm:py-28 bg-[#fefefe]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl text-center mb-16 text-[#1A1A1A]" style={{fontFamily: 'Bebas Neue, sans-serif'}}>
              NUESTRA <span className="text-[#CC0000]">VENTAJA TÉCNICA</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-t-4 border-t-[#1A1A1A]">
                <div className="text-5xl mb-3 text-[#1A1A1A]">⚡</div>
                <h3 className="text-2xl tracking-wider mb-2 text-[#1A1A1A]" style={{fontFamily: 'Bebas Neue, sans-serif'}}>DISEÑO EXPRESS</h3>
                <p className="text-[#556270] text-sm" style={{fontFamily: 'Inter, sans-serif'}}>
                  Nuestro dominio técnico del software nos permite generar su identidad profesional (logo, paleta, tipografía) en <span className="font-bold">horas</span>, eliminando el cuello de botella tradicional de semanas.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-t-4 border-t-[#1A1A1A]">
                <div className="text-5xl mb-3 text-[#1A1A1A]">⚙️</div>
                <h3 className="text-2xl tracking-wider mb-2 text-[#1A1A1A]" style={{fontFamily: 'Bebas Neue, sans-serif'}}>ESTRUCTURA MÍNIMA</h3>
                <p className="text-[#556270] text-sm" style={{fontFamily: 'Inter, sans-serif'}}>
                  Operamos sin local comercial y bajo estricto modelo de pedidos. Cero renta, cero costos fijos innecesarios. Esta eficiencia es nuestra garantía de seriedad financiera.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-t-4 border-t-[#CC0000]">
                <div className="text-5xl mb-3 text-[#CC0000]">💰</div>
                <h3 className="text-2xl tracking-wider mb-2 text-[#1A1A1A]" style={{fontFamily: 'Bebas Neue, sans-serif'}}>PRECIOS DE VANGUARDIA</h3>
                <p className="text-[#556270] text-sm" style={{fontFamily: 'Inter, sans-serif'}}>
                  Al eliminar los costos operativos elevados, podemos ofrecer tarifas finales significativamente más bajas sin comprometer la calidad del producto final ni el servicio profesional.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="py-20 sm:py-28 bg-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl text-center mb-16 text-white" style={{fontFamily: 'Bebas Neue, sans-serif'}}>
              NUESTROS SERVICIOS <span className="text-[#CC0000]">PROFESIONALES</span>
            </h2>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center bg-[#282828] p-6 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-l-8 border-l-[#1A1A1A]">
                <div className="md:w-1/3 text-4xl mb-4 md:mb-0 md:text-left text-center">
                  <span className="text-white" style={{fontFamily: 'Bebas Neue, sans-serif'}}>IDENTIDAD EXPRESS</span>
                </div>
                <div className="md:w-2/3 md:pl-6 text-sm" style={{fontFamily: 'Inter, sans-serif'}}>
                  Creación de una identidad de marca coherente y profesional: logo vectorial, paleta cromática corporativa y selección tipográfica optimizada para su mercado. Rápida validación y entrega.
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center bg-[#282828] p-6 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-l-8 border-l-[#CC0000]">
                <div className="md:w-1/3 text-4xl mb-4 md:mb-0 md:text-left text-center">
                  <span className="text-[#CC0000]" style={{fontFamily: 'Bebas Neue, sans-serif'}}>PRODUCCIÓN LOCAL</span>
                </div>
                <div className="md:w-2/3 md:pl-6 text-sm" style={{fontFamily: 'Inter, sans-serif'}}>
                  Plasme su nueva identidad en productos de alta calidad: uniformes (camisetas, polos), merchandising promocional (gorras, vasos, bolsas) con técnicas de estampado y sublimación de precisión.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="py-20 sm:py-28 bg-[#f7f7f7]">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="text-4xl sm:text-5xl text-center mb-6 text-[#1A1A1A]" style={{fontFamily: 'Bebas Neue, sans-serif'}}>
              CONFÍE EN LA <span className="text-[#CC0000]">EFICIENCIA</span>.
            </h2>
            <p className="text-xl text-[#556270] mb-10" style={{fontFamily: 'Inter, sans-serif'}}>
              Deje de pagar precios de ciudad por tiempos de respuesta lentos. Contáctenos hoy para recibir su presupuesto de diseño y producción en tiempo récord.
            </p>
            <form className="space-y-4 text-left bg-white p-8 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-t-4 border-t-[#1A1A1A]">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A]">Nombre y Empresa</label>
                <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-[#CC0000] focus:border-[#CC0000]" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A]">Correo Electrónico Corporativo</label>
                <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-[#CC0000] focus:border-[#CC0000]" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1A1A1A]">Describa su Proyecto (Identidad, Uniformes, Merchandising)</label>
                <textarea id="message" rows="4" className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-[#CC0000] focus:border-[#CC0000]"></textarea>
              </div>
              <button type="submit" className="w-full px-4 py-3 bg-[#CC0000] text-white text-lg font-bold uppercase tracking-wider rounded-lg transition duration-300 hover:bg-red-800 transform hover:scale-[1.01]" style={{fontFamily: 'Inter, sans-serif'}}>
                ENVIAR SOLICITUD PROFESIONAL
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#1A1A1A] text-white py-10">
        <div className="container mx-auto px-4 text-center text-sm" style={{fontFamily: 'Inter, sans-serif'}}>
          <p className="mb-2">© 2024 MORALISIMO Print Studio. Gráfica Ágil & Costo Inteligente.</p>
          <p className="text-gray-400">Su socio local en soluciones de identidad y producción rápida.</p>
        </div>
      </footer>
    </>
  );
}
