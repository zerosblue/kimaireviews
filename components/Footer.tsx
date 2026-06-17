import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-indigo-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">K</span>
              </div>
              <span className="font-bold text-white text-base">KimAI Reviews</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Honest, in-depth reviews of AI tools to help you make smarter decisions about the software you use every day.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <Link href={`/category/${cat.toLowerCase()}`} className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                    {cat} AI Tools
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                  This site contains affiliate links. We may earn a commission when you click and purchase, at no extra cost to you.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          © {year} KimAI Reviews. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
