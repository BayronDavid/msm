import ContactSection from '@/components/ContactSection';
import LazyImageCarousel from '@/components/LazyImageCarousel';

export const metadata = {
  title: "Estampados y Merchandising en Sibundoy | MORALISIMO Estampado & Diseño",
  description:
    "Uniformes empresariales, diseño de marca y merchandising personalizado con entregas ágiles en Sibundoy y Putumayo.",
  keywords: [
    "estampado DTF Sibundoy",
    "uniformes empresariales Putumayo",
    "merchandising corporativo sur de Colombia",
    "sublimación Sibundoy",
    "diseño de marca express"
  ],
  openGraph: {
    title: "Estampados y Merchandising en Sibundoy | MORALISIMO Estampado & Diseño",
    description:
      "Soluciones de identidad, uniformes personalizados y regalos corporativos en Sibundoy, Putumayo."
  },
  twitter: {
    card: "summary_large_image",
    title: "Estampados y Merchandising en Sibundoy | MORALISIMO Estampado & Diseño",
    description:
      "Diseño y producción de uniformes, mugs, gorras y piezas gráficas con tiempos express."
  }
};

// import fs from 'fs';
// import path from 'path';

async function getMediaFilesFromPublic() {
  // Only consume remote manifest or env-provided list. Local filesystem scanning removed.
  const envVar = process.env.CAROUSEL_MEDIA || process.env.NEXT_PUBLIC_CAROUSEL_MEDIA;
  if (!envVar || envVar.trim().length === 0) return [];

  const trimmed = envVar.trim();

  // If env var is a URL, fetch manifest or list from that URL
  if (/^https?:\/\//i.test(trimmed)) {
    const candidates = trimmed.endsWith('/')
      ? [trimmed + 'carousel.json', trimmed + 'media.json', trimmed + 'list.json', trimmed + 'images.json', trimmed + 'gallery.json']
      : [trimmed];

    for (const url of candidates) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const text = await res.text();
        const contentType = (res.headers.get('content-type') || '').toLowerCase();

        // If JSON manifest like the example
        if (contentType.includes('application/json') || text.trim().startsWith('{')) {
          try {
            const obj = JSON.parse(text);
            const filesObj = obj.files || {};
            const entries = Object.values(filesObj).map((f) => f.url || f.filename).filter(Boolean);

            const normalized = entries.map((u) => {
              if (/^https?:\/\//i.test(u)) return u;
              // resolve relative paths against the manifest URL
              try { return new URL(u.replace(/^\.\//, ''), url).href; } catch (e) { return u; }
            }).filter(Boolean);

            if (normalized.length > 0) return normalized;
          } catch (e) {
            // not the expected JSON manifest; fall through to other parsing
          }
        }

        // Otherwise try parse as JSON array or newline/CSV list
        let parsed = [];
        try {
          if (text.trim().startsWith('[')) parsed = JSON.parse(text);
          else parsed = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
          if (parsed.length === 1 && parsed[0].includes(',')) parsed = parsed[0].split(',').map(s => s.trim()).filter(Boolean);
        } catch (e) {
          parsed = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
        }

        const normalized = parsed.map((item) => {
          if (!item) return null;
          if (/^https?:\/\//i.test(item)) return item;
          try { return new URL(item.replace(/^\.\//, ''), url).href; } catch (e) { return item; }
        }).filter(Boolean);

        if (normalized.length > 0) return normalized;
      } catch (err) {
        // ignore and try next candidate
        continue;
      }
    }
  }

  // Not a URL: parse env var as JSON array or CSV/newline list
  try {
    if (trimmed.startsWith('[')) return JSON.parse(trimmed).filter(Boolean);
    return trimmed.split(/\r?\n|,/).map(s => s.trim()).filter(Boolean);
  } catch (e) {
    return trimmed.split(/\r?\n|,/).map(s => s.trim()).filter(Boolean);
  }
}

export default async function Home() {
  // gather media files from public/images (recursive). If empty, we'll use the existing placeholders.
  const gallery = await getMediaFilesFromPublic();
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Estampado y merchandising personalizado",
    provider: {
      "@type": "Organization",
      name: "MORALISIMO Estampado & Diseño",
      url: "https://moralisimo.com"
    },
    serviceType: "Diseño de imagen corporativa y producción textil",
    areaServed: ["Sibundoy", "Putumayo", "Nariño", "Sur de Colombia"],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://wa.me/573001234567"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo MORALISIMO",
      url: "https://moralisimo.com/catalogo"
    }
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿En qué ciudades entregan los pedidos de estampado?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Despachamos desde Sibundoy a todo Putumayo, Nariño y ciudades del sur de Colombia con aliados logísticos y seguimiento por WhatsApp."
        }
      },
      {
        "@type": "Question",
        name: "¿Qué técnicas de personalización manejan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trabajamos con DTF, sublimación y vinilo textil para uniformes, gorras, mugs y material promocional según el uso y el tipo de prenda."
        }
      },
      {
        "@type": "Question",
        name: "¿Cuál es el tiempo de entrega típico?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Las propuestas de diseño se aprueban en horas y producimos en 3 a 5 días hábiles dependiendo de la cantidad, con opciones express para eventos urgentes."
        }
      }
    ]
  };
  const structuredDataJson = JSON.stringify([serviceSchema, faqSchema]);
  return (
    <>
      <div className="pt-20">
        <main>
          <section className="bg-white pt-16 pb-20 sm:pt-24 sm:pb-32 border-b-8 border-[#CC0000] min-h-screen flex items-center">
            <div className="container mx-auto px-4 text-center">
              <p className="uppercase text-sm tracking-[0.35em] text-[#9AA0A6] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Estudio textil en Sibundoy, Putumayo
              </p>

              {/* H1 CAMBIADO - Elimina 'EN HORAS', mantiene 'ÁGIL' */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bebas tracking-wide mb-4 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                IDENTIDAD PROFESIONAL. <span className="text-[#CC0000]">RESPUESTA ÁGIL.</span>
              </h1>

              <p className="max-w-2xl mx-auto text-xl sm:text-1xl text-[#556270] mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                En <strong>MORALISIMO Estampado & Diseño</strong> convertimos sus ideas en uniformes, regalos empresariales y piezas gráficas inolvidables. Operamos desde Sibundoy para todo Putumayo, Nariño y sur de Colombia con <strong>tiempos express, gestión ágil</strong> y economías de escala gracias a nuestra red de proveedores directos.
              </p>

              <div className="mt-8 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-center gap-4">

                  {/* Botón 1: Vitrina (Catálogo) */}
                  <a
                    href="/catalogo"
                    className="inline-flex justify-center items-center px-6 sm:px-10 py-3 sm:py-4 bg-[#CC0000] text-white text-base sm:text-lg font-bold uppercase tracking-wider rounded-xl transition duration-300 hover:bg-red-800"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Ver Catálogo (Precios y Ejemplos)
                  </a>

                  {/* Botón 2: Bodega (Inventario) */}
                  <a
                    href="/inventario"
                    className="inline-flex justify-center items-center px-6 sm:px-10 py-3 sm:py-4 border border-[#1A1A1A] text-[#1A1A1A] text-base sm:text-lg font-bold uppercase tracking-wider rounded-xl transition duration-300 hover:bg-[#1A1A1A] hover:text-white"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Ver Inventario Completo
                  </a>
                </div>
              </div>
            </div>
          </section>

  <section id="pvp" className="pt-10 sm:pt-28 bg-[#fefefe] min-h-screen flex items-start">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl text-center mb-2 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              LA <span className="text-[#CC0000]">FÓRMULA</span> DEL PRECIO BAJO Y LA GESTIÓN ÁGIL
            </h2>
            <p className="max-w-3xl mx-auto text-center text-sm text-[#556270] mb-10" style={{ fontFamily: 'Inter, sans-serif' }}>
              Estamos ubicados en Sibundoy y trabajamos con logística integrada hacia Putumayo y Nariño. La combinación de software, alianzas con talleres aliados y compras directas en Asia nos permite entregar mejor precio sin sacrificar acabados ni puntualidad.
            </p>
              {/* Shared carousel for the three cards */}
              <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Slider column (left on desktop) */}
                    <div className="w-full md:pr-4">
                      <div className="h-64 md:h-[420px] lg:h-[450px]">
                        <LazyImageCarousel
                          images={
                            (gallery && gallery.length > 0)
                              ? gallery
                              : [
                                  'https://placehold.co/600x400?text=Galeria+1',
                                  'https://placehold.co/800x600?text=Galeria+2',
                                  'https://placehold.co/1200x800?text=Galeria+3'
                                ]
                          }
                          alt="Estampados personalizados en Sibundoy"
                          interval={4000}
                          className="w-full h-full rounded-xl shadow-lg"
                          rootMargin="50px"
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

        <section id="sectores" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl sm:text-5xl text-center mb-10 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              Sectores que confían en MORALISIMO
            </h2>
            <p className="max-w-3xl mx-auto text-center text-sm text-[#556270] mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>
              Gestionamos proyectos para empresas de servicios, turismo, gastronomía, educación y eventos comunitarios en Putumayo. Coordinamos entregas con guías certificadas y mantenemos comunicación constante por email (<a href="mailto:bayrondavid@moralisimo.com" className="text-[#CC0000] underline">bayrondavid@moralisimo.com</a>) y redes sociales.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border border-[#F0F0F0] rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] bg-[#fefefe]">
                <h3 className="text-2xl text-[#1A1A1A] mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Uniformes empresariales y retail</h3>
                <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Kits para equipos comerciales, dotación industrial y ropa de tienda con numeración, cargos y personalizaciones unitarias.
                </p>
              </div>
              <div className="border border-[#F0F0F0] rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] bg-[#fefefe]">
                <h3 className="text-2xl text-[#1A1A1A] mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Turismo, gastronomía y emprendimientos locales</h3>
                <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Menús, manteles, delantales, vasos y recordatorios para hoteles, restaurantes y experiencias turísticas que buscan coherencia visual.
                </p>
              </div>
              <div className="border border-[#F0F0F0] rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] bg-[#fefefe]">
                <h3 className="text-2xl text-[#1A1A1A] mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Eventos institucionales y educativos</h3>
                <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Campañas culturales, ferias y brigadas estudiantiles con camisetas, gorras y pendones producidos en tiempos récord.
                </p>
              </div>
              <div className="border border-[#F0F0F0] rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] bg-[#fefefe]">
                <h3 className="text-2xl text-[#1A1A1A] mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Regalos empresariales y fidelización</h3>
                <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Kits de bienvenida, cajas personalizadas y merchandising premium para cerrar negocios o agradecer a clientes estratégicos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-[#f7f7f7]">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl text-center mb-10 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              Preguntas frecuentes
            </h2>
            <div className="space-y-4">
              <details className="group bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer text-base font-semibold text-[#1A1A1A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ¿En qué ciudades entregan los pedidos?
                  <span className="text-[#CC0000] group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-3 text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Hacemos entregas locales en Sibundoy y coordinamos envíos hacia Mocoa, Puerto Asís, Pasto, Ipiales y otras ciudades del sur del país. Todos los despachos se gestionan con mensajería confiable y guía rastreable.
                </p>
              </details>
              <details className="group bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer text-base font-semibold text-[#1A1A1A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ¿Cuáles son las técnicas de personalización disponibles?
                  <span className="text-[#CC0000] group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-3 text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Seleccionamos la técnica ideal según el material y el uso final. Contamos con DTF para colores sólidos y degradados, sublimación para poliéster y vinilo textil de alto desempeño para prendas de trabajo intensivo.
                </p>
              </details>
              <details className="group bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer text-base font-semibold text-[#1A1A1A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ¿Cuál es el tiempo de producción promedio?
                  <span className="text-[#CC0000] group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-3 text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Las propuestas de diseño se aprueban en cuestión de horas. Para producción trabajamos en ciclos de 3 a 5 días hábiles, con opciones express según la cantidad y el tipo de producto.
                </p>
              </details>
            </div>
            <p className="mt-6 text-center text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
              ¿Listo para comenzar? Escríbanos al <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="text-[#CC0000] font-semibold underline">WhatsApp corporativo</a> o envíe un correo a <a href="mailto:bayrondavid@moralisimo.com" className="text-[#CC0000] font-semibold underline">bayrondavid@moralisimo.com</a>.
            </p>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />

        <ContactSection />
        </main>
      </div>
    </>
  );
}