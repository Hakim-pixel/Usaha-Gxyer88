import Link from "next/link";

export default function MarketplaceProducts() {
  const products = [
    {
      id: 1,
      image: "/images/item1.jpg",
      price: "IDR2,600,000",
      title: "Iphone 11 pro",
      location: "Balaraja, Jawa Barat, Indonesia",
    },
    {
      id: 2,
      image: "/images/item2.jpg",
      price: "IDR280,000,000",
      title: "2011 Mercedes-Benz bigbus 1526",
      location: "Bogor, Indonesia",
    },
    {
      id: 3,
      image: "/images/item3.jpg",
      price: "IDR550,000",
      title: "Laptop Asus Core i3 4030U",
      location: "Jakarta, Indonesia",
    },
    {
      id: 4,
      image: "/images/item4.jpg",
      price: "IDR15,000,000",
      title: "2001 Kawasaki ninja",
      location: "Jakarta, Indonesia",
    },
  ];

  return (
    <div
      className="w-full px-6 py-10"
      style={{
        background: "linear-gradient(to bottom, #ffffffff, #ffffffff)",
        minHeight: "100vh",
      }}
    >
      <h1 className="text-sm text-gray-200 font-medium mb-4">1K km</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((item) => (
          <Link key={item.id} href={`/produk/${item.id}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-3 cursor-pointer">
              <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-3">
                <p className="text-[18px] font-bold text-gray-900">
                  {item.price}
                </p>
                <p className="text-[14px] text-gray-800 leading-tight truncate">
                  {item.title}
                </p>
                <p className="text-[12px] text-gray-500 truncate">
                  {item.location}
                </p>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
