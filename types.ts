
export enum CarCategory {
  ECONOMY = 'Economy',
  LUXURY = 'Luxury',
  SUV = 'SUV',
  SPORT = 'Sport'
}

export enum Transmission {
  AUTOMATIC = 'Automatic',
  MANUAL = 'Manual'
}

export enum FuelType {
  DIESEL = 'Diesel',
  PETROL = 'Petrol',
  ELECTRIC = 'Electric'
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: CarCategory;
  pricePerDay: number;
  transmission: Transmission;
  fuel: FuelType;
  seats: number;
  image: string;
  videoUrl?: string;
  specs: {
    hp: number;
    acceleration: string;
    topSpeed: string;
  };
  description: string;
}

export interface BookingDetails {
  carId: string;
  pickupLocation: string;
  returnLocation: string;
  startDate: string;
  endDate: string;
  extras: {
    driver: boolean;
    premiumInsurance: boolean;
    gps: boolean;
    babySeat: boolean;
  };
}
