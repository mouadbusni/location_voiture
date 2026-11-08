
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Clock, 
  Shield, 
  User, 
  Settings,
  Star,
  Phone,
  MessageCircle,
  Fuel,
  Zap,
  Gauge,
  ArrowLeft,
  ArrowRight,
  Info,
  CheckCircle,
  Award,
  Globe,
  Compass,
  Cpu,
  Activity,
  Play,
  Send
} from 'lucide-react';
import { FLEET, MOROCCAN_CITIES } from './constants';
import { Car, CarCategory, BookingDetails } from './types';
import { calculateRentalDays, buildBookingEmail, emailAddressValid } from './rental';

// Page sections
const Navbar = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 border border-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-300">
            <span className="text-xs font-cinzel text-[#D4AF37] group-hover:text-black">SV</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-cinzel tracking-widest text-[#D4AF37]">SAHARA</div>
            <div className="text-[10px] tracking-[0.4em] font-light text-white">VELOCITY</div>
          </div>
        </div>
        
        <div className="hidden md:flex gap-12 text-xs tracking-widest uppercase font-semibold">
          {['Fleet', 'Experience', 'Services', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#D4AF37] transition-colors duration-300">{item}</a>
          ))}
        </div>

        <button 
          onClick={onOpenMenu}
          className="p-2 hover:bg-white/10 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onBookingClick }: { onBookingClick: () => void }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover brightness-[0.4] scale-[1.05]"
        >
          <source src="https://videos.pexels.com/video-files/5048667/5048667-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[#D4AF37] text-sm tracking-[0.5em] uppercase mb-6"
        >
          Exclusive Rentals in the Kingdom
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="text-5xl md:text-8xl font-cinzel font-bold mb-8 leading-tight gold-glow"
        >
          THE ART OF <br /> PRESTIGE MOTION
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button 
            onClick={onBookingClick}
            className="px-10 py-5 bg-[#D4AF37] text-black text-sm font-bold tracking-widest uppercase hover:bg-white transition-all duration-300 flex items-center justify-center gap-3"
          >
            Start Your Journey <ChevronRight className="w-4 h-4" />
          </button>
          <a href="#fleet" className="px-10 py-5 border border-white/30 text-white text-sm font-bold tracking-widest uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 flex items-center justify-center">
            Explore Fleet
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </div>
    </section>
  );
};

