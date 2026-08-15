import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from "@/context/CartContext";
import Footer from '@/sections/Footer';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getSubtotal, clearCart } = useCart();
  const subtotal = getSubtotal();
  const navigate = useNavigate();

  return (
    <div className="pt-24 bg-drew-warm-ivory min-h-screen flex flex-col">
      <Helmet>
        <title>Your Cart | Betterdrew</title>
        <meta name="description" content="Review and manage the items in your Betterdrew shopping cart. Proceed to checkout to complete your order." />
        <link rel="canonical" href="https://betterdrew.com/cart" />
        <meta property="og:title" content="Your Cart | Betterdrew" />
        <meta property="og:description" content="Review and manage the items in your Betterdrew shopping cart." />
        <meta property="og:url" content="https://betterdrew.com/cart" />
      </Helmet>
      <main className="flex-grow">
        <section className="w-full max-w-4xl mx-auto my-12 sm:my-16 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-drew-deep-green tracking-tight">
              Your Cart
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center bg-drew-soft-white rounded-2xl p-12">
              <p className="text-lg text-drew-secondary-text">
                Your cart is currently empty.
              </p>
              <Link
                to="/#shop"
                className="mt-6 inline-block px-8 py-3 bg-drew-deep-green text-drew-soft-white font-bold rounded-full hover:bg-drew-lime-accent hover:text-drew-deep-green transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Cart Items */}
              <div className="bg-drew-soft-white rounded-2xl shadow-soft p-4 sm:p-6 space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 border-b border-drew-soft-border pb-4 last:border-b-0 last:pb-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg bg-drew-product-bg p-1" />
                    <div className="flex-grow">
                      <h3 className="font-bold text-drew-deep-green">{item.name} - <span className="font-semibold">{item.packName || ''}</span></h3>
                      <p className="text-sm text-drew-secondary-text">{item.bottlesPerPack || 0} bottles per pack</p>
                      <p className="text-md font-semibold text-drew-deep-green mt-1">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 rounded-full hover:bg-drew-warm-ivory transition-colors">
                        <Minus className="w-4 h-4 text-drew-deep-green" />
                      </button>
                      <span className="w-8 text-center font-bold text-drew-deep-green">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 rounded-full hover:bg-drew-warm-ivory transition-colors">
                        <Plus className="w-4 h-4 text-drew-deep-green" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 rounded-full hover:bg-red-100 transition-colors">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-drew-soft-white rounded-2xl shadow-soft p-6">
                <h2 className="text-2xl font-bold text-drew-deep-green mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-drew-secondary-text">
                    <span>Subtotal</span>
                    {subtotal > 0 ? (
                      <span>₹{subtotal.toFixed(2)}</span>
                    ) : (
                      <span>--</span>
                    )}
                  </div>
                  <div className="flex justify-between text-drew-secondary-text">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between font-bold text-drew-deep-green text-lg pt-2 border-t border-drew-soft-border mt-2">
                    <span>Total</span>
                    {subtotal > 0 ? (
                      <span>₹{subtotal.toFixed(2)}</span>
                    ) : (
                      <span>--</span>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full px-8 py-4 bg-drew-deep-green text-drew-soft-white font-bold rounded-full hover:bg-drew-lime-accent hover:text-drew-deep-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                  </button>
                  <button onClick={clearCart} className="w-full sm:w-auto px-6 py-3 text-drew-secondary-text font-semibold hover:text-red-500 transition-colors">
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;