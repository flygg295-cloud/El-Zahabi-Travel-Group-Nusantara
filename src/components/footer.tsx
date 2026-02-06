import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">✈️</span>
              </div>
              <span className="text-xl font-bold">El-Zahabi Travel</span>
            </div>
            <p className="text-gray-400">
              Platform booking perjalanan terpercaya untuk pengalaman liburan Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Cari Penerbangan
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Cari Hotel
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-4">Dukungan</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:help@elzahabi.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Email Support
                </a>
              </li>
              <li>
                <a
                  href="tel:+62"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Hubungi Kami
                </a>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Syarat dan Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Hubungi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <span>f</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <span>𝕏</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
            >
              <span>📷</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400">
            <p>
              &copy; {currentYear} El-Zahabi Travel Group. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
