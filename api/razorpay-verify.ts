import { createHmac } from 'node:crypto';

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string | string[]) => ApiResponse;
  json: (body: unknown) => void;
}

const send = (response: ApiResponse, status: number, body: unknown) => {
  response.status(status).setHeader('Content-Type', 'application/json').json(body);
};

export default function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') {
    send(response, 405, { error: 'Method not allowed' });
    return;
  }

  const body = (request.body ?? {}) as { razorpay_order_id?: unknown; razorpay_payment_id?: unknown; razorpay_signature?: unknown };
  const orderId = typeof body.razorpay_order_id === 'string' ? body.razorpay_order_id : '';
  const paymentId = typeof body.razorpay_payment_id === 'string' ? body.razorpay_payment_id : '';
  const signature = typeof body.razorpay_signature === 'string' ? body.razorpay_signature : '';
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret || !orderId || !paymentId || !signature) {
    send(response, 400, { error: 'Incomplete payment verification data' });
    return;
  }

  const expectedSignature = createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex');
  if (expectedSignature !== signature) {
    send(response, 400, { error: 'Payment signature is invalid' });
    return;
  }

  send(response, 200, { ok: true });
}
