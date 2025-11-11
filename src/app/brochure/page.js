import ContactSection from '@/components/ContactSection';
import LazyImageCarousel from '@/components/LazyImageCarousel';
import BROCHURE_DATA from '@/data/brochure.json';

export const metadata = {
  title: "Brochure de precios base | MORALISIMO Print Studio",
  description:
    "Lista de precios de uniformes, mugs, gorras y souvenirs personalizados producidos por MORALISIMO Print Studio en Sibundoy, Putumayo.",
  keywords: [
    "brochure de estampados",
    "precios merchandising Putumayo",
    "uniformes corporativos Sibundoy",
    "dtf precios",
    "mugs personalizados colombia"
  ],
  openGraph: {
    title: "Brochure MORALISIMO | Precios base",
    description:
      "Consulta precios de referencia para camisetas, hoodies y souvenirs personalizados producidos por MORALISIMO Print Studio en Sibundoy, Putumayo.",
    url: "https://moralisimo.com/brochure"
  },
  twitter: {
    card: "summary_large_image",
    title: "Brochure MORALISIMO",
    description:
      "Lista de precios de uniformes y merchandising personalizados con producción express en Putumayo."
  }
};

// Mostrar precios sin símbolo de dólar: formato numérico local + sufijo 'COP'
const numberFmt = new Intl.NumberFormat('es-CO', { minimumFractionDigits: 0 });

