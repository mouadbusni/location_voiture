import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Compass, MapPin, Users, Minus, Plus } from 'lucide-react';
import { FLEET } from './constants';
import type { Car } from './types';
import { JOURNEYS, indicativeTripTotal, matchJourneyCars, type JourneyId } from './journeyStudio';

type Props = {
  onViewCar: (car: Car) => void;
  onEnquire: (car: Car, brief: string, pickupLocation: string) => void;
};

const budgets: Array<{ label: string; value: number | null }> = [
  { label: 'Flexible', value: null },
  { label: 'Up to 3,000 MAD', value: 3000 },
  { label: 'Up to 4,500 MAD', value: 4500 }
];

export default function JourneyStudio({ onViewCar, onEnquire }: Props) {
  const [journeyId, setJourneyId] = useState<JourneyId>('atlantic');
  const [passengers, setPassengers] = useState(2);
  const [maxDailyRate, setMaxDailyRate] = useState<number | null>(null);
  const [days, setDays] = useState(3);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const journey = JOURNEYS.find(item => item.id === journeyId) ?? JOURNEYS[0];
  const matches = useMemo(
    () => matchJourneyCars(FLEET, { journeyId, passengers, maxDailyRate }),
    [journeyId, passengers, maxDailyRate]
  );
  const selectedCar = matches[selectedIndex] ?? matches[0] ?? null;

  useEffect(() => setSelectedIndex(0), [journeyId, passengers, maxDailyRate]);

  const chooseJourney = (id: JourneyId) => {
    const next = JOURNEYS.find(item => item.id === id);
    if (!next) return;
    setJourneyId(id);
    setDays(next.days);
  };

  const startEnquiry = () => {
    if (!selectedCar) return;
    const brief = [
      journey.note,
      'Indicative duration: ' + days + (days === 1 ? ' day.' : ' days.'),
      'Passenger count: ' + passengers + '.',
      'Vehicle preference: ' + selectedCar.name + '.',
      'Please confirm the itinerary, vehicle availability, rental conditions and full quote.'
    ].join(' ');
    onEnquire(selectedCar, brief, journey.pickupLocation);
  };

  return (
    <section id="journey-studio" aria-labelledby="studio-title" className="relative overflow-hidden bg-[#DDD8C9] text-[#1B2922] py-24 md:py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-[#18261E]/15" aria-hidden="true" />
      <div className="max-w-[1480px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-12 lg:gap-16 mb-12 md:mb-16 items-end">
          <div>
            <div className="eyebrow text-[#896E46] mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#987E54]" /> 01 / Signature experience
            </div>
            <h2 id="studio-title" className="font-editorial text-[clamp(4rem,6.3vw,7rem)] leading-[0.91] tracking-[-0.06em]">
              Start with <br />
              <span className="italic text-[#8E734B]">the journey.</span>
            </h2>
          </div>
          <div className="lg:pl-12 lg:border-l lg:border-[#AFAD9D]">
            <p className="text-[15px] md:text-[17px] text-[#4D594F] leading-[1.85] max-w-[550px]">
              A collection is only the beginning. Tell us the kind of journey you have in mind, and we'll help you discover a vehicle worth taking along.
            </p>
            <p className="text-[12px] text-[#6B7168] mt-4">An interactive guide based on the sample fleet, not a live availability or booking guarantee.</p>
          </div>
        </div>

        <div className="journey-editor grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] bg-[#F0EDE4] border border-[#C6C4B6] shadow-[0_18px_70px_rgba(37,36,24,0.09)]">
          <div className="p-6 sm:p-9 md:p-12 lg:p-14">
            <div className="flex items-center justify-between border-b border-[#C8C6B9] pb-5 mb-7">
              <span className="eyebrow text-[#877454]">Your travel brief</span>
              <span className="flex items-center gap-2 text-[11px] text-[#617065]"><Compass size={17} strokeWidth={1.5} /> The journey finder</span>
            </div>

            <div className="space-y-2" role="group" aria-label="Choose a journey style">
              {JOURNEYS.map(item => (
                <button key={item.id} type="button" onClick={() => chooseJourney(item.id)} aria-pressed={item.id === journeyId}
                  className={'journey-option w-full flex items-center justify-between gap-5 text-left border-b border-[#D4D2C7] py-4 md:py-5 transition-colors ' + (item.id === journeyId ? 'is-active' : '')}>
                  <span className="flex items-start gap-4 md:gap-5">
                    <span className={'text-[11px] pt-1 tracking-[0.1em] ' + (item.id === journeyId ? 'text-[#8D7147]' : 'text-[#8D948A]')}>{item.eyebrow.slice(0, 2)}</span>
                    <span>
                      <span className="block font-editorial text-3xl md:text-[37px] leading-none tracking-[-0.04em]">{item.title}</span>
                      <span className="block text-xs mt-2 text-[#687169]">{item.mood} · {item.days}-day inspiration</span>
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" size={19} className={'shrink-0 transition-transform ' + (item.id === journeyId ? 'text-[#8D7147] rotate-45' : 'text-[#9DA397]')} />
                </button>
              ))}
            </div>

            <div className="mt-9 grid sm:grid-cols-2 gap-7">
              <div>
                <div className="flex items-center gap-2 text-[12px] font-semibold mb-3"><Users size={15} aria-hidden="true" /> Travellers</div>
                <div role="group" aria-label="Number of travellers" className="flex gap-2">
                  {[2, 4, 6].map(number => (
                    <button type="button" key={number} onClick={() => setPassengers(number)} aria-pressed={passengers === number}
                      className={'h-11 flex-1 border text-sm transition-colors ' + (passengers === number ? 'bg-[#22352A] text-white border-[#22352A]' : 'border-[#BCBFB3] hover:border-[#22352A]')}>{number}{number === 6 ? '+' : ''}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[12px] font-semibold mb-3">Journey length</div>
                <div className="h-11 flex items-center justify-between border border-[#BCBFB3]">
                  <button type="button" aria-label="Reduce journey length" disabled={days <= 1} onClick={() => setDays(d => Math.max(1, d - 1))}
                    className="h-full w-11 flex items-center justify-center disabled:opacity-30 hover:bg-[#E0DED4]"><Minus size={16} /></button>
                  <span aria-live="polite" className="text-[13px]">{days} {days === 1 ? 'day' : 'days'}</span>
                  <button type="button" aria-label="Increase journey length" disabled={days >= 14} onClick={() => setDays(d => Math.min(14, d + 1))}
                    className="h-full w-11 flex items-center justify-center disabled:opacity-30 hover:bg-[#E0DED4]"><Plus size={16} /></button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <label htmlFor="journey-budget" className="block text-[12px] font-semibold mb-3">Your preferred daily budget</label>
              <select id="journey-budget" value={maxDailyRate === null ? 'flexible' : String(maxDailyRate)}
                onChange={event => setMaxDailyRate(event.target.value === 'flexible' ? null : Number(event.target.value))}
                className="w-full border border-[#BCBFB3] bg-transparent px-4 h-12 text-[13px] text-[#22352A] cursor-pointer focus:outline-none focus:border-[#896E46]">
                {budgets.map(budget => <option key={budget.label} value={budget.value === null ? 'flexible' : String(budget.value)}>{budget.label}</option>)}
              </select>
            </div>

            <p className="text-[11px] text-[#7A7C70] leading-[1.6] mt-7">
              These are travel ideas, not booked tours. Route feasibility, collection locations, and one-way terms need confirmation.
            </p>
          </div>

          <div className="bg-[#15231B] text-[#F4EEE4] min-h-[700px] md:min-h-[760px] flex flex-col">
            <div className="relative min-h-[350px] md:min-h-[420px] flex-[1.1] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={journeyId} initial={{ opacity: 0, scale: 1.045 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                  <img src={journey.coverImage} alt={journey.coverAlt} loading="eager" decoding="async" className="w-full h-full object-cover object-center" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#15231B] via-[#15231B]/5 to-[#15231B]/45 pointer-events-none" />
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between pointer-events-none">
                <div className="flex items-start justify-between">
                  <span className="eyebrow text-[#E0D4B9]">The route / {journey.eyebrow.slice(0, 2)}</span>
                  <span className="bg-[#EDE7DC]/95 text-[#213529] text-[10px] tracking-[0.14em] px-3 py-2 uppercase">Morocco / route inspiration</span>
                </div>
                <div className="max-w-[520px]">
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[#E0CAA7] mb-3">{journey.subline}</p>
                  <h3 className="font-editorial text-[clamp(3.6rem,5.6vw,6.5rem)] leading-[0.87] tracking-[-0.05em]">{journey.title}</h3>
                </div>
              </div>
            </div>

            <div className="px-6 md:px-10 pt-5 pb-8 md:pb-10 flex-[0.9]">
              <div className="flex items-center gap-3 flex-wrap text-[11px] text-[#C8D0C3] pb-6 border-b border-white/20">
                <MapPin size={15} className="text-[#DFC79E]" aria-hidden="true" />
                {journey.route.map((stop, index) => (
                  <span key={stop} className="flex items-center gap-3">
                    {index > 0 && <span aria-hidden="true" className="w-6 h-px bg-white/35" />}
                    {stop}
                  </span>
                ))}
              </div>

              <p className="text-[13px] text-[#B8C2B7] mt-5 leading-relaxed max-w-[550px]">{journey.summary}</p>
              <div className="mt-7" aria-live="polite" aria-atomic="true">
                {selectedCar ? (
                  <>
                    <p className="eyebrow text-[#DAC39C] mb-3">Recommended for your brief</p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-end sm:justify-between">
                      <div>
                        <h4 className="font-editorial text-[clamp(2.7rem,4.6vw,4.2rem)] leading-none tracking-[-0.04em]">{selectedCar.name}</h4>
                        <p className="text-[12px] text-white/60 mt-2">{selectedCar.seats} seats · {selectedCar.category} · {selectedCar.transmission}</p>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <p className="text-[10px] text-white/55 uppercase tracking-[0.11em]">Indicative base cost</p>
                        <p className="text-[24px] md:text-[27px] font-medium text-[#E1C79E]">
                          {indicativeTripTotal(selectedCar.pricePerDay, days).toLocaleString('en-US')} <span className="text-[11px]">MAD</span>
                        </p>
                        <p className="text-[11px] text-white/50">{selectedCar.pricePerDay.toLocaleString('en-US')} MAD/day × {days}</p>
                      </div>
                    </div>

                    {matches.length > 1 && (
                      <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label="Alternative matches">
                        {matches.slice(0, 4).map((car, index) => (
                          <button type="button" key={car.id} aria-pressed={car.id === selectedCar.id} onClick={() => setSelectedIndex(index)}
                            className={'text-[11px] px-3 py-2 border transition-colors ' + (car.id === selectedCar.id ? 'border-[#DBC39A] bg-[#DBC39A] text-[#192820]' : 'border-white/25 hover:border-white/75 text-white/75')}>
                            {car.name}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-7 flex flex-col sm:flex-row gap-3">
                      <button type="button" onClick={startEnquiry}
                        className="group flex-1 flex items-center justify-between gap-5 bg-[#D8BF91] hover:bg-[#F0DDBB] text-[#17251C] px-5 py-4 text-[13px] font-semibold transition-colors">
                        Enquire about this drive <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </button>
                      <button type="button" onClick={() => onViewCar(selectedCar)}
                        className="sm:w-auto flex items-center justify-center gap-3 border border-white/35 px-5 py-4 text-[12px] hover:bg-white/10 transition-colors">
                        View vehicle <ArrowUpRight size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-5">
                    <h4 className="font-editorial text-4xl">No matching vehicle just yet.</h4>
                    <p className="text-white/65 text-sm leading-relaxed mt-3 max-w-[410px]">
                      Try a more flexible budget or a different passenger count to see options from the current showcase.
                    </p>
                    <button type="button" onClick={() => {setMaxDailyRate(null);setPassengers(2);}} className="mt-5 text-[#DCC49A] text-sm border-b border-[#DCC49A] pb-1">Reset preferences</button>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-white/45 leading-relaxed mt-5">Recommendations use listed passenger capacity, vehicle category and your budget. Not a guarantee of suitability, pricing or availability.</p>
            </div>
          </div>
        </div>
        <div className="mt-7 flex flex-col sm:flex-row justify-between gap-3 text-[11px] tracking-[0.06em] text-[#626D60]">
          <span>THE SAHARA VELOCITY JOURNEY STUDIO</span>
          <span>Thoughtful choices. Better journeys.</span>
        </div>
      </div>
    </section>
  );
}