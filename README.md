# Betterdrew

## Third-party integrations

The frontend remains deployable as a static site. Secret-bearing requests use Vercel Functions in `api/`; Formspree is called directly from the browser.

### Local environment

Copy `.env.example` to `.env.local` and set the public endpoint/key values. Never put Resend or Razorpay secrets in `VITE_*` variables.

```text
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
VITE_NEWSLETTER_ENDPOINT=/api/newsletter
VITE_RAZORPAY_KEY_ID=rzp_test_public_key
VITE_RAZORPAY_ORDER_ENDPOINT=/api/razorpay-order
VITE_RAZORPAY_VERIFY_ENDPOINT=/api/razorpay-verify
```

Run the frontend with `npm run dev`. Vercel Functions are available when the project is deployed to Vercel; GitHub Pages alone cannot run the `api/` directory. For local function testing, use `vercel dev` after installing the Vercel CLI.

### Vercel deployment

1. Import the repository into Vercel and keep the Vite build command `npm run build`.
2. Add these Production and Preview environment variables in Vercel:
   - `RESEND_API_KEY`: a Resend API key.
   - `RESEND_AUDIENCE_ID`: the Resend audience that should receive newsletter contacts.
   - `RAZORPAY_KEY_ID`: the public Razorpay key ID, also exposed to the frontend as `VITE_RAZORPAY_KEY_ID`.
   - `RAZORPAY_KEY_SECRET`: the private Razorpay key secret.
   - `VITE_FORMSPREE_ENDPOINT`: the Formspree endpoint for the contact form.
3. Set `VITE_RAZORPAY_ORDER_ENDPOINT=/api/razorpay-order` and `VITE_RAZORPAY_VERIFY_ENDPOINT=/api/razorpay-verify` unless the functions are hosted on another origin.
4. Create the Formspree form and paste its endpoint into `VITE_FORMSPREE_ENDPOINT`.
5. Create a Resend audience and copy its ID into `RESEND_AUDIENCE_ID`.
6. Create Razorpay test keys first, verify the full checkout flow, then replace them with live keys. The server calculates totals from the allowlisted pack IDs in `api/razorpay-order.ts`.

### GitHub Pages

GitHub Pages can continue serving the built frontend, but it cannot execute Resend or Razorpay server functions. Deploy the Vercel functions and frontend together on Vercel, or point `VITE_NEWSLETTER_ENDPOINT`, `VITE_RAZORPAY_ORDER_ENDPOINT`, and `VITE_RAZORPAY_VERIFY_ENDPOINT` at equivalent HTTPS functions hosted separately.

Cart contents persist in `localStorage` under `betterdrew_cart` until a verified Razorpay payment clears them.
