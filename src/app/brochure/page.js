import { redirect } from 'next/navigation';

export const metadata = {
  title: "Catálogo MORALISIMO",
  description: "El catálogo vive ahora en moralisimo.com/catalogo.",
  robots: {
    index: false,
    follow: false
  }
};

export default function BrochureRedirectPage() {
  redirect('/catalogo');
}
