import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router';
import emailjs from '@emailjs/browser';

const assets = import.meta.glob('../images/*.{jpeg,jpg,png,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function asset(startsWith) {
  const match = Object.entries(assets).find(([path]) =>
    path.split('/').pop().startsWith(startsWith),
  );
  return match?.[1] ?? '';
}

const products = [
  { id: 'jellyfish-keychain', name: 'Jellyfish Keychain', image: asset('lily.jpeg'), price: 300, oldPrice: 500 },
  { id: 'buttercup-top', name: 'Buttercup Top', image: asset('Puff Sleeve'), price: 900, oldPrice: 1200 },
  { id: 'cherry-fall', name: 'Cherry Fall', image: asset('red clip.jpeg'), price: 200, oldPrice: 400 },
];

const sectionClass = 'px-[9%] py-5 max-[991px]:px-5';
const buttonClass = 'mt-2.5 inline-block cursor-pointer rounded-full bg-[#333] px-[35px] py-[9px] text-[17px] text-white transition-colors hover:bg-[#e97db1]';

function Header({ cartCount, favoriteCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] flex items-center justify-between bg-white px-[9%] py-5 shadow-[0_5px_10px_rgba(0,0,0,0.1)] max-[991px]:px-5 max-[768px]:py-[15px]">
      <button
        className="order-first hidden cursor-pointer rounded-[5px] border border-solid border-black/30 px-3 py-[5px] text-[30px] text-[#333] max-[768px]:block"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <i className="fas fa-bars" aria-hidden="true" />
      </button>
      <Link className="mr-auto whitespace-nowrap text-[30px] font-bold text-[#333] max-[768px]:ml-2.5 max-[768px]:text-[25px] max-[450px]:text-[20px]" to="/" onClick={closeMenu}>
        ♡LILY LANE♡
      </Link>
      <nav
        className={`flex items-center max-[768px]:absolute max-[768px]:inset-x-0 max-[768px]:top-full max-[768px]:block max-[768px]:overflow-hidden max-[768px]:border-t max-[768px]:border-solid max-[768px]:border-black/10 max-[768px]:bg-[#eee] max-[768px]:transition-[max-height,opacity] max-[768px]:duration-300 ${menuOpen ? 'max-[768px]:visible max-[768px]:max-h-[300px] max-[768px]:opacity-100 max-[768px]:pointer-events-auto' : 'max-[768px]:invisible max-[768px]:max-h-0 max-[768px]:opacity-0 max-[768px]:pointer-events-none'}`}
        aria-label="Main navigation"
      >
        <Link className="px-[15px] text-[20px] text-[#666] hover:text-[#e97db1] max-[768px]:m-[15px] max-[768px]:block max-[768px]:border max-[768px]:border-solid max-[768px]:border-black/10 max-[768px]:bg-white max-[768px]:p-[15px]" to="/#home" onClick={closeMenu}>Home</Link>
        <Link className="px-[15px] text-[20px] text-[#666] hover:text-[#e97db1] max-[768px]:m-[15px] max-[768px]:block max-[768px]:border max-[768px]:border-solid max-[768px]:border-black/10 max-[768px]:bg-white max-[768px]:p-[15px]" to="/#about" onClick={closeMenu}>About</Link>
        <Link className="px-[15px] text-[20px] text-[#666] hover:text-[#e97db1] max-[768px]:m-[15px] max-[768px]:block max-[768px]:border max-[768px]:border-solid max-[768px]:border-black/10 max-[768px]:bg-white max-[768px]:p-[15px]" to="/#products" onClick={closeMenu}>Products</Link>
      </nav>
      <div className="ml-4 flex shrink-0 items-center gap-[15px] text-[25px] text-[#333] max-[768px]:gap-2.5 max-[768px]:text-[22px] max-[450px]:ml-2 max-[450px]:gap-2 max-[450px]:text-[20px]" aria-label="Shop links">
        <Link to="/favorites" className="relative hover:text-[#e97db1]" aria-label={`Favorites, ${favoriteCount} items`}>
          <i className="fas fa-heart" aria-hidden="true" />
          {favoriteCount > 0 && <span className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e97db1] px-1 text-[12px] font-bold leading-none text-white">{favoriteCount}</span>}
        </Link>
        <Link to="/cart" className="relative hover:text-[#e97db1]" aria-label={`Shopping cart, ${cartCount} items`}>
          <i className="fas fa-shopping-cart" aria-hidden="true" />
          {cartCount > 0 && <span className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e97db1] px-1 text-[12px] font-bold leading-none text-white">{cartCount}</span>}
        </Link>
        <a href="#contact" className="hover:text-[#e97db1]" aria-label="Contact"><i className="fas fa-user" aria-hidden="true" /></a>
      </div>
    </header>
  );
}

