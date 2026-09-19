import React, { useEffect, useRef, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "@/context/CartContext";
import { Helmet } from 'react-helmet-async';
import { CheckCircle } from 'lucide-react';
import Footer from '@/sections/Footer';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, callback: () => void) => void;
    };
  }
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

const CheckoutPage: React.FC = () => {
  const { cartItems, getSubtotal, getItemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  const [formData, setFormData] = useState<FormState>({
    fullName: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const hasProcessedPaymentReturn = useRef(false);

  useEffect(() => {
    const paymentStatus = new URLSearchParams(window.location.search).get('payment');
    if (paymentStatus === 'success' && !hasProcessedPaymentReturn.current) {
      hasProcessedPaymentReturn.current = true;
      clearCart();
      setIsOrderComplete(true);
    } else if (paymentStatus === 'cancelled' || paymentStatus === 'failed') {
      setPaymentError('Payment was not completed. You can retry when you are ready.');
    }
  }, [clearCart]);

  if (itemCount === 0) {
    return (
      <>
      <Helmet>
        <title>Checkout | Betterdrew</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://betterdrew.com/checkout" />
      </Helmet>
      <div className="pt-24 bg-drew-warm-ivory min-h-screen flex flex-col items-center justify-center">
        <div className="text-center bg-drew-soft-white rounded-2xl p-12 shadow-soft">
          <p className="text-lg text-drew-secondary-text">Your cart is empty. Add items to proceed to checkout.</p>
          <Link to="/#shop" className="mt-6 inline-block px-8 py-3 bg-drew-deep-green text-drew-soft-white font-bold rounded-full hover:bg-drew-lime-accent hover:text-drew-deep-green transition-all">
            Continue Shopping
          </Link>
        </div>
      </div>
      </>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const orderEndpoint = import.meta.env.VITE_RAZORPAY_ORDER_ENDPOINT || '/api/razorpay-order';
    const verifyEndpoint = import.meta.env.VITE_RAZORPAY_VERIFY_ENDPOINT || '/api/razorpay-verify';
    if (!razorpayKey) {
      setPaymentError('Payment is not configured yet. Please try again later.');
      return;
    }

    setIsPaymentSubmitting(true);
    setPaymentError(null);

    try {
      const orderResponse = await fetch(orderEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(subtotal * 100),
          currency: 'INR',
          receipt: `betterdrew-${Date.now()}`,
          items: cartItems,
        }),
      });
      if (!orderResponse.ok) throw new Error('Could not create payment order');
      const order = await orderResponse.json() as { id: string; amount: number; currency: string };

      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Could not load Razorpay'));
          document.body.appendChild(script);
        });
      }

      if (!window.Razorpay) throw new Error('Could not load Razorpay');
      const razorpay = new window.Razorpay({
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'Betterdrew',
        description: 'Betterdrew order',
        order_id: order.id,
        prefill: { name: formData.fullName, email: formData.email, contact: formData.phone },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const verification = await fetch(verifyEndpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });
            if (!verification.ok) throw new Error('Payment verification failed');
            clearCart();
            setIsOrderComplete(true);
          } catch {
            setPaymentError('Payment was received but could not be verified. Please contact support before retrying.');
          } finally {
            setIsPaymentSubmitting(false);
          }
        },
        modal: { ondismiss: () => setIsPaymentSubmitting(false) },
        theme: { color: '#101B33' },
      });
      razorpay.on('payment.failed', () => {
        setPaymentError('Payment failed. Please check your details and try again.');
        setIsPaymentSubmitting(false);
      });
      razorpay.open();
    } catch {
      setPaymentError('We could not start payment. Please try again.');
      setIsPaymentSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isOrderComplete) {
    return (
      <>
      <Helmet>
        <title>Order Complete | Betterdrew</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://betterdrew.com/checkout" />
      </Helmet>
      <div className="pt-24 bg-drew-warm-ivory min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <section className="w-full max-w-md mx-auto my-12 sm:my-16 px-4 text-center">
            <div className="bg-drew-soft-white rounded-2xl p-8 sm:p-12 shadow-soft">
              <CheckCircle className="w-16 h-16 text-drew-lime-accent mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-drew-deep-green tracking-tight">
                Thank You!
              </h1>
              <p className="mt-4 text-drew-secondary-text">
                Your payment was verified successfully.
              </p>
              <Link to="/" className="mt-8 inline-block px-8 py-3 bg-drew-deep-green text-drew-soft-white font-bold rounded-full hover:bg-drew-lime-accent hover:text-drew-deep-green transition-all">
                Continue Shopping
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
      </>
    );
  }

  const InputField: React.FC<{ name: keyof FormState, label: string, type?: string, placeholder?: string }> = ({ name, label, type = 'text', placeholder }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-drew-secondary-text mb-1">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 bg-drew-soft-white border rounded-lg focus:ring-2 focus:ring-drew-lime-accent focus:border-drew-lime-accent transition-colors ${errors[name] ? 'border-red-500' : 'border-drew-soft-border'}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="pt-24 bg-drew-warm-ivory min-h-screen flex flex-col">
      <Helmet>
        <title>Checkout | Betterdrew</title>
        <meta name="description" content="Complete your Betterdrew order by providing your shipping and payment information." />
        <link rel="canonical" href="https://betterdrew.com/checkout" />
        <meta property="og:title" content="Checkout | Betterdrew" />
        <meta property="og:description" content="Complete your Betterdrew order." />
        <meta property="og:url" content="https://betterdrew.com/checkout" />
      </Helmet>
      <main className="flex-grow">
        <section className="w-full max-w-6xl mx-auto my-12 sm:my-16 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-drew-deep-green tracking-tight">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Shipping Information */}
            <div className="bg-drew-soft-white rounded-2xl shadow-soft p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-drew-deep-green mb-6">Shipping Information</h2>
              <div className="space-y-4">
                <InputField name="fullName" label="Full Name" placeholder="John Doe" />
                <InputField name="email" label="Email Address" type="email" placeholder="john.doe@example.com" />
                <InputField name="phone" label="Phone Number" type="tel" placeholder="9876543210" />
                <InputField name="address" label="Address" placeholder="123, Green Valley" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField name="city" label="City" placeholder="Metropolis" />
                  <InputField name="state" label="State" placeholder="New State" />
                </div>
                <InputField name="pincode" label="Pincode" placeholder="123456" />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="bg-drew-soft-white rounded-2xl shadow-soft p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-drew-deep-green mb-6">Order Summary</h2>
                
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <img src={item.image} alt={item.name} width="64" height="64" decoding="async" className="w-16 h-16 object-contain rounded-lg bg-drew-product-bg p-1" />
                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-drew-lime-accent text-xs font-bold text-drew-deep-green">{item.quantity}</span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-drew-deep-green text-sm">{item.name} - {item.packName}</h3>
                        <p className="text-xs text-drew-secondary-text">{item.bottlesPerPack * item.quantity} bottles total</p>
                      </div>
                      <p className="text-sm font-semibold text-drew-deep-green">₹{(item.price * item.quantity).toFixed(0)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 py-4 border-t border-drew-soft-border">
                  <div className="flex justify-between text-drew-secondary-text">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-drew-secondary-text">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-drew-deep-green text-lg pt-2 border-t border-drew-soft-border mt-2">
                    <span>Total</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  {paymentError && <p className="mb-4 text-sm text-red-600" role="alert">{paymentError}</p>}
                  <button type="submit" disabled={isPaymentSubmitting} className="w-full px-8 py-4 bg-drew-deep-green text-drew-soft-white font-bold rounded-full hover:bg-drew-lime-accent hover:text-drew-deep-green transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {isPaymentSubmitting ? 'Opening payment...' : 'Pay securely'}
                  </button>
                  <p className="text-xs text-center text-drew-secondary-text mt-4">Secure payment powered by Razorpay.</p>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;