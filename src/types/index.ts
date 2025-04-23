// Guest types
export interface Guest {
  id: string;
  name: string;
  email: string;
  tripStart: Date | null;
  tripEnd: Date | null;
  preferences: string[];
  guestSlug: string;
  propertyId: string;
}

// Property types
export interface Property {
  id: string;
  name: string;
  address: string;
  checkinInfo: string;
  doorCode: string;
  standardNotes: string;
}

// Message types
export interface Message {
  id: string;
  guestId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// Tool types
export interface Tool {
  name: string;
  description: string;
  execute: (params: any) => Promise<any>;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  price: string;
  category: string;
  link: string;
}

// Restaurant types
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  priceRange: string;
  neighborhood: string;
  address: string;
  reservationLink: string;
}

// Local Secret types
export interface LocalSecret {
  id: string;
  title: string;
  description: string;
  neighborhood: string;
  category: string;
  tags: string[];
}