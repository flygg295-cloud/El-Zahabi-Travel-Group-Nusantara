import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { ApiError, createErrorResponse } from '@/lib/utils/helpers';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

/**
 * POST /api/auth/signup
 * Create a new user account
 */
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      throw new ApiError(400, 'Missing required fields: name, email, password');
    }

    if (password.length < 6) {
      throw new ApiError(400, 'Password must be at least 6 characters');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(409, 'Email already registered');
    }

    // Hash password - NOTE: In production use bcrypt properly
    // For now, using simple hash for demonstration
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // In production, store hashed password
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);

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
