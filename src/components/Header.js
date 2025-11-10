"use client";

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header id="top" className="sticky top-0 z-50 bg-white shadow-[0_10px_30px_rgba(26,26,26,0.08)]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-4xl sm:text-5xl font-extrabold tracking-widest leading-none flex items-end border-b-4 border-[#CC0000]" style={{fontFamily: 'Bebas Neue, sans-serif'}}>
            <span className="text-[#1A1A1A]">M</span>
            <span className="text-[#CC0000]">S</span>
            <span className="text-[#1A1A1A]">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl text-black leading-none" style={{fontFamily: 'Bebas Neue, sans-serif'}}>MORALISIMO</span>
            <span className="text-sm text-gray-600 tracking-wider leading-none mt-1" style={{fontFamily: 'Inter, sans-serif'}}>Print Studio</span>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-medium" style={{fontFamily: 'Inter, sans-serif'}}>
          <a href="/" className={`transition duration-300 ${pathname === '/' ? 'text-[#CC0000] border-b-2 border-[#CC0000] pb-1' : 'text-gray-700 hover:text-black'}`}>Inicio</a>
          <a href="/productos" className={`transition duration-300 ${pathname === '/productos' ? 'text-[#CC0000] border-b-2 border-[#CC0000] pb-1' : 'text-gray-700 hover:text-black'}`}>Productos</a>
          <a href="/#servicios" className="text-gray-700 hover:text-black transition duration-300">Servicios</a>
          <a href="/#contacto" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-red-700 transition duration-300">Solicitar Presupuesto</a>
        </nav>
        <button className="md:hidden text-2xl text-black">☰</button>
      </div>
    </header>
  );
}