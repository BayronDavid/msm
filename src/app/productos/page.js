import { randomUUID } from "crypto";
import Image from "next/image";
import supabase from "@/lib/supabaseClient";
import NoSnapDisable from '@/components/NoSnapDisable';

export const metadata = {
  title: "Catálogo de Productos | MORALISIMO Print Studio",
  description:
    "Explora las prendas y artículos personalizados disponibles en MORALISIMO Print Studio, listos para producción express.",
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
    ? item.categories.split(">")
        .map((part) => part.trim())
        .filter(Boolean)
    : [];

  const tags = typeof item.tags === "string"
    ? item.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  let images = [];
  if (Array.isArray(item.images)) {
    images = item.images.filter(Boolean);
  } else if (typeof item.images === "string") {
    images = item.images
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
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
          <span className="text-2xl font-semibold text-[#1A1A1A]" style={{ fontFamily: "Inter, sans-serif" }}>
            {price.primary}
          </span>
          {price.secondary ? (
            <span className="text-sm line-through text-[#9AA0A6]" style={{ fontFamily: "Inter, sans-serif" }}>
              {price.secondary}
            </span>
          ) : null}
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

export default async function ProductosPage() {
  const { items: products, error } = await fetchProducts();
  const groupedByCategory = groupByTopCategory(products);
  const categoryNames = orderCategories(Object.keys(groupedByCategory));
  const stats = buildStats(products);

  return (
    <>
      <NoSnapDisable />
      <main>
        <section className="bg-[#1A1A1A] text-white pt-20 pb-16 sm:pt-24 sm:pb-28 border-b-8 border-[#CC0000]">
          <div className="container mx-auto px-6 sm:px-4 max-w-5xl text-center">
            <p className="uppercase text-sm tracking-[0.3em] text-[#F6C5C5] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              Catálogo actualizado
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              Personalización Profesional en Cada Detalle
            </h1>
            <p className="text-base sm:text-lg text-[#E4E8EE] mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              Selección curada de prendas, textiles y merchandising listos para producir con su identidad corporativa. Calidad \& velocidad garantizadas por nuestro laboratorio gráfico.
            </p>
            <a
              href="#catalogo"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-[#CC0000] text-white text-base sm:text-lg font-bold uppercase tracking-wider rounded-xl transition duration-300 hover:bg-red-800 transform hover:scale-105 shadow-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Ver Catálogo Completo
            </a>

            {/* Categorías integradas en el hero */}
            <div className="mt-8">
              {/* Allow wrapping: categories will flow into multiple rows on small screens */}
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
          </div>
        </section>

        {/* <section className="py-14 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard label="Referencias Activadas" value={stats.totalProducts} />
              <StatCard label="Familias de Producto" value={stats.totalCategories} />
              <StatCard label="Modelos con stock" value={stats.inStockCount} />
              <StatCard label="Unidades disponibles" value={stats.totalUnits} helper="Inventario inmediato" />
            </div>
            {stats.lowStockCount > 0 ? (
              <p className="mt-4 text-sm text-[#CC0000]" style={{ fontFamily: "Inter, sans-serif" }}>
                {stats.lowStockCount} referencias con unidades limitadas. Consulte disponibilidad antes de ordenar.
              </p>
            ) : null}
          </div>
        </section> */}

        <section id="catalogo" className="py-16 sm:py-20 bg-[#fefefe]">
          <div className="container mx-auto px-4 max-w-6xl space-y-16">
            {error ? (
              <div className="bg-white border border-[#F0F0F0] rounded-2xl p-10 text-center shadow-[0_15px_40px_rgba(26,26,26,0.06)]">
                <h2 className="text-4xl mb-4 text-[#1A1A1A]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  Catálogo no disponible temporalmente
                </h2>
                <p className="text-sm text-[#556270]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Ocurrió un inconveniente al consultar la información de productos. Verifique que el servidor de Strapi esté ejecutándose en {PRODUCTS_ENDPOINT}.
                </p>
              </div>
            ) : null}

            {!products.length && !error ? (
              <div className="bg-white border border-[#F0F0F0] rounded-2xl p-10 text-center shadow-[0_15px_40px_rgba(26,26,26,0.06)]">
                <h2 className="text-4xl mb-4 text-[#1A1A1A]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  Estamos preparando el catálogo
                </h2>
                <p className="text-sm text-[#556270]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Aún no hay referencias disponibles. Actualiza la base de productos en Strapi para comenzar a mostrar inventario.
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
      </main>

      <footer className="bg-[#1A1A1A] text-white py-10">
        <div className="container mx-auto px-4 text-center text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
          <p className="mb-2">© 2024 MORALISIMO Print Studio. Gráfica Ágil & Costo Inteligente.</p>
          <p className="text-gray-400">Su socio local en soluciones de identidad y producción rápida.</p>
        </div>
      </footer>
    </>
  );
}

function StatCard({ label, value, helper }) {
  return (
    <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(26,26,26,0.12)] border border-black/10">
      <span className="text-xs uppercase tracking-[0.3em] text-[#F6C5C5]" style={{ fontFamily: "Inter, sans-serif" }}>
        {label}
      </span>
      <div className="mt-3 text-4xl" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
        {value}
      </div>
      {helper ? (
        <p className="mt-2 text-xs text-[#E4E8EE]" style={{ fontFamily: "Inter, sans-serif" }}>
          {helper}
        </p>
      ) : null}
    </div>
  );
}
