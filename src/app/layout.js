import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "MORALISIMO Print Studio - Gráfica Ágil y Profesional",
  description: "Seriedad técnica, eficiencia operativa y producción local.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
