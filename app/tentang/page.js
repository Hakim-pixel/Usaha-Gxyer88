export default function TentangPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-10">
        <h1 className="text-3xl font-semibold mb-4">Tentang <span className="text-indigo-600">Usaha Gxyer88</span></h1>
        <p className="text-lg leading-relaxed mb-6">
          Usaha Gxyer88 adalah marketplace untuk barang bekas berkualitas. Kami memfokuskan pada
          produk yang masih layak pakai, diverifikasi, dan diberi deskripsi jujur agar pembeli yakin
          dengan pilihannya.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">Misi Kami</h2>
          <p className="leading-relaxed">
            Menyediakan platform aman dan terpercaya bagi penjual & pembeli barang preloved, dengan
            proses yang transparan dan kualitas terjaga.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">Apa yang Kami Jual</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Elektronik (HP, laptop, konsol)</li>
            <li>Fashion & aksesoris (tas, sepatu, pakaian)</li>
            <li>Perlengkapan rumah & koleksi</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">Nilai Kami</h2>
          <p className="leading-relaxed">
            Kejujuran dalam listing, kualitas barang, dan pelayanan ramah — itu prioritas kami.
          </p>
        </section>
      </div>
    </main>
  );
}