function ProductRow({ p, reverse = false }) {
  const placeholders = [
    'https://placehold.co/900x600?text=Producto+1',
    'https://placehold.co/900x600?text=Producto+2',
    'https://placehold.co/900x600?text=Producto+3',
  ];
  // 'reverse' coloca el carrusel a la derecha en pantallas md+ cuando es true
  return (
    <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(26,26,26,0.06)] border border-[#F0F0F0] p-8">
      <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center gap-6`}>
  <div className="w-full md:w-1/2 h-72 md:h-80">
          {/* usar p.images si está disponible, si no usar placeholders
              si NEXT_PUBLIC_CAROUSEL_MEDIA está definida, concatenar la base
              con rutas relativas (no afecta URLs absolutas) */}
          {(() => {
            // Prefer a dedicated "base" URL (no manifest) for concatenating relative image paths.
            // Backwards-compatible: fall back to NEXT_PUBLIC_CAROUSEL_MEDIA if needed.
            const envBase = (
              process.env.NEXT_PUBLIC_CAROUSEL_BASE || process.env.CAROUSEL_BASE || process.env.NEXT_PUBLIC_CAROUSEL_MEDIA || process.env.CAROUSEL_MEDIA || ''
            ).trim();
            const useImages = (p.images && p.images.length > 0) ? p.images : placeholders;

            const normalize = (item) => {
              if (!item) return item;
              // si ya es URL absoluta, retornarla tal cual
              if (/^https?:\/\//i.test(item)) return item;
              // si no hay base, devolver la ruta tal cual (puede ser '/images/...')
              if (!envBase) return item;
              // unir base y path cuidando las barras
              try {
                const baseTrim = envBase.replace(/\/+$/, '');
                const pathTrim = item.replace(/^\/+/, '');
                return `${baseTrim}/${pathTrim}`;
              } catch (e) {
                return item;
              }
            };

            const finalImages = useImages.map(normalize).filter(Boolean);

            return (
              <LazyImageCarousel
                images={finalImages}
                alt={p.nombre}
                interval={3500}
                className="w-full h-full rounded-xl object-cover"
                rootMargin="50px"
              />
            );
          })()}
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl text-[#1A1A1A] mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{p.nombre}</h3>
          <div className="text-sm text-[#556270] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>{p.tecnica}</div>
          <p className="text-sm text-[#556270] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>{p.observaciones}</p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-[#9AA0A6] uppercase tracking-[0.12em]">
              <div>Precio unitario (1–5 unidades)</div>
              <div className="text-2xl font-semibold text-[#1A1A1A]">{numberFmt.format(p.precio_unitario_menos_de_6_unidades)} COP</div>
            </div>

            <div className="text-sm text-right text-[#9AA0A6] uppercase tracking-[0.12em]">
              <div>Precio unitario (6 o más unidades)</div>
              <div className="text-xl font-semibold text-[#1A1A1A]">{numberFmt.format(p.precio_unitario_mas_de_6_unidades)} COP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrochurePage() {
  const phone = (process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573001234567').replace(/[^\d]/g, '');
    // Emprendimiento y lema quemados en la página (no consumir desde JSON)
    const EMBR_TITLE = 'Estampado & Diseño';
    const EMBR_LEMA = 'Precios imbatibles gracias a la adquisición estratégica en volumen.';
    const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(`Hola! Vi el folleto de ${EMBR_TITLE} y quiero cotizar productos.`)}`;
    const offerCatalogSchema = {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "Brochure MORALISIMO Print Studio",
      url: "https://moralisimo.com/brochure",
      itemListElement: BROCHURE_DATA.productos.map((p, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Product",
          name: p.nombre,
          description: p.observaciones,
          category: p.tecnica,
          brand: "MORALISIMO Print Studio"
        },
        priceSpecification: [
          {
            "@type": "UnitPriceSpecification",
            price: Number(p.precio_unitario_menos_de_6_unidades) || 0,
            priceCurrency: "COP",
            unitText: "1-5 unidades"
          },
          {
            "@type": "UnitPriceSpecification",
            price: Number(p.precio_unitario_mas_de_6_unidades) || 0,
            priceCurrency: "COP",
            unitText: "6 o más unidades"
          }
        ]
      }))
    };
    const structuredDataJson = JSON.stringify(offerCatalogSchema);

  return (
    <main className="pt-20">
      <section className="bg-white min-h-screen flex items-center pt-16 pb-16 sm:pt-24 sm:pb-24 border-b-8 border-[#CC0000]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl sm:text-6xl tracking-wide mb-4 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>MORALISIMO (MSM)</h1>
          <h4 className="text-4xl sm:text-5xl tracking-wide mb-4 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{EMBR_TITLE}</h4>
          <p className="uppercase text-sm tracking-[0.3em] text-[#9AA0A6] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
            Sibundoy | Putumayo | Colombia
          </p>
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-[#556270] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>{EMBR_LEMA}</p>
          <p className="max-w-3xl mx-auto text-sm text-[#556270] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Más abajo encontrarás nuestros productos más vendidos y sus precios de referencia. Este brochure es ideal para estimar presupuestos rápidos; el valor final se confirma al compartir cantidades, tallas y uso de la prenda.
          </p>
          <div className="max-w-3xl mx-auto text-sm text-[#1A1A1A] mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            <p className="mb-2">Contacto directo: <a href="mailto:bayrondavid@moralisimo.com" className="text-[#CC0000] font-semibold underline">bayrondavid@moralisimo.com</a></p>
            <p className="flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.18em] text-[#556270]">
              <a href="https://www.instagram.com/_moralisimo" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#F7F7F7] rounded-full hover:bg-[#CC0000] hover:text-white transition">Instagram</a>
              <a href="https://www.tiktok.com/@moralisimo" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#F7F7F7] rounded-full hover:bg-[#CC0000] hover:text-white transition">TikTok</a>
              <a href="https://www.facebook.com/profile.php?id=61579614505129" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#F7F7F7] rounded-full hover:bg-[#CC0000] hover:text-white transition">Facebook</a>
            </p>
          </div>
            <div className="w-full max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="/productos" className="w-full sm:w-auto inline-block px-6 py-3 bg-[#CC0000] text-white font-bold uppercase rounded-lg shadow-md hover:scale-[1.02] transition text-center" style={{ fontFamily: 'Inter, sans-serif' }}>Ver catálogo completo</a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-block px-6 py-3 bg-[#25D366] text-white font-bold uppercase rounded-lg shadow-md hover:scale-[1.02] transition text-center" style={{ fontFamily: 'Inter, sans-serif' }}>Solicitar cotización</a>
                <a href="/" className="w-full sm:w-auto inline-block px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] bg-white font-bold uppercase rounded-lg shadow-sm hover:bg-[#f3f3f3] transition text-center" style={{ fontFamily: 'Inter, sans-serif' }} aria-label="Ver propuesta de valor">Ver propuesta de valor</a>
              </div>
            </div>
        </div>
      </section>

      <section className="py-12 bg-[#fefefe]">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-sm text-[#556270] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>{BROCHURE_DATA.nota_importante_precios}</p>

          <div className="flex flex-col gap-8">
            {BROCHURE_DATA.productos.map((p, i) => (
              <ProductRow key={p.nombre} p={p} reverse={i % 2 === 0} />
            ))}
          </div>

          {/* Servicio de Diseño: tabla sencilla */}
          <div className="mt-12 bg-white border border-[#F0F0F0] rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.04)]">
            <h2 className="text-2xl mb-4 text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Servicio de Diseño</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                <div className="md:w-1/3 text-sm font-semibold text-[#1A1A1A]">Adaptación Técnica (Logo Existente)</div>
                <div className="md:flex-1 text-sm text-[#556270]">Perfeccionamiento de su archivo (foto de WhatsApp, imagen borrosa, etc.) para que quede con la calidad perfecta de impresión. Incluye la simulación virtual del producto.</div>
                <div className="md:w-48 text-sm font-semibold text-[#1A1A1A] text-right">GRATIS (Servicio incluido para garantizar la calidad final de su estampado).</div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                <div className="md:w-1/3 text-sm font-semibold text-[#1A1A1A]">Conceptualización de Marca</div>
                <div className="md:flex-1 text-sm text-[#556270]">Si solo tiene una idea o necesita un rediseño que implique crear nuevos elementos gráficos, tipografía y estructuras. Generación de una (1) propuesta base + dos ajustes.</div>
                <div className="md:w-48 text-sm font-semibold text-[#1A1A1A] text-right">Desde {numberFmt.format(55000)} COP (Se cotiza según la complejidad de la idea)</div>
              </div>
            </div>
          </div>

            <div className="mt-8 text-center">
            <p className="text-sm text-[#556270] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Estos son nuestros productos más vendidos <br/> Revisa nuestro catalogo completo y solicita la cotización para obtener precio final exacto.</p>
            <a href="/productos" className="block w-full sm:inline-block sm:w-auto max-w-xs mx-auto px-6 py-3 bg-[#1A1A1A] text-white font-bold uppercase rounded-xl shadow-md text-center" style={{ fontFamily: 'Inter, sans-serif' }}>Ir al Catálogo</a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl text-[#1A1A1A] mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Política de precios y tiempos de entrega
          </h2>
          <p className="text-sm text-[#556270] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Los valores publicados son base para proyectos locales en Sibundoy y Putumayo. Para envíos nacionales ajustamos costos logísticos según destino. Las órdenes express pueden incluir recargo si requieren priorización de máquina.
          </p>
          <div className="space-y-4">
            <details className="group bg-[#F7F7F7] border border-[#E5E7EB] rounded-xl p-5">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-[#1A1A1A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                ¿Los precios incluyen diseño?
                <span className="text-[#CC0000] group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-3 text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Incluimos adaptación técnica del logo sin costo para garantizar calidad de impresión. Conceptos nuevos o rediseños completos se cotizan aparte según alcance.
              </p>
            </details>
            <details className="group bg-[#F7F7F7] border border-[#E5E7EB] rounded-xl p-5">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-[#1A1A1A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                ¿Cuál es el tiempo de producción estándar?
                <span className="text-[#CC0000] group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-3 text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Después de aprobar diseño y pago inicial, producimos entre 3 y 5 días hábiles. Para pedidos mayores a 100 unidades coordinamos una programación especial.
              </p>
            </details>
            <details className="group bg-[#F7F7F7] border border-[#E5E7EB] rounded-xl p-5">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-[#1A1A1A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                ¿Qué métodos de pago aceptan?
                <span className="text-[#CC0000] group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-3 text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Transferencias bancarias, Nequi y consignaciones. Para empresas emitimos factura electrónica y acuerdos de pago según política de compras.
              </p>
            </details>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />

      <ContactSection />
    </main>
  );
}
