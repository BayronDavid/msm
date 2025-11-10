export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7f7f7]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-[#CC0000] mx-auto"></div>
        <p className="mt-4 text-lg text-[#1A1A1A]" style={{ fontFamily: 'Inter, sans-serif' }}>Cargando...</p>
      </div>
    </div>
  );
}