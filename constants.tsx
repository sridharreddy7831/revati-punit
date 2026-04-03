
import { WeddingEvent } from './types';

export const COLORS = {
  primary: '#B76E79', // Deep Maroon
  secondary: '#D4AF37', // Gold
  accent: '#FF8C00', // Dark Orange/Saffron
  background: '#0A1C14', // Old Lace
  text: '#FDF5E6', // Darker Maroon for text
};

export const WEDDING_DATE = new Date('2026-04-23T09:30:00');

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'muhurtham',
    name: 'ಶುಭ ಮುಹೂರ್ತ (Shubha Muhurtam',
    date: 'April 23, 2026',
    time: '09:30 AM to 10:00 AM',
    venue: 'Spoorthi Resort, Vijayapura, Karnataka',
    description: 'The sacred moment of union where Revati & Punitkumar tie the knot in the presence of family and the divine.',
    icon: '/kalasam.png',
    color: '#B76E79'
  },
  {
    id: 'reception',
    name: 'ಆರತಕ್ಷತೆ (Reception)',
    date: 'April 23, 2026',
    time: '11:30 AM onwards',
    venue: 'Spoorthi Resort, Vijayapura, Karnataka',
    description: 'Join us for a grand celebration and lunch following the wedding ceremony.',
    icon: '/reception.png',
    color: '#D4AF37'
  }
];

export const SLOKAS = [
  "ಕಲ್ಯಾಣ ಮಂಟಪಾರೂಡೌ ಪಾರ್ವತಿ ಪರಮೇಶ್ವರೌ॥",
  "ದಿವ್ಯಾಲಂಕರಣೋಪೇತೌ ರಕ್ಷೀತಾಂಚ ವಧು ವರೌ॥"
];

export const HORIZONTAL_IMAGES = [
  { url: '/6.jpg' },
  { url: '/1.jpg' },
  { url: '/2.jpg' },
  { url: '/11.jpg' },
  { url: '/9.jpg' },
  { url: '/12.jpg' },
  { url: '/10.jpg' },
  { url: '/1.jpg' },
  { url: '/2.jpg' },
];

export const VERTICAL_IMAGES = [
  { url: '/7.jpg' },
  { url: '/3.jpg' },
  { url: '/5.jpg' },
  { url: '/4.jpg' },
  { url: '/13.jpg' },
];

