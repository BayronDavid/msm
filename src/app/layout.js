import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MORALISIMO Estampado & Diseño",
  // include both visual (&) and textual (y) variants so search engines can associate both
  alternateName: [
    "MSM Estampado & Diseño",
    "MORALISIMO Estampado y Diseño",
    "MORALISIMO Estampado & Diseño"
  ],
  url: "https://moralisimo.com",
  email: "bayrondavid@moralisimo.com",
  telephone: "+57 300 123 4567",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Principal",
    addressLocality: "Sibundoy",
    addressRegion: "Putumayo",
    addressCountry: "CO"
  },
  sameAs: [
    "https://www.instagram.com/_moralisimo",
    "https://www.tiktok.com/@moralisimo",
    "https://www.facebook.com/profile.php?id=61579614505129"
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "bayrondavid@moralisimo.com",
      areaServed: "CO",
      availableLanguage: ["es"]
    }
  ]
};

export const metadata = {
  metadataBase: new URL("https://moralisimo.com"),
  title: {
    default: "MORALISIMO Estampado & Diseño | Estampados en Sibundoy, Putumayo",
    template: "%s | MORALISIMO Estampado & Diseño"
  },
  description:
    "Estudio de impresión textil en Sibundoy, Putumayo. Estampado express de uniformes, merchandising corporativo y diseño de marca con entregas rápidas en el sur de Colombia.",
  keywords: [
    "estampados en Sibundoy",
    "uniformes personalizados Putumayo",
    "merchandising corporativo Colombia",
    "diseño de marca",
    "mugs personalizados",
    "camisetas empresariales"
  ],
  authors: [{ name: "MORALISIMO Estampado & Diseño", url: "https://moralisimo.com" }],
  category: "business.business_services",
  alternates: {
    canonical: "https://moralisimo.com",
    languages: {
      es: "https://moralisimo.com"
    }
  },
  openGraph: {
    type: "website",
    url: "https://moralisimo.com",
    title: "MORALISIMO Estampado & Diseño | Estampados en Sibundoy, Putumayo",
    description:
      "Uniformes corporativos, merchandising y diseño gráfico express en Putumayo. Producción ágil, precios directos y soporte experto por WhatsApp.",
    locale: "es_CO",
    siteName: "MORALISIMO Estampado & Diseño",
    images: [
      {
        url: "https://moralisimo.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MORALISIMO Estampado & Diseño - Estampados profesionales en Putumayo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MORALISIMO Estampado & Diseño | Estampados en Sibundoy, Putumayo",
    description:
      "Producción textil personalizada, uniformes empresariales y diseño de marca en el sur de Colombia.",
    creator: "@_moralisimo"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  const organizationSchemaJson = JSON.stringify(organizationSchema);
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationSchemaJson }}
        />
        {/* explicit canonical link to reinforce the canonical URL while keeping the visual '&' */}
        <link rel="canonical" href="https://moralisimo.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
