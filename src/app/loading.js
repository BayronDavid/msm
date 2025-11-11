export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7f7f7]">
      <div className="text-center" role="status" aria-busy={true}>
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28">
          {/* Logo SVG centered */}
          <img src="/MSM%20cuadros.svg" alt="MORALISIMO logo" className="w-full h-full object-contain" />
          {/* Subtle ring spinner with red accent on top */}
          <span className="absolute -inset-3 flex items-center justify-center pointer-events-none">
            <span className="block w-full h-full rounded-full border-2 border-[#E9ECEF] border-t-[#CC0000] opacity-90 animate-spin"></span>
          </span>
        </div>

        <h2 className="mt-4 text-xl sm:text-2xl text-[#1A1A1A]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>MORALISIMO</h2>
        <p className="mt-1 text-sm text-[#556270]" style={{ fontFamily: 'Inter, sans-serif' }}>Cargando...</p>
      </div>
    </div>
  );
}