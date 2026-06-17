'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CATEGORIES } from '@/lib/constants'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
              KimAI<span className="text-indigo-600">Reviews</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                Categories
                <svg className={`w-4 h-4 transition-transform ${catOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat}
                      href={`/category/${cat.toLowerCase()}`}
                      onClick={() => setCatOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/reviews" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              All Reviews
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              About
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Home</Link>
            <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2">Categories</div>
            {CATEGORIES.map(cat => (
              <Link key={cat} href={`/category/${cat.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                {cat}
              </Link>
            ))}
            <Link href="/reviews" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">All Reviews</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">About</Link>
          </div>
        )}
      </nav>
    </header>
  )
}
