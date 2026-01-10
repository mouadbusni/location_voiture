
import { Car, CarCategory, Transmission, FuelType } from './types';

export const MOROCCAN_CITIES = [
  "Casablanca - CMN Airport",
  "Marrakech - RAK Airport",
  "Rabat - RBA Airport",
  "Tangier - TNG Airport",
  "Agadir - AGA Airport",
  "Fez - FEZ Airport"
];

export const FLEET: Car[] = [
  {
    id: '1',
    name: 'Range Rover Vogue',
    brand: 'Land Rover',
    category: CarCategory.LUXURY,
    pricePerDay: 2500,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.DIESEL,
    seats: 5,
    image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=1200',
    videoUrl: 'https://videos.pexels.com/video-files/3843105/3843105-uhd_2560_1440_30fps.mp4',
    description: 'The ultimate desert navigator. Commanding presence meets unparalleled Moroccan comfort.',
    specs: { hp: 400, acceleration: '6.3s', topSpeed: '225 km/h' }
  },
  {
    id: '2',
    name: 'Porsche 911 Carrera',
    brand: 'Porsche',
    category: CarCategory.SPORT,
    pricePerDay: 4500,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.PETROL,
    seats: 2,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    videoUrl: 'https://videos.pexels.com/video-files/5502127/5502127-uhd_2560_1440_25fps.mp4',
    description: 'Master the coastal curves of the Atlantic with precision engineering.',
    specs: { hp: 385, acceleration: '4.2s', topSpeed: '293 km/h' }
  },
  {
    id: '3',
    name: 'Mercedes-Benz G63 AMG',
    brand: 'Mercedes-AMG',
    category: CarCategory.SUV,
    pricePerDay: 6000,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.PETROL,
    seats: 5,
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1200',
    videoUrl: 'https://videos.pexels.com/video-files/5048667/5048667-uhd_2560_1440_30fps.mp4',
    description: 'From the Atlas peaks to the city streets of Casablanca, dominate every terrain.',
    specs: { hp: 585, acceleration: '4.5s', topSpeed: '220 km/h' }
  },
  {
    id: '4',
    name: 'Audi RS e-tron GT',
    brand: 'Audi',
    category: CarCategory.SPORT,
    pricePerDay: 3800,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.ELECTRIC,
    seats: 4,
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1200',
    description: 'The future of Moroccan luxury. Silent power for the modern visionary.',
    specs: { hp: 637, acceleration: '3.3s', topSpeed: '250 km/h' }
  },
  {
    id: '5',
    name: 'BMW 7 Series',
    brand: 'BMW',
    category: CarCategory.LUXURY,
    pricePerDay: 3200,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.DIESEL,
    seats: 5,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
    description: 'A sanctuary on wheels. Experience the pinnacle of executive travel.',
    specs: { hp: 286, acceleration: '5.8s', topSpeed: '250 km/h' }
  },
  {
    id: '6',
    name: 'Toyota Land Cruiser 300',
    brand: 'Toyota',
    category: CarCategory.SUV,
    pricePerDay: 1800,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.DIESEL,
    seats: 7,
    image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=1200',
    description: 'Unmatched reliability for grand expeditions through the Sahara.',
    specs: { hp: 304, acceleration: '6.7s', topSpeed: '210 km/h' }
  }
];
