import { useState } from 'react';

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
  { name: 'Jellyfish Keychain', image: asset('lily.jpeg'), price: 'Rs. 300', oldPrice: 'Rs. 500' },
  { name: 'Buttercup Top', image: asset('Puff Sleeve'), price: 'Rs. 900', oldPrice: 'Rs. 1,200' },
  { name: 'Cherry Fall', image: asset('red clip.jpeg'), price: 'Rs. 200', oldPrice: 'Rs. 400' },
];

const sectionClass = 'px-[9%] py-5 max-[991px]:px-5';
const buttonClass = 'mt-2.5 inline-block cursor-pointer rounded-full bg-[#333] px-[35px] py-[9px] text-[17px] text-white transition-colors hover:bg-[#e97db1]';

function Header() {
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
      <a className="mr-auto whitespace-nowrap text-[30px] font-bold text-[#333] max-[768px]:ml-2.5 max-[768px]:text-[25px] max-[450px]:text-[20px]" href="#home" onClick={closeMenu}>
        ♡LILY LANE♡
      </a>
      <nav
        className={`flex items-center max-[768px]:absolute max-[768px]:inset-x-0 max-[768px]:top-full max-[768px]:block max-[768px]:overflow-hidden max-[768px]:border-t max-[768px]:border-solid max-[768px]:border-black/10 max-[768px]:bg-[#eee] max-[768px]:transition-[max-height,opacity] max-[768px]:duration-300 ${menuOpen ? 'max-[768px]:visible max-[768px]:max-h-[300px] max-[768px]:opacity-100 max-[768px]:pointer-events-auto' : 'max-[768px]:invisible max-[768px]:max-h-0 max-[768px]:opacity-0 max-[768px]:pointer-events-none'}`}
        aria-label="Main navigation"
      >
        <a className="px-[15px] text-[20px] text-[#666] hover:text-[#e97db1] max-[768px]:m-[15px] max-[768px]:block max-[768px]:border max-[768px]:border-solid max-[768px]:border-black/10 max-[768px]:bg-white max-[768px]:p-[15px]" href="#home" onClick={closeMenu}>Home</a>
        <a className="px-[15px] text-[20px] text-[#666] hover:text-[#e97db1] max-[768px]:m-[15px] max-[768px]:block max-[768px]:border max-[768px]:border-solid max-[768px]:border-black/10 max-[768px]:bg-white max-[768px]:p-[15px]" href="#about" onClick={closeMenu}>About</a>
        <a className="px-[15px] text-[20px] text-[#666] hover:text-[#e97db1] max-[768px]:m-[15px] max-[768px]:block max-[768px]:border max-[768px]:border-solid max-[768px]:border-black/10 max-[768px]:bg-white max-[768px]:p-[15px]" href="#products" onClick={closeMenu}>Products</a>
      </nav>
      <div className="ml-4 flex shrink-0 items-center gap-[15px] text-[25px] text-[#333] max-[768px]:gap-2.5 max-[768px]:text-[22px] max-[450px]:ml-2 max-[450px]:gap-2 max-[450px]:text-[20px]" aria-label="Shop links">
        <a href="#products" className="hover:text-[#e97db1]" aria-label="Favorites"><i className="fas fa-heart" aria-hidden="true" /></a>
        <a href="#products" className="hover:text-[#e97db1]" aria-label="Shopping cart"><i className="fas fa-shopping-cart" aria-hidden="true" /></a>
        <a href="#contact" className="hover:text-[#e97db1]" aria-label="Contact"><i className="fas fa-user" aria-hidden="true" /></a>
      </div>
    </header>
  );
}

function ProductCard({ product }) {
  return (
    <article className="group relative min-w-0 flex-[1_1_300px] overflow-hidden rounded-[5px] border border-solid border-black/10 shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
      <div className="relative overflow-hidden pt-5 text-center">
        <img className="h-[250px] w-full object-contain transition-transform duration-200 group-hover:scale-[1.05]" src={product.image} alt={product.name} loading="lazy" />
        <div className="absolute inset-x-0 bottom-[-70px] flex transition-[bottom] duration-200 group-hover:bottom-0 group-focus-within:bottom-0">
          <a href="#" className="flex h-[50px] w-1/4 items-center justify-center bg-[#e97db1] text-[20px] text-white hover:bg-[#333]" aria-label={`Favorite ${product.name}`}><i className="fas fa-heart" aria-hidden="true" /></a>
          <a href="#contact" className="flex h-[50px] w-1/2 items-center justify-center border-x border-solid border-white/45 bg-[#e97db1] text-[16px] text-white hover:bg-[#333]">Add to cart</a>
          <a href="#" className="flex h-[50px] w-1/4 items-center justify-center bg-[#e97db1] text-[20px] text-white hover:bg-[#333]" aria-label={`Share ${product.name}`}><i className="fas fa-share" aria-hidden="true" /></a>
        </div>
      </div>
      <div className="p-5 text-center">
        <h3 className="text-[25px] text-[#333]">{product.name}</h3>
        <div className="pt-2.5 text-[25px] font-bold text-[#e97db1]">
          {product.price} <span className="text-[15px] font-normal text-[#999] line-through">{product.oldPrice}</span>
        </div>
      </div>
    </article>
  );
}

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-[Verdana, Geneva, Tahoma, sans-serif] capitalize text-[#333]">
      <Header />

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
            {products.map((product) => <ProductCard key={product.name} product={product} />)}
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
    </div>
  );
}

export default App;
