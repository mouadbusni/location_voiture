
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
import JourneyStudio from './JourneyStudio';

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
            { name: 'Journey Studio', href: '#journey-studio' },
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
              <a href="#journey-studio" className="group inline-flex items-center gap-7 bg-[#D6BD8D] px-7 py-4 text-[#111614] text-[13px] font-semibold transition-colors hover:bg-[#F1DFC1]">
                Find your drive <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
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
      className="fixed inset-0 z-[60] bg-[#101916] overflow-y-auto" role="dialog" aria-modal="true" aria-label={car.name + ' details'}
    >
      <div className="relative min-h-screen">
        <div className="h-[60vh] md:h-[80vh] relative overflow-hidden">
          <motion.div layoutId={`image-${car.id}`} className="w-full h-full">
            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#101916]" />
          
          <button 
            onClick={onBack}
            className="absolute top-12 left-6 md:left-12 flex items-center gap-4 text-white/70 hover:text-[#C9AD7A] transition-all uppercase text-[10px] tracking-[0.3em] font-bold z-10"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Fleet
          </button>
        </div>

        <div className="container mx-auto px-6 md:px-12 -mt-24 md:-mt-32 relative z-10 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div layoutId={`info-${car.id}`} className="mb-12">
                <p className="text-[#C9AD7A] text-sm font-bold tracking-[0.18em] uppercase mb-4">{car.brand}</p>
                <h1 className="text-6xl md:text-8xl font-editorial tracking-[-0.05em] leading-none mb-6">{car.name}</h1>
                <div className="flex items-center gap-8 border-y border-white/10 py-8">
                  <div>
                    <p className="text-[10px] text-white/50 tracking-widest uppercase mb-1">Indicative daily rate</p>
                    <p className="text-4xl font-cinzel font-bold text-[#C9AD7A]">{car.pricePerDay} MAD</p>
                  </div>
                  <div className="w-[1px] h-12 bg-white/10" />
                  <div className="flex gap-4">
                    <span className="px-3 py-1 bg-[#C9AD7A]/10 text-[#C9AD7A] text-[10px] tracking-widest border border-[#C9AD7A]/20 uppercase">{car.category}</span>
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
                      <spec.icon className="w-6 h-6 text-[#C9AD7A] mb-4" />
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{spec.label}</p>
                      <p className="font-bold text-lg">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={onBook}
                className="w-full py-6 bg-[#C9AD7A] text-black font-bold uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-4"
              >
                Enquire about this car <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-12"
            >
              <div className="bg-white/[0.035] border border-white/10 p-7 md:p-10 backdrop-blur-md">
                <h3 className="text-2xl font-cinzel font-bold mb-8 flex items-center gap-4">
                  <span className="w-6 h-6 text-[#C9AD7A]"><Info /></span> RENTAL DETAILS
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
                      <div className="w-1.5 h-1.5 bg-[#C9AD7A] rounded-full" />
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

