'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    setIsLoading(true);

    try {
      // Note: This is a placeholder. In production, you would:
      // 1. Call your signup API endpoint
      // 2. Hash passwords securely
      // 3. Store in database
      // 4. Send verification email

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      alert('Akun berhasil dibuat! Silakan login.');
      router.push('/auth/signin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✈️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Daftar</h1>
            <p className="text-gray-600 mt-2">Buat akun El-Zahabi Travel Anda</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Masukkan nama lengkap"
                className="w-full input-base"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Masukkan email Anda"
                className="w-full input-base"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Minimal 6 karakter"
                minLength={6}
                className="w-full input-base"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Ulangi password"
                minLength={6}
                className="w-full input-base"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 mt-6"
            >
              {isLoading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 mt-6">
            Sudah punya akun?{' '}
            <Link
              href="/auth/signin"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
