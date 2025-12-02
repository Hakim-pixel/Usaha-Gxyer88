export default function FaqPage() {
  const faqs = [
    {
      q: "Apakah semua barang diperiksa sebelum dijual?",
      a: "Ya. Kami melakukan pengecekan dasar agar barang yang dijual layak pakai dan sesuai deskripsi.",
    },
    {
      q: "Bagaimana cara bayar?",
      a: "Pembayaran bisa dilakukan lewat transfer bank, OVO, GoPay, atau COD apabila disepakati penjual & pembeli.",
    },
    {
      q: "Ada garansi?",
      a: "Kebijakan garansi disesuaikan masing-masing listing. Selalu cek deskripsi dan tanyakan ke penjual.",
    },
    {
      q: "Bagaimana jika barang tidak sesuai?",
      a: "Laporkan melalui kontak kami. Kami bantu mediasi antara penjual & pembeli untuk penyelesaian.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 text-gray-900">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-semibold mb-4">FAQ — Pertanyaan Umum</h1>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4">
              <h3 className="font-medium">{f.q}</h3>
              <p className="text-sm text-gray-700 mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