const BookingModal = ({ car, onClose, initialNotes = '', initialPickupLocation }: { car?: Car; onClose: () => void; initialNotes?: string; initialPickupLocation?: string }) => {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState<BookingDetails>({
    carId: car?.id || '',
    pickupLocation: initialPickupLocation || MOROCCAN_CITIES[0],
    returnLocation: initialPickupLocation || MOROCCAN_CITIES[0],
    startDate: '',
    endDate: '',
    extras: { driver: false, premiumInsurance: false, gps: false, babySeat: false }
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [guest, setGuest] = useState({ name: '', phone: '', email: '', notes: initialNotes });
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
          className="relative bg-[#1a1a1a] p-7 md:p-12 border border-[#C9AD7A]/30 text-center max-w-lg w-full"
        >
          <div className="w-24 h-24 border-2 border-[#C9AD7A] rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle className="w-12 h-12 text-[#C9AD7A]" />
          </div>
          <h4 className="text-4xl font-cinzel font-bold mb-6">EMAIL DRAFT READY</h4>
          <p className="text-white/50 mb-12 font-light">Your email app should open with the rental details. Review the message and press Send. This is not a confirmed reservation.</p>
          <button 
            onClick={onClose}
            className="w-full py-5 bg-[#C9AD7A] text-black font-bold uppercase tracking-widest hover:bg-white transition-all"
          >
            Close
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
        <div className="w-full lg:w-[320px] bg-black/50 p-6 sm:p-10 flex flex-col border-r border-white/5">
          <div className="mb-12">
            <h2 className="text-[#C9AD7A] text-[10px] font-bold tracking-[0.18em] uppercase mb-10">Your enquiry</h2>
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
               <MapPin className="w-5 h-5 text-[#C9AD7A] flex-shrink-0" />
               <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Pick-up Terminal</p>
                  <p className="text-sm font-bold">{details.pickupLocation}</p>
               </div>
            </div>
            {details.extras.driver && (
              <div className="flex gap-4">
                 <User className="w-5 h-5 text-[#C9AD7A] flex-shrink-0" />
                 <div>
                    <p className="text-sm font-bold">Chauffeur Included</p>
                 </div>
              </div>
            )}
          </div>

          <div className="pt-12 border-t border-white/10 mt-12">
            <p className="text-[10px] text-white/50 tracking-widest uppercase mb-3">{totalPrice === null ? 'Daily rate' : `Estimated total · ${rentalDays} days`}</p>
            <p className="text-4xl font-cinzel font-bold text-[#C9AD7A] leading-none">{car ? (totalPrice ?? dailyRate).toLocaleString('en-US') : 'Quote'} <span className="text-[10px] font-normal text-white/50 tracking-widest">{car ? 'MAD' : ''}</span></p>
            <p className="text-xs text-white/55 mt-4">Estimate only. Final price and availability require confirmation.</p>
          </div>
        </div>

        <div className="flex-grow p-6 sm:p-10 md:p-12">
          <div className="flex justify-between items-center mb-16">
            <div className="flex gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-[2px] w-16 transition-all duration-700 ${step >= i ? 'bg-[#C9AD7A]' : 'bg-white/10'}`} />
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
                   <h4 className="text-[10px] tracking-[0.18em] text-[#C9AD7A] uppercase font-black mb-12">Dates & locations</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Pickup location</label>
                        <select 
                          value={details.pickupLocation}
                          onChange={(e) => setDetails({ ...details, pickupLocation: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#C9AD7A] transition-all appearance-none cursor-pointer"
                        >
                          {MOROCCAN_CITIES.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Return location</label>
                        <select 
                          value={details.returnLocation}
                          onChange={(e) => setDetails({ ...details, returnLocation: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#C9AD7A] transition-all appearance-none cursor-pointer"
                        >
                          {MOROCCAN_CITIES.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                        </select>
                      </div>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Start Date</label>
                    <input type="date" aria-label="Pickup date" min={today} value={details.startDate} onChange={(e) => { setDetails({ ...details, startDate: e.target.value }); setBookingError(''); }} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#C9AD7A] transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">End Date</label>
                    <input type="date" aria-label="Return date" min={details.startDate || today} value={details.endDate} onChange={(e) => { setDetails({ ...details, endDate: e.target.value }); setBookingError(''); }} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#C9AD7A] transition-all" />
                  </div>
                </div>

                <button onClick={goToExtras} className="w-full py-8 bg-[#C9AD7A] text-black font-black uppercase tracking-[0.16em] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-6">
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
                <h4 className="text-[10px] tracking-[0.18em] text-[#C9AD7A] uppercase font-black mb-12">Concierge Add-ons</h4>
                <div className="space-y-6">
                  {[
                    { id: 'driver', label: 'Chauffeur enquiry', price: '500 MAD/day', desc: 'Subject to availability' },
                    { id: 'premiumInsurance', label: 'Insurance enquiry', price: '300 MAD/day', desc: 'Optional cover, subject to confirmation' },
                    { id: 'gps', label: 'GPS enquiry', price: '100 MAD/day', desc: 'Subject to availability' }
                  ].map(extra => (
                    <label key={extra.id} className={`flex items-center justify-between p-8 border transition-all cursor-pointer ${details.extras[extra.id as keyof typeof details.extras] ? 'bg-[#C9AD7A]/10 border-[#C9AD7A]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                      <div className="flex items-center gap-6">
                        <input 
                          type="checkbox" 
                          checked={details.extras[extra.id as keyof typeof details.extras]} 
                          onChange={() => setDetails({ 
                            ...details, 
                            extras: { ...details.extras, [extra.id]: !details.extras[extra.id as keyof typeof details.extras] } 
                          })}
                          className="w-6 h-6 accent-[#C9AD7A]" 
                        />
                        <div>
                          <p className="font-bold text-lg mb-1">{extra.label}</p>
                          <p className="text-[10px] text-white/40 tracking-wider uppercase">{extra.desc}</p>
                        </div>
                      </div>
                      <span className="text-[#C9AD7A] font-cinzel font-bold">{extra.price}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-6">
                  <button onClick={() => setStep(1)} className="flex-1 py-8 border border-white/10 font-bold uppercase tracking-[0.16em] hover:border-white transition-all text-white/50 hover:text-white">Back</button>
                  <button onClick={() => setStep(3)} className="flex-[2] py-8 bg-[#C9AD7A] text-black font-black uppercase tracking-[0.16em] hover:bg-white transition-all shadow-xl">Your details</button>
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
                <h4 className="text-[10px] tracking-[0.18em] text-[#C9AD7A] uppercase font-black mb-12">Guest Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Full name</label>
                    <input required autoComplete="name" placeholder="Full name" value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#C9AD7A] transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Phone number</label>
                    <input required type="tel" autoComplete="tel" placeholder="+212 ..." value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#C9AD7A] transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Email address</label>
                    <input required type="email" autoComplete="email" placeholder="you@example.com" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#C9AD7A] transition-all" />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Additional notes</label>
                    <textarea placeholder="Flight number or special requests..." rows={4} value={guest.notes} onChange={(e) => setGuest({ ...guest, notes: e.target.value })} className="w-full bg-white/5 border border-white/10 p-6 outline-none focus:border-[#C9AD7A] transition-all" />
                </div>
                
                <button 
                  onClick={finalizeInquiry}
                  className="w-full py-8 bg-[#C9AD7A] text-black font-black uppercase tracking-[0.18em] hover:bg-white transition-all shadow-2xl"
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
    <section id="experience" aria-labelledby="experience-title" className="bg-[#E4E2D9] text-[#1D2922] py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[1.07fr_0.93fr] gap-14 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }} className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] max-h-[680px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1549414603-5188c83076c1?auto=format&fit=crop&q=85&w=1400" alt="Scenic landscape along a journey" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14221B]/50 to-transparent" />
              <span className="absolute left-6 bottom-6 md:left-9 md:bottom-9 text-[10px] text-white tracking-[0.13em] uppercase">The beauty is in the journey</span>
            </div>
            <div className="absolute -right-3 md:-right-9 top-8 md:top-12 w-28 h-28 md:w-40 md:h-40 bg-[#CBB58E] text-[#1B261F] rounded-full flex flex-col items-center justify-center -rotate-12 shadow-xl">
              <Compass size={27} strokeWidth={1.3} aria-hidden="true" />
              <span className="text-[9px] md:text-[10px] tracking-[0.1em] uppercase mt-2">Find your way</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: 0.08 }} className="order-1 lg:order-2">
            <p className="eyebrow text-[#977D57] mb-6 flex items-center gap-3"><span className="h-px w-8 bg-[#B49A73]" /> 02 / The experience</p>
            <h2 id="experience-title" className="font-editorial tracking-[-0.058em] leading-[0.92] text-[clamp(4.5rem,7.5vw,8.5rem)]">
              Not just the <br /><span className="italic text-[#937955]">destination.</span>
            </h2>
            <p className="max-w-[470px] mt-9 md:mt-12 text-[15px] md:text-[17px] text-[#4F5A53] leading-[1.95]">
              There is something different about seeing Morocco from the open road. The stops you didn't plan. The long stretches between cities. The freedom to make the journey your own.
            </p>
            <p className="max-w-[460px] mt-5 text-[14px] text-[#66716A] leading-[1.85]">
              Browse the collection and tell us what you need. Vehicle availability, final rates and rental conditions are confirmed before any reservation.
            </p>
            <a href="#services" className="mt-10 inline-flex items-center gap-7 text-[13px] font-semibold border-b border-[#25372C] pb-2 hover:gap-9 transition-all">
              How it works <ArrowRight size={18} aria-hidden="true" />
            </a>
            <div className="mt-16 pt-7 border-t border-[#B5B7A9] flex flex-wrap items-center gap-8 md:gap-14">
              <div><p className="font-editorial text-5xl leading-none">06</p><p className="text-[11px] text-[#626B63] mt-1">Featured vehicles</p></div>
              <div className="h-12 w-px bg-[#B5B7A9]" />
              <div><p className="font-editorial text-5xl leading-none">06</p><p className="text-[11px] text-[#626B63] mt-1">Listed airports</p></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const steps = [
    { number: '01', title: 'Explore', description: 'Find the style of vehicle that suits your route, group and plans.' },
    { number: '02', title: 'Tell us your dates', description: 'Choose pickup and return locations, travel dates and optional extras.' },
    { number: '03', title: 'Confirm the details', description: 'Send your enquiry. Availability, insurance, deposit and the final quotation must be confirmed directly.' }
  ];

  return (
    <section id="services" aria-labelledby="services-title" className="bg-[#17221D] text-[#F3EEE5] py-24 md:py-36">
      <div className="max-w-[1480px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-28">
          <div>
            <p className="eyebrow text-[#CCB28B] mb-7 flex items-center gap-3"><span className="h-px w-8 bg-[#CCB28B]" /> 03 / The process</p>
            <h2 id="services-title" className="font-editorial text-[clamp(4.3rem,7.6vw,8rem)] leading-[0.93] tracking-[-0.055em]">
              The details <br /><span className="italic text-[#D4BE9A]">matter.</span>
            </h2>
            <p className="text-[15px] leading-[1.85] text-white/60 mt-7 max-w-[420px]">
              A straightforward approach to finding your next drive—without guessing about prices or availability.
            </p>
          </div>
          <div className="border-t border-white/20">
            {steps.map((step, index) => (
              <motion.div key={step.number} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.09 }}
                className="grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-7 py-9 md:py-12 border-b border-white/20">
                <span className="font-editorial italic text-3xl md:text-4xl text-[#CBB28C]">{step.number}</span>
                <div>
                  <h3 className="font-editorial text-4xl md:text-5xl leading-none">{step.title}</h3>
                  <p className="text-[13px] md:text-[14px] text-white/60 leading-[1.75] mt-4 max-w-[440px]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [draftReady, setDraftReady] = useState(false);
  const businessEmail = import.meta.env.VITE_BOOKING_EMAIL?.trim() ?? '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contact.name.trim() || !emailAddressValid(contact.email) || !contact.message.trim()) {
      setError('Please enter your name, a valid email and your message.');
      return;
    }
    if (!emailAddressValid(businessEmail)) {
      setError('The enquiry email is not configured yet. Please contact the rental company directly.');
      return;
    }
    setError('');
    const subject = encodeURIComponent('Sahara Velocity — general enquiry');
    const body = encodeURIComponent('Name: ' + contact.name + '\nEmail: ' + contact.email + '\n\n' + contact.message);
    window.location.href = 'mailto:' + businessEmail + '?subject=' + subject + '&body=' + body;
    setDraftReady(true);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-[#101916] text-[#F5F0E8] py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-14 lg:gap-24 items-start">
          <div>
            <p className="eyebrow text-[#D7BC91] mb-7 flex items-center gap-3"><span className="h-px w-8 bg-[#D7BC91]" /> 04 / Get in touch</p>
            <h2 id="contact-title" className="font-editorial text-[clamp(5rem,9vw,10rem)] leading-[0.86] tracking-[-0.065em]">
              Your next <br /><span className="italic text-[#D7BC91]">chapter.</span>
            </h2>
            <p className="max-w-[420px] text-[15px] leading-[1.9] text-white/65 mt-9">
              Have a particular car or route in mind? Share a few details and prepare an enquiry for the rental team.
            </p>
            <div className="mt-14 pt-8 border-t border-white/20 flex items-start gap-4">
              <MapPin size={21} className="text-[#D7BC91] shrink-0 mt-1" aria-hidden="true" />
              <div><p className="text-sm">Across Morocco</p><p className="text-[12px] text-white/50 mt-1">Ask about airport collection and return locations.</p></div>
            </div>
          </div>
          <div className="bg-[#E9E5DB] text-[#1C2921] p-7 sm:p-10 md:p-14">
            {!draftReady ? (
              <form className="space-y-7" onSubmit={handleSubmit}>
                <div className="flex items-center justify-between gap-6 pb-6 border-b border-[#CBC8BB]">
                  <h3 className="font-editorial text-4xl md:text-5xl leading-none">Start a conversation.</h3>
                  <span className="shrink-0 h-10 w-10 border border-[#A4A99D] rounded-full flex items-center justify-center"><ArrowRight size={18} aria-hidden="true" className="-rotate-45" /></span>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="block text-[11px] text-[#4F5A50] mb-2">Your name</span>
                    <input type="text" autoComplete="name" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} placeholder="Full name" required
                      className="w-full border-b border-[#B8BBAF] px-0 py-3 bg-transparent placeholder:text-[#8F958B] text-[#18251C] focus:outline-none focus:border-[#826A43] text-[14px]" />
                  </label>
                  <label className="block">
                    <span className="block text-[11px] text-[#4F5A50] mb-2">Your email</span>
                    <input type="email" autoComplete="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="you@example.com" required
                      className="w-full border-b border-[#B8BBAF] px-0 py-3 bg-transparent placeholder:text-[#8F958B] text-[#18251C] focus:outline-none focus:border-[#826A43] text-[14px]" />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-[11px] text-[#4F5A50] mb-2">Tell us about your trip</span>
                  <textarea rows={4} value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })} required placeholder="Vehicle, travel dates and any questions..."
                    className="w-full border-b border-[#B8BBAF] px-0 py-3 bg-transparent placeholder:text-[#8F958B] text-[#18251C] focus:outline-none focus:border-[#826A43] resize-y text-[14px]" />
                </label>
                {error && <p className="text-sm text-[#9B3F32]" role="alert">{error}</p>}
                <button type="submit" className="w-full bg-[#1D2C24] hover:bg-[#34483B] transition-colors py-4 px-6 text-white text-sm font-medium inline-flex justify-between items-center gap-4">
                  Prepare email enquiry <ArrowRight size={19} aria-hidden="true" />
                </button>
                <p className="text-[11px] leading-relaxed text-[#697167]">This prepares a draft in your email app. You must send it yourself. No reservation is confirmed online.</p>
              </form>
            ) : (
              <div className="min-h-[420px] flex flex-col items-start justify-center">
                <CheckCircle size={39} className="text-[#728169] mb-8" aria-hidden="true" />
                <h3 className="font-editorial text-5xl mb-5">Your draft is ready.</h3>
                <p className="text-[#66716A] text-sm leading-relaxed mb-8">Please review the message and send it from your email app. This website has not sent an enquiry or confirmed any rental.</p>
                <button type="button" onClick={() => setDraftReady(false)} className="border-b border-[#1D2C24] pb-1 text-sm">Write another enquiry</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#101916] text-[#F5F0E8] border-t border-white/15 pt-14 pb-9">
    <div className="max-w-[1480px] mx-auto px-6 md:px-12 lg:px-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-14">
        <p className="eyebrow text-[#CEB58D]">A considered way to move</p>
        <div className="flex gap-8 text-sm text-white/70">
          <a className="hover:text-white transition-colors" href="#fleet">Our fleet</a>
          <a className="hover:text-white transition-colors" href="#services">The process</a>
          <a className="hover:text-white transition-colors" href="#contact">Get in touch</a>
        </div>
      </div>
      <a href="#home" aria-label="Return to top" className="block font-editorial leading-[0.75] tracking-[-0.075em] text-[clamp(4.2rem,12vw,13rem)] text-[#E9E0D2] whitespace-nowrap overflow-hidden">
        Sahara <span className="italic text-[#BFA77F]">Velocity.</span>
      </a>
      <div className="mt-12 pt-7 border-t border-white/15 flex flex-col sm:flex-row justify-between gap-4 text-[11px] text-white/50">
        <span>© {new Date().getFullYear()} Sahara Velocity · Morocco</span>
        <span>All rental enquiries are subject to confirmation.</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [viewedCar, setViewedCar] = useState<Car | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingCar, setBookingCar] = useState<Car | undefined>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{ notes: string; pickupLocation: string } | null>(null);

  const handleOpenBooking = (car?: Car, prefill?: { notes: string; pickupLocation: string }) => {
    setBookingCar(car || viewedCar || undefined);
    setBookingPrefill(prefill ?? null);
    setMobileMenuOpen(false);
    setShowBooking(true);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (showBooking) setShowBooking(false);
      else if (mobileMenuOpen) setMobileMenuOpen(false);
      else if (viewedCar) setViewedCar(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showBooking, mobileMenuOpen, viewedCar]);

  return (
    <div className="min-h-screen bg-[#101916]">
      <Navbar onOpenMenu={() => setMobileMenuOpen(true)} onBookingClick={() => handleOpenBooking()} />

      <main>
        <AnimatePresence mode="wait">
          {viewedCar ? (
            <CarDetailView
              key={viewedCar.id}
              car={viewedCar}
              onBack={() => setViewedCar(null)}
              onBook={() => handleOpenBooking(viewedCar)}
            />
          ) : (
            <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <Hero onBookingClick={() => handleOpenBooking()} />
              <JourneyStudio onViewCar={setViewedCar} onEnquire={(car, notes, pickupLocation) => handleOpenBooking(car, { notes, pickupLocation })} />
              <FleetSection onCarSelect={setViewedCar} onBookingClick={() => handleOpenBooking()} />
              <ExperienceSection />
              <ServicesSection />
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <AnimatePresence>
        {showBooking && <BookingModal car={bookingCar} onClose={() => setShowBooking(false)} initialNotes={bookingPrefill?.notes} initialPickupLocation={bookingPrefill?.pickupLocation} />}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#15211B] text-[#F3ECE1] px-7 sm:px-12 py-8 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#D6BD8D]">Sahara Velocity</span>
              <button type="button" aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)} className="h-12 w-12 rounded-full border border-white/25 inline-flex justify-center items-center">
                <X size={21} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-3 py-10">
              {[
                { label: 'Journey Studio', href: '#journey-studio' },
                { label: 'The fleet', href: '#fleet' },
                { label: 'Our story', href: '#experience' },
                { label: 'The process', href: '#services' },
                { label: 'Contact', href: '#contact' }
              ].map((item, index) => (
                <motion.a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}
                  className="font-editorial text-[clamp(3.5rem,12vw,6rem)] tracking-[-0.045em] leading-[1.12] hover:text-[#D6BD8D] transition-colors">
                  {item.label}
                </motion.a>
              ))}
            </div>
            <button type="button" onClick={() => handleOpenBooking()} className="flex items-center justify-between border-t border-white/20 py-6 text-[13px] text-[#D6BD8D]">
              Plan your drive <ArrowRight size={19} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
