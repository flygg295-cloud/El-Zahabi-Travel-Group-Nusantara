'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onSearch?: (params: SearchParams) => void;
}

interface SearchParams {
  type: 'flight' | 'hotel';
  from?: string;
  to?: string;
  departDate?: string;
  returnDate?: string;
  checkInDate?: string;
  checkOutDate?: string;
  passengers?: number;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter();
  const [searchType, setSearchType] = useState<'flight' | 'hotel'>('flight');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    checkInDate: '',
    checkOutDate: '',
    passengers: '1',
    guests: '1',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    searchParams.set('type', searchType);

    if (searchType === 'flight') {
      if (formData.from) searchParams.set('from', formData.from);
      if (formData.to) searchParams.set('to', formData.to);
      if (formData.departDate) searchParams.set('startDate', formData.departDate);
      if (formData.returnDate) searchParams.set('endDate', formData.returnDate);
      if (formData.passengers) searchParams.set('quantity', formData.passengers);
    } else {
      if (formData.to) searchParams.set('to', formData.to);
      if (formData.checkInDate) searchParams.set('startDate', formData.checkInDate);
      if (formData.checkOutDate) searchParams.set('endDate', formData.checkOutDate);
      if (formData.guests) searchParams.set('quantity', formData.guests);
    }

    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl">
      {/* Search Type Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setSearchType('flight')}
          className={`pb-4 font-semibold transition-colors ${
            searchType === 'flight'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          ✈️ Penerbangan
        </button>
        <button
          onClick={() => setSearchType('hotel')}
          className={`pb-4 font-semibold transition-colors ${
            searchType === 'hotel'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🏨 Hotel
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {searchType === 'flight' ? (
            <>
              {/* From */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Dari
                </label>
                <input
                  type="text"
                  name="from"
                  placeholder="Kota atau kode bandara"
                  value={formData.from}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* To */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Ke
                </label>
                <input
                  type="text"
                  name="to"
                  placeholder="Kota atau kode bandara"
                  value={formData.to}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Depart Date */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Berangkat
                </label>
                <input
                  type="date"
                  name="departDate"
                  value={formData.departDate}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Return Date */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Kembali
                </label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </>
          ) : (
            <>
              {/* Hotel Location */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Lokasi Hotel
                </label>
                <input
                  type="text"
                  name="to"
                  placeholder="Kota atau nama hotel"
                  value={formData.to}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Check-in */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Check-in
                </label>
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Check-out */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Check-out
                </label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </>
          )}
        </div>

        {/* Passengers/Guests */}
        <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
          <div className="flex flex-col flex-grow">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              {searchType === 'flight' ? 'Penumpang' : 'Tamu'}
            </label>
            <select
              name={searchType === 'flight' ? 'passengers' : 'guests'}
              value={searchType === 'flight' ? formData.passengers : formData.guests}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Orang' : 'Orang'}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105 active:scale-95"
          >
            Cari Sekarang
          </button>
        </div>
      </form>
    </div>
  );
}
