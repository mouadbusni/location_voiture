
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
const Navbar = ({ onOpenMenu, onBookingClick }: { onOpenMenu: () => void; onBookingClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 36);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <nav aria-label="Primary navigation" className={'fixed inset-x-0 top-0 z-50 transition-colors duration-500 ' + (scrolled ? 'bg-[#101514]/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent')}>
      <div className="max-w-[1480px] mx-auto px-6 md:px-12 lg:px-16 h-[82px] md:h-[94px] flex items-center justify-between gap-8">
        <a href="#home" aria-label="Sahara Velocity — home" className="flex items-center gap-3 group shrink-0">
          <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center border border-[#C7AD7C]/60 text-[#E8D6B6] font-editorial italic text-2xl tracking-[-0.06em] transition-colors group-hover:bg-[#C7AD7C] group-hover:text-[#111614]">sv.</span>
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-white uppercase">SAHARA</span>
            <span className="text-[10px] font-medium tracking-[0.22em] text-[#C7AD7C] uppercase mt-1">VELOCITY</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {[
            { name: 'The fleet', href: '#fleet' },
            { name: 'Our story', href: '#experience' },
            { name: 'The process', href: '#services' },
            { name: 'Contact', href: '#contact' }
          ].map((item) => (
            <a key={item.href} href={item.href} className="nav-link text-[12px] font-medium text-white/75 hover:text-white transition-colors">{item.name}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onBookingClick} type="button" className="hidden sm:flex items-center gap-3 border border-white/30 px-5 py-3 text-xs tracking-[0.04em] text-white hover:bg-[#D6BD8D] hover:border-[#D6BD8D] hover:text-[#101514] transition-all duration-300">
            Plan your drive <ArrowRight size={15} aria-hidden="true" />
          </button>
          <button onClick={onOpenMenu} type="button" aria-label="Open navigation menu" className="flex lg:hidden h-11 w-11 items-center justify-center border border-white/20 text-white hover:border-[#C7AD7C] transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onBookingClick }: { onBookingClick: () => void }) => {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate min-h-[760px] h-[100svh] max-h-[1100px] overflow-hidden bg-[#101614]">
      <div className="absolute inset-0" aria-hidden="true">
        <img src={FLEET[1].image} alt="" fetchPriority="high" className="hero-photo h-full w-full object-cover object-[60%_center]" />
        <div className="hero-scrim absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B100F]/95 via-transparent to-[#0B100F]/20" />
      </div>

      <div className="relative z-10 h-full max-w-[1480px] mx-auto px-6 md:px-12 lg:px-16 flex items-center">
        <div className="w-full pt-24 pb-36 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex items-center gap-3 mb-8 md:mb-10">
            <span className="h-px w-9 bg-[#D6BD8D]" />
            <span className="eyebrow text-[#EEE4D4]">A different way to move · Morocco</span>
          </motion.div>
          <motion.h1 id="hero-title" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.18 }} className="font-editorial font-normal tracking-[-0.065em] leading-[0.84] text-[clamp(5.2rem,11vw,11.5rem)] text-[#F6F0E8] max-w-[1050px]">
            Every road <br />
            <span className="text-[#DCC399] italic">has a story.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.35 }} className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
            <p className="max-w-[390px] text-[14px] md:text-base leading-[1.85] text-white/75">
              Exceptional journeys begin with the right car. Explore a considered collection for discovering Morocco on your own terms.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#fleet" className="group inline-flex items-center gap-7 bg-[#D6BD8D] px-7 py-4 text-[#111614] text-[13px] font-semibold transition-colors hover:bg-[#F1DFC1]">
                Explore the collection <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </a>
              <button type="button" onClick={onBookingClick} className="inline-flex items-center gap-3 border border-white/40 px-7 py-4 text-white text-[13px] hover:border-white hover:bg-white/10 transition-colors">
                Request a quote
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute z-10 bottom-0 inset-x-0 border-t border-white/20">
        <div className="max-w-[1480px] mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-7 flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="text-[#D6BD8D] text-xs font-semibold tracking-[0.14em]">01 / 03</span>
            <span className="hidden sm:inline h-px w-12 bg-white/25" />
            <span className="text-[11px] tracking-[0.11em] text-white/75 uppercase">The collection</span>
          </div>
          <div className="hidden sm:flex gap-10 text-[11px] text-white/70 tracking-[0.06em]">
            <span>Six featured vehicles</span>
            <span>Across Morocco</span>
          </div>
          <a href="#fleet" aria-label="Scroll to the fleet" className="h-10 w-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <ArrowRight size={17} className="rotate-90" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

const FleetSection = ({ onCarSelect, onBookingClick }: { onCarSelect: (car: Car) => void; onBookingClick: () => void }) => {
  const [filter, setFilter] = useState<CarCategory | 'All'>('All');
  const categories: Array<CarCategory | 'All'> = ['All', ...Array.from(new Set(FLEET.map(car => car.category)))];
  const filteredCars = useMemo(() => filter === 'All' ? FLEET : FLEET.filter(car => car.category === filter), [filter]);

  return (
    <section id="fleet" aria-labelledby="fleet-title" className="relative bg-[#F0EEE7] text-[#19201D] py-24 md:py-36">
      <div className="max-w-[1480px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_auto] lg:items-end gap-9 mb-12 md:mb-16">
          <div>
            <p className="eyebrow text-[#987C54] mb-5 flex items-center gap-3"><span className="block h-px w-8 bg-[#B49A73]" /> 01 / The collection</p>
            <h2 id="fleet-title" className="font-editorial font-normal tracking-[-0.06em] leading-[0.9] text-[clamp(4.5rem,8vw,8.5rem)]">
              Find your <span className="italic text-[#997D56]">drive.</span>
            </h2>
            <p className="mt-6 text-[#525A55] max-w-[470px] text-[14px] md:text-[15px] leading-relaxed">
              From quiet refinement to open-road adventure. A collection of vehicles selected for how you want to travel.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-2" role="group" aria-label="Filter cars by category">
            {categories.map(category => (
              <button type="button" key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}
                className={'px-4 py-2.5 text-[12px] border transition-colors duration-200 ' +
                  (filter === category ? 'bg-[#1B2420] text-white border-[#1B2420]' : 'bg-transparent border-[#BCC0B8] text-[#4B544E] hover:border-[#1B2420] hover:text-[#1B2420]')}>
                {category === 'All' ? 'All vehicles' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredCars.map((car, index) => {
            const featured = filter === 'All' && index === 0;
            return (
              <motion.button key={car.id} type="button" onClick={() => onCarSelect(car)}
                aria-label={'View ' + car.name + ', estimated from ' + car.pricePerDay.toLocaleString('en-US') + ' MAD per day'}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.2) }}
                className={'fleet-tile group relative isolate block w-full overflow-hidden text-left bg-[#121A17] text-white focus-visible:outline-[#B79A6F] ' +
                  (featured ? 'md:col-span-2 h-[510px] md:h-[620px]' : 'h-[410px] md:h-[490px]')}>
                <img src={car.image} alt={car.name} loading="lazy" decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"
                  style={{ objectPosition: featured ? 'center 54%' : 'center' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B100F]/95 via-[#0B100F]/10 to-[#0B100F]/30" aria-hidden="true" />
                <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-[10px] tracking-[0.16em] uppercase text-white/80 border border-white/40 px-3 py-2 backdrop-blur-sm">{car.category}</span>
                    <span className="h-11 w-11 rounded-full border border-white/50 inline-flex items-center justify-center transition-all group-hover:bg-[#D6BD8D] group-hover:border-[#D6BD8D] group-hover:text-[#14201B]">
                      <ArrowRight size={18} aria-hidden="true" className="-rotate-45 transition-transform group-hover:rotate-0" />
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#D9C59F] uppercase tracking-[0.16em] mb-2">{car.brand} / {String(index + 1).padStart(2, '0')}</p>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                      <div>
                        <h3 className={'font-editorial leading-[0.94] tracking-[-0.035em] ' + (featured ? 'text-[clamp(3.9rem,7vw,7.2rem)]' : 'text-[clamp(3rem,4.4vw,5.3rem)]')}>{car.name}</h3>
                        <p className="mt-3 text-[12px] text-white/70 flex items-center gap-3">
                          <span>{car.transmission}</span><span className="h-1 w-1 rounded-full bg-[#D6BD8D]" /><span>{car.seats} seats</span><span className="h-1 w-1 rounded-full bg-[#D6BD8D]" /><span>{car.fuel}</span>
                        </p>
                      </div>
                      <div className="shrink-0 sm:text-right border-t sm:border-0 border-white/20 pt-4 sm:pt-0">
                        <p className="text-[10px] text-white/60 tracking-[0.1em] uppercase mb-1">Estimated from</p>
                        <p className="text-[21px] font-medium text-[#E7D6B6]">{car.pricePerDay.toLocaleString('en-US')} <span className="text-[12px]">MAD / day</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
          {filter === 'All' && (
            <div className="min-h-[410px] md:min-h-[490px] bg-[#D6C4A8] text-[#19201D] p-9 md:p-12 flex flex-col justify-between">
              <span className="text-[11px] tracking-[0.13em] uppercase">A more personal journey</span>
              <div>
                <h3 className="font-editorial italic text-[clamp(4rem,5.5vw,6rem)] leading-[0.95] tracking-[-0.04em] mb-6">Something else in mind?</h3>
                <p className="max-w-[310px] text-sm leading-relaxed text-[#51564E] mb-8">Tell us the dates and kind of drive you have in mind. We can help you prepare an enquiry.</p>
                <button onClick={onBookingClick} type="button" className="inline-flex items-center gap-5 border-b border-[#19201D] pb-2 text-sm font-semibold hover:gap-8 transition-all">
                  Make an enquiry <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="mt-8 text-xs text-[#69716A]">Displayed vehicles, specifications and rates are illustrative. Availability and final rental conditions require confirmation.</p>
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
                <p className="text-[#D4AF37] text-sm font-bold tracking-[0.18em] uppercase mb-4">{car.brand}</p>
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
                    'Vehicle specification confirmed before reservation',
                    'Collection arrangements shared with your quote',
                    'Fuel and mileage policy explained in advance',
                    'Deposit and insurance requirements clarified',
                    'Optional equipment subject to availability',
                    'Final availability subject to confirmation'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/70">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                      <span className="text-sm font-light tracking-wide">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-white/60 leading-relaxed">Vehicle photos and specifications are illustrative. Confirm the exact model, trim and equipment before booking.</p>
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
            <h2 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.18em] uppercase mb-10">Review Selection</h2>
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
                   <h4 className="text-[10px] tracking-[0.18em] text-[#D4AF37] uppercase font-black mb-12">Logistics Planning</h4>
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

                <button onClick={goToExtras} className="w-full py-8 bg-[#D4AF37] text-black font-black uppercase tracking-[0.16em] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-6">
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
                <h4 className="text-[10px] tracking-[0.18em] text-[#D4AF37] uppercase font-black mb-12">Concierge Add-ons</h4>
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
                  <button onClick={() => setStep(1)} className="flex-1 py-8 border border-white/10 font-bold uppercase tracking-[0.16em] hover:border-white transition-all text-white/50 hover:text-white">Back</button>
                  <button onClick={() => setStep(3)} className="flex-[2] py-8 bg-[#D4AF37] text-black font-black uppercase tracking-[0.16em] hover:bg-white transition-all shadow-xl">Contact Protocols</button>
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
                <h4 className="text-[10px] tracking-[0.18em] text-[#D4AF37] uppercase font-black mb-12">Guest Information</h4>
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
                  className="w-full py-8 bg-[#D4AF37] text-black font-black uppercase tracking-[0.18em] hover:bg-white transition-all shadow-2xl"
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
               <p className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase font-bold">Heritage & Motion</p>
            </div>
            <h3 className="text-4xl md:text-6xl font-cinzel font-bold mb-8 leading-none">ROADS WORTH TAKING</h3>
            <p className="text-xl text-white/70 mb-12 leading-relaxed font-light tracking-wide">
              From airport arrivals to open-road escapes, choose a vehicle to suit the way you travel. Explore the fleet, share your dates and request a quotation tailored to your plans. 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Globe, title: 'Network', value: 'Airport options' },
                { icon: Award, title: 'Excellence', value: 'Rental enquiries' },
                { icon: Compass, title: 'Adventure', value: 'Tailored Tours' },
                { icon: Shield, title: 'Security', value: 'Terms on request' }
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

const ServicesSection = () => {
  const services = [
    { icon: MapPin, title: 'Airport collection', description: 'Choose your arrival airport and preferred return location.' },
    { icon: Shield, title: 'Clear rental terms', description: 'Confirm insurance, mileage, deposit and final price with the rental team.' },
    { icon: Compass, title: 'A journey your way', description: 'Share your itinerary and request a personalised quotation.' }
  ];
  return (
    <section id="services" className="py-24 bg-[#0e0e0e] border-y border-white/10">
      <div className="container mx-auto px-6">
        <p className="text-[#D4AF37] text-xs tracking-widest uppercase mb-5">Our approach</p>
        <h2 className="font-cinzel text-4xl md:text-5xl mb-5">Details make the journey.</h2>
        <p className="text-white/65 mb-12 max-w-2xl">Choose your vehicle, select your dates and request a personal quotation.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map(({ icon: Icon, title, description }) => (
            <article key={title} className="border border-white/10 bg-white/[0.025] p-8 md:p-10">
              <Icon aria-hidden="true" className="w-7 h-7 text-[#D4AF37] mb-8" />
              <h3 className="text-xl font-semibold mb-4">{title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [contactError, setContactError] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const businessEmail = import.meta.env.VITE_BOOKING_EMAIL?.trim() ?? '';
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name.trim() || !emailAddressValid(contact.email) || !contact.message.trim()) {
      setContactError('Please complete all fields using a valid email address.');
      return;
    }
    if (!emailAddressValid(businessEmail)) {
      setContactError('Enquiries are not configured yet. Please contact the rental company directly.');
      return;
    }
    setContactError('');
    const subject = encodeURIComponent('Sahara Velocity — general enquiry');
    const body = encodeURIComponent(`Name: ${contact.name}\nEmail: ${contact.email}\n\n${contact.message}`);
    window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <div className="flex items-center gap-4 mb-8">
               <div className="h-1 w-12 bg-[#D4AF37]" />
               <p className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase font-bold">Global Presence</p>
            </div>
            <h3 className="text-4xl md:text-6xl font-cinzel font-bold mb-12">THE CONCIERGE</h3>
            <div className="space-y-10">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 border border-white/5 flex items-center justify-center rounded-full"><Phone className="w-5 h-5 text-[#D4AF37]" /></div>
                <p className="text-base text-white/70">Contact details supplied with your quote</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 border border-white/5 flex items-center justify-center rounded-full"><MapPin className="w-5 h-5 text-[#D4AF37]" /></div>
                <p className="text-xl font-cinzel text-white">Morocco · Enquire about collection</p>
              </div>
            </div>
            
            <div className="mt-16 p-10 bg-white/5 border-l-4 border-[#D4AF37]">
              <p className="text-white/60 font-light leading-relaxed italic">
                "Tell us about your plans and we'll help you choose your next drive."
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
                    <input required aria-label="Name" autoComplete="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Name" className="w-full bg-white/5 border-b border-white/10 py-4 outline-none focus:border-[#D4AF37] transition-all text-white" />
                    <input required aria-label="Email" autoComplete="email" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="Email" className="w-full bg-white/5 border-b border-white/10 py-4 outline-none focus:border-[#D4AF37] transition-all text-white" />
                  </div>
                  <textarea required aria-label="Message" rows={4} value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} placeholder="Your Message" className="w-full bg-white/5 border-b border-white/10 py-4 outline-none focus:border-[#D4AF37] transition-all text-white resize-none" />
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 bg-[#D4AF37] text-black font-black uppercase tracking-[0.16em] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    Prepare Email <Send className="w-4 h-4" />
                  </motion.button>
                  {contactError && <p role="alert" className="text-sm text-red-300">{contactError}</p>}
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
                    <h4 className="text-3xl font-cinzel font-bold text-white mb-4 tracking-wider">EMAIL DRAFT READY</h4>
                    <p className="text-white/50 text-sm tracking-widest uppercase leading-loose">
                      Your email app should open with the details. Please review and send the message yourself. This website has not delivered your enquiry.
                    </p>
                  </div>
                  <div className="pt-8">
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-[10px] tracking-[0.18em] text-[#D4AF37] uppercase font-bold hover:text-white transition-colors"
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
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.18em] text-white/20 font-bold uppercase gap-8">
          <p>© {new Date().getFullYear()} Sahara Velocity. All rights reserved.</p>
          <div className="flex gap-12">
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
            <a href="#fleet" className="hover:text-[#D4AF37] transition-colors">Fleet</a>
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
          <Navbar onOpenMenu={() => setMobileMenuOpen(true)} onBookingClick={() => handleOpenBooking()} />
          
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
                  <FleetSection onCarSelect={handleCarSelect} onBookingClick={() => handleOpenBooking()} />
                  <ExperienceSection />
                  <ServicesSection />
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
