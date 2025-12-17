
export const metadata = {
  title: "Menu",
  description: "Discover Vesper’s exquisite menu of cocktails and gourmet dishes in the heart of Milan.",
};

export default function Menu() {
  return (
    <section className="relative bg-neutral-900 text-gray-200 min-h-[80vh]">
      <div className="absolute inset-0">
        <img
          src="/interior.png" 
          alt="Luxury Restaurant"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-neutral-900/70"></div> 
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-primary-500 mb-6 uppercase">Menu</h1>
        <p className="text-gray-400 mb-16">
          Discover our exclusive selection of cocktails and dinner specialties, curated with passion in Milan, Italy.
        </p>
        <div className="space-y-12 text-center">
          <div>
            <h2 className="text-2xl font-semibold text-primary-500 mb-6 uppercase">Cocktails</h2>
            <ul className="space-y-6">
              <li>
                <h3 className="text-xl font-medium text-gray-100">Negroni</h3>
                <p className="text-gray-400">Gin, Campari, Sweet Vermouth</p>
              </li>
              <li>
                <h3 className="text-xl font-medium text-gray-100">Aperol Spritz</h3>
                <p className="text-gray-400">Aperol, Prosecco, Soda</p>
              </li>
              <li>
                <h3 className="text-xl font-medium text-gray-100">Martini Royale</h3>
                <p className="text-gray-400">Dry Vermouth, Gin, Lemon Twist</p>
              </li>
              <li>
                <h3 className="text-xl font-medium text-gray-100">Espresso Martini</h3>
                <p className="text-gray-400">Vodka, Coffee Liqueur, Espresso</p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary-500 mb-6 uppercase">Dinner</h2>
            <ul className="space-y-6">
              <li>
                <h3 className="text-xl font-medium text-gray-100">Tagliatelle al Tartufo</h3>
                <p className="text-gray-400">Fresh tagliatelle with black truffle, butter & parmesan</p>
              </li>
              <li>
                <h3 className="text-xl font-medium text-gray-100">Risotto alla Milanese</h3>
                <p className="text-gray-400">Creamy saffron risotto with parmesan</p>
              </li>
              <li>
                <h3 className="text-xl font-medium text-gray-100">Osso Buco</h3>
                <p className="text-gray-400">Slow-cooked veal shank with gremolata</p>
              </li>
              <li>
                <h3 className="text-xl font-medium text-gray-100">Grilled Sea Bass</h3>
                <p className="text-gray-400">Served with seasonal vegetables and lemon butter</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
