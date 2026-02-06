'use client';

import React, { useState } from 'react';

interface SearchFiltersProps {
  type: string;
  onFilterChange: (filters: {
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    stops?: number;
  }) => void;
}

export default function SearchFilters({
  type,
  onFilterChange,
}: SearchFiltersProps) {
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [rating, setRating] = useState<number>();
  const [stops, setStops] = useState<number>();

  const handleFilterChange = () => {
    onFilterChange({
      minPrice,
      maxPrice,
      rating,
      stops,
    });
  };

  const handleReset = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setRating(undefined);
    setStops(undefined);
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h3 className="font-bold text-lg text-gray-900 mb-4">Filter</h3>

      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Harga (IDR)</h4>
        <div className="space-y-2">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Min</label>
            <input
              type="number"
              value={minPrice || ''}
              onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">Max</label>
            <input
              type="number"
              value={maxPrice || ''}
              onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Rating Minimum</h4>
        <select
          value={rating || ''}
          onChange={(e) => setRating(e.target.value ? parseInt(e.target.value) : undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        >
          <option value="">Semua Rating</option>
          <option value="1">⭐ dan lebih tinggi</option>
          <option value="2">⭐⭐ dan lebih tinggi</option>
          <option value="3">⭐⭐⭐ dan lebih tinggi</option>
          <option value="4">⭐⭐⭐⭐ dan lebih tinggi</option>
          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
        </select>
      </div>

      {/* Stops Filter (Flight only) */}
      {type === 'flight' && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Henti</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="stops"
                checked={stops === 0}
                onChange={() => setStops(0)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Langsung saja</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="stops"
                checked={stops === 1}
                onChange={() => setStops(1)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">1 Henti</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="stops"
                checked={stops === undefined}
                onChange={() => setStops(undefined)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Semua</span>
            </label>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleFilterChange}
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Terapkan Filter
        </button>
        <button
          onClick={handleReset}
          className="w-full px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
