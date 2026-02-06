'use client';

import React from 'react';
import Link from 'next/link';

interface Ticket {
  id: string;
  type: string;
  from?: string;
  to?: string;
  airline?: string;
  flightNumber?: string;
  departTime?: string;
  arriveTime?: string;
  duration?: string;
  stops?: number;
  price: number;
  currency: string;
  hotelName?: string;
  address?: string;
  checkInDate?: string;
  checkOutDate?: string;
  roomType?: string;
  rating: number;
  reviews: number;
  image?: string;
  availableSeats?: number;
}

interface TicketCardProps {
  ticket: Ticket;
  type: string;
}

export default function TicketCard({ ticket, type }: TicketCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        {/* Left Content */}
        <div className="flex-1">
          {type === 'flight' && ticket.airline ? (
            <>
              {/* Flight Info */}
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {ticket.airline}
                  </h3>
                  <p className="text-sm text-gray-500">{ticket.flightNumber}</p>
                </div>
              </div>

              {/* Flight Details */}
              <div className="flex items-center gap-8 mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {ticket.departTime
                      ? new Date(ticket.departTime).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '-'}
                  </p>
                  <p className="text-sm text-gray-500">{ticket.from}</p>
                </div>

                <div className="flex-1 text-center">
                  <div className="relative h-12 flex items-center">
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                    <div className="relative z-10 mx-auto">
                      <span className="bg-white px-3 py-1 text-xs font-semibold text-gray-600 border border-gray-300 rounded-full">
                        {ticket.duration || '2h 30m'}
                      </span>
                    </div>
                  </div>
                  {ticket.stops !== undefined && (
                    <p className="text-xs text-gray-500 mt-2">
                      {ticket.stops === 0 ? 'Langsung' : `${ticket.stops} Stop`}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900 text-right">
                    {ticket.arriveTime
                      ? new Date(ticket.arriveTime).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '-'}
                  </p>
                  <p className="text-sm text-gray-500 text-right">{ticket.to}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Hotel Info */}
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 text-lg">
                  {ticket.hotelName}
                </h3>
                <p className="text-sm text-gray-500">{ticket.address}</p>
              </div>

              {/* Hotel Details */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Check-in:</span>{' '}
                    {ticket.checkInDate
                      ? new Date(ticket.checkInDate).toLocaleDateString('id-ID')
                      : '-'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Check-out:</span>{' '}
                    {ticket.checkOutDate
                      ? new Date(ticket.checkOutDate).toLocaleDateString('id-ID')
                      : '-'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Tipe Kamar:</span> {ticket.roomType}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Rating */}
          {ticket.rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(ticket.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {ticket.rating.toFixed(1)} ({ticket.reviews} reviews)
              </span>
            </div>
          )}
        </div>

        {/* Right Content - Pricing */}
        <div className="flex flex-col justify-between items-end">
          <div className="text-right mb-4">
            <p className="text-3xl font-bold text-blue-600">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: ticket.currency || 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(ticket.price)}
            </p>
            <p className="text-sm text-gray-500">per orang/per malam</p>
          </div>

          {ticket.availableSeats !== undefined && ticket.availableSeats > 0 && (
            <p className="text-sm text-green-600 font-semibold mb-4">
              {ticket.availableSeats} kursi tersedia
            </p>
          )}

          <Link
            href={`/booking?ticketId=${ticket.id}`}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors active:scale-95 transform"
          >
            Pesan Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
