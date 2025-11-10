import ContactSection from '@/components/ContactSection';
import ImageCarousel from '@/components/ImageCarousel';

export default function Home() {
  return (
    <>
      <div className="pt-20">
        <main>
          <section className="bg-white pt-16 pb-20 sm:pt-24 sm:pb-32 border-b-8 border-[#CC0000] min-h-screen flex items-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl tracking-wide mb-4 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              <span className="text-[#CC0000]">DISEÑO</span> INSTANTÁNEO. <br className="hidden sm:inline" /> PRECIOS INIGUALABLES.
            </h1>
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-[#556270] mb-10" style={{ fontFamily: 'Inter, sans-serif' }}>
              Somos <span className="font-bold text-[#1A1A1A]">MSM Estampado & Diseño</span>. La <strong>revolución</strong> de la imagen local. Seriedad técnica, <strong>gestión rápida del pedido</strong> y precios que la competencia no puede igualar gracias a <strong>proveedores estratégicos</strong>.
            </p>
            <a href="#contacto" className="inline-block px-10 py-4 bg-[#CC0000] text-white text-lg font-bold uppercase tracking-wider rounded-xl transition duration-300 hover:hover:bg-red-800 transform hover:scale-105 shadow-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
              ¡Pida su Cotización Express Ahora!
            </a>
          </div>
        </section>

        <section id="pvp" className="py-20 sm:py-28 bg-[#fefefe] min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl text-center mb-2 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              LA <span className="text-[#CC0000]">FÓRMULA</span> DEL PRECIO BAJO Y LA GESTIÓN ÁGIL
            </h2>
              <div className="container mx-auto px-4">
                {/* Shared carousel for the three cards */}
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Slider column (left on desktop) */}
                    <div className="w-full md:pr-4">
                      <div className="h-64 md:h-[420px] lg:h-[450px]">
                        <ImageCarousel
                          images={[
                            'https://placehold.co/600x400?text=Galeria+1',
                            'https://placehold.co/800x600?text=Galeria+2',
                            'https://placehold.co/1200x800?text=Galeria+3'
                          ]}
                          alt="Galería de productos"
                          interval={4000}
                          className="w-full h-full rounded-xl shadow-lg"
                        />
                      </div>
                    </div>

                    {/* Cards column (right on desktop) */}
                    <div className="w-full">
                      <div className="grid grid-rows-3 gap-2">
                        <div className="bg-white p-3 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-t-4 border-t-[#1A1A1A]">
                          <h3 className="text-2xl tracking-wider mb-2 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>DISEÑO Y APROBACIÓN EN HORAS</h3>
                          <p className="text-[#556270] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            La velocidad está en el <strong>diseño y la cotización</strong>. Gracias al software, generamos el logo, la simulación y la orden de compra en <strong>horas, no semanas</strong>. Cero tiempo muerto en la fase inicial.
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-t-4 border-t-[#CC0000]">
                          <h3 className="text-2xl tracking-wider mb-2 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>PROVEEDORES INCOMPETIBLES</h3>
                          <p className="text-[#556270] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Nuestra principal ventaja: Establecemos alianzas directas con <strong>fábricas y realizamos adquisiciones estratégicas desde China</strong>. Esta agresiva estrategia elimina intermediarios, garantizando <strong>precios imbatibles</strong> que pocos se atreven a ofrecer.
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-t-4 border-t-[#1A1A1A]">
                          <h3 className="text-2xl tracking-wider mb-2 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>ESTRUCTURA MÍNIMA Y DIRECTA</h3>
                          <p className="text-[#556270] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Operamos sin pagar renta de local. Al eliminar los costos fijos elevados, le garantizamos que su inversión se destina <strong>directamente</strong> a la calidad del producto y no a gastos operativos innecesarios.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </section>

        <section id="servicios" className="py-20 sm:py-28 bg-[#1A1A1A] text-white min-h-screen flex items-center">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl text-center mb-16 text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              SOLUCIONES DE IMAGEN <span className="text-[#CC0000]">PARA SU NEGOCIO</span>
            </h2>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center bg-[#282828] p-6 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-l-8 border-l-[#1A1A1A]">
                <div className="md:w-1/3 text-4xl mb-4 md:mb-0 md:text-left text-center">
                  <span className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>DISEÑO DE MARCA ÁGIL</span>
                </div>
                <div className="md:w-2/3 md:pl-6 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Transformamos su idea, boceto o concepto inicial en una <strong>identidad corporativa lista para imprimir</strong>. Esto incluye logo vectorial final, paleta cromática y tipografía profesional. Cero demoras, máxima precisión técnica.
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center bg-[#282828] p-6 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-l-8 border-l-[#CC0000]">
                <div className="md:w-1/3 text-4xl mb-4 md:mb-0 md:text-left text-center">
                  <span className="text-[#CC0000]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>PRODUCCIÓN DE UNIFORMES</span>
                </div>
                <div className="md:w-2/3 md:pl-6 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Suministro de uniformes (polos, camisetas, *hoodies*) y productos promocionales (gorras, vasos, *mugs*). Aplicamos su imagen con <strong>DTF, sublimación o vinilo de precisión</strong>, garantizando durabilidad y calidad corporativa superior.
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
        </main>

        <footer className="bg-[#1A1A1A] text-white py-10">
          <div className="container mx-auto px-4 text-center text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            <p className="mb-2">© 2026 MSM Estampado & Diseño. Moralisimo.com. <br /> <strong>Costo Inteligente.</strong></p>
            <p className="text-gray-400">Su socio local en soluciones de imagen rápida y producción con estructura de costo mínimo.</p>
          </div>
        </footer>
      </div>
    </>
  );
}