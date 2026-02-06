import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/db/prisma';
import { authOptions } from '@/lib/auth';
import {
  ApiError,
  createErrorResponse,
  validateEmail,
  validatePhone,
  calculateTotalPrice,
  generateBookingCode,
} from '@/lib/utils/helpers';

export const runtime = 'nodejs';

/**
 * POST /api/bookings
 * Create a new booking
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const {
      ticketId,
      quantity,
      passengerName,
      passengerEmail,
      passengerPhone,
      passengerIdType,
      passengerIdNumber,
      specialRequests,
      taxRate,
      discountRate,
    } = body;

    // Input validation
    if (!ticketId || !quantity || !passengerName || !passengerEmail || !passengerPhone) {
      throw new ApiError(400, 'Missing required fields');
    }

    if (!validateEmail(passengerEmail)) {
      throw new ApiError(400, 'Invalid email format');
    }

    if (!validatePhone(passengerPhone)) {
      throw new ApiError(400, 'Invalid phone number format');
    }

    if (quantity < 1 || quantity > 9) {
      throw new ApiError(400, 'Quantity must be between 1 and 9');
    }

    // Get ticket details
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new ApiError(404, 'Ticket not found');
    }

    // Check seat availability
    if (ticket.availableSeats && ticket.availableSeats < quantity) {
      throw new ApiError(409, 'Not enough seats available');
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Calculate pricing
    const subtotal = ticket.price * quantity;
    const pricing = calculateTotalPrice(
      subtotal,
      taxRate || 0.1, // 10% default tax
      discountRate || 0
    );

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingCode: generateBookingCode(),
        userId: user.id,
        ticketId: ticketId,
        quantity,
        passengerName,
        passengerEmail,
        passengerPhone,
        passengerIdType: passengerIdType || null,
        passengerIdNumber: passengerIdNumber || null,
        specialRequests: specialRequests || null,
        subtotal,
        tax: pricing.tax,
        discount: pricing.discount,
        totalPrice: pricing.total,
        currency: ticket.currency,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
      include: {
        ticket: true,
        user: true,
      },
    });

    // Update available seats
    if (ticket.availableSeats) {
      await prisma.ticket.update({
        where: { id: ticketId },
        data: {
          availableSeats: ticket.availableSeats - quantity,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking creation error:', error);
    const errorResponse = createErrorResponse(error);

    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: errorResponse.message },
      { status: errorResponse.statusCode }
    );
  }
}

/**
 * GET /api/bookings
 * Get user's bookings
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: {
        ticket: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      {
        success: true,
        data: bookings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get bookings error:', error);
    const errorResponse = createErrorResponse(error);

    return NextResponse.json(
      { error: errorResponse.message },
      { status: errorResponse.statusCode }
    );
  }
}

/**
 * PUT /api/bookings
 * Update booking (cancel, modify, etc)
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { bookingId, status, notes } = body;

    if (!bookingId || !status) {
      throw new ApiError(400, 'Missing required fields');
    }

    const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, 'Invalid booking status');
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { ticket: true },
    });

    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    if (booking.userId !== user.id) {
      throw new ApiError(403, 'Forbidden: You can only update your own bookings');
    }

    // If cancelling, restore available seats
    if (status === 'CANCELLED' && booking.status !== 'CANCELLED') {
      if (booking.ticket.availableSeats) {
        await prisma.ticket.update({
          where: { id: booking.ticketId },
          data: {
            availableSeats: booking.ticket.availableSeats + booking.quantity,
          },
        });
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status,
        notes: notes || null,
      },
      include: { ticket: true },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Booking updated successfully',
        data: updatedBooking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update booking error:', error);

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
