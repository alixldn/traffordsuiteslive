import { useEffect, useState } from "react";
import {
  Wifi,
  Car,
  ChefHat,
  Tv,
  ShieldCheck,
  Sparkles,
  Users,
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  Train,
  Trophy,
  Building2,
  Phone,
  Mail,
  Menu,
  X,
  CalendarIcon,
  XCircle,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  Coffee,
  ShoppingBag,
} from "lucide-react";
import { format } from "date-fns";
import shoppingImg from "/public/shopping.jpg";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero-suite.jpg";
import suite1 from "@/assets/suite-1.jpg";
import suite2 from "@/assets/suite-2.jpg";
import suite3 from "@/assets/suite-3.jpg";
import { properties, shuffleProperties, buildBookingUrl, type Property } from "@/config/properties";

export default function App() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <Hero />
      <Suites />
      <AmenitiesBar />
      <Gallery />
      <Location />
      <HotelQuality />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = el.dataset.delay;
            if (delay) el.style.animationDelay = `${delay}ms`;
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function WhatsAppIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.89c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.883 11.883 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#", label: "HOME" },
    { href: "#gallery", label: "GALLERY" },
    { href: "#suites", label: "SUITES" },
    { href: "#location", label: "LOCATION" },
    { href: "#about", label: "ABOUT" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-colors duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <a href="#" className={scrolled ? "text-black" : "text-white"}>
          <div className="font-display text-lg leading-tight font-semibold tracking-wide">
            The Trafford Suites
          </div>
          <div
            className={`text-[10px] tracking-[0.25em] ${
              scrolled ? "text-secondary opacity-100" : "opacity-80"
            }`}
          >
            APARTMENTS BY HVL
          </div>
        </a>
        <nav
          className={`hidden md:flex items-center gap-8 text-xs tracking-[0.2em] ${
            scrolled ? "text-sage-dark" : "text-white/90"
          }`}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-secondary transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="#suites"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-md text-xs tracking-[0.2em] font-medium transition"
          >
            BOOK NOW
          </a>
        </nav>
        <button
          className={`md:hidden p-2 ${scrolled ? "text-black" : "text-white"}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-sage-dark/95 backdrop-blur px-6 py-4 flex flex-col gap-4 text-white text-sm tracking-[0.2em]">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#suites"
            onClick={() => setOpen(false)}
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md w-fit"
          >
            BOOK NOW
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Premium Manchester hotel suite"
        className="absolute inset-0 w-full h-full object-cover animate-hero-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-white/90 text-xs tracking-[0.35em] mb-5 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>TRAFFORD APARTMENTS</p>
        <h1 className="font-display text-white text-4xl md:text-6xl lg:text-7xl leading-tight max-w-4xl animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
          Steps from the Action,
          <br />
          <span className="italic text-secondary">Miles from the Ordinary.</span>
        </h1>
        <p className="mt-6 text-white/85 max-w-xl text-sm md:text-base animate-fade-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
          Premium stays in Manchester for sports, business, and leisure. Minutes from Old Trafford
          Football & Cricket stadiums.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}>
          <a
            href="#suites"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-7 py-3 rounded-md text-xs tracking-[0.25em] font-semibold transition hover:scale-105 transform"
          >
            VIEW OUR SUITES
          </a>
          <a
            href="#location"
            className="border border-white/80 text-white hover:bg-white/10 px-7 py-3 rounded-md text-xs tracking-[0.25em] font-semibold transition hover:scale-105 transform"
          >
            EXPLORE LOCATION
          </a>
        </div>
      </div>
    </section>
  );
}

function Suites() {
  const [items, setItems] = useState<Property[]>(properties);

  useEffect(() => {
    setItems(shuffleProperties());
  }, []);

  return (
    <section id="suites" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14 reveal">
          <p className="text-secondary text-xs tracking-[0.3em] mb-3">THE TRAFFORD COLLECTION</p>
          <h2 className="font-display text-4xl md:text-5xl text-sage-dark mb-4">
            Three Exceptional Suites
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each apartment is individually designed, hotel-standard clean, and fully equipped for
            the perfect Manchester stay.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-7">
          {items.map((p, i) => (
            <div key={p.id} className="reveal" data-delay={i * 120}>
              <SuiteCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuiteCard({ p }: { p: Property }) {
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [nights, setNights] = useState<number>(1);

  const checkInStr = checkIn ? format(checkIn, "yyyy-MM-dd") : undefined;
  const href = buildBookingUrl(p.wId, p.wTkn, {
    checkIn: checkInStr,
    nights: checkInStr ? nights : undefined,
  });

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-border flex flex-col">
      <div className="relative h-56">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 text-white">
          <h3 className="font-display text-xl">{p.name}</h3>
          <p className="text-xs opacity-90 mt-1">
            {p.apt} · {p.tagline}
          </p>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Users size={14} /> {p.guests}</span>
          <span className="flex items-center gap-1"><BedDouble size={14} /> {p.beds}</span>
          <span className="flex items-center gap-1"><Bath size={14} /> {p.baths}</span>
          <span className="flex items-center gap-1"><Maximize2 size={14} /> {p.size}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {p.features.map((f) => (
            <span
              key={f}
              className="text-[10px] bg-sky-soft text-sage-dark px-2 py-1 rounded"
            >
              {f}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] tracking-[0.2em] text-muted-foreground">CHECK-IN</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "h-9 px-3 rounded-md border border-border bg-white text-left text-xs flex items-center gap-2 hover:border-secondary transition",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon size={14} className="text-secondary" />
                  {checkIn ? format(checkIn, "d MMM yyyy") : "Pick a date"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] tracking-[0.2em] text-muted-foreground">NIGHTS</label>
            <select
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="h-9 px-2 rounded-md border border-border bg-white text-xs hover:border-secondary transition focus:outline-none focus:ring-1 focus:ring-secondary"
            >
              {Array.from({ length: 60 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "night" : "nights"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!checkIn}
          onClick={(e) => {
            if (!checkIn) e.preventDefault();
          }}
          className={cn(
            "mt-auto block text-center py-3 rounded-md text-xs tracking-[0.25em] font-semibold transition",
            checkIn
              ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              : "bg-secondary/40 text-secondary-foreground cursor-not-allowed"
          )}
        >
          BOOK NOW
        </a>
      </div>
    </div>
  );
}

function AmenitiesBar() {
  const items = [
    { Icon: Wifi, label: "FAST WIFI" },
    { Icon: Car, label: "FREE PARKING" },
    { Icon: ChefHat, label: "FULL KITCHEN" },
    { Icon: Tv, label: "SMART TV" },
    { Icon: ShieldCheck, label: "SECURE ENTRY" },
    { Icon: Sparkles, label: "HOTEL-STANDARD CLEAN" },
    { Icon: Sparkles, label: "ROOF LOUNGE" },
    { Icon: Building2, label: "COMMUNAL LOBBY AREA" },
  ];

  return (
    <section className="bg-sage py-8">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 text-white">
        {items.map(({ Icon, label }, i) => (
          <div key={label} className="reveal flex flex-col items-center gap-2 text-center hover:scale-110 transition-transform duration-300" data-delay={i * 80}>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Icon size={22} className="text-secondary" />
            </div>
            <span className="text-[10px] tracking-[0.2em]">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const imgs = Array.from({ length: 9 }, (_, i) => `/gallery${i + 1}.jpg`);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % imgs.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + imgs.length) % imgs.length);
  };

  return (
    <section id="gallery" className="py-24 bg-sage-soft">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12 reveal">
          <p className="text-secondary text-xs tracking-[0.3em] mb-3">INSIDE THE SUITES</p>
          <h2 className="font-display text-4xl md:text-5xl text-sage-dark">Designed for Comfort</h2>
        </div>

        {/* Masonry-style responsive grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {imgs.map((src, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-md overflow-hidden reveal cursor-pointer group relative"
              data-delay={i * 100}
              onClick={() => openLightbox(i)}
            >
              <img
                src={src}
                alt={`Suite ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize2 className="text-white w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
          >
            <XCircle className="w-10 h-10" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          <div
            className="max-w-5xl max-h-[90vh] w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imgs[currentImage]}
              alt={`Suite ${currentImage + 1}`}
              className="max-h-[85vh] mx-auto object-contain rounded-lg shadow-2xl"
            />
            <div className="text-center text-white/70 mt-4 text-sm">
              {currentImage + 1} / {imgs.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Location() {
  const spots = [
    { Icon: Trophy, name: "Old Trafford Stadium", detail: "5 min walk" },
    { Icon: Trophy, name: "Emirates Cricket Ground", detail: "10 min walk" },
    { Icon: Train, name: "Metrolink Tram Stop", detail: "3 min walk" },
    { Icon: Building2, name: "Manchester City Centre", detail: "15 min by tram" },
  ];

  const foodOptions = [
    { Icon: UtensilsCrossed, name: "Nando's", detail: "Just downstairs" },
    { Icon: ShoppingBag, name: "M&S Food Hall", detail: "Ground floor" },
    { Icon: Coffee, name: "Costa Coffee", detail: "Ground floor" },
  ];

  return (
    <section id="location" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12 reveal">
          <p className="text-secondary text-xs tracking-[0.3em] mb-3">PRIME POSITION</p>
          <h2 className="font-display text-4xl md:text-5xl text-sage-dark mb-4">The Location</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nestled in the heart of Trafford, our suites place you minutes from Manchester's iconic
            sporting venues and just a short tram ride from the vibrant city centre.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden border border-border min-h-[360px] reveal">
            <iframe
              title="The Trafford Suites location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2375.438183424177!2d-2.285816923483693!3d53.46067746654854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487ba395562d93e1%3A0xc31911910609361a!2sBotanical%20Ave%2C%20Stretford%2C%20Manchester!5e0!3m2!1sen!2suk!4v1716380000000!5m2!1sen!2suk"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col gap-3">
            {spots.map(({ Icon, name, detail }, i) => (
              <div
                key={name}
                className="flex items-center gap-4 bg-sage-soft rounded-md p-4 border border-border reveal"
                data-delay={i * 100}
              >
                <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-secondary">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-medium text-sage-dark">{name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin size={11} /> {detail}
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-sage text-white rounded-md p-5 mt-2 reveal hover:scale-[1.02] transition-transform duration-300">
              <p className="font-semibold">"The perfect base for match day"</p>
              <p className="text-sm opacity-90 mt-1">
                Walk to Old Trafford in under 5 minutes. No taxis, no stress — just step out and
                you're there.
              </p>
            </div>
          </div>
        </div>

        {/* Food & Shopping Options */}
        <div className="mt-24 pt-16 border-t border-border reveal">
          <div className="text-center mb-12">
            <p className="text-secondary text-xs tracking-[0.3em] mb-4">JUST DOWNSTAIRS</p>
            <h3 className="font-display text-2xl md:text-3xl text-sage-dark mb-4">
              Dining & Shopping at Your Doorstep
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Located within White City Retail Park, you have instant access to popular food spots right downstairs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-lg overflow-hidden border border-border min-h-[320px]">
              <img
                src={shoppingImg}
                alt="White City Shopping Retail Park"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              {foodOptions.map(({ Icon, name, detail }, i) => (
                <div
                  key={name}
                  className="flex items-center gap-4 bg-sage-soft rounded-md p-5 border border-border reveal"
                  data-delay={i * 100}
                >
                  <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center text-secondary">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-sage-dark text-lg">{name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin size={12} /> {detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HotelQuality() {
  const features = [
    { Icon: Sparkles, title: "Hotel-Standard Cleaning", text: "Every suite is deep cleaned and inspected to five-star hotel standards before each guest arrival." },
    { Icon: ShieldCheck, title: "Professional Management", text: "Backed by a team managing 16+ hotels across the UK with 7 years of hospitality excellence." },
    { Icon: Phone, title: "Dedicated Support", text: "24/7 guest support for check-in assistance, local recommendations, and anything you need." },
    { Icon: Tv, title: "Premium Amenities", text: "Complimentary toiletries, high-speed internet, smart TVs, and fully equipped kitchens in every suite." },
  ];

  return (
    <section id="about" className="py-24 bg-sage-soft">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12">
        <div className="reveal">
          <p className="text-secondary text-xs tracking-[0.3em] mb-3">MANAGED WITH EXCELLENCE</p>
          <h2 className="font-display text-4xl md:text-5xl text-sage-dark mb-6">
            Hotel Quality,
            <br />
            <span className="italic">Apartment Freedom</span>
          </h2>
          <p className="text-muted-foreground mb-4">
            The Trafford Suites are professionally managed by{" "}
            <span className="text-secondary font-semibold">Hotel Ventures</span>, a dynamic
            hospitality management company with a portfolio of 16+ hotels across the UK. We bring
            the rigour of hotel operations — cleaning protocols, guest support, and quality
            standards — to the comfort and space of a private apartment.
          </p>
          <p className="text-muted-foreground">
            Every detail is managed so you can focus on enjoying Manchester. Whether you're here
            for the match, a conference, or a city break, you'll feel the difference that
            professional hospitality makes.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map(({ Icon, title, text }, i) => (
            <div
              key={title}
              className="bg-white p-5 rounded-md border border-border reveal"
              data-delay={i * 100}
            >
              <div className="w-9 h-9 rounded-md bg-sky-soft text-secondary flex items-center justify-center mb-3">
                <Icon size={18} />
              </div>
              <h3 className="font-semibold text-sage-dark mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-sage text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="reveal">
          <div className="font-display text-xl">The Trafford Suites</div>
          <div className="text-[10px] tracking-[0.25em] opacity-80 mb-4">APARTMENTS BY HVL</div>
          <p className="text-sm opacity-85">
            Premium furnished apartments at Trafford Gardens, Manchester. Steps from Old Trafford,
            miles from ordinary.
          </p>
        </div>
        <div className="reveal" data-delay={100}>
          <div className="text-xs tracking-[0.25em] mb-4 opacity-80">QUICK LINKS</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#suites" className="hover:text-secondary transition-colors">Our Suites</a></li>
            <li><a href="#location" className="hover:text-secondary transition-colors">Location</a></li>
            <li><a href="#about" className="hover:text-secondary transition-colors">About Us</a></li>
          </ul>
        </div>
        <div className="reveal" data-delay={200}>
          <div className="text-xs tracking-[0.25em] mb-4 opacity-80">CONTACT</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={14} className="mt-1 flex-shrink-0" />
              <span>Trafford Gardens, Old Trafford, Manchester</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="flex-shrink-0" />
              <a
                href="mailto:apartments@hotelventuresltd.com?subject=Web Enquiry!"
                className="hover:text-secondary transition-colors"
              >
                apartments@hotelventuresltd.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <a
                href="https://wa.me/447450472985"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-secondary transition-colors"
              >
                <WhatsAppIcon size={14} className="flex-shrink-0" />
                <span>+44 7450 472985</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="reveal" data-delay={300}>
          <div className="text-xs tracking-[0.25em] mb-4 opacity-80">MANAGEMENT</div>
          <p className="text-sm opacity-85 mb-3">
            Part of the Hotel Ventures Ltd portfolio. Professional hospitality management across
            16+ UK properties.
          </p>
          <a href="https://hotelventuresltd.com" target="_blank" rel="noopener noreferrer" className="text-secondary text-sm hover:underline transition-colors">Visit Hotel Ventures Ltd →</a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs opacity-70">
        © 2026 The Trafford Suites. All rights reserved.
      </div>
    </footer>
  );
}

function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/447450472985?text=Hi%20there%21%20I%27m%20inquiring%20about%20a%20stay%20at%20The%20Trafford%20Suites"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg whatsapp-float transition-transform duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <WhatsAppIcon size={28} className="text-white" />
    </a>
  );
}
