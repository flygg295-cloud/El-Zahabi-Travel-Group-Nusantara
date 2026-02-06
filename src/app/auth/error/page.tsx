'use client';

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Kesalahan Autentikasi
          </h1>
          <p className="text-gray-600 mb-6">
            Terjadi kesalahan saat proses masuk. Silakan coba kembali.
          </p>
          <a
            href="/auth/signin"
            className="inline-block btn-primary"
          >
            Kembali ke Login
          </a>
        </div>
      </div>
    </main>
  );
}
