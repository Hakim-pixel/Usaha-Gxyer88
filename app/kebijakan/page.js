export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 text-gray-900">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-4">Kebijakan Privasi</h1>

        <p className="mb-4 text-sm text-gray-700">
          Preloved Gxyer88 menghargai privasi Anda. Dokumen ini menjelaskan jenis data yang kami
          kumpulkan, tujuan penggunaan, dan hak Anda terkait data tersebut.
        </p>

        <section className="mb-3">
          <h2 className="font-medium">Data yang Kami Kumpulkan</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            <li>Informasi akun: nama, email, nomor telepon (jika disediakan).</li>
            <li>Data transaksi & riwayat interaksi di platform.</li>
          </ul>
        </section>

        <section className="mb-3">
          <h2 className="font-medium">Tujuan Penggunaan</h2>
          <p className="text-sm text-gray-700">
            Data dipakai untuk memproses transaksi, komunikasi, peningkatan layanan, dan keamanan.
          </p>
        </section>

        <section className="mb-3">
          <h2 className="font-medium">Keamanan</h2>
          <p className="text-sm text-gray-700">
            Kami menerapkan langkah teknis dan organisasi untuk melindungi data pengguna.
          </p>
        </section>

        <section>
          <h2 className="font-medium">Hak Pengguna</h2>
          <p className="text-sm text-gray-700">
            Anda dapat meminta akses, perbaikan, atau penghapusan data pribadi sesuai peraturan yang berlaku.
          </p>
        </section>
      </div>
    </main>
  );
}
