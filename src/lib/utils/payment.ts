import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
});

export async function createPaymentIntent(
  amount: number,
  currency: string = 'usd',
  metadata?: Record<string, string>
): Promise<{ success: boolean; clientSecret?: string; paymentIntentId?: string }> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error('Stripe error:', error);
    throw new Error('Failed to create payment intent');
  }
}

export async function getPaymentIntent(paymentIntentId: string) {
): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Stripe error:', error);
    throw new Error('Failed to retrieve payment intent');
  }
}

/**
 * Midtrans Payment Gateway Integration
 * Documentation: https://midtrans.com
 */
export async function createMidtransTransaction(
  bookingId: string,
  amount: number,
  customerData: {
    email: string;
    name: string;
    phone: string;
  },
  items: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>
) {
  try {
    const midtransServerKey: string = process.env.MIDTRANS_SERVER_KEY || '';
    const authString = Buffer.from(`${midtransServerKey}:`).toString('base64');

    const response = await fetch('https://app.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: bookingId,
          gross_amount: amount,
        },
        customer_details: {
          email: customerData.email,
          first_name: customerData.name,
          phone: customerData.phone,
        },
        item_details: items,
      }),
    });

    if (!response.ok) {
      throw new Error(`Midtrans API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Midtrans error:', error);
    throw new Error('Failed to create Midtrans transaction');
  }
}

/**
 * Verify Midtrans payment status
 */
export async function verifyMidtransPayment(transactionId: string) {
  try {
    const midtransServerKey = process.env.MIDTRANS_SERVER_KEY || '';
    const authString = Buffer.from(`${midtransServerKey}:`).toString('base64');

    const response = await fetch(
      `https://app.midtrans.com/snap/v1/transactions/${transactionId}/status`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authString}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Midtrans API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Midtrans verification error:', error);
    throw new Error('Failed to verify Midtrans payment');
  }
}
