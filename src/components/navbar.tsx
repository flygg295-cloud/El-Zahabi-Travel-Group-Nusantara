'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✈️</span>
          </div>
          <span className="hidden sm:inline text-xl font-bold text-gray-900">
            El-Zahabi Travel
          </span>
        </Link>

        {/* Navigation Menu */}
        <div className="flex items-center gap-6">
          {status === 'loading' ? (
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          ) : session ? (
            <>
              <Link
                href="/my-bookings"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Pesanan Saya
              </Link>
              <div className="flex items-center gap-3">
                <img
                  src={session.user?.image || 'https://via.placeholder.com/32'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
