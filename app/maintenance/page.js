export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-6">
      
      {/* ICON / ILLUSTRATION */}
      <div className="mb-6">
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#facc15"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto drop-shadow-lg"
        >
          <path d="M3 21h18" />
          <path d="M19 21v-8a7 7 0 0 0-14 0v8" />
          <path d="M12 3v4" />
          <path d="M8 7h8" />
        </svg>
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Sedang Dalam Perbaikan
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-600 max-w-md text-lg leading-relaxed">
        Kami sedang melakukan pemeliharaan sistem untuk meningkatkan kualitas layanan.  
        Silakan kembali lagi nanti.
      </p>

      {/* BACK HOME BUTTON */}
      <a
        href="/"
        className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
      >
        Kembali ke Home
      </a>
    </main>
  );
}
