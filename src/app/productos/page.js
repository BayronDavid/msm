import { redirect } from "next/navigation";

export const metadata = {
  title: "Inventario MORALISIMO",
  description: "Esta ruta ahora redirige a moralisimo.com/inventario.",
  robots: {
    index: false,
    follow: false
  },
  openGraph: {
    title: "Inventario MORALISIMO",
    description: "Consulta nuestro inventario actualizado en moralisimo.com/inventario.",
    url: "https://moralisimo.com/productos"
  },
  twitter: {
    card: "summary",
    title: "Inventario MORALISIMO",
    description: "Encuentra el inventario actualizado en moralisimo.com/inventario."
  }
};

export default function ProductosRedirectPage() {
  redirect("/inventario");
}