function ProductCard({ product, onAddToCart, onAddToFavorites }) {
  return (
    <article className="group relative min-w-0 flex-[1_1_300px] overflow-hidden rounded-[5px] border border-solid border-black/10 shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
      <div className="relative overflow-hidden pt-5 text-center">
        <img className="h-[250px] w-full object-contain transition-transform duration-200 group-hover:scale-[1.05]" src={product.image} alt={product.name} loading="lazy" />
        <div className="absolute inset-x-0 bottom-0 flex transition-[bottom] duration-200 min-[769px]:bottom-[-70px] min-[769px]:group-hover:bottom-0 min-[769px]:group-focus-within:bottom-0">
          <button type="button" onClick={() => onAddToFavorites(product)} className="flex h-[50px] w-1/4 items-center justify-center bg-[#e97db1] text-[20px] text-white hover:bg-[#333]" aria-label={`Favorite ${product.name}`}><i className="fas fa-heart" aria-hidden="true" /></button>
          <button type="button" onClick={() => onAddToCart(product)} className="flex h-[50px] w-1/2 items-center justify-center border-x border-solid border-white/45 bg-[#e97db1] text-[16px] text-white hover:bg-[#333]">Add to cart</button>
          <a href="#" className="flex h-[50px] w-1/4 items-center justify-center bg-[#e97db1] text-[20px] text-white hover:bg-[#333]" aria-label={`Share ${product.name}`}><i className="fas fa-share" aria-hidden="true" /></a>
        </div>
      </div>
      <div className="p-5 text-center">
        <h3 className="text-[25px] text-[#333]">{product.name}</h3>
        <div className="pt-2.5 text-[25px] font-bold text-[#e97db1]">
          Rs. {product.price.toLocaleString('en-IN')} <span className="text-[15px] font-normal text-[#999] line-through">Rs. {product.oldPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </article>
  );
}

function ShopPage({ onAddToCart, onAddToFavorites, favorites }) {
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(''), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setToast(`${product.name} added to your cart.`);
  };

  const handleAddToFavorites = (product) => {
    const isAlreadySaved = favorites.some((favorite) => favorite.id === product.id);
    if (!isAlreadySaved) onAddToFavorites(product);
    setToast(isAlreadySaved
      ? `${product.name} is already in your favorites.`
      : `${product.name} added to your favorites.`);
  };

  return (
    <>
      <main>
        <section
          id="home"
          className={`${sectionClass} flex min-h-screen items-center bg-cover bg-center max-[991px]:bg-left`}
          style={{ backgroundImage: `url("${asset('theme1.jpeg')}")` }}
        >
          <div className="m-[30px] max-w-[550px] max-[768px]:my-5 max-[768px]:ml-0 max-[768px]:max-w-[480px]">
            <h1 className="text-[60px] text-[#333] max-[768px]:text-[50px] max-[450px]:text-[42px]">Pretty Things, Made by Hand</h1>
            <span className="block py-2.5 text-[35px] leading-[1.5] text-[#e97db1] max-[768px]:text-[25px]">Your little corner for all things cute, creative, and handmade</span>
            <p className="py-2.5 text-[15px] leading-[1.6] text-[#777]">Handmade with creativity, thoughtful details, and little pieces of happiness made to be yours.</p>
            <a href="#products" className={buttonClass}>Explore Our Collection ♡</a>
          </div>
        </section>

        <section className={sectionClass} id="about">
          <h2 className="my-5 bg-[rgba(255,51,153,0.05)] p-5 text-center text-[40px] text-[#333] max-[450px]:text-[30px]"><span className="text-[#e97db1]">About</span> Us</h2>
          <div className="flex flex-wrap items-center gap-5 py-5 pb-[30px]">
            <div className="relative min-w-0 flex-[1_1_400px]">
              <video className="block max-h-[550px] w-full rounded-[5px] border-[15px] border-solid border-white object-cover shadow-[0_5px_10px_rgba(0,0,0,0.1)]" src={asset('ScreenRecording')} loop autoPlay muted playsInline aria-label="A look at Lily Lane handmade creations" />
              <h3 className="absolute left-1/2 top-1/2 w-[calc(100%-30px)] -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-2.5 text-center text-[25px] text-[#333] mix-blend-screen max-[450px]:text-[20px]">Handmade with love just for you</h3>
            </div>
            <div className="min-w-0 flex-[1_1_400px]">
              <h3 className="text-[30px] text-[#333]">Why choose Lily Lane?</h3>
              <p className="py-2.5 text-[15px] leading-[1.7] text-[#777]">At Lily Lane, every little creation begins with an idea, creativity, and love. We believe that even the smallest things can carry a little meaning, bring a little joy, and make an ordinary day feel special.</p>
              <p className="py-2.5 text-[15px] leading-[1.7] text-[#777]">We’re still at the beginning of our journey, and our collection may be small for now, but there’s so much more we dream of creating. From handmade accessories to new DIY creations.</p>
              <a href="#products" className={buttonClass}>Learn More</a>
            </div>
          </div>
        </section>

        <section className={`${sectionClass} flex flex-wrap gap-[15px] bg-[#eee] py-[50px]`} aria-label="Shop benefits">
          <div className="flex min-w-0 flex-[1_1_250px] items-center border border-solid border-black/10 bg-white p-5 rounded-xl">
            <img className="mr-5 h-[50px] w-[50px] shrink-0 object-contain" src={asset('free.jpeg')} alt="" loading="lazy" />
            <div><h3 className="pb-[5px] text-[20px] text-[#333]">Free Delivery</h3><span className="text-[17px] text-[#555]">Inside Kathmandu Valley and Rampur, Palpa</span></div>
          </div>
          <div className="flex min-w-0 flex-[1_1_250px] items-center border border-solid border-black/10 bg-white p-5 rounded-xl">
            <img className="mr-5 h-[50px] w-[50px] shrink-0 object-contain" src={asset('Essentialgiftshub')} alt="" loading="lazy" />
            <div><h3 className="pb-[5px] text-[20px] text-[#333]">Get a special mini gift with your first purchase</h3><span className="text-[17px] text-[#555]">On all orders</span></div>
          </div>
          <div className="flex min-w-0 flex-[1_1_250px] items-center border border-solid border-black/10 bg-white p-5 rounded-xl">
            <img className="mr-5 h-[50px] w-[50px] shrink-0 object-contain" src={asset('_.jpeg')} alt="" loading="lazy" />
            <div><h3 className="pb-[5px] text-[20px] text-[#333]">Buy two, get an extra surprise</h3><span className="text-[17px] text-[#555]">A little something extra for you</span></div>
          </div>
        </section>

        <section className={sectionClass} id="products">
          <h2 className="my-5 bg-[rgba(255,51,153,0.05)] p-2.5 text-center text-[40px] text-[#333] max-[450px]:text-[30px]">Latest <span className="text-[#e97db1]">Products</span></h2>
          <div className="flex flex-wrap gap-[15px]">
            {products.map((product) => <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onAddToFavorites={handleAddToFavorites} />)}
          </div>
        </section>
      </main>

      <footer className={sectionClass} id="contact">
        <div className="flex flex-wrap gap-[15px]">
          <div className="min-w-0 flex-[1_1_250px]">
            <h3 className="py-2.5 text-[25px] text-[#333]">Quick Links</h3>
            <a className="block p-2.5 text-[15px] text-[#666] hover:text-[#e97db1] hover:underline" href="#home">Home</a>
            <a className="block p-2.5 text-[15px] text-[#666] hover:text-[#e97db1] hover:underline" href="#about">About</a>
            <a className="block p-2.5 text-[15px] text-[#666] hover:text-[#e97db1] hover:underline" href="#products">Products</a>
          </div>
          <div className="min-w-0 flex-[1_1_250px]">
            <h3 className="py-2.5 text-[25px] text-[#333]">Find Us Online</h3>
            <a className="block p-2.5 text-[15px] text-[#666] hover:text-[#e97db1] hover:underline" href="https://www.instagram.com/lilylanee1/" target="_blank" rel="noreferrer">Instagram</a>
            <a className="block p-2.5 text-[15px] text-[#666] hover:text-[#e97db1] hover:underline" href="https://www.tiktok.com/@lily.lanee" target="_blank" rel="noreferrer">TikTok</a>
          </div>
          <div className="min-w-0 flex-[1_1_250px]">
            <h3 className="py-2.5 text-[25px] text-[#333]">Contact Info</h3>
            <a className="block p-2.5 text-[15px] text-[#666] hover:text-[#e97db1] hover:underline" href="tel:9704035125">9704035125</a>
            <a className="block p-2.5 text-[15px] text-[#666] hover:text-[#e97db1] hover:underline" href="mailto:crochetcloset@gmail.com">crochetcloset@gmail.com</a>
            <a className="block p-2.5 text-[15px] text-[#666] hover:text-[#e97db1] hover:underline" href="#contact">Kathmandu, Nepal</a>
            <img className="mt-2.5 h-auto max-w-full" src={asset('IMG_2785.jpg')} alt="A handmade Lily Lane creation" loading="lazy" />
          </div>
        </div>
        <div className="mt-[15px] border-t border-solid border-black/10 px-[15px] pb-[15px] pt-[25px] text-center text-[20px] text-[#333]">By <span className="text-[#e97db1]">Kausar Jahan</span></div>
      </footer>
      {toast && (
        <div className="fixed bottom-6 right-6 z-[1100] max-w-[calc(100vw-3rem)] rounded-lg bg-[#333] px-5 py-4 text-[15px] text-white shadow-lg" role="status" aria-live="polite">
          <i className="fas fa-check-circle mr-2 text-[#e97db1]" aria-hidden="true" />
          {toast}
        </div>
      )}
    </>
  );
}

