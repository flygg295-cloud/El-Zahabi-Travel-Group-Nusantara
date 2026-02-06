'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

interface Booking {
  id: string;
  bookingCode: string;
  status: string;
  paymentStatus: string;
  totalPrice: number;
  currency: string;
  createdAt: string;
  ticket: {
    type: string;
    airline?: string;
    from?: string;
    to?: string;
    departTime?: string;
    hotelName?: string;
    roomType?: string;
  };
}

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status !== 'authenticated') {
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/bookings');

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [status, router]);

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      CONFIRMED: { bg: 'bg-green-100', text: 'text-green-700' },
      COMPLETED: { bg: 'bg-blue-100', text: 'text-blue-700' },
      CANCELLED: { bg: 'bg-red-100', text: 'text-red-700' },
    };

    const badge = badges[status] || badges['PENDING'];
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}>
        {status}
      </span>
    );
  };

  const getPaymentBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      PENDING: { bg: 'bg-orange-100', text: 'text-orange-700' },
      COMPLETED: { bg: 'bg-green-100', text: 'text-green-700' },
      FAILED: { bg: 'bg-red-100', text: 'text-red-700' },
      REFUNDED: { bg: 'bg-blue-100', text: 'text-blue-700' },
    };

    const badge = badges[status] || badges['PENDING'];
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}>
        {status}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Pesanan Saya</h1>
            <p className="text-gray-600">Kelola dan lihat status pesanan Anda</p>
          </div>

          {/* Content */}
          {status === 'loading' || loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-semibold">Loading...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-12 text-center border border-blue-200">
              <div className="text-5xl mb-4">✈️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Belum ada pesanan
              </h2>
              <p className="text-gray-600 mb-6">
                Mulai cari penerbangan dan hotel untuk membuat pesanan Anda
              </p>
              <Link
                href="/search"
                className="inline-block btn-primary"
              >
                Mulai Mencari
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="card-hover"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    {/* Booking Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">
                            {booking.ticket.type === 'flight'
                              ? booking.ticket.airline
                              : booking.ticket.hotelName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Booking Code: {booking.bookingCode}
                          </p>
                        </div>
                      </div>

                      {booking.ticket.type === 'flight' ? (
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Dari</p>
                            <p className="font-semibold text-gray-900">
                              {booking.ticket.from}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Ke</p>
                            <p className="font-semibold text-gray-900">
                              {booking.ticket.to}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Tipe Kamar</p>
                          <p className="font-semibold text-gray-900">
                            {booking.ticket.roomType}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-4">
                        {getStatusBadge(booking.status)}
                        {getPaymentBadge(booking.paymentStatus)}
                      </div>
                    </div>

                    {/* Pricing & Action */}
                    <div className="flex flex-col items-end w-full md:w-auto">
                      <p className="text-3xl font-bold text-blue-600 mb-4">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: booking.currency,
                          minimumFractionDigits: 0,
                        }).format(booking.totalPrice)}
                      </p>

                      <div className="flex gap-2">
                        <Link
                          href={`/booking/${booking.id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
                        >
                          Detail
                        </Link>

                        {booking.paymentStatus === 'PENDING' && (
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm">
                            Bayar Sekarang
                          </button>
                        )}

                        {booking.status === 'PENDING' && (
                          <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold text-sm">
                            Batalkan
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(booking.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