const FleetSection = ({ onCarSelect }: { onCarSelect: (car: Car) => void }) => {
  const [filter, setFilter] = useState<CarCategory | 'All'>('All');
  const [hoveredCarId, setHoveredCarId] = useState<string | null>(null);
  
  const filteredCars = useMemo(() => {
    return filter === 'All' ? FLEET : FLEET.filter(car => car.category === filter);
  }, [filter]);

  return (
    <section id="fleet" className="py-24 bg-zellige">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-[#D4AF37] text-sm tracking-widest uppercase mb-4">Curated Collection</h2>
            <h3 className="text-4xl md:text-6xl font-cinzel font-bold">THE FLEET</h3>
          </div>
          <div className="flex gap-4 flex-wrap">
            {['All', ...Object.values(CarCategory)].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-2 text-[10px] tracking-widest uppercase border transition-all duration-300 ${filter === cat ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-white/20 text-white/60 hover:border-white hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, idx) => (
            <motion.div
              layoutId={`card-${car.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={car.id}
              onClick={() => onCarSelect(car)}
              onMouseEnter={() => setHoveredCarId(car.id)}
              onMouseLeave={() => setHoveredCarId(null)}
              className="group cursor-pointer bg-black/40 border border-white/5 relative overflow-hidden h-[500px]"
            >
              <motion.div 
                layoutId={`image-${car.id}`}
                className="absolute inset-0 transition-all duration-700"
              >
                <AnimatePresence mode="wait">
                  {hoveredCarId === car.id && car.videoUrl ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 z-0"
                    >
                      <video
                        src={car.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        style={{ pointerEvents: 'none' }}
                      />
                    </motion.div>
                  ) : (
                    <motion.img
                      key="image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                    />
                  )}
                </AnimatePresence>

                {car.videoUrl && (
                  <div className="absolute top-6 right-6 z-30 opacity-60 group-hover:opacity-100 transition-opacity">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-2 rounded-full border border-[#D4AF37] bg-black/40 backdrop-blur-sm"
                    >
                      <Play className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    </motion.div>
                  </div>
                )}

                <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                  <div className="absolute bottom-[20%] left-[15%] w-24 h-24 rounded-full border-[10px] border-white/5 blur-sm animate-[spin_0.3s_linear_infinite]" />
                  <div className="absolute bottom-[20%] right-[15%] w-24 h-24 rounded-full border-[10px] border-white/5 blur-sm animate-[spin_0.3s_linear_infinite]" />
                </div>

                <div className="absolute top-[40%] left-[20%] w-32 h-32 bg-[#D4AF37]/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-150 z-20 pointer-events-none" />
                <div className="absolute top-[40%] right-[20%] w-32 h-32 bg-[#D4AF37]/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-150 z-20 pointer-events-none" />
                
                <div className="absolute top-[45%] left-[25%] w-2 h-2 bg-white rounded-full shadow-[0_0_40px_10px_white] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none" />
                <div className="absolute top-[45%] right-[25%] w-2 h-2 bg-white rounded-full shadow-[0_0_40px_10px_white] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none" />
              </motion.div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-4 z-20">
                <motion.div layoutId={`info-${car.id}`} className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-1">{car.brand}</p>
                    <h4 className="text-2xl font-cinzel font-bold">{car.name}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/50 tracking-widest uppercase">From</p>
                    <p className="text-xl font-bold text-[#D4AF37]">{car.pricePerDay} MAD<span className="text-xs text-white/50 font-normal">/day</span></p>
                  </div>
                </motion.div>
                
                <div className="flex gap-6 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/70">
                    <Gauge className="w-4 h-4 text-[#D4AF37]" /> {car.specs.acceleration}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/70">
                    <Fuel className="w-4 h-4 text-[#D4AF37]" /> {car.fuel}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/70">
                    <Zap className="w-4 h-4 text-[#D4AF37]" /> {car.specs.hp} HP
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CarDetailView = ({ car, onBack, onBook }: { car: Car; onBack: () => void; onBook: () => void; key?: string }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-[#121212] overflow-y-auto"
    >
      <div className="relative min-h-screen">
        <div className="h-[60vh] md:h-[80vh] relative overflow-hidden">
          <motion.div layoutId={`image-${car.id}`} className="w-full h-full">
            {car.videoUrl ? (
               <video
                 src={car.videoUrl}
                 autoPlay
                 muted
                 loop
                 playsInline
                 className="w-full h-full object-cover"
               />
            ) : (
              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#121212]" />
          
          <button 
            onClick={onBack}
            className="absolute top-12 left-6 md:left-12 flex items-center gap-4 text-white/70 hover:text-[#D4AF37] transition-all uppercase text-[10px] tracking-[0.3em] font-bold z-10"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Fleet
          </button>
        </div>

        <div className="container mx-auto px-6 -mt-32 relative z-10 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div layoutId={`info-${car.id}`} className="mb-12">
                <p className="text-[#D4AF37] text-sm font-bold tracking-[0.5em] uppercase mb-4">{car.brand}</p>
                <h1 className="text-5xl md:text-7xl font-cinzel font-bold mb-6">{car.name}</h1>
                <div className="flex items-center gap-8 border-y border-white/10 py-8">
                  <div>
                    <p className="text-[10px] text-white/50 tracking-widest uppercase mb-1">Daily Rate</p>
                    <p className="text-4xl font-cinzel font-bold text-[#D4AF37]">{car.pricePerDay} MAD</p>
                  </div>
                  <div className="w-[1px] h-12 bg-white/10" />
                  <div className="flex gap-4">
                    <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] tracking-widest border border-[#D4AF37]/20 uppercase">{car.category}</span>
                    <span className="px-3 py-1 bg-white/5 text-white/60 text-[10px] tracking-widest border border-white/10 uppercase">{car.transmission}</span>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-8 mb-12">
                <p className="text-xl text-white/60 leading-relaxed font-light italic">
                  "{car.description}"
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: Zap, label: 'Power', value: `${car.specs.hp} HP` },
                    { icon: Gauge, label: '0-100 KM/H', value: car.specs.acceleration },
                    { icon: Clock, label: 'Top Speed', value: car.specs.topSpeed }
                  ].map((spec, i) => (
                    <div key={i} className="p-6 bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                      <spec.icon className="w-6 h-6 text-[#D4AF37] mb-4" />
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{spec.label}</p>
                      <p className="font-bold text-lg">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={onBook}
                className="w-full py-6 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-4"
              >
                Reserve This Drive <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-12"
            >
              <div className="bg-black/40 border border-white/5 p-10 backdrop-blur-md">
                <h3 className="text-2xl font-cinzel font-bold mb-8 flex items-center gap-4">
                  <span className="w-6 h-6 text-[#D4AF37]"><Info /></span> KEY FEATURES
                </h3>
                <ul className="space-y-6">
                  {[
                    'Premium Audio System & Acoustic Glass',
                    'Advanced Driver Assistance Systems',
                    'Nappa Leather Interior with Heated Seats',
                    'GPS Navigation with Moroccan Offline Maps',
                    'Unlimited Kilometers within Morocco',
                    '24/7 Premium Roadside Assistance'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/70">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                      <span className="text-sm font-light tracking-wide">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1549414603-5188c83076c1?auto=format&fit=crop&q=80&w=400" className="w-full h-48 object-cover opacity-50 grayscale hover:grayscale-0 transition-all" alt="Interior" />
                <img src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=400" className="w-full h-48 object-cover opacity-50 grayscale hover:grayscale-0 transition-all" alt="Detail" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BookingModal = ({ car, onClose }: { car?: Car; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState<BookingDetails>({
    carId: car?.id || '',
    pickupLocation: MOROCCAN_CITIES[0],
    returnLocation: MOROCCAN_CITIES[0],
    startDate: '',
    endDate: '',
    extras: { driver: false, premiumInsurance: false, gps: false, babySeat: false }
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [guest, setGuest] = useState({ name: '', phone: '', email: '', notes: '' });
  const bookingEmail = import.meta.env.VITE_BOOKING_EMAIL?.trim() ?? '';
  const today = new Date().toLocaleDateString('en-CA');
  const rentalDays = calculateRentalDays(details.startDate, details.endDate);
  const dailyRate = useMemo(() => {
    if (!car) return 0;
    return car.pricePerDay + (details.extras.driver ? 500 : 0) + (details.extras.premiumInsurance ? 300 : 0) + (details.extras.gps ? 100 : 0);
  }, [car, details.extras]);
  const totalPrice = rentalDays ? dailyRate * rentalDays : null;
  const goToExtras = () => {
    if (!rentalDays || details.startDate < today) {
      setBookingError('Select a valid pickup date and a return date at least one day later.');
      return;
    }
    setBookingError('');
    setStep(2);
  };
  const finalizeInquiry = () => {
    if (!guest.name.trim() || !guest.phone.trim() || !emailAddressValid(guest.email)) {
      setBookingError('Enter your full name, phone number and a valid email address.');
      return;
    }
    if (!emailAddressValid(bookingEmail)) {
      setBookingError('Email enquiries are not configured yet. Please contact the rental company directly.');
      return;
    }
    setBookingError('');
    window.location.href = buildBookingEmail(bookingEmail, car, details, guest, rentalDays, totalPrice);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="relative bg-[#1a1a1a] p-16 border border-[#D4AF37]/30 text-center max-w-lg w-full"
        >
          <div className="w-24 h-24 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle className="w-12 h-12 text-[#D4AF37]" />
          </div>
          <h4 className="text-4xl font-cinzel font-bold mb-6">EMAIL DRAFT READY</h4>
          <p className="text-white/50 mb-12 font-light">Your email app should open with the rental details. Review the message and press Send. This is not a confirmed reservation.</p>
          <button 
            onClick={onClose}
            className="w-full py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-white transition-all"
          >
            Close Portal
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-y-auto"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        className="relative w-full max-w-5xl bg-[#111] border border-white/10 rounded-sm overflow-hidden flex flex-col lg:flex-row shadow-2xl"
      >
        <div className="w-full lg:w-[350px] bg-black/50 p-12 flex flex-col border-r border-white/5">
          <div className="mb-12">
            <h2 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.5em] uppercase mb-10">Review Selection</h2>
            {car ? (
              <div className="space-y-8">
                <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-sm shadow-2xl border border-white/5" />
                <div>
                   <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold mb-2">{car.brand}</p>
                   <h3 className="text-3xl font-cinzel font-bold">{car.name}</h3>
                </div>
              </div>
            ) : (
              <h3 className="text-3xl font-cinzel font-bold">Inquiry</h3>
            )}
          </div>
          
          <div className="space-y-8 flex-grow">
            <div className="flex gap-4">
               <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
               <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Pick-up Terminal</p>
                  <p className="text-sm font-bold">{details.pickupLocation}</p>
               </div>
            </div>
            {details.extras.driver && (
              <div className="flex gap-4">
                 <User className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                 <div>
                    <p className="text-sm font-bold">Chauffeur Included</p>
                 </div>
              </div>
            )}
          </div>

          <div className="pt-12 border-t border-white/10 mt-12">
            <p className="text-[10px] text-white/50 tracking-widest uppercase mb-3">{totalPrice === null ? 'Daily rate' : `Estimated total · ${rentalDays} days`}</p>
            <p className="text-4xl font-cinzel font-bold text-[#D4AF37] leading-none">{car ? (totalPrice ?? dailyRate).toLocaleString('en-US') : 'Quote'} <span className="text-[10px] font-normal text-white/50 tracking-widest">{car ? 'MAD' : ''}</span></p>
            <p className="text-xs text-white/55 mt-4">Estimate only. Final price and availability require confirmation.</p>
          </div>
        </div>

        <div className="flex-grow p-12 md:p-20">
          <div className="flex justify-between items-center mb-16">
            <div className="flex gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-[2px] w-16 transition-all duration-700 ${step >= i ? 'bg-[#D4AF37]' : 'bg-white/10'}`} />
              ))}
            </div>
            <button onClick={onClose} className="w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors border border-white/5">
              <X className="w-6 h-6" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div>
                   <h4 className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase font-black mb-12">Logistics Planning</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Arrival Terminal</label>
                        <select 
                          value={details.pickupLocation}
                          onChange={(e) => setDetails({ ...details, pickupLocation: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#D4AF37] transition-all appearance-none cursor-pointer"
                        >
                          {MOROCCAN_CITIES.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Departure Terminal</label>
                        <select 
                          value={details.returnLocation}
                          onChange={(e) => setDetails({ ...details, returnLocation: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#D4AF37] transition-all appearance-none cursor-pointer"
                        >
                          {MOROCCAN_CITIES.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                        </select>
                      </div>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Start Date</label>
                    <input type="date" aria-label="Pickup date" min={today} value={details.startDate} onChange={(e) => { setDetails({ ...details, startDate: e.target.value }); setBookingError(''); }} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#D4AF37] transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">End Date</label>
                    <input type="date" aria-label="Return date" min={details.startDate || today} value={details.endDate} onChange={(e) => { setDetails({ ...details, endDate: e.target.value }); setBookingError(''); }} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#D4AF37] transition-all" />
                  </div>
                </div>

                <button onClick={goToExtras} className="w-full py-8 bg-[#D4AF37] text-black font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-6">
                  Next: Configure Experience <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <h4 className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase font-black mb-12">Concierge Add-ons</h4>
                <div className="space-y-6">
                  {[
                    { id: 'driver', label: 'Multi-Lingual Chauffeur', price: '500 MAD/day', desc: 'Expert local drivers with VIP protocols' },
                    { id: 'premiumInsurance', label: 'Tier-1 Liability Shield', price: '300 MAD/day', desc: 'Zero-deductible premium protection package' },
                    { id: 'gps', label: 'Atlas Navigation', price: '100 MAD/day', desc: 'Precision satellite mapping for desert routes' }
                  ].map(extra => (
                    <label key={extra.id} className={`flex items-center justify-between p-8 border transition-all cursor-pointer ${details.extras[extra.id as keyof typeof details.extras] ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                      <div className="flex items-center gap-6">
                        <input 
                          type="checkbox" 
                          checked={details.extras[extra.id as keyof typeof details.extras]} 
                          onChange={() => setDetails({ 
                            ...details, 
                            extras: { ...details.extras, [extra.id]: !details.extras[extra.id as keyof typeof details.extras] } 
                          })}
                          className="w-6 h-6 accent-[#D4AF37]" 
                        />
                        <div>
                          <p className="font-bold text-lg mb-1">{extra.label}</p>
                          <p className="text-[10px] text-white/40 tracking-wider uppercase">{extra.desc}</p>
                        </div>
                      </div>
                      <span className="text-[#D4AF37] font-cinzel font-bold">{extra.price}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-6">
                  <button onClick={() => setStep(1)} className="flex-1 py-8 border border-white/10 font-bold uppercase tracking-[0.4em] hover:border-white transition-all text-white/50 hover:text-white">Back</button>
                  <button onClick={() => setStep(3)} className="flex-[2] py-8 bg-[#D4AF37] text-black font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl">Contact Protocols</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <h4 className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase font-black mb-12">Guest Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Full Identity</label>
                    <input required autoComplete="name" placeholder="Full name" value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#D4AF37] transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Secure Contact</label>
                    <input required type="tel" autoComplete="tel" placeholder="+212 ..." value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#D4AF37] transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Email for Confirmation</label>
                    <input required type="email" autoComplete="email" placeholder="you@example.com" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#D4AF37] transition-all" />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Operational Notes</label>
                    <textarea placeholder="Flight number or special requests..." rows={4} value={guest.notes} onChange={(e) => setGuest({ ...guest, notes: e.target.value })} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#D4AF37] transition-all" />
                </div>
                
                <button 
                  onClick={finalizeInquiry}
                  className="w-full py-8 bg-[#D4AF37] text-black font-black uppercase tracking-[0.5em] hover:bg-white transition-all shadow-2xl"
                >
                  Prepare Email Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          {bookingError && <p role="alert" aria-live="polite" className="mt-6 text-sm text-red-300">{bookingError}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 overflow-hidden bg-black relative">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-30 grayscale"
        >
          <source src="https://videos.pexels.com/video-files/5243160/5243160-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="h-1 w-12 bg-[#D4AF37]" />
               <p className="text-[#D4AF37] text-[10px] tracking-[0.6em] uppercase font-bold">Heritage & Motion</p>
            </div>
            <h3 className="text-4xl md:text-6xl font-cinzel font-bold mb-8 leading-none">THE KINGDOM'S JOURNEY</h3>
            <p className="text-xl text-white/70 mb-12 leading-relaxed font-light tracking-wide">
              Born from a passion for the open roads of the Maghreb, Sahara Velocity represents more than just mobility. It is a tribute to the hospitality and sheer majesty of Morocco. 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Globe, title: 'Network', value: '8 Cities' },
                { icon: Award, title: 'Excellence', value: '99% Satisfied' },
                { icon: Compass, title: 'Adventure', value: 'Tailored Tours' },
                { icon: Shield, title: 'Security', value: 'Tier 1 Insurance' }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6 p-8 border border-white/5 bg-black/40 backdrop-blur-md">
                  <stat.icon className="w-8 h-8 text-[#D4AF37]" />
                  <div>
                    <p className="text-[10px] tracking-widest text-white/30 uppercase font-bold">{stat.title}</p>
                    <p className="text-2xl font-cinzel text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative h-[600px] hidden lg:block"
          >
            <div className="absolute top-12 left-12 right-0 bottom-0 border-2 border-[#D4AF37]/20 -z-10 translate-x-12 -translate-y-12" />
            <div className="w-full h-full overflow-hidden border border-white/5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1549414603-5188c83076c1?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                alt="Moroccan High Atlas"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-16">
        <p className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase font-bold mb-4">Voices of Excellence</p>
        <h3 className="text-3xl md:text-5xl font-cinzel font-bold">TESTIMONIALS</h3>
      </div>
      
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "Marc Aubert", text: "Exceptional service from CMN airport. The G-Wagon was in mint condition. Truly royal experience." },
          { name: "Sarah Al-Fassi", text: "Renting the Range Rover for our trip to Ouarzazate was the best decision. Smooth and powerful." },
          { name: "James Wilson", text: "Highly professional. No hidden costs. Sahara Velocity is the Hertz of the elite." }
        ].map((t, i) => (
          <div key={i} className="p-10 bg-white/5 border border-white/5 flex flex-col items-center text-center">
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />)}
            </div>
            <p className="text-white/70 italic mb-8 leading-relaxed">"{t.text}"</p>
            <p className="text-white font-bold tracking-widest uppercase text-xs">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <div className="flex items-center gap-4 mb-8">
               <div className="h-1 w-12 bg-[#D4AF37]" />
               <p className="text-[#D4AF37] text-[10px] tracking-[0.6em] uppercase font-bold">Global Presence</p>
            </div>
            <h3 className="text-4xl md:text-6xl font-cinzel font-bold mb-12">THE CONCIERGE</h3>
            <div className="space-y-10">
              <a href="tel:+212522000000" className="flex items-center gap-8 group cursor-pointer">
                <div className="w-12 h-12 border border-white/5 flex items-center justify-center rounded-full group-hover:border-[#D4AF37] transition-all"><Phone className="w-5 h-5 text-[#D4AF37]" /></div>
                <p className="text-xl font-cinzel text-white group-hover:text-[#D4AF37] transition-colors">+212 522 00 00 00</p>
              </a>
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 border border-white/5 flex items-center justify-center rounded-full"><MapPin className="w-5 h-5 text-[#D4AF37]" /></div>
                <p className="text-xl font-cinzel text-white">Anfa Blvd, Casablanca</p>
              </div>
            </div>
            
            <div className="mt-16 p-10 bg-white/5 border-l-4 border-[#D4AF37]">
              <p className="text-white/60 font-light leading-relaxed italic">
                "Our team curates your Moroccan expedition with military precision and royal flair."
              </p>
            </div>
          </div>
          
          <div className="bg-[#111] p-10 border border-white/5 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <input required placeholder="Name" className="w-full bg-white/5 border-b border-white/10 py-4 outline-none focus:border-[#D4AF37] transition-all text-white" />
                    <input required type="email" placeholder="Email" className="w-full bg-white/5 border-b border-white/10 py-4 outline-none focus:border-[#D4AF37] transition-all text-white" />
                  </div>
                  <textarea required rows={4} placeholder="Your Message" className="w-full bg-white/5 border-b border-white/10 py-4 outline-none focus:border-[#D4AF37] transition-all text-white resize-none" />
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 bg-[#D4AF37] text-black font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    Dispatch Request <Send className="w-4 h-4" />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="py-16 text-center space-y-8"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
                  </motion.div>
                  <div>
                    <h4 className="text-3xl font-cinzel font-bold text-white mb-4 tracking-wider">REQUEST DISPATCHED</h4>
                    <p className="text-white/50 text-sm tracking-widest uppercase leading-loose">
                      Communication protocols active. <br /> Our concierge will contact you within 2 business hours.
                    </p>
                  </div>
                  <div className="pt-8">
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase font-bold hover:text-white transition-colors"
                    >
                      New Inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.5em] text-white/20 font-bold uppercase gap-8">
          <p>© 2024 SAHARA VELOCITY. KINGDOM'S PRESTIGE PARTNER.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [viewedCar, setViewedCar] = useState<Car | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingCar, setBookingCar] = useState<Car | undefined>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenBooking = (car?: Car) => {
    setBookingCar(car || viewedCar || undefined);
    setShowBooking(true);
  };

  const handleCarSelect = (car: Car) => {
    setViewedCar(car);
  };

  return (
    <div className="relative bg-[#0a0a0a]">
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Navbar onOpenMenu={() => setMobileMenuOpen(true)} />
          
          <main>
            <AnimatePresence mode="wait">
              {viewedCar ? (
                <CarDetailView 
                  key="detail"
                  car={viewedCar} 
                  onBack={() => setViewedCar(null)} 
                  onBook={() => handleOpenBooking(viewedCar)} 
                />
              ) : (
                <motion.div
                  key="main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                >
                  <Hero onBookingClick={() => handleOpenBooking()} />
                  <FleetSection onCarSelect={handleCarSelect} />
                  <ExperienceSection />
                  <TestimonialsSection />
                  <ContactSection />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <Footer />

          <AnimatePresence>
            {showBooking && (
              <BookingModal car={bookingCar} onClose={() => setShowBooking(false)} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                className="fixed inset-0 z-[100] bg-black p-12 flex flex-col items-center justify-center gap-12"
              >
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-12 right-12 p-4 border border-white/5 rounded-full"
                >
                  <X className="w-10 h-10 text-[#D4AF37]" />
                </button>
                {['Fleet', 'Experience', 'Services', 'Contact'].map((item, i) => (
                  <motion.a 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-5xl font-cinzel font-bold hover:text-[#D4AF37] transition-all tracking-[0.2em]"
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
      </motion.div>
    </div>
  );
}
