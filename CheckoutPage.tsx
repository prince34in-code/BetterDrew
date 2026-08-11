import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import Footer from '@/sections/Footer';

const CheckoutPage: React.FC = () => {
  const { cartItems, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const subtotal = getSubtotal();
  const shippingCost = 0; // As per requirement, shipping is Free
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation check
    if (Object.values(formData).some(value => value === '')) {
      alert('Please fill out all shipping details.');
      return;
    }
    console.log('Placing order with data:', formData);
    // On successful order, clear the cart and navigate
    clearCart();
    navigate('/'); // Navigate to home page after order
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('₹', '₹');
  };

  return (
    <div className="bg-drew-product-bg min-h-screen">
      <div className="bg-drew-warm-ivory py-8 px-4">
        <section className="w-full max-w-[1400px] mx-auto pt-24 sm:pt-32 pb-16 sm:pb-24">
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-drew-deep-green tracking-tight">
              Checkout
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Shipping Information */}
            <div className="bg-drew-soft-white p-6 sm:p-8 rounded-3xl shadow-soft space-y-6">
              <h2 className="text-2xl font-bold text-drew-deep-green mb-2">Shipping Information</h2>
              {Object.entries({
                fullName: { label: 'Full Name', type: 'text' },
                email: { label: 'Email Address', type: 'email' },
                phone: { label: 'Phone Number', type: 'tel' },
                address: { label: 'Address', type: 'text' },
              }).map(([name, { label, type }]) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm font-medium text-drew-secondary-text mb-1.5">{label}</label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-drew-warm-ivory/80 border-2 border-drew-soft-border rounded-lg focus:ring-drew-lime-accent focus:border-drew-lime-accent transition"
                  />
                </div>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-drew-secondary-text mb-1.5">City</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-3 bg-drew-warm-ivory/80 border-2 border-drew-soft-border rounded-lg focus:ring-drew-lime-accent focus:border-drew-lime-accent transition" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-drew-secondary-text mb-1.5">State</label>
                  <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} required className="w-full px-4 py-3 bg-drew-warm-ivory/80 border-2 border-drew-soft-border rounded-lg focus:ring-drew-lime-accent focus:border-drew-lime-accent transition" />
                </div>
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-drew-secondary-text mb-1.5">Pincode</label>
                <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required className="w-full px-4 py-3 bg-drew-warm-ivory/80 border-2 border-drew-soft-border rounded-lg focus:ring-drew-lime-accent focus:border-drew-lime-accent transition" />
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="bg-drew-soft-white p-6 sm:p-8 rounded-3xl shadow-soft sticky top-24">
              <h2 className="text-2xl font-bold text-drew-deep-green mb-6">Order Summary</h2>
              
              {/* Product List */}
              <div className="space-y-4 mb-6">
                {cartItems.length > 0 ? cartItems.map(item => (
                  <div key={item.id} className="flex items-start justify-between gap-4">
                    {/* Placeholder for image */}
                    <div className="w-16 h-16 bg-drew-warm-ivory rounded-lg flex-shrink-0"></div>
                    <div className="flex-grow">
                      <p className="font-semibold text-drew-deep-green leading-snug">{item.name}</p>
                      <p className="text-sm text-drew-secondary-text">{item.quantity} × {item.packSize} bottles total</p>
                    </div>
                    <p className="font-semibold text-drew-deep-green whitespace-nowrap">{formatPrice((item.price || 0) * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <hr className="my-6 border-drew-soft-border" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-drew-secondary-text">
                  <span>Subtotal</span>
                  <span className="font-medium text-drew-deep-green">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-drew-secondary-text">
                  <span>Shipping</span>
                  <span className="font-medium text-drew-deep-green">Free</span>
                </div>
              </div>

              <hr className="my-6 border-drew-soft-border" />

              <div className="flex justify-between font-bold text-drew-deep-green text-xl mb-8">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-drew-deep-green text-drew-soft-white font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-drew-lime-accent hover:text-drew-deep-green"
              >
                Place Order
              </button>

              <p className="mt-4 text-center text-xs text-drew-secondary-text">
                Payment is not required for this demo.
              </p>
            </div>
          </form>
        </section>
      </div>
      <div className="bg-drew-warm-ivory">
        <Footer />
      </div>
    </div>
  );
};

export default CheckoutPage;

/*
  This component provides a premium, polished checkout experience.

  Key Changes:
  - **Premium UI:** The layout has been structured into a clean two-column design on desktop, which stacks responsively on mobile. All styling adheres to the Betterdrew brand guidelines.
  - **Improved Hierarchy:** Clear visual hierarchy is established for the shipping form, order summary, and totals, making the page easy to scan and understand.
  - **Refined Form Inputs:** Form fields are styled for a modern, user-friendly experience with clear labels and comfortable sizing.
  - **Clear Order Summary:** The summary card neatly lists products, quantities, and prices, with a clear breakdown of the final total.
  - **State Management:** The component uses controlled inputs for the form and pulls live data from the `useCart` context, ensuring all information is accurate.
  - **Functionality Preserved:** The form submission logic is in place, and the component is ready to be integrated with a payment gateway or order fulfillment API.
*/