import suite1 from "@/assets/suite-1.jpg";
import suite2 from "@/assets/suite-2.jpg";
import suite3 from "@/assets/suite-3.jpg";

export interface Property {
  id: string;
  name: string;
  apt: string;
  tagline: string;
  image: string;
  guests: number;
  beds: number;
  baths: number;
  size: string;
  wId: string;
  wTkn: string;
  features: string[];
}

const addDays = (isoDate: string, days: number): string => {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export const buildBookingUrl = (
  wId: string,
  wTkn: string,
  { checkIn, nights, adults = 4 }: { checkIn?: string; nights?: number; adults?: number } = {}
): string => {
  const base = `https://booking-directly.com/widgets/${wTkn}/properties/unit-selection`;
  if (!checkIn || !nights) return base;
  const checkOut = addDays(checkIn, Number(nights));
  const stayDates = JSON.stringify({ checkInDate: checkIn, checkOutDate: checkOut });
  const occupancies = JSON.stringify([{ numberOfAdults: adults, children: [] }]);
  return `${base}?search_stay_dates=${encodeURIComponent(stayDates)}&search_occupancies=${encodeURIComponent(occupancies)}`;
};

export const properties: Property[] = [
  {
    id: "place",
    name: "Trafford Garden Place",
    apt: "Apt 307",
    tagline: "Stylish sanctuary with garden views",
    image: suite1,
    guests: 4,
    beds: 2,
    baths: 1,
    size: "45m²",
    wId: "51136",
    features: ["Fast WiFi", "Free Parking", "Smart TV", "Full Kitchen", "Roof Lounge", "Communal Lobby Area"],
    wTkn: "YjqTdY7DQXvKiQLFXO5iwMh9SsI57AjAhc0w8SRPmg9y5EV4H2cqvcpTsMUZS",
  },
  {
    id: "stays",
    name: "Trafford Garden Stays",
    apt: "Apt B201",
    tagline: "Modern comfort with city outlook",
    image: suite2,
    guests: 4,
    beds: 2,
    baths: 1,
    size: "45m²",
    features: ["Fast WiFi", "Free Parking", "Smart TV", "Full Kitchen", "Roof Lounge", "Communal Lobby Area"],
    wId: "51137",
    wTkn: "g55Rw37uc69AvZfAdvOQUIHlhNJdrI6zeNKnegjbQwDFy6ZoxlA1TbPZXgsYq",
  },
  {
    id: "retreat",
    name: "Trafford Garden Retreat",
    apt: "Apt 311",
    tagline: "Elegant space near the stadium",
    image: suite3,
    guests: 4,
    beds: 2,
    baths: 1,
    size: "45m²",
    features: ["Fast WiFi", "Free Parking", "Smart TV", "Full Kitchen", "Roof Lounge", "Communal Lobby Area"],
    wId: "51064",
    wTkn: "pgeudzTyAB8Sv85wLebZAsZW50ieoUr6LW8AHOGs08wRaSukIPkQPsINV8eI2",
  },
];

export const shuffleProperties = (): Property[] => {
  const arr = [...properties];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
