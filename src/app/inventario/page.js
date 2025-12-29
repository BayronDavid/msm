import { randomUUID } from "crypto";
import Image from "next/image";
import supabase from "@/lib/supabaseClient";
import NoSnapDisable from '@/components/NoSnapDisable';

const INVENTARIO_KEYWORDS = [
  "inventario camisetas personalizadas Putumayo",
  "uniformes deportivos baratos Mocoa",
  "estampados al por mayor Pasto",
  "dotaciones empresariales Nariño",
  "gorras bordadas personalizadas Pasto",
  "mugs con foto Mocoa",
  "chalecos para moto y empresa",
  "buzos prom 11 Putumayo y Nariño",
  "fábrica de uniformes envíos al sur",
  "diseño grafico express sur de colombia",
  "diseño gráfico express sur de Colombia"
];

export const metadata = {
  title: "Inventario camisetas personalizadas Putumayo | MORALISIMO Estampado & Diseño",
  description:
    "Explora inventario vivo de camisetas personalizadas en Putumayo, uniformes deportivos baratos para Mocoa, estampados al por mayor en Pasto y dotaciones empresariales para Nariño.",
  keywords: INVENTARIO_KEYWORDS,
  alternates: {
    canonical: "https://moralisimo.com/inventario"
  },
  openGraph: {
    title: "Inventario MORALISIMO | Uniformes y merchandising para el sur de Colombia",
    description:
      "Consulta camisetas, chalecos, gorras y mugs personalizados listos para producción y envío hacia Putumayo, Mocoa, Pasto y Nariño.",
    url: "https://moralisimo.com/inventario",
    locale: "es_CO"
  },
  twitter: {
    card: "summary_large_image",
    title: "Inventario MORALISIMO",
    description:
      "Referencias conectadas a Supabase con stock actualizado para uniformes y merchandising que se envían al sur del país."
  }
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

const FALLBACK_CATEGORY = "Otros";
const WHATSAPP_PHONE = (process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "573001234567").replace(/[^\d]/g, "");

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

async function fetchProducts() {
  // Consultamos la tabla `inventory` en Supabase. Asumimos que la tabla
  // se llama `inventory` y sus columnas coinciden con el diccionario de datos.
  try {
    const { data, error } = await supabase.from("inventory").select("*").limit(1000);
    if (error) {
      console.error("Supabase error fetching inventory:", error);
      return { items: [], error: true };
    }

    const rawItems = Array.isArray(data) ? data : [];
    const items = rawItems.map((item) => normalizeProduct(item));

    return { items, error: false };
  } catch (err) {
    console.error("Error fetching products from Supabase:", err);
    return { items: [], error: true };
  }
}

function normalizeProduct(item) {
  const categories = typeof item.categories === "string"
    ? item.categories.split(">").map((part) => part.trim()).filter(Boolean)
    : [];

  const tags = typeof item.tags === "string"
    ? item.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];

  let images = [];
  if (Array.isArray(item.images)) {
    images = item.images.filter(Boolean);
  } else if (typeof item.images === "string") {
    images = item.images.split(",").map((s) => s.trim()).filter(Boolean);
  }

  return {
    id: item.id ?? item.documentId ?? item.sku ?? randomUUID(),
    name: item.name ?? "Producto sin nombre",
    sku: item.sku ?? "SKU-NA",
    regularPrice: item.regular_price ?? 0,
    salePrice: item.sale_price ?? null,
    manageStock: Boolean(item.manage_stock),
    stock: typeof item.stock === "number" ? item.stock : null,
    stockStatus: (item.stock_status || "no-disponible").toLowerCase(),
    backorders: item.backorders ?? "no",
    categories,
    tags,
    shortDescription: item.short_description ?? "",
    description: item.description ?? "",
    images,
    type: item.type ?? "simple",
  };
}

