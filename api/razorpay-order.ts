interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string | string[]) => ApiResponse;
  end: () => void;
  json: (body: unknown) => void;
}

const PACK_PRICES_PAISE: Record<string, number> = {
  'betterdrew-coconut-water-1-pack': 3900,
  'betterdrew-coconut-water-6-pack': 22900,
  'betterdrew-coconut-water-12-pack': 43900,
  'betterdrew-coconut-water-24-pack': 84900,
};

const send = (response: ApiResponse, status: number, body: unknown) => {
  response.status(status).setHeader('Content-Type', 'application/json').json(body);
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') {
    send(response, 405, { error: 'Method not allowed' });
    return;
  }

  const body = (request.body ?? {}) as { receipt?: unknown; items?: unknown };
  const items = Array.isArray(body.items) ? body.items : [];
  const amount = items.reduce((total, item) => {
    if (!item || typeof item !== 'object') return total;
    const cartItem = item as { id?: unknown; quantity?: unknown };
    const price = typeof cartItem.id === 'string' ? PACK_PRICES_PAISE[cartItem.id] : undefined;
    const quantity = typeof cartItem.quantity === 'number' && Number.isInteger(cartItem.quantity) ? cartItem.quantity : 0;
    if (!price || quantity < 1 || quantity > 99) return total;
    return total + price * quantity;
  }, 0);

  if (!amount || amount < 100) {
    send(response, 400, { error: 'Cart is invalid or empty' });
    return;
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    send(response, 500, { error: 'Payment service is not configured' });
    return;
  }

  try {
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency: 'INR', receipt: typeof body.receipt === 'string' ? body.receipt.slice(0, 40) : `betterdrew-${Date.now()}` }),
    });

    const order = await razorpayResponse.json();
    if (!razorpayResponse.ok) {
      send(response, razorpayResponse.status, { error: 'Could not create payment order' });
      return;
    }

    send(response, 200, { id: order.id, amount: order.amount, currency: order.currency });
  } catch {
    send(response, 502, { error: 'Payment service unavailable' });
  }
}
