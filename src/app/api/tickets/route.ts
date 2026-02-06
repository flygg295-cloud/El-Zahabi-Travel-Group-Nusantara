import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { ApiError, createErrorResponse } from '@/lib/utils/helpers';

export const runtime = 'nodejs';

/**
 * GET /api/tickets
 * Get tickets with optional filters
 * Query params: type, from, to, startDate, endDate, minPrice, maxPrice
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const type = searchParams.get('type');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    // Build filter object
    const where: any = {};

    if (type) {
      where.type = type;
    }

    if (from) {
      where.from = { contains: from, mode: 'insensitive' };
    }

    if (to) {
      where.to = { contains: to, mode: 'insensitive' };
    }

    if (startDate || endDate) {
      where.departTime = {};
      if (startDate) {
        where.departTime.gte = new Date(startDate);
      }
      if (endDate) {
        where.departTime.lte = new Date(endDate);
      }
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice);
      }
    }

    // Get total count for pagination
    const total = await prisma.ticket.count({ where });

    // Get tickets with pagination
    const tickets = await prisma.ticket.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        success: true,
        data: tickets,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get tickets error:', error);
    const errorResponse = createErrorResponse(error);

    return NextResponse.json(
      { error: errorResponse.message },
      { status: errorResponse.statusCode }
    );
  }
}

/**
 * POST /api/tickets
 * Create a new ticket (admin only) - for demo/seeding purposes
 */
export async function POST(request: NextRequest) {
  try {
    // In production, add proper authentication/authorization
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.role === 'admin') { ... }

    const body = await request.json();

    const {
      type,
      airline,
      flightNumber,
      from,
      to,
      departTime,
      arriveTime,
      duration,
      stops,
      hotelName,
      address,
      checkInDate,
      checkOutDate,
      roomType,
      price,
      currency,
      totalSeats,
      availableSeats,
      image,
      description,
      amenities,
      rating,
    } = body;

    if (!type || !price) {
      throw new ApiError(400, 'Missing required fields: type and price');
    }

    if (!['flight', 'hotel'].includes(type)) {
      throw new ApiError(400, 'Invalid type. Must be "flight" or "hotel"');
    }

    const ticket = await prisma.ticket.create({
      data: {
        type,
        airline: airline || null,
        flightNumber: flightNumber || null,
        from: from || null,
        to: to || null,
        departTime: departTime ? new Date(departTime) : null,
        arriveTime: arriveTime ? new Date(arriveTime) : null,
        duration: duration || null,
        stops: stops || 0,
        hotelName: hotelName || null,
        address: address || null,
        checkInDate: checkInDate ? new Date(checkInDate) : null,
        checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
        roomType: roomType || null,
        price,
        currency: currency || 'IDR',
        totalSeats: totalSeats || 1,
        availableSeats: availableSeats || totalSeats || 1,
        image: image || null,
        description: description || null,
        amenities: amenities || [],
        rating: rating || 0,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Ticket created successfully',
        data: ticket,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create ticket error:', error);

    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    const errorResponse = createErrorResponse(error);
    return NextResponse.json(
      { error: errorResponse.message },
      { status: errorResponse.statusCode }
    );
  }
}
