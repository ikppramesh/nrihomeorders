import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Nav — responsive */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold text-indigo-700">NRI Concierge</div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/login" className="text-sm sm:text-base text-gray-600 hover:text-indigo-600 font-medium px-2 py-1">
            Sign in
          </Link>
          <Link href="/register" className="bg-indigo-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-indigo-700 font-medium text-sm sm:text-base">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero — stacks on mobile */}
      <section className="max-w-4xl mx-auto px-4 py-12 sm:py-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Your trusted partner for<br />
          <span className="text-indigo-600">India errands from the USA</span>
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
          We handle your bills, insurance renewals, government fees and source any product from India — with full transparency and zero hidden costs.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Link href="/register" className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-4 sm:px-8 sm:py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 shadow-lg text-center">
            Start for Free
          </Link>
          <Link href="#services" className="w-full sm:w-auto border-2 border-indigo-600 text-indigo-600 px-6 py-4 sm:px-8 sm:py-4 rounded-xl text-lg font-semibold hover:bg-indigo-50 text-center">
            See Services
          </Link>
        </div>
      </section>

      {/* Services — 1 col mobile, 2 col desktop */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">What we handle for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-indigo-100">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🇮🇳</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">NRI Seva</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">Utility bills, insurance premiums, property tax, LIC, government fees, registrations.</p>
            <ul className="space-y-2 text-sm text-gray-700">
              {['Electricity, gas, water bills', 'LIC, health, vehicle insurance', 'Property tax, municipal fees', 'Government registrations'].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-indigo-100">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📦</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Shop from India</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">We source any product, physically inspect quality, and ship directly to your USA address.</p>
            <ul className="space-y-2 text-sm text-gray-700">
              {['Source from any vendor in India', 'Mandatory physical inspection', 'Photo/video proof before shipping', 'Door-to-door delivery to USA'].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Trust — 1 col mobile, 3 col desktop */}
      <section className="bg-indigo-700 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Promise to You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              { icon: '🔍', title: '100% Transparent', desc: 'See every cost broken down — service fee, product, shipping. Zero markup. Zero hidden charges.' },
              { icon: '📸', title: 'Physical Verification', desc: 'Every product is inspected by our agent. Photos and video shared before shipping.' },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <div className="text-3xl mb-2">{icon}</div>
                <h3 className="font-semibold text-lg mb-1">{title}</h3>
                <p className="text-indigo-200 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">Simple, Honest Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900">NRI Seva</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">$5 <span className="text-base text-gray-500 font-normal">flat fee</span></p>
            <p className="text-sm text-gray-500 mt-1">per bill / insurance / fee payment</p>
            <p className="text-xs text-green-600 mt-3">+ Actual bill amount — zero markup</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-indigo-200 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900">Shop from India</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">$15 <span className="text-base text-gray-500 font-normal">flat fee</span></p>
            <p className="text-sm text-gray-500 mt-1">per product sourced &amp; inspected</p>
            <p className="text-xs text-green-600 mt-3">+ Actual product + actual shipping — zero markup</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 sm:py-12 text-center text-gray-500 text-xs sm:text-sm px-4">
        <p>© {new Date().getFullYear()} NRI Concierge. Based in Hyderabad, India. Serving NRIs in the USA.</p>
        <p className="mt-2">Email: hello@nriconcierge.com</p>
      </footer>
    </main>
  );
}
