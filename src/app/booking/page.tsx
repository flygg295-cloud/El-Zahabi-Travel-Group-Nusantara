'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { calculateTotalPrice } from '@/lib/utils/helpers';

interface Ticket {
  id: string;
  type: string;
  airline?: string;
  from?: string;
  to?: string;
  price: number;
  currency: string;
  hotelName?: string;
  roomType?: string;
}

export default function BookingPage() {
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();

  const ticketId = searchParams.get('ticketId');
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    quantity: '1',
    passengerName: '',
    passengerEmail: '',
    passengerPhone: '',
    passengerIdType: 'passport',
    passengerIdNumber: '',
    specialRequests: '',
  });

  // Fetch ticket details
  useEffect(() => {
    const fetchTicket = async () => {
      if (!ticketId) {
        setError('Ticket ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/tickets?type=${searchParams.get('type') || 'flight'}`);
        const data = await response.json();

        const foundTicket = data.data?.find((t: Ticket) => t.id === ticketId);
        if (foundTicket) {
          setTicket(foundTicket);
        } else {
          setError('Ticket not found');
        }
      } catch (err) {
        setError('Failed to load ticket');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId, searchParams]);

  // Redirect if not logged in
  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [session.status, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (!ticket) throw new Error('Ticket not found');

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketId: ticket.id,
          quantity: parseInt(formData.quantity),
          passengerName: formData.passengerName,
          passengerEmail: formData.passengerEmail,
          passengerPhone: formData.passengerPhone,
          passengerIdType: formData.passengerIdType,
          passengerIdNumber: formData.passengerIdNumber,
          specialRequests: formData.specialRequests || null,
          taxRate: 0.1,
          discountRate: 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }

      const bookingData = await response.json();
      alert(`Booking created successfully! Code: ${bookingData.data.bookingCode}`);
      router.push('/my-bookings');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (session.status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-semibold">Loading...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-700 font-semibold">{error || 'Ticket not found'}</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const quantity = parseInt(formData.quantity);
  const subtotal = ticket.price * quantity;
  const pricing = calculateTotalPrice(subtotal, 0.1, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Lengkapi Data Pemesanan
            </h1>
            <p className="text-gray-600">
              {ticket.type === 'flight' ? ticket.airline : ticket.hotelName}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 space-y-6">
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Jumlah Penumpang/Tamu
                  </label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full input-base"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Orang' : 'Orang'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Passenger Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="passengerName"
                    value={formData.passengerName}
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
                    name="passengerEmail"
                    value={formData.passengerEmail}
                    onChange={handleInputChange}
                    required
                    placeholder="Masukkan email"
                    className="w-full input-base"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="passengerPhone"
                    value={formData.passengerPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="Masukkan nomor telepon (contoh: +628123456789)"
                    pattern="^(\+62|0)[0-9]{9,12}$"
                    className="w-full input-base"
                  />
                </div>

                {/* ID Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Tipe ID
                    </label>
                    <select
                      name="passengerIdType"
                      value={formData.passengerIdType}
                      onChange={handleInputChange}
                      className="w-full input-base"
                    >
                      <option value="passport">Paspor</option>
                      <option value="ktp">KTP</option>
                      <option value="sim">SIM</option>
                    </select>
                  </div>

                  {/* ID Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Nomor ID
                    </label>
                    <input
                      type="text"
                      name="passengerIdNumber"
                      value={formData.passengerIdNumber}
                      onChange={handleInputChange}
                      placeholder="Nomor ID"
                      className="w-full input-base"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Permintaan Khusus (Opsional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Contoh: Kursi dekat jendela, akomodasi khusus, dll"
                    rows={4}
                    className="w-full input-base"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {submitting ? 'Memproses...' : 'Lanjut ke Pembayaran'}
                </button>
              </form>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-24">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Ringkasan Pemesanan
                </h3>

                {/* Ticket Details */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    {ticket.type === 'flight' ? 'Penerbangan' : 'Hotel'}
                  </p>
                  <p className="font-bold text-gray-900 mb-3">
                    {ticket.type === 'flight' ? ticket.airline : ticket.hotelName}
                  </p>
                  {ticket.type === 'flight' && (
                    <>
                      <p className="text-sm text-gray-600">
                        {ticket.from} → {ticket.to}
                      </p>
                    </>
                  )}
                  {ticket.type === 'hotel' && (
                    <>
                      <p className="text-sm text-gray-600">{ticket.roomType}</p>
                    </>
                  )}
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: ticket.currency,
                      }).format(ticket.price)}{' '}
                      × {quantity}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: ticket.currency,
                      }).format(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pajak (10%)</span>
                    <span className="text-gray-900">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: ticket.currency,
                      }).format(pricing.tax)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Diskon</span>
                    <span className="text-green-600">
                      -{new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: ticket.currency,
                      }).format(pricing.discount)}
                    </span>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: ticket.currency,
                      }).format(pricing.total)}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
                  <p className="mb-2">
                    <strong>💡 Tip:</strong> Pastikan data yang Anda masukkan sudah benar
                    untuk menghindari masalah saat check-in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
