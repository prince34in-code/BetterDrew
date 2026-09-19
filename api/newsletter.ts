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

const send = (response: ApiResponse, status: number, body: unknown) => {
  response.status(status).setHeader('Content-Type', 'application/json').json(body);
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method === 'OPTIONS') {
    response.status(204).setHeader('Access-Control-Allow-Origin', '*').setHeader('Access-Control-Allow-Headers', 'Content-Type').end();
    return;
  }

  if (request.method !== 'POST') {
    send(response, 405, { error: 'Method not allowed' });
    return;
  }

  const body = (request.body ?? {}) as { email?: unknown };
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    send(response, 400, { error: 'A valid email address is required' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    send(response, 500, { error: 'Newsletter service is not configured' });
    return;
  }

  try {
    const resendResponse = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    if (!resendResponse.ok) {
      send(response, resendResponse.status, { error: 'Newsletter signup failed' });
      return;
    }

    send(response, 200, { ok: true });
  } catch {
    send(response, 502, { error: 'Newsletter service unavailable' });
  }
}
