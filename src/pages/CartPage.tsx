import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from "@/context/CartContext";
import { Plus, Minus, Trash2, X, Sparkles, ArrowRight } from 'lucide-react';
import { betterdrewProduct, PackOption } from '@/data/product';

const FREE_SHIPPING_THRESHOLD = 499;

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getSubtotal, addToCart } = useCart();
  const subtotal = getSubtotal();
  const navigate = useNavigate();

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Cross-sell items: packs from betterdrewProduct not already at maximum in cart
  const crossSellPacks: PackOption[] = betterdrewProduct.packs.slice(0, 3);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="pt-20 sm:pt-24 bg-drew-warm-ivory min-h-screen flex flex-col antialiased">
      <Helmet>
        <title>Your Cart | Betterdrew</title>
        <meta name="description" content="Review your Betterdrew items and proceed to checkout with fast delivery across India." />
        <link rel="canonical" href="https://betterdrew.com/cart" />
        <meta property="og:title" content="Your Cart | Betterdrew" />
      </Helmet>

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 py-6 sm:py-10">
        <div className="bg-drew-soft-white rounded-3xl shadow-soft p-5 sm:p-8 md:p-10 border border-drew-soft-border/50">
          
          {/* 1. Header with Close Button */}
          <div className="flex items-center justify-between pb-5 border-b border-drew-soft-border/60">
            <h1 className="text-2xl sm:text-3xl font-black text-drew-deep-green tracking-tight">
              Cart
            </h1>
            <button
              type="button"
              onClick={() => navigate('/product')}
              aria-label="Close cart and return to shopping"
              className="p-2 -mr-1 rounded-full text-drew-deep-green hover:bg-drew-warm-ivory transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-drew-lime-accent"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* 2. Free-Shipping Progress Bar */}
          <div className="my-5 p-4 rounded-2xl bg-drew-cream/80 border border-drew-soft-border/50">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
              <span className="flex items-center gap-1.5 text-drew-deep-green">
                <Sparkles className="w-4 h-4 text-drew-lime-accent" />
                {isFreeShipping ? (
                  <strong className="text-drew-coconut-green">You've unlocked FREE standard shipping! 🎉</strong>
                ) : (
                  <span>
                    Unlock free shipping — <strong className="text-drew-deep-green">₹{amountNeeded.toFixed(0)}</strong> to go
                  </span>
                )}
              </span>
              <span className="text-xs text-drew-secondary-text font-bold">
                {progressPercent}%
              </span>
            </div>
            {/* Visual Bar */}
            <div className="w-full h-2.5 rounded-full bg-drew-warm-ivory overflow-hidden">
              <div
                className="h-full bg-drew-lime-accent rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          {/* Empty State */}
          {cartItems.length === 0 ? (
            <div className="text-center py-10 px-4">
              <p className="text-base sm:text-lg text-drew-secondary-text mb-6">
                Your cart is currently empty.
              </p>
              <Link
                to="/product"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-drew-deep-green text-drew-cream font-bold text-sm sm:text-base rounded-full hover:bg-drew-lime-accent hover:text-drew-deep-green transition-all shadow-md"
              >
                Shop Young Coconut Water →
              </Link>
            </div>
          ) : (
            <>
              {/* 3. Cart Item Rows */}
              <div className="divide-y divide-drew-soft-border/50 my-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 sm:py-5 flex items-center gap-3 sm:gap-4">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-drew-product-bg/80 rounded-xl p-1.5 flex items-center justify-center border border-drew-soft-border/40">
                      <img
                        src={item.image}
                        alt={item.name}
                        width="80"
                        height="80"
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-grow min-w-0">
                      <h2 className="text-sm sm:text-base font-bold text-drew-deep-green leading-snug truncate">
                        {item.name}
                      </h2>
                      <p className="text-xs text-drew-secondary-text">
                        {item.packName} · {item.bottlesPerPack} {item.bottlesPerPack === 1 ? 'bottle' : 'bottles'}
                      </p>
                      <p className="text-sm font-extrabold text-drew-deep-green mt-1">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 rounded-full border border-drew-soft-border px-2 py-1 bg-drew-soft-white flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease ${item.packName} quantity`}
                        className="p-1 rounded-full text-drew-deep-green hover:bg-drew-warm-ivory transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs sm:text-sm font-bold text-drew-deep-green">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase ${item.packName} quantity`}
                        className="p-1 rounded-full text-drew-deep-green hover:bg-drew-warm-ivory transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete Icon */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.packName} from cart`}
                      className="p-2 text-drew-secondary-text/70 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* 4. Order Summary (Right-aligned) */}
              <div className="mt-6 pt-5 border-t border-drew-soft-border/60">
                <div className="max-w-xs ml-auto space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-drew-secondary-text">
                    <span>Subtotal</span>
                    <strong className="text-drew-deep-green font-semibold">₹{subtotal.toFixed(0)}</strong>
                  </div>
                  <div className="flex justify-between text-drew-secondary-text">
                    <span>Shipping</span>
                    <span className={isFreeShipping ? 'text-drew-coconut-green font-bold' : 'text-drew-deep-green font-semibold'}>
                      {isFreeShipping ? 'FREE' : '₹49'}
                    </span>
                  </div>
                  <div className="flex justify-between text-drew-secondary-text">
                    <span>Tax</span>
                    <span className="text-drew-deep-green font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-black text-drew-deep-green pt-2 border-t border-drew-soft-border/60">
                    <span>Estimated Total</span>
                    <span>₹{(isFreeShipping ? subtotal : subtotal + 49).toFixed(0)}</span>
                  </div>
                </div>

                {/* 5. Check Out Button (Large full-width, dark navy background, cream text) */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full py-4 px-6 rounded-full bg-drew-deep-green text-drew-cream font-bold text-base sm:text-lg hover:bg-drew-lime-accent hover:text-drew-deep-green transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Check Out</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-[11px] text-center text-drew-secondary-text/80 mt-2">
                    Taxes and shipping calculated; secure payment powered by Razorpay.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* 6. "Other Favorites" Cross-Sell Row */}
          <div className="mt-10 pt-6 border-t border-drew-soft-border/60">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-drew-deep-green mb-3">
              Other Favorites
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {crossSellPacks.map((pack) => (
                <div
                  key={pack.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-drew-cream/50 border border-drew-soft-border/50 hover:bg-drew-cream transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={betterdrewProduct.image}
                      alt={pack.name}
                      width="40"
                      height="40"
                      className="w-10 h-10 object-contain rounded-lg bg-drew-product-bg/60 p-1 flex-shrink-0"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-drew-deep-green truncate">{pack.name}</p>
                      <p className="text-[11px] text-drew-secondary-text font-semibold">₹{pack.price}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(betterdrewProduct, pack, 1)}
                    className="px-3 py-1.5 rounded-full bg-drew-deep-green text-drew-cream text-xs font-bold hover:bg-drew-lime-accent hover:text-drew-deep-green transition-colors flex-shrink-0 ml-2"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Nothing below that — NO footer! */}

        </div>
      </main>
    </div>
  );
};

export default CartPage;