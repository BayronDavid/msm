"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header id="top" className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_10px_30px_rgba(26,26,26,0.08)] transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className={`font-extrabold tracking-widest leading-none flex items-end border-b-4 border-[#CC0000] transition-all duration-300 ${isScrolled ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'}`} style={{fontFamily: 'Bebas Neue, sans-serif'}}>
            <span className="text-[#1A1A1A]">M</span>
            <span className="text-[#CC0000]">S</span>
            <span className="text-[#1A1A1A]">M</span>
          </div>
          <div className={`flex flex-col transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
            <span className={`text-black leading-none transition-all duration-300 ${isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`} style={{fontFamily: 'Bebas Neue, sans-serif'}}>MORALISIMO</span>
            <span className={`text-gray-600 tracking-wider leading-none mt-1 transition-all duration-300 ${isScrolled ? 'text-xs' : 'text-sm'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Estampado & Diseño</span>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-medium" style={{fontFamily: 'Inter, sans-serif'}}>
          <a href="/" className={`transition duration-300 ${pathname === '/' ? 'text-[#CC0000] border-b-2 border-[#CC0000] pb-1' : 'text-gray-700 hover:text-black'}`}>Inicio</a>
          <a href="/productos" className={`transition duration-300 ${pathname === '/productos' ? 'text-[#CC0000] border-b-2 border-[#CC0000] pb-1' : 'text-gray-700 hover:text-black'}`}>Productos</a>
          <a href="/#servicios" className="text-gray-700 hover:text-black transition duration-300">Servicios</a>
          <a href="/#contacto" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-red-700 transition duration-300">Solicitar Presupuesto</a>
        </nav>
        <button
          className="md:hidden text-2xl text-black"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          {isMenuOpen ? '×' : '☰'}
        </button>
      </div>
      {/* Mobile menu (visible when isMenuOpen) */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2" style={{fontFamily: 'Inter, sans-serif'}}>
            <a href="/" onClick={() => setIsMenuOpen(false)} className={`transition duration-200 ${pathname === '/' ? 'text-[#CC0000]' : 'text-gray-700 hover:text-black'}`}>Inicio</a>
            <a href="/productos" onClick={() => setIsMenuOpen(false)} className={`transition duration-200 ${pathname === '/productos' ? 'text-[#CC0000]' : 'text-gray-700 hover:text-black'}`}>Productos</a>
            <a href="/#servicios" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-black transition duration-200">Servicios</a>
            <a href="/#contacto" onClick={() => setIsMenuOpen(false)} className="inline-block px-4 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-red-700 transition duration-200">Solicitar Presupuesto</a>
          </div>
        </nav>
      )}
    </header>
  );
}