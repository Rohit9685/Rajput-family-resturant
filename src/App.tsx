import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Utensils, 
  Beer, 
  MessageCircle, 
  ChevronRight, 
  Menu as MenuIcon, 
  X,
  ArrowRight,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
const PHONE_NUMBER = "09826566183";
const WHATSAPP_NUMBER = "919826566183";
const ADDRESS = "Agra Bombay Road, Near Toll Naka, Indore";
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=Rajput+Dhaba+Indore+Agra+Bombay+Road`;

const MENU_CATEGORIES = [
  {
    id: 'main',
    name: 'Main Course',
    items: [
      { name: 'Dal Bafla Thali', price: '₹250', description: 'Our signature Indore special thali with pure desi ghee.', popular: true, mustTry: true, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop' },
      { name: 'Paneer Maharani', price: '₹280', description: 'Rich creamy gravy with royal spices and soft paneer.', popular: true, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop' },
      { name: 'Kaju Masala', price: '₹320', description: 'Roasted cashews in a spicy, tangy tomato-based gravy.', image: 'https://images.unsplash.com/photo-1601050690597-df056fb01793?q=80&w=800&auto=format&fit=crop' },
      { name: 'Chana Masala', price: '₹180', description: 'Classic dhaba style spicy chickpeas.', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  {
    id: 'special',
    name: 'Specials',
    items: [
      { name: 'Shev Bhaji', price: '₹160', description: 'Spicy Khandeshi style curry topped with crispy sev.', popular: true, image: 'https://images.unsplash.com/photo-1626132646529-500637532537?q=80&w=800&auto=format&fit=crop' },
      { name: 'Paneer Patiala', price: '₹300', description: 'Paneer stuffed in papad rolls, served in rich gravy.', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  {
    id: 'breads',
    name: 'Breads',
    items: [
      { name: 'Tandoori Roti', price: '₹15', description: 'Crispy whole wheat bread baked in clay oven.', image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop' },
      { name: 'Butter Naan', price: '₹50', description: 'Soft leavened bread with a generous brush of butter.', popular: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39bb050ac5?q=80&w=800&auto=format&fit=crop' },
    ]
  }
];

const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop', title: 'Authentic Thali' },
  { url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop', title: 'Night Vibe' },
  { url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop', title: 'Seating Area' },
  { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop', title: 'Group Dining' },
  { url: 'https://images.unsplash.com/photo-1626132646529-500637532537?q=80&w=800&auto=format&fit=crop', title: 'Spicy Delights' },
  { url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop', title: 'Royal Paneer' },
];

const REVIEWS = [
  { text: "Pocket friendly and great taste. The Dal Bafla is a must try!!", author: "Rahul Sharma", rating: 5, date: "2 days ago" },
  { text: "Best place for veg food & drinks on the highway. Open late night!", author: "Amit Verma", rating: 4, date: "1 week ago" },
  { text: "Good service and large portions. Perfect for family outings.", author: "Priya Singh", rating: 5, date: "3 weeks ago" },
];

// --- Components ---

const SafeImage = ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [error, setError] = useState(false);
  const fallbackSrc = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop";

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white py-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1a1a1a]">Rajput Dhaba</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Menu', 'Gallery', 'Reviews', 'Location'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-[#1a1a1a] text-sm font-medium transition-colors duration-300 hover:text-[#d4a373]"
            >
              {item}
            </a>
          ))}
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`tel:${PHONE_NUMBER}`}
            className="bg-[#3e2723] text-white px-[18px] py-[10px] rounded-[8px] text-sm font-medium transition-all duration-300 hover:bg-[#2b1a12] shadow-sm"
          >
            Call Now
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#1a1a1a]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Home', 'Menu', 'Gallery', 'Reviews', 'Location'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-lg font-medium text-[#1a1a1a] py-2 border-b border-gray-50 hover:text-[#d4a373] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a 
                href={`tel:${PHONE_NUMBER}`}
                className="bg-[#3e2723] text-white w-full mt-4 py-3 rounded-[8px] text-center font-medium hover:bg-[#2b1a12] transition-colors"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center py-12 md:py-20 overflow-hidden bg-dhaba-cream">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl mb-6 leading-tight text-dhaba-dark">
            Authentic Taste of <br />
            <span className="text-dhaba-gold italic">Rajput Dhaba</span> in Indore
          </h1>
          <p className="text-lg md:text-xl text-dhaba-grey mb-10 max-w-lg font-sans">
            Pocket-friendly meals, loved by 5000+ customers, open till 3 AM. Experience the true flavors of the highway.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#menu" className="btn-premium">
              View Menu <ArrowRight size={18} />
            </a>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="btn-premium-outline">
              <MapPin size={18} /> Get Directions
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <SafeImage 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop" 
              alt="Rajput Dhaba Experience" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-dhaba-gold/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-dhaba-brown/10 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </div>
      
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dhaba-cream via-white to-dhaba-cream opacity-50 pointer-events-none"></div>
    </section>
  );
};

const TrustBar = () => {
  const items = [
    { icon: <Star className="text-dhaba-gold" size={20} />, label: "4.0 Rating", sub: "5800+ reviews" },
    { icon: <Utensils className="text-dhaba-gold" size={20} />, label: "₹200–400", sub: "Price per person" },
    { icon: <Clock className="text-dhaba-gold" size={20} />, label: "Open till 3 AM", sub: "Late night dining" },
    { icon: <Beer className="text-dhaba-gold" size={20} />, label: "BYOB Available", sub: "Friendly atmosphere" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 border border-black/5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-dhaba-cream flex items-center justify-center flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="font-bold text-dhaba-dark">{item.label}</p>
              <p className="text-xs text-dhaba-grey">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);

  return (
    <section id="menu" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Our <span className="text-dhaba-gold italic">Delicious</span> Menu</h2>
          <p className="text-dhaba-grey max-w-xl mx-auto font-sans">Handcrafted recipes served with love and tradition.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {MENU_CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-full font-medium transition-all whitespace-nowrap ${activeCategory === cat.id ? 'bg-dhaba-brown text-white shadow-lg' : 'bg-dhaba-cream text-dhaba-grey hover:bg-gray-100'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENU_CATEGORIES.find(c => c.id === activeCategory)?.items.map((item, i) => (
            <motion.div 
              key={item.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="premium-card overflow-hidden group"
            >
              <div className="h-[200px] overflow-hidden relative">
                <SafeImage 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {(item.popular || item.mustTry) && (
                  <div className="absolute top-4 left-4 flex gap-2">
                    {item.popular && <span className="bg-dhaba-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Popular</span>}
                    {item.mustTry && <span className="bg-dhaba-brown text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Must Try</span>}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-dhaba-dark">{item.name}</h4>
                  <span className="text-dhaba-gold font-bold">{item.price}</span>
                </div>
                <p className="text-dhaba-grey text-sm mb-6 font-sans leading-relaxed">{item.description}</p>
                <button className="w-full py-3 rounded-lg border border-dhaba-brown text-dhaba-brown font-semibold hover:bg-dhaba-brown hover:text-white transition-all text-sm">
                  Add to Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SpecialSection = () => {
  const special = MENU_CATEGORIES[0].items[0]; // Dal Bafla Thali

  return (
    <section className="section-padding bg-dhaba-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[24px] overflow-hidden shadow-2xl border border-dhaba-gold/20 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 h-[400px] lg:h-[600px] relative">
            <SafeImage 
              src={special.image} 
              alt="Dal Bafla Thali" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          </div>
          <div className="lg:w-1/2 p-10 lg:p-20">
            <span className="text-dhaba-gold font-bold tracking-widest uppercase text-xs mb-4 block">Signature Dish</span>
            <h2 className="text-4xl md:text-6xl mb-6">Dal Bafla Thali</h2>
            <p className="text-dhaba-grey text-lg mb-8 font-sans leading-relaxed">
              Experience the soul of Indore in every bite. Our signature Dal Bafla is served with pure desi ghee, spicy garlic chutney, and traditional sides. A meal that feels like home.
            </p>
            <div className="flex items-center gap-6 mb-10">
              <span className="text-3xl font-bold text-dhaba-brown">{special.price}</span>
              <div className="flex text-dhaba-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
            </div>
            <a href={`tel:${PHONE_NUMBER}`} className="btn-premium inline-flex">
              Order Now <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Glimpses of <span className="text-dhaba-gold italic">Rajput</span></h2>
          <p className="text-dhaba-grey max-w-xl mx-auto font-sans">Capturing the essence of highway dining and authentic flavors.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square rounded-xl overflow-hidden shadow-md group cursor-pointer"
            >
              <SafeImage 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-serif text-xl italic">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewSection = () => {
  return (
    <section id="reviews" className="section-padding bg-dhaba-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">What Our <span className="text-dhaba-gold italic">Guests</span> Say</h2>
          <p className="text-dhaba-grey max-w-xl mx-auto font-sans">Real stories from our beloved customers.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
              <div className="flex text-dhaba-gold mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-dhaba-dark italic mb-8 font-sans leading-relaxed">"{review.text}"</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-dhaba-dark">{review.author}</p>
                  <p className="text-xs text-dhaba-grey">{review.date}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-dhaba-cream flex items-center justify-center text-dhaba-brown font-bold">
                  {review.author[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationSection = () => {
  return (
    <section id="location" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl mb-8">Find Us on the <br /><span className="text-dhaba-gold italic">Highway</span></h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-xl bg-dhaba-cream flex items-center justify-center text-dhaba-brown flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Address</h4>
                  <p className="text-dhaba-grey font-sans leading-relaxed">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-xl bg-dhaba-cream flex items-center justify-center text-dhaba-brown flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Timings</h4>
                  <p className="text-dhaba-grey font-sans leading-relaxed">Open Daily: 11:00 AM – 03:00 AM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={MAP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-premium"
              >
                <Navigation size={20} /> Get Directions
              </a>
              <a 
                href={`tel:${PHONE_NUMBER}`}
                className="btn-premium-outline"
              >
                <Phone size={20} /> Call Now
              </a>
            </div>
          </div>

          <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-black/5">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.123456789!2d75.8577!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd123456789%3A0x1234567890abcdef!2sRajput%20Dhaba!5e0!3m2!1sen!2sin!4v1621234567890!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer 
      className="py-20 px-5 text-white" 
      style={{ background: 'linear-gradient(135deg, #2b1a12, #3e2723)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {/* Brand Section */}
          <div>
            <h3 className="text-3xl font-serif font-bold mb-4 text-white">Rajput Dhaba</h3>
            <p className="text-[#d6d6d6] max-w-sm font-sans leading-relaxed">
              “Authentic North Indian Taste on the Highway”
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-white">Quick Links</h4>
            <ul className="space-y-4 font-sans text-sm">
              {['Home', 'Menu', 'Gallery', 'Location'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-[#f1e0c5] transition-all duration-300 hover:text-[#d4a373] hover:translate-x-[5px] inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-white">Contact</h4>
            <ul className="space-y-6 font-sans text-sm text-[#d6d6d6]">
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-[#f1e0c5]" /> 
                <span>{PHONE_NUMBER}</span>
              </li>
              <li className="flex items-center gap-4">
                <MessageCircle size={18} className="text-[#f1e0c5]" /> 
                <span>WhatsApp Support</span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-[#f1e0c5] mt-1" /> 
                <span className="leading-relaxed">{ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#d6d6d6] text-sm font-sans">
            &copy; 2026 Rajput Dhaba
          </p>
          <div className="flex gap-4">
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`} 
              className="bg-white/10 p-[10px] rounded-full text-[#f1e0c5] transition-all duration-300 hover:scale-110 hover:text-white"
            >
              <MessageCircle size={20} />
            </a>
            <a 
              href={`tel:${PHONE_NUMBER}`} 
              className="bg-white/10 p-[10px] rounded-full text-[#f1e0c5] transition-all duration-300 hover:scale-110 hover:text-white"
            >
              <Phone size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const StickyCTA = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      <motion.a 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I want to inquire about Rajput Dhaba Indore.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl"
      >
        <MessageCircle size={28} />
      </motion.a>
      <motion.a 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`tel:${PHONE_NUMBER}`}
        className="w-14 h-14 bg-dhaba-brown text-white rounded-full flex items-center justify-center shadow-2xl"
      >
        <Phone size={24} />
      </motion.a>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-dhaba-gold selection:text-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <MenuSection />
      <SpecialSection />
      <GallerySection />
      <ReviewSection />
      <LocationSection />
      <Footer />
      <StickyCTA />
    </div>
  );
}
