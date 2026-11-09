import type { Car } from './types';

export type JourneyId = 'atlantic' | 'atlas' | 'city';

export interface Journey {
  id: JourneyId;
  eyebrow: string;
  title: string;
  subline: string;
  route: string[];
  days: number;
  summary: string;
  mood: string;
  note: string;
  pickupLocation: string;
  categoryPriority: string[];
}

export const JOURNEYS: Journey[] = [
  {
    id: 'atlantic',
    eyebrow: '01 / Open coast',
    title: 'The Atlantic Line',
    subline: 'The freedom of the long way around.',
    route: ['Casablanca', 'Rabat', 'Tangier'],
    days: 3,
    summary: 'Ocean air, long boulevards and a changing horizon. A coastal journey idea for the days you want to take your time.',
    mood: 'Coastline',
    note: 'Interested in the Atlantic Line journey idea: Casablanca, Rabat and Tangier.',
    pickupLocation: 'Casablanca - CMN Airport',
    categoryPriority: ['Sport', 'Luxury', 'SUV', 'Economy']
  },
  {
    id: 'atlas',
    eyebrow: '02 / High country',
    title: 'The Atlas Passage',
    subline: 'Go where the road changes everything.',
    route: ['Marrakech', 'High Atlas', 'Ouarzazate'],
    days: 4,
    summary: 'A journey idea through mountain landscapes, remarkable changes in scenery and places worth slowing down for.',
    mood: 'Mountains',
    note: 'Interested in the Atlas Passage journey idea: Marrakech, High Atlas and Ouarzazate.',
    pickupLocation: 'Marrakech - RAK Airport',
    categoryPriority: ['SUV', 'Luxury', 'Economy', 'Sport']
  },
  {
    id: 'city',
    eyebrow: '03 / City rhythm',
    title: 'The City Chapter',
    subline: 'Arrive with a different kind of energy.',
    route: ['Casablanca', 'Rabat', 'Marrakech'],
    days: 2,
    summary: 'A city-to-city itinerary idea built around thoughtful arrivals, beautiful stays and a more considered pace.',
    mood: 'City life',
    note: 'Interested in the City Chapter journey idea: Casablanca, Rabat and Marrakech.',
    pickupLocation: 'Casablanca - CMN Airport',
    categoryPriority: ['Luxury', 'Sport', 'SUV', 'Economy']
  }
];

export interface JourneyPreferences {
  journeyId: JourneyId;
  passengers: number;
  maxDailyRate: number | null;
}

export function matchJourneyCars(cars: readonly Car[], preferences: JourneyPreferences): Car[] {
  const journey = JOURNEYS.find(item => item.id === preferences.journeyId);
  if (!journey || !Number.isInteger(preferences.passengers) || preferences.passengers < 1) return [];

  return cars
    .filter(car => car.seats >= preferences.passengers)
    .filter(car => preferences.maxDailyRate === null || car.pricePerDay <= preferences.maxDailyRate)
    .sort((a, b) => {
      const aRank = journey.categoryPriority.indexOf(a.category);
      const bRank = journey.categoryPriority.indexOf(b.category);
      const ranking = (aRank < 0 ? 999 : aRank) - (bRank < 0 ? 999 : bRank);
      return ranking || a.pricePerDay - b.pricePerDay || a.name.localeCompare(b.name);
    });
}

export function indicativeTripTotal(dailyRate: number, days: number): number {
  if (!Number.isFinite(dailyRate) || dailyRate < 0 || !Number.isInteger(days) || days < 1) return 0;
  return dailyRate * days;
}
