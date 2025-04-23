import { Event } from '../types';

// Mock events data - in a real app, this would come from an API
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Chicago Jazz Festival',
    description: 'Annual free admission festival featuring jazz performances at various venues',
    date: new Date('2025-08-26'),
    location: 'Millennium Park',
    price: 'Free',
    category: 'Music',
    link: 'https://www.chicago.gov/city/en/depts/dca/supp_info/chicago_jazz_festival.html'
  },
  {
    id: '2',
    title: 'Cubs vs. White Sox',
    description: 'Crosstown Classic baseball game',
    date: new Date('2025-07-15'),
    location: 'Wrigley Field',
    price: '$45-$250',
    category: 'Sports',
    link: 'https://www.mlb.com/cubs'
  },
  {
    id: '3',
    title: 'Art Institute After Dark',
    description: 'Evening access to exhibits with cocktails and music',
    date: new Date('2025-06-18'),
    location: 'Art Institute of Chicago',
    price: '$30',
    category: 'Art',
    link: 'https://www.artic.edu/'
  }
];

export async function getLocalEvents(params: { 
  date?: Date;
  category?: string;
  neighborhood?: string;
}): Promise<Event[]> {
  // In a real app, this would query an API with the params
  // For now, we'll just filter our mock data
  
  let filteredEvents = [...mockEvents];
  
  if (params.date) {
    // Filter by date (just checking the day for simplicity)
    filteredEvents = filteredEvents.filter(event => 
      event.date.getDate() === params.date?.getDate() &&
      event.date.getMonth() === params.date?.getMonth() &&
      event.date.getFullYear() === params.date?.getFullYear()
    );
  }
  
  if (params.category) {
    filteredEvents = filteredEvents.filter(event => 
      event.category.toLowerCase() === params.category?.toLowerCase()
    );
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return filteredEvents;
}