import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTrendingUp, FiPackage, FiShield, FiZap, FiUsers, FiArrowRight, FiCheck } from 'react-icons/fi';

export default function Landing() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sansa
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FiZap className="w-4 h-4" />
              <span>Next-Generation E-Commerce & Finance Platform</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Where Commerce Meets{' '}
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Capital
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Sansa connects shoppers, vendors, and lenders in one unified platform. 
              Buy products, grow your business, or invest in promising merchants—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <FiShoppingBag className="w-5 h-5" />
                <span>Start Shopping</span>
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-semibold text-lg hover:border-slate-300 hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Join as Vendor</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">10K+</div>
              <div className="text-slate-600">Active Shoppers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">500+</div>
              <div className="text-slate-600">Verified Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">$2.5M+</div>
              <div className="text-slate-600">Capital Deployed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Column Feature Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Built for Everyone</h2>
            <p className="text-xl text-slate-600">Three platforms. One ecosystem. Endless possibilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shoppers Card */}
            <div className="group relative bg-linear-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <FiShoppingBag className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">For Shoppers</h3>
              <p className="text-slate-600 mb-6">
                Discover quality products from verified vendors. Shop with confidence and convenience.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">Curated marketplace</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">Secure payments</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">Fast shipping</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">24/7 support</span>
                </li>
              </ul>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all space-x-2"
              >
                <span>Browse Store</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Vendors Card */}
            <div className="group relative bg-linear-to-br from-purple-50 to-white rounded-2xl p-8 border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <FiPackage className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">For Vendors</h3>
              <p className="text-slate-600 mb-6">
                Grow your business with powerful tools and access to capital when you need it.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">Easy product management</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">Real-time analytics</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">Flexible financing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">Marketing support</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all space-x-2"
              >
                <span>Become a Vendor</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Lenders Card */}
            <div className="group relative bg-linear-to-br from-green-50 to-white rounded-2xl p-8 border-2 border-green-100 hover:border-green-300 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <FiTrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">For Lenders</h3>
              <p className="text-slate-600 mb-6">
                Invest in vetted merchants and earn competitive returns with transparent data.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">Verified opportunities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">Detailed analytics</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">Automated investing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">Risk assessment tools</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all space-x-2"
              >
                <span>Start Investing</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">A seamless ecosystem that benefits everyone</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto md:mx-0">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center md:text-left">Vendors List Products</h3>
              <p className="text-slate-600 text-center md:text-left">
                Merchants showcase their products on our curated marketplace, reaching thousands of potential customers.
              </p>
            </div>

            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto md:mx-0">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center md:text-left">Shoppers Discover & Buy</h3>
              <p className="text-slate-600 text-center md:text-left">
                Customers browse quality products, make secure purchases, and enjoy fast delivery from verified vendors.
              </p>
            </div>

            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto md:mx-0">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center md:text-left">Lenders Fund Growth</h3>
              <p className="text-slate-600 text-center md:text-left">
                Investors provide capital to high-performing vendors, earning returns while helping businesses scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built on Trust & Security</h2>
            <p className="text-xl text-slate-300">Your safety is our priority</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-slate-400">Bank-level encryption for all transactions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Vendors</h3>
              <p className="text-slate-400">All merchants thoroughly vetted</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiZap className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
              <p className="text-slate-400">Lightning-quick order fulfillment</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-slate-400">100% satisfaction or money back</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-slate-600 mb-10">
            Join thousands of shoppers, vendors, and lenders already thriving on Sansa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-semibold text-lg hover:border-slate-300 hover:shadow-lg transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold">Sansa</span>
              </div>
              <p className="text-slate-400">
                Where commerce meets capital. Building the future of e-commerce and finance.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Sell</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Invest</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button className="hover:text-white transition-colors cursor-not-allowed">About</button></li>
                <li><button className="hover:text-white transition-colors cursor-not-allowed">Careers</button></li>
                <li><button className="hover:text-white transition-colors cursor-not-allowed">Press</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button className="hover:text-white transition-colors cursor-not-allowed">Help Center</button></li>
                <li><button className="hover:text-white transition-colors cursor-not-allowed">Contact</button></li>
                <li><button className="hover:text-white transition-colors cursor-not-allowed">Privacy</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2026 Sansa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
