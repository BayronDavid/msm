export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1A1A1A] text-white py-10">
      <div className="container mx-auto px-4 text-center text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
        <p className="mb-2">© {year} MSM Estampado & Diseño. Moralisimo.com. <br /> <strong>Costo Inteligente.</strong></p>
        <p className="text-gray-400 mb-3">Su socio local en soluciones de imagen rápida y producción con estructura de costo mínimo.</p>
        <p className="text-gray-300">
          Escríbanos a <a href="mailto:bayrondavid@moralisimo.com" className="text-white underline">bayrondavid@moralisimo.com</a> o síganos en
          {' '}<a href="https://www.instagram.com/_moralisimo" target="_blank" rel="noopener noreferrer" className="text-white underline">Instagram</a>,
          {' '}<a href="https://www.tiktok.com/@moralisimo" target="_blank" rel="noopener noreferrer" className="text-white underline">TikTok</a> y
          {' '}<a href="https://www.facebook.com/profile.php?id=61579614505129" target="_blank" rel="noopener noreferrer" className="text-white underline">Facebook</a>.
        </p>
      </div>
    </footer>
  );
}
