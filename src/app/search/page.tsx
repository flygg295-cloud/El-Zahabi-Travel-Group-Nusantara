'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import TicketCard from '@/components/search/ticket-card';
import SearchFilters from '@/components/search/search-filters';

interface Ticket {
  id: string;
  type: string;
  from?: string;
  to?: string;
  airline?: string;
  departTime?: string;
  arriveTime?: string;
  price: number;
  currency: string;
  hotelName?: string;
  checkInDate?: string;
  checkOutDate?: string;
  rating: number;
  image?: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchType = searchParams.get('type') || 'flight';
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.set('type', searchType);
        if (from) params.set('from', from);
        if (to) params.set('to', to);
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);

        const response = await fetch(`/api/tickets?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }

        const data = await response.json();
        setTickets(data.data || []);
        setFilteredTickets(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setTickets([]);
        setFilteredTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [searchType, from, to, startDate, endDate]);

  const handleFilterChange = (filters: {
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    stops?: number;
  }) => {
    let filtered = [...tickets];

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((t) => t.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((t) => t.price <= filters.maxPrice!);
    }

    if (filters.rating !== undefined) {
      filtered = filtered.filter((t) => t.rating >= filters.rating!);
    }

    setFilteredTickets(filtered);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Hasil Pencarian
            </h1>
            <p className="text-gray-600">
              {searchType === 'flight' ? 'Penerbangan' : 'Hotel'} dari{' '}
              {from || 'mana saja'} ke {to || 'mana saja'}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="lg:col-span-1">
              <SearchFilters
                type={searchType}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-32 bg-gray-200 rounded-lg animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <p className="text-red-700 font-semibold">{error}</p>
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
                  <p className="text-amber-700 font-semibold">
                    Tidak ada hasil yang ditemukan. Coba ubah filter pencarian Anda.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredTickets.map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      type={searchType}
                    />
                  ))}
                </div>
              )}

              {/* Pagination Info */}
              {!loading && filteredTickets.length > 0 && (
                <div className="mt-8 text-center text-gray-600">
                  <p>
                    Menampilkan {filteredTickets.length} dari {tickets.length} hasil
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