function CartPage({ cart, onRemove, onSetQuantity, onClearCart }) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [orderMessage, setOrderMessage] = useState(null);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (!checkoutOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isSending) setCheckoutOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [checkoutOpen, isSending]);

  const handleCheckout = async (event) => {
    event.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setOrderMessage({
        type: 'error',
        text: 'Email checkout is not configured yet. Add your EmailJS IDs to .env.local and restart the app.',
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
    const customerName = formData.get('customer_name').trim();
    const customerEmail = formData.get('customer_email').trim();
    const customerPhone = formData.get('customer_phone').trim();
    const deliveryAddress = formData.get('delivery_address').trim();
    const notes = formData.get('order_notes').trim();
    const orderId = `LL-${Date.now()}`;
    const itemsText = cart.map(({ product, quantity }) =>
      `${product.name} × ${quantity} — Rs. ${(product.price * quantity).toLocaleString('en-IN')}`,
    ).join('\n');

    setIsSending(true);
    setOrderMessage(null);

    try {
      await emailjs.send(serviceId, templateId, {
        to_email: 'crochetcloset@gmail.com',
        order_id: orderId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress,
        order_notes: notes || 'None',
        order_items: itemsText,
        order_total: `Rs. ${total.toLocaleString('en-IN')}`,
        reply_to: customerEmail,
      }, { publicKey });

      onClearCart();
      setCheckoutOpen(false);
      setOrderMessage({ type: 'success', text: `Order ${orderId} was placed. We’ll contact you to confirm delivery.` });
    } catch {
      setOrderMessage({
        type: 'error',
        text: 'We could not send your order email. Please check your connection and try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-[70vh] px-[9%] pb-10 pt-[120px] max-[991px]:px-5">
      <h1 className="mb-6 text-[36px] text-[#333]">Your Shopping Cart</h1>
      {orderMessage && (
        <div className={`mb-5 rounded-lg border p-4 text-[15px] ${orderMessage.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-800'}`} role={orderMessage.type === 'error' ? 'alert' : 'status'}>
          {orderMessage.text}
        </div>
      )}
      {cart.length === 0 ? (
        <div className="rounded-lg border border-solid border-black/10 bg-[#fff9fc] p-8 text-center">
          <p className="text-[18px] text-[#666]">Your cart is empty.</p>
          <Link to="/#products" className={`${buttonClass} mt-5`}>Browse Products</Link>
        </div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            {cart.map(({ product, quantity }) => (
              <article key={product.id} className="flex flex-wrap items-center gap-5 rounded-lg border border-solid border-black/10 bg-white p-4 shadow-sm">
                <img className="h-32 w-32 rounded-md bg-[#fff9fc] object-contain" src={product.image} alt={product.name} />
                <div className="min-w-[150px] flex-1">
                  <h2 className="text-[20px] font-semibold text-[#333]">{product.name}</h2>
                  <p className="mt-2 text-[17px] text-[#e97db1]">Rs. {product.price.toLocaleString('en-IN')}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <button className="h-8 w-8 rounded border border-solid border-black/20 text-[18px] hover:bg-[#fff0f7]" type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => onSetQuantity(product.id, quantity - 1)}>−</button>
                    <span className="min-w-5 text-center text-[16px]" aria-label={`Quantity ${quantity}`}>{quantity}</span>
                    <button className="h-8 w-8 rounded border border-solid border-black/20 text-[18px] hover:bg-[#fff0f7]" type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => onSetQuantity(product.id, quantity + 1)}>+</button>
                    <button className="ml-3 text-[14px] text-[#777] underline hover:text-[#e97db1]" type="button" onClick={() => onRemove(product.id)}>Remove</button>
                  </div>
                </div>
                <p className="text-[17px] font-semibold text-[#333]">Rs. {(product.price * quantity).toLocaleString('en-IN')}</p>
              </article>
            ))}
          </div>
          <aside className="rounded-lg border border-solid border-black/10 bg-[#fff9fc] p-5">
            <h2 className="text-[20px] font-semibold">Order summary</h2>
            <div className="mt-5 flex justify-between border-t border-solid border-black/10 pt-4 text-[18px]">
              <span>Total</span><strong>Rs. {total.toLocaleString('en-IN')}</strong>
            </div>
            <button type="button" onClick={() => { setCheckoutOpen(true); setOrderMessage(null); }} className={`${buttonClass} w-full text-center`}>
              Checkout
            </button>
          </aside>
        </div>
      )}
      {checkoutOpen && cart.length > 0 && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSending) setCheckoutOpen(false);
          }}
        >
          <form
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-solid border-black/10 bg-white p-5 shadow-2xl sm:p-7"
            onSubmit={handleCheckout}
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 id="checkout-title" className="text-[24px] font-semibold text-[#333]">Delivery Information</h2>
              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[24px] text-[#666] hover:bg-[#fff0f7] hover:text-[#e97db1]" type="button" aria-label="Close checkout" disabled={isSending} onClick={() => setCheckoutOpen(false)}>×</button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-[14px] text-[#555]">Full name
                <input className="rounded border border-solid border-black/20 px-3 py-2.5 text-[16px] text-[#333]" type="text" name="customer_name" autoComplete="name" required maxLength={100} />
              </label>
              <label className="grid gap-1.5 text-[14px] text-[#555]">Email address
                <input className="rounded border border-solid border-black/20 px-3 py-2.5 text-[16px] text-[#333]" type="email" name="customer_email" autoComplete="email" required maxLength={254} />
              </label>
              <label className="grid gap-1.5 text-[14px] text-[#555]">Phone number
                <input className="rounded border border-solid border-black/20 px-3 py-2.5 text-[16px] text-[#333]" type="tel" name="customer_phone" autoComplete="tel" required maxLength={30} />
              </label>
              <label className="grid gap-1.5 text-[14px] text-[#555] sm:col-span-2">Delivery address
                <textarea className="min-h-24 rounded border border-solid border-black/20 px-3 py-2.5 text-[16px] text-[#333]" name="delivery_address" autoComplete="street-address" required maxLength={500} />
              </label>
              <label className="grid gap-1.5 text-[14px] text-[#555] sm:col-span-2">Order notes <span className="text-[#888]">(optional)</span>
                <textarea className="min-h-20 rounded border border-solid border-black/20 px-3 py-2.5 text-[16px] text-[#333]" name="order_notes" maxLength={500} />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[16px]">Order total: <strong className="text-[#e97db1]">Rs. {total.toLocaleString('en-IN')}</strong></p>
              <button className={`${buttonClass} mt-0 disabled:cursor-not-allowed disabled:opacity-60`} type="submit" disabled={isSending}>
                {isSending ? 'Sending order…' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

function FavoritesPage({ favorites, onRemove }) {
  return (
    <main className="min-h-[70vh] px-[9%] pb-10 pt-[120px] max-[991px]:px-5">
      <h1 className="mb-6 text-[36px] text-[#333]">Your Favorites</h1>
      {favorites.length === 0 ? (
        <div className="rounded-lg border border-solid border-black/10 bg-[#fff9fc] p-8 text-center">
          <p className="text-[18px] text-[#666]">You haven’t saved any favorites yet.</p>
          <Link to="/#products" className={`${buttonClass} mt-5`}>Browse Products</Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-lg border border-solid border-black/10 bg-white shadow-sm">
              <img className="h-60 w-full bg-[#fff9fc] object-contain p-4" src={product.image} alt={product.name} />
              <div className="p-5">
                <h2 className="text-[20px] font-semibold text-[#333]">{product.name}</h2>
                <p className="mt-2 text-[17px] text-[#e97db1]">Rs. {product.price.toLocaleString('en-IN')}</p>
                <button className="mt-4 text-[14px] text-[#777] underline hover:text-[#e97db1]" type="button" onClick={() => onRemove(product.id)}>Remove from favorites</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function App() {
  const location = useLocation();
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lily-lane-cart') || '[]');
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lily-lane-favorites') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lily-lane-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lily-lane-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (location.hash) {
      const targetId = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) => item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item);
      }
      return [...current, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const addToFavorites = (product) => {
    setFavorites((current) => current.some((item) => item.id === product.id)
      ? current
      : [...current, product]);
  };

  const removeFromFavorites = (productId) => {
    setFavorites((current) => current.filter((item) => item.id !== productId));
  };

  const setQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((current) => current.map((item) => item.product.id === productId
      ? { ...item, quantity }
      : item));
  };

  const cartCount = cart.length;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-[Verdana, Geneva, Tahoma, sans-serif] capitalize text-[#333]">
      <Header cartCount={cartCount} favoriteCount={favorites.length} />
      <Routes>
        <Route path="/" element={<ShopPage onAddToCart={addToCart} onAddToFavorites={addToFavorites} favorites={favorites} />} />
        <Route path="/cart" element={<CartPage cart={cart} onRemove={removeFromCart} onSetQuantity={setQuantity} onClearCart={clearCart} />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} onRemove={removeFromFavorites} />} />
        <Route path="*" element={<ShopPage onAddToCart={addToCart} onAddToFavorites={addToFavorites} favorites={favorites} />} />
      </Routes>
    </div>
  );
}

export default App;