function groupByTopCategory(products) {
  return products.reduce((acc, product) => {
    const category = product.categories[0] || FALLBACK_CATEGORY;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
}

function orderCategories(names) {
  // Ensure preferred categories appear first in this exact order if they exist
  const preferred = ["Otros", "Prendas"];
  const picked = [];

  preferred.forEach((p) => {
    const found = names.find((n) => n.toLowerCase() === p.toLowerCase());
    if (found) picked.push(found);
  });

  const rest = names.filter((n) => !picked.includes(n)).sort((a, b) => a.localeCompare(b, "es"));
  return [...picked, ...rest];
}

function buildStats(products) {
  const categories = new Set();
  let inStockCount = 0;
  let lowStockCount = 0;
  let totalUnits = 0;

  products.forEach((product) => {
    if (product.categories.length) {
      product.categories.forEach((category) => categories.add(category));
    } else {
      categories.add(FALLBACK_CATEGORY);
    }

    const stockQty = typeof product.stock === "number" ? product.stock : 0;
    const isAvailable = product.stockStatus === "instock" || stockQty > 0;

    if (isAvailable) {
      inStockCount += 1;
      totalUnits += stockQty;
    }

    if (stockQty > 0 && stockQty <= 3) {
      lowStockCount += 1;
    }
  });

  return {
    totalProducts: products.length,
    totalCategories: categories.size,
    inStockCount,
    lowStockCount,
    totalUnits,
  };
}

function formatPrice(product) {
  const salePrice = product.salePrice != null ? Number(product.salePrice) : null;
  const regularPrice = Number(product.regularPrice ?? 0);

  if (salePrice && salePrice > 0 && salePrice < regularPrice) {
    return {
      primary: currencyFormatter.format(salePrice),
      secondary: currencyFormatter.format(regularPrice),
      onSale: true,
    };
  }

  return {
    primary: currencyFormatter.format(regularPrice),
    secondary: null,
    onSale: false,
  };
}

function buildWhatsAppLink(product) {
  const message = `Hola! Estoy interesad@ en ${product.name} (${product.sku}). ¿Está disponible?`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function renderStockBadge(product) {
  const stockQty = typeof product.stock === "number" ? product.stock : null;
  const isInStock = product.stockStatus === "instock" || (stockQty !== null && stockQty > 0);

  if (!isInStock) {
    return (
      <span className="bg-[#CC0000] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
        Agotado
      </span>
    );
  }

  if (stockQty !== null && stockQty <= 3) {
    return (
      <span className="bg-[#FFEDD5] text-[#CC0000] px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
        Últimas {stockQty} unidades
      </span>
    );
  }

  return (
    <span className="bg-[#E6F4EA] text-[#1A1A1A] px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
      Disponible
    </span>
  );
}

function buildProductStructuredData(products) {
  const limited = products.slice(0, 20);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Inventario MORALISIMO Estampado & Diseño",
    description:
      "Listado de uniformes, merchandising y productos personalizables disponibles para producción en Sibundoy, Putumayo.",
    keywords: INVENTARIO_KEYWORDS,
    itemListElement: limited.map((product, index) => {
      const price = Number(product.salePrice ?? product.regularPrice ?? 0);
      const offer = {
        "@type": "Offer",
        priceCurrency: "COP",
        availability:
          product.stockStatus === "instock"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        url: "https://moralisimo.com/inventario"
      };
      if (price > 0) {
        offer.price = price;
      }
      const productData = {
        "@type": "Product",
        name: product.name,
        sku: product.sku,
        description:
          product.shortDescription ||
          product.description ||
          "Referencia personalizable en MORALISIMO Estampado & Diseño.",
        brand: "MORALISIMO Estampado & Diseño",
        category: product.categories.join(" > ") || FALLBACK_CATEGORY,
        offers: offer
      };
      const coverImage = product.images[0];
      if (coverImage) {
        productData.image = coverImage;
      }
      return {
        "@type": "ListItem",
        position: index + 1,
        item: productData
      };
    })
  };
}

function ProductCard({ product }) {
  const price = formatPrice(product);
  const coverImage = product.images[0] || null;
  const categoryTrail = product.categories.length
    ? product.categories.join(" › ")
    : FALLBACK_CATEGORY;
  const whatsappLink = buildWhatsAppLink(product);
  const stockBadge = renderStockBadge(product);

  return (
    <article className="flex flex-col h-full bg-white rounded-2xl shadow-[0_15px_40px_rgba(26,26,26,0.08)] border border-[#F0F0F0] overflow-hidden">
      <div className="relative aspect-[4/3] bg-[#F7F7F7]">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-[#556270] tracking-wide uppercase">
            Imagen no disponible
          </div>
        )}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {stockBadge}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="flex flex-col space-y-1">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#CC0000] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
            {categoryTrail}
          </span>
          <h3 className="text-2xl leading-tight text-[#1A1A1A]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            {product.name}
          </h3>
        </div>
        <p className="text-sm text-[#556270] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
          {product.shortDescription || product.description || "Producto disponible para personalización inmediata."}
        </p>
        <div className="flex items-baseline gap-3">
          {/* Precios ocultos: mostrar texto de contacto en su lugar */}
          <span className="text-base font-semibold text-[#1A1A1A]" style={{ fontFamily: "Inter, sans-serif" }}>
            Consultar precio
          </span>
        </div>
        <div className="text-xs text-[#556270] uppercase tracking-[0.18em]" style={{ fontFamily: "Inter, sans-serif" }}>
          SKU: {product.sku}
        </div>
        {product.tags.length ? (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#F7F7F7] text-[#556270] rounded-full text-xs uppercase tracking-wide">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-auto space-y-3">
          {product.description ? (
            <details className="group">
              <summary className="text-sm font-semibold text-[#1A1A1A] cursor-pointer flex items-center justify-between">
                Descripción completa
                <span className="text-[#CC0000] group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-2 text-sm text-[#556270] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {product.description}
              </p>
            </details>
          ) : null}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] text-white text-sm font-bold uppercase tracking-widest rounded-lg transition duration-300 hover:bg-[#128C7E]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <span>Hablar por WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default async function InventarioPage() {
  const { items: products, error } = await fetchProducts();
  const groupedByCategory = groupByTopCategory(products);
  const categoryNames = orderCategories(Object.keys(groupedByCategory));
  const stats = buildStats(products);
  const productStructuredData = buildProductStructuredData(products);
  const structuredDataJson = JSON.stringify(productStructuredData);

  return (
    <>
      <NoSnapDisable />
      <main>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mx-auto text-center text-sm text-[#556270]" style={{ fontFamily: "Inter, sans-serif" }}>
              <p className="mb-4">Nuestro inventario en línea presenta las familias de producto y las referencias más solicitadas. Si necesita un precio exacto por cantidad, tallas o personalizaciones, solicite una cotización por WhatsApp o usando el formulario de contacto.</p>
              <p>Operamos desde Sibundoy y despachamos hacia Putumayo, Nariño y ciudades del sur de Colombia. Encontrará <strong>mugs con foto Mocoa</strong>, <strong>gorras bordadas personalizadas Pasto</strong> y <strong>chalecos para moto y empresa</strong> con disponibilidad real. Para consultas directas use <a href="mailto:bayrondavid@moralisimo.com" className="text-[#CC0000] underline">bayrondavid@moralisimo.com</a> o nuestro WhatsApp.</p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#fefefe]">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl text-[#1A1A1A] mb-6" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              Cómo solicitar su producción
            </h2>
            <ol className="space-y-4 list-decimal list-inside text-sm text-[#556270]" style={{ fontFamily: "Inter, sans-serif" }}>
              <li>Seleccione la referencia y el SKU que desea producir. Use el botón de WhatsApp para compartir cantidades, tallas y fechas, incluyendo proyectos como <strong>buzos prom 11 Putumayo y Nariño</strong> o lotes de chalecos para moto.</li>
              <li>Adjunte su logo o pida el servicio de diseño. Enviamos simulación digital en cuestión de horas con nuestro <strong>diseño grafico express sur de colombia</strong>.</li>
              <li>Definimos técnica (DTF, sublimación o vinilo) y agendamos producción. Entregamos en 3 a 5 días hábiles, con opción express según disponibilidad.</li>
            </ol>
            <p className="mt-6 text-sm text-[#556270]" style={{ fontFamily: "Inter, sans-serif" }}>
              También puede consultar nuestro <a href="/catalogo" className="text-[#CC0000] font-semibold underline">catálogo rápido con precios base (página)</a> o escribirnos al correo <a href="mailto:bayrondavid@moralisimo.com" className="text-[#CC0000] font-semibold underline">bayrondavid@moralisimo.com</a>.
            </p>
          </div>
        </section>

        <section id="inventario" className="py-16 sm:py-20 bg-[#fefefe]">
          <div className="container mx-auto px-4 max-w-6xl space-y-16">
            {error ? (
              <div className="bg-white border border-[#F0F0F0] rounded-2xl p-10 text-center shadow-[0_15px_40px_rgba(26,26,26,0.06)]">
                <h2 className="text-4xl mb-4 text-[#1A1A1A]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  Inventario no disponible temporalmente
                </h2>
                <p className="text-sm text-[#556270]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Tuvimos un inconveniente al consultar el inventario. Intenta nuevamente en unos minutos o contáctanos por WhatsApp para recibir la lista actualizada.
                </p>
              </div>
            ) : null}

            {!products.length && !error ? (
              <div className="bg-white border border-[#F0F0F0] rounded-2xl p-10 text-center shadow-[0_15px_40px_rgba(26,26,26,0.06)]">
                <h2 className="text-4xl mb-4 text-[#1A1A1A]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  Estamos preparando el inventario
                </h2>
                <p className="text-sm text-[#556270]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Aún no hay referencias disponibles. Actualiza la base de productos o contáctanos para recibir opciones disponibles en bodega.
                </p>
              </div>
            ) : null}

            {categoryNames.map((category) => (
              <div key={category} id={slugify(category)} className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <h2 className="text-4xl text-[#1A1A1A]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                      {category}
                    </h2>
                    <p className="text-sm text-[#556270]" style={{ fontFamily: "Inter, sans-serif" }}>
                      {groupedByCategory[category].length} referencias en esta familia
                    </p>
                  </div>
                  <a
                    href="#top"
                    className="hidden sm:inline-flex items-center gap-2 text-sm text-[#CC0000] uppercase tracking-[0.25em]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Volver arriba
                    <span>↑</span>
                  </a>
                </div>
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {groupedByCategory[category].map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#1A1A1A] text-white pt-20 pb-16 sm:pt-24 sm:pb-28 border-b-8 border-[#CC0000]">
          <div className="container mx-auto px-6 sm:px-4 max-w-5xl text-center">

            <p className="uppercase text-sm tracking-[0.3em] text-[#F6C5C5] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              Inventario Completo
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              Estás viendo nuestro inventario completo
            </h1>

            <p className="text-base sm:text-lg text-[#E4E8EE] mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              Esta página contiene todas nuestras referencias y SKUs. Si buscas ejemplos de trabajos, fotos de productos reales y precios base para un presupuesto rápido, te recomendamos visitar primero nuestro:
            </p>

            <a
              href="/catalogo"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-[#CC0000] text-white text-base sm:text-lg font-bold uppercase tracking-wider rounded-xl transition duration-300 hover:bg-red-800 transform hover:scale-105"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Ver Catálogo Rápido (Precios y Ejemplos)
            </a>

            <p className="mt-6 text-sm text-[#E4E8EE]" style={{ fontFamily: "Inter, sans-serif" }}>
              Si prefieres explorar todas las familias de productos o ya sabes lo que buscas, solo sigue bajando.
            </p>

            <div className="mt-8">
              <div className="w-full">
                <div className="flex flex-wrap justify-center gap-3 px-4 sm:px-6" style={{ fontFamily: "Inter, sans-serif" }}>
                  {categoryNames.map((category) => (
                    <a
                      key={category}
                      href={`#${slugify(category)}`}
                      className="px-4 py-2 rounded-full bg-white text-[#1A1A1A] border border-[#E5E7EB] hover:border-[#CC0000] hover:text-[#CC0000] transition text-sm uppercase tracking-[0.14em]"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-left">
                <h3 className="text-2xl mb-2" style={{ fontFamily: "Bebas Neue, sans-serif" }}>Camisetas personalizadas Putumayo</h3>
                <p className="text-sm text-[#E4E8EE]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Tenencia de referencias para empresas, colegios y campañas regionales. Incluye líneas económicas y premium con entrega coordinada hacia Valle del Guamuez, Puerto Asís y Sibundoy.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-left">
                <h3 className="text-2xl mb-2" style={{ fontFamily: "Bebas Neue, sans-serif" }}>Uniformes deportivos baratos Mocoa</h3>
                <p className="text-sm text-[#E4E8EE]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Kits completos para clubes y escuelas deportivas con numeración, personalización y opciones de envío express a Mocoa.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-left sm:col-span-2">
                <h3 className="text-2xl mb-2" style={{ fontFamily: "Bebas Neue, sans-serif" }}>Estampados al por mayor Pasto y Nariño</h3>
                <p className="text-sm text-[#E4E8EE]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Consolidamos lotes para agencias, dotaciones empresariales y campañas ciudadanas en Pasto, Ipiales y Tumaco. Empaques por sede, control de color y guía rastreable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl text-[#1A1A1A] mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              ¿Listo para producir?
            </h2>
            <p className="text-sm text-[#556270] mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              Escríbanos al <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" rel="noopener noreferrer" className="text-[#CC0000] font-semibold underline">WhatsApp corporativo</a> o envíe su brief a <a href="mailto:bayrondavid@moralisimo.com" className="text-[#CC0000] font-semibold underline">bayrondavid@moralisimo.com</a>. También puede agendar visita en Sibundoy para ver muestras físicas.
            </p>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
      </main>

      <footer className="bg-[#1A1A1A] text-white py-10">
        <div className="container mx-auto px-4 text-center text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
          <p className="mb-2">© 2024 MORALISIMO Estampado & Diseño. Gráfica Ágil & Costo Inteligente.</p>
          <p className="text-gray-300 mb-2">Atendemos desde Sibundoy, Putumayo, con cobertura regional y soporte por canales digitales.</p>
          <p className="text-gray-300">
            Contacto: <a href="mailto:bayrondavid@moralisimo.com" className="text-white underline">bayrondavid@moralisimo.com</a> ·
            {' '}<a href="https://www.instagram.com/_moralisimo" target="_blank" rel="noopener noreferrer" className="text-white underline">Instagram</a> ·
            {' '}<a href="https://www.tiktok.com/@moralisimo" target="_blank" rel="noopener noreferrer" className="text-white underline">TikTok</a> ·
            {' '}<a href="https://www.facebook.com/profile.php?id=61579614505129" target="_blank" rel="noopener noreferrer" className="text-white underline">Facebook</a>
          </p>
        </div>
      </footer>
    </>
  );
}


