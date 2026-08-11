import React from 'react';
import { useCart } from '@/context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import Footer from '@/sections/Footer';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const total = subtotal; // Shipping is calculated at checkout

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
              Your Cart
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center bg-drew-soft-white p-12 sm:p-16 rounded-3xl shadow-soft flex flex-col items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-drew-deep-green/20 mb-6" strokeWidth={1.5} />
              <h2 className="text-2xl sm:text-3xl font-bold text-drew-deep-green">
                Your cart is waiting.
              </h2>
              <p className="mt-2 max-w-sm text-base sm:text-lg text-drew-secondary-text">
                Discover pure, refreshing hydration made for everyday life.
              </p>
              <Link to="/" className="mt-8 inline-block px-8 py-3 bg-drew-deep-green text-drew-soft-white font-bold text-base rounded-full transition-all duration-300 ease-out hover:bg-drew-lime-accent hover:text-drew-deep-green">
                Continue Shopping →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              {/* Cart Items */}
              <div className="lg:col-span-2 bg-drew-soft-white p-6 sm:p-8 rounded-3xl shadow-soft space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 border-b border-drew-soft-border pb-6 last:border-b-0 last:pb-0">
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold text-drew-deep-green">{item.name}</h2>
                      <p className="text-sm text-drew-secondary-text mt-1">{item.packSize} bottles per pack</p>
                      <p className="text-lg font-semibold text-drew-deep-green mt-2 sm:hidden">{formatPrice(item.price || 0)}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      {/* Quantity Control */}
                      <div className="flex items-center gap-2 rounded-full border border-drew-soft-border p-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 rounded-full hover:bg-drew-warm-ivory disabled:opacity-50" disabled={item.quantity <= 1}>
                          <Minus className="w-4 h-4 text-drew-deep-green" />
                        </button>
                        <span className="w-8 text-center text-md font-bold text-drew-deep-green">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 rounded-full hover:bg-drew-warm-ivory">
                          <Plus className="w-4 h-4 text-drew-deep-green" />
                        </button>
                      </div>
                      <p className="hidden sm:block text-lg font-semibold text-drew-deep-green w-24 text-right">{formatPrice((item.price || 0) * item.quantity)}</p>
                      {/* Delete Action */}
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-drew-secondary-text hover:text-red-500 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1 bg-drew-soft-white p-6 sm:p-8 rounded-3xl shadow-soft sticky top-24">
                <h2 className="text-2xl font-bold text-drew-deep-green mb-6">Order Summary</h2>
                <div className="space-y-4 text-drew-secondary-text">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-drew-deep-green">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-sm">Calculated at checkout</span>
                  </div>
                </div>
                <hr className="my-6 border-drew-soft-border" />
                <div className="flex justify-between font-bold text-drew-deep-green text-xl mb-6">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full px-6 py-4 bg-drew-deep-green text-drew-soft-white font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-drew-lime-accent hover:text-drew-deep-green"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full mt-4 text-center text-sm text-drew-secondary-text hover:text-drew-deep-green transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
      <div className="bg-drew-warm-ivory">
        <Footer />
      </div>
    </div>
  );
};

export default CartPage;

/*
  This component has been updated to provide a full-featured, premium cart experience.

  Key Changes:
  - **Dynamic Content:** The page now dynamically renders items from the `useCart` context. It shows either the list of items or an "empty cart" message.
  - **Polished UI:** The layout and styling have been refined to match the Betterdrew brand aesthetic, with clean cards, improved typography, and generous spacing.
  - **Item Componentization:** Each cart item is now a well-structured component with a clear hierarchy for the product name, pack details, and price.
  - **Improved Quantity Controls:** The quantity selector has been redesigned into a sleek, rounded "pill" style for better usability and visual appeal.
  - **Refined Order Summary:** The summary card clearly breaks down the subtotal and total, with a stronger visual emphasis on the final price.
  - **State Handling:** All actions (update quantity, remove item, clear cart) are correctly wired to the `CartContext`, ensuring the state is managed properly.
  - **Responsive Layout:** The design is fully responsive, providing a seamless experience on both desktop and mobile devices.
*/
```

```diff
--- a/d:\BetterDrew\src\sections/ProductDetail.tsx
+++ b/d:\BetterDrew\src/sections/ProductDetail.tsx
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CartPage;