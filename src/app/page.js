import ContactSection from '@/components/ContactSection';
import LazyImageCarousel from '@/components/LazyImageCarousel';

const HOME_KEYWORDS = [
  "donde estampan camisetas en Sibundoy",
  "dónde estampan camisetas en Sibundoy",
  "camisetas personalizadas Putumayo",
  "uniformes deportivos baratos Mocoa",
  "estampados al por mayor Pasto",
  "dotaciones empresariales Nariño",
  "camisetas para campañas Pasto",
  "fábrica de uniformes envíos al sur",
  "mugs con foto Mocoa",
  "gorras bordadas personalizadas Pasto",
  "chalecos para moto y empresa",
  "buzos prom 11 Putumayo y Nariño",
  "diseño grafico express sur de colombia",
  "diseño gráfico express sur de Colombia",
  "estampado dtf sibundoy",
  "merchandising corporativo sur de colombia"
];

export const metadata = {
  title: "Estampado de camisetas en Sibundoy y Putumayo | MORALISIMO Estampado & Diseño",
  description:
    "Taller textil en Sibundoy especializado en camisetas personalizadas para Putumayo, uniformes deportivos baratos en Mocoa, estampados al por mayor en Pasto y dotaciones empresariales para Nariño.",
  keywords: HOME_KEYWORDS,
  alternates: {
    canonical: "https://moralisimo.com/"
  },
  openGraph: {
    title: "Estampado de camisetas en Sibundoy y Putumayo | MORALISIMO Estampado & Diseño",
    description:
      "Producción express de camisetas personalizadas, uniformes deportivos y merchandising con entregas hacia Putumayo, Mocoa, Pasto y Nariño.",
    url: "https://moralisimo.com/",
    locale: "es_CO",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Estampado y merchandising para el sur de Colombia",
    description:
      "Camisetas personalizadas en Putumayo, uniformes deportivos económicos en Mocoa y dotaciones empresariales para Nariño con entregas rápidas."
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
        name: "¿Dónde estampan camisetas en Sibundoy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Contamos con un taller operativo en Sibundoy donde recibimos pedidos, aprobamos diseños y coordinamos entregas o recogidas con cita previa."
        }
      },
      {
        "@type": "Question",
        name: "¿Ofrecen camisetas personalizadas Putumayo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Producimos camisetas personalizadas para empresas, eventos y emprendimientos en todo Putumayo con envíos rastreables y asesoría en tallajes."
        }
      },
      {
        "@type": "Question",
        name: "¿Tienen uniformes deportivos baratos Mocoa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Disponemos de líneas deportivas económicas con numeración individual y entregas consolidadas hacia Mocoa."
        }
      },
      {
        "@type": "Question",
        name: "¿Cubren estampados al por mayor Pasto y Nariño?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Consolidamos pedidos mayoristas para Pasto, Ipiales y demás municipios de Nariño con control de color y empaques por punto de entrega."
        }
      },
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
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MORALISIMO Estampado & Diseño",
    url: "https://moralisimo.com",
    telephone: "+57 3001234567",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sibundoy",
      addressRegion: "Putumayo",
      addressCountry: "CO"
    },
    areaServed: ["Sibundoy", "Putumayo", "Mocoa", "Pasto", "Nariño"],
    knowsAbout: HOME_KEYWORDS,
    sameAs: [
      "https://www.instagram.com/_moralisimo",
      "https://www.facebook.com/profile.php?id=61579614505129",
      "https://www.tiktok.com/@moralisimo"
    ],
    makesOffer: HOME_KEYWORDS.map((phrase) => ({
      "@type": "Offer",
      name: phrase,
      itemOffered: {
        "@type": "Service",
        name: phrase
      },
      areaServed: ["Putumayo", "Nariño", "Sur de Colombia"]
    }))
  };
  const structuredDataJson = JSON.stringify([serviceSchema, faqSchema, localBusinessSchema]);
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
                En <strong>MORALISIMO Estampado & Diseño</strong> convertimos sus ideas en uniformes, regalos empresariales y piezas gráficas inolvidables. Si buscas “donde estampan camisetas en Sibundoy” o “camisetas personalizadas Putumayo”, somos el taller local que resuelve con <strong>diseño gráfico express sur de Colombia</strong>. También producimos <strong>uniformes deportivos baratos Mocoa</strong>, dotaciones y campañas para Pasto y Nariño con entregas coordinadas.
              </p>

              <div className="mt-8 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-center gap-4">

                  {/* Botón 1: Vitrina (Catálogo) */}
                  <a
                    href="/catalogo"
                    className="inline-flex justify-center items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#CC0000] text-white text-sm sm:text-base font-bold uppercase tracking-wider rounded-lg transition duration-300 hover:bg-red-800"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Catálogo (Precios y Ejemplos)
                  </a>

                  {/* Botón 2: Bodega (Inventario) */}
                  <a
                    href="/inventario"
                    className="inline-flex justify-center items-center px-4 sm:px-6 py-2 sm:py-3 border border-[#1A1A1A] text-[#1A1A1A] text-sm sm:text-base font-bold uppercase tracking-wider rounded-lg transition duration-300 hover:bg-[#1A1A1A] hover:text-white"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Inventario Completo
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
                            Operamos sin pagar renta de local. Al eliminar los costos fijos elevados, le garantizamos que su inversión se destina <strong>directamente</strong> a la calidad del producto y no a gastos operativos innecesarios, incluso en proyectos de <strong>dotaciones empresariales Nariño</strong> o envíos masivos hacia Pasto y Putumayo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        </section>

        <section id="regional" className="py-16 bg-[#fefefe] border-b border-[#E5E7EB]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl sm:text-5xl text-center mb-6 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              Estampamos y enviamos al sur de Colombia
            </h2>
            <p className="max-w-4xl mx-auto text-center text-sm text-[#556270] mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>
              Somos la <strong>fábrica de uniformes envíos al sur</strong> pensada para Putumayo, Mocoa, Pasto y Nariño. Coordinamos producción y logística propia para dotaciones empresariales, campañas y lanzamientos regionales.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] border border-[#F0F0F0]">
                <h3 className="text-2xl text-[#1A1A1A] mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>¿Dónde estampan camisetas en Sibundoy?</h3>
                <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Operamos un laboratorio textil en Sibundoy que atiende pedidos urgentes, personalización unitaria y proyectos empresariales. Agendamos entregas locales o recogidas con cita previa.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] border border-[#F0F0F0]">
                <h3 className="text-2xl text-[#1A1A1A] mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Camisetas personalizadas Putumayo</h3>
                <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Atendemos colegios, emprendimientos y eventos en todo Putumayo con DTF, sublimación y vinilo textil. Coordinamos rutas semanales para que su pedido llegue listo a Valle del Guamuez, Puerto Asís y municipios vecinos.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] border border-[#F0F0F0]">
                <h3 className="text-2xl text-[#1A1A1A] mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Uniformes deportivos baratos Mocoa</h3>
                <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Nuestra red de talleres aliados nos permite producir uniformes deportivos completos para clubes y colegios de Mocoa con tarifas mayoristas, numeración individual y entregas express.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] border border-[#F0F0F0]">
                <h3 className="text-2xl text-[#1A1A1A] mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Estampados al por mayor Pasto</h3>
                <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Consolidamos producción por lotes para agencias, ferias y campañas que operan en Pasto. Entregamos camisetas y piezas promocionales listas para distribución con control de color y calidad.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] border border-[#F0F0F0]">
                <h3 className="text-2xl text-[#1A1A1A] mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Dotaciones empresariales Nariño</h3>
                <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Diseñamos dotaciones completas para empresas de servicios, industria y logística en Nariño. Incluimos chalecos, camisas, buzos y piezas exteriores listas para personalizar con bordado o DTF.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] border border-[#F0F0F0]">
                <h3 className="text-2xl text-[#1A1A1A] mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Camisetas para campañas Pasto</h3>
                <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Planeamos producciones escalables para brigadas, campañas políticas y eventos culturales en Pasto. Numeramos por persona, entregamos en sets y gestionamos reposiciones rápidas.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-3xl text-[#1A1A1A] mb-4 text-center" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                Soluciones producto – problema
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] border border-[#F0F0F0]">
                  <h4 className="text-xl text-[#1A1A1A] mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Mugs con foto Mocoa</h4>
                  <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Personalizamos mugs y vasos térmicos con fotos familiares, logos o mensajes corporativos. Empaques listos para regalo y entregas protegidas para envíos a Mocoa.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] border border-[#F0F0F0]">
                  <h4 className="text-xl text-[#1A1A1A] mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Gorras bordadas personalizadas Pasto</h4>
                  <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Bordamos gorras premium con hilos de alto contraste, escudos y slogans para equipos corporativos y eventos en Pasto. Cubrimos pedidos pequeños y al por mayor.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] border border-[#F0F0F0]">
                  <h4 className="text-xl text-[#1A1A1A] mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Chalecos para moto y empresa</h4>
                  <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Fabricamos chalecos reflectivos para mensajería urbana, empresas de seguridad y logística. Incluimos bolsillos, numeración y franjas de alta visibilidad listos para estampado o bordado.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.06)] border border-[#F0F0F0]">
                  <h4 className="text-xl text-[#1A1A1A] mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Buzos prom 11 Putumayo y Nariño</h4>
                  <p className="text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Diseñamos buzos personalizados para promociones escolares en Putumayo y Nariño con ilustraciones creadas a medida y control de tallas por curso.
                  </p>
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
                  Transformamos su idea, boceto o concepto inicial en una <strong>identidad corporativa lista para imprimir</strong>. Esto incluye logo vectorial final, paleta cromática y tipografía profesional. Nuestro equipo de <strong>diseño grafico express sur de colombia</strong> documenta todo para entregar piezas consistentes desde la primera tirada.
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center bg-[#282828] p-6 rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.08)] border-l-8 border-l-[#CC0000]">
                <div className="md:w-1/3 text-4xl mb-4 md:mb-0 md:text-left text-center">
                  <span className="text-[#CC0000]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>PRODUCCIÓN DE UNIFORMES</span>
                </div>
                <div className="md:w-2/3 md:pl-6 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Suministro de uniformes (polos, camisetas, *hoodies*), <strong>chalecos para moto y empresa</strong> y productos promocionales (gorras bordadas, vasos, *mugs*). Aplicamos su imagen con <strong>DTF, sublimación o vinilo de precisión</strong>, garantizando durabilidad y calidad corporativa superior.
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
                  Campañas culturales, ferias y brigadas estudiantiles con camisetas, gorras y pendones producidos en tiempos récord, incluyendo <strong>buzos prom 11 Putumayo y Nariño</strong> con identidad propia para cada curso.
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
                  ¿Dónde estampan camisetas en Sibundoy?
                  <span className="text-[#CC0000] group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-3 text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Nuestro taller principal está en Sibundoy. Allí recibimos pedidos, hacemos aprobación de diseño y coordinamos entregas locales o recogidas programadas. También trabajamos vía WhatsApp para clientes que se encuentran fuera del valle de Sibundoy.
                </p>
              </details>
              <details className="group bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer text-base font-semibold text-[#1A1A1A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ¿Ofrecen camisetas personalizadas Putumayo?
                  <span className="text-[#CC0000] group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-3 text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sí. Trabajamos camisetas en algodón, poliéster y mezclas especiales para empresas, emprendimientos y eventos en todo Putumayo. Realizamos despachos con guía rastreable y asistencia en tallajes.
                </p>
              </details>
              <details className="group bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer text-base font-semibold text-[#1A1A1A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ¿Tienen uniformes deportivos baratos Mocoa?
                  <span className="text-[#CC0000] group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-3 text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Ofrecemos líneas deportivas con materiales transpirables y numeración personalizada para clubes de Mocoa. Cotizamos por kits completos e incluimos envío consolidado hacia la capital del Putumayo.
                </p>
              </details>
              <details className="group bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer text-base font-semibold text-[#1A1A1A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ¿Cubren estampados al por mayor Pasto y Nariño?
                  <span className="text-[#CC0000] group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-3 text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sí. Consolidamos pedidos de alto volumen para agencias, instituciones y empresas en Pasto e Ipiales. Preparamos empaques por punto de entrega y ofrecemos seguimiento constante hasta su destino en Nariño.
                </p>
              </details>
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