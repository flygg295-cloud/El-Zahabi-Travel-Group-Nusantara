export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function createErrorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }

  return {
    statusCode: 500,
    message: 'Internal Server Error',
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone);
}

export function calculateTotalPrice(
  subtotal: number,
  taxRate: number = 0.1,
  discountRate: number = 0
): { tax: number; discount: number; total: number } {
  const tax = subtotal * taxRate;
  const discount = subtotal * discountRate;
  const total = subtotal + tax - discount;

  return {
    tax: Math.round(tax * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

export function generateBookingCode(): string {
  const prefix = 'BK';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}
