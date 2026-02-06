import { prisma } from '@/lib/db/prisma';

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.ticket.deleteMany();

  // Create sample flights
  const flight1 = await prisma.ticket.create({
    data: {
      type: 'flight',
      airline: 'Garuda Indonesia',
      flightNumber: 'GA123',
      from: 'CGK (Jakarta)',
      to: 'DPS (Bali)',
      departTime: new Date('2024-02-15T08:00:00'),
      arriveTime: new Date('2024-02-15T10:30:00'),
      duration: '2h 30m',
      stops: 0,
      price: 850000,
      currency: 'IDR',
      totalSeats: 180,
      availableSeats: 120,
      rating: 4.5,
      reviews: 245,
      description: 'Penerbangan langsung ke Bali dengan layanan premium',
      amenities: ['WiFi', 'Meal', 'Baggage', 'Entertainment'],
    },
  });

  const flight2 = await prisma.ticket.create({
    data: {
      type: 'flight',
      airline: 'Lion Air',
      flightNumber: 'JT456',
      from: 'CGK (Jakarta)',
      to: 'SUB (Surabaya)',
      departTime: new Date('2024-02-16T10:00:00'),
      arriveTime: new Date('2024-02-16T11:45:00'),
      duration: '1h 45m',
      stops: 0,
      price: 450000,
      currency: 'IDR',
      totalSeats: 189,
      availableSeats: 89,
      rating: 4.0,
      reviews: 512,
      description: 'Penerbangan ekonomi ke Surabaya',
      amenities: ['Baggage'],
    },
  });

  const flight3 = await prisma.ticket.create({
    data: {
      type: 'flight',
      airline: 'Batik Air',
      flightNumber: 'BT789',
      from: 'SUB (Surabaya)',
      to: 'DPS (Bali)',
      departTime: new Date('2024-02-17T14:00:00'),
      arriveTime: new Date('2024-02-17T15:15:00'),
      duration: '1h 15m',
      stops: 0,
      price: 650000,
      currency: 'IDR',
      totalSeats: 150,
      availableSeats: 45,
      rating: 4.2,
      reviews: 178,
      description: 'Penerbangan singkat ke destinasi wisata',
      amenities: ['Meal', 'Baggage'],
    },
  });

  // Create sample hotels
  const hotel1 = await prisma.ticket.create({
    data: {
      type: 'hotel',
      hotelName: 'Luxury Bali Resort',
      address: 'Jl. Seminyak, Bali 80361',
      roomType: 'Deluxe Ocean View',
      checkInDate: new Date('2024-02-15'),
      checkOutDate: new Date('2024-02-18'),
      price: 1500000,
      currency: 'IDR',
      totalSeats: 25,
      availableSeats: 10,
      rating: 4.8,
      reviews: 342,
      image: 'https://via.placeholder.com/400x300?text=Luxury+Bali+Resort',
      description: 'Resort mewah dengan pemandangan laut yang menakjubkan',
      amenities: [
        'Pool',
        'Spa',
        'Restaurant',
        'Free WiFi',
        'Beach Access',
        'Room Service',
      ],
    },
  });

  const hotel2 = await prisma.ticket.create({
    data: {
      type: 'hotel',
      hotelName: 'Comfort Inn Surabaya',
      address: 'Jl. Tunjungan, Surabaya 60188',
      roomType: 'Standard Room',
      checkInDate: new Date('2024-02-16'),
      checkOutDate: new Date('2024-02-17'),
      price: 450000,
      currency: 'IDR',
      totalSeats: 50,
      availableSeats: 20,
      rating: 4.0,
      reviews: 89,
      image: 'https://via.placeholder.com/400x300?text=Comfort+Inn',
      description: 'Hotel nyaman di pusat kota Surabaya',
      amenities: ['WiFi', 'Restaurant', 'PM Reception'],
    },
  });

  const hotel3 = await prisma.ticket.create({
    data: {
      type: 'hotel',
      hotelName: 'Grand Jakarta Hotel',
      address: 'Jl. Gatot Subroto, Jakarta 12950',
      roomType: 'Executive Suite',
      checkInDate: new Date('2024-02-20'),
      checkOutDate: new Date('2024-02-22'),
      price: 2500000,
      currency: 'IDR',
      totalSeats: 15,
      availableSeats: 8,
      rating: 4.7,
      reviews: 421,
      image: 'https://via.placeholder.com/400x300?text=Grand+Jakarta',
      description: 'Hotel bintang lima dengan fasilitas lengkap',
      amenities: [
        'Pool',
        'Gym',
        'Spa',
        'Restaurant',
        'Bar',
        'Concierge',
        'Room Service',
      ],
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`
  ✈️  Flights created:
    - ${flight1.airline} (${flight1.flightNumber})
    - ${flight2.airline} (${flight2.flightNumber})
    - ${flight3.airline} (${flight3.flightNumber})
  
  🏨 Hotels created:
    - ${hotel1.hotelName}
    - ${hotel2.hotelName}
    - ${hotel3.hotelName}
  `);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
