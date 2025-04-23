import { Restaurant } from '../types';

// Mock restaurant data
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Purple Pig',
    description: 'Mediterranean-inspired small plates',
    cuisine: 'Mediterranean',
    priceRange: '$$$',
    neighborhood: 'Magnificent Mile',
    address: '444 N Michigan Ave, Chicago, IL 60611',
    reservationLink: 'https://www.opentable.com/the-purple-pig'
  },
  {
    id: '2',
    name: 'Girl & The Goat',
    description: 'Celebrity chef Stephanie Izard\'s innovative small plates',
    cuisine: 'New American',
    priceRange: '$$$',
    neighborhood: 'West Loop',
    address: '809 W Randolph St, Chicago, IL 60607',
    reservationLink: 'https://www.opentable.com/girl-and-the-goat'
  },
  {
    id: '3',
    name: 'Lou Malnati\'s',
    description: 'Classic Chicago deep dish pizza',
    cuisine: 'Pizza',
    priceRange: '$$',
    neighborhood: 'River North',
    address: '439 N Wells St, Chicago, IL 60654',
    reservationLink: 'https://www.loumalnatis.com/reservations'
  }
];

export async function findRestaurants(params: {
  cuisine?: string;
  neighborhood?: string;
  priceRange?: string;
}): Promise<Restaurant[]> {
  // In a real app, this would query an API
  let filteredRestaurants = [...mockRestaurants];
  
  if (params.cuisine) {
    filteredRestaurants = filteredRestaurants.filter(restaurant => 
      restaurant.cuisine.toLowerCase().includes(params.cuisine?.toLowerCase() || '')
    );
  }
  
  if (params.neighborhood) {
    filteredRestaurants = filteredRestaurants.filter(restaurant => 
      restaurant.neighborhood.toLowerCase().includes(params.neighborhood?.toLowerCase() || '')
    );
  }
  
  if (params.priceRange) {
    filteredRestaurants = filteredRestaurants.filter(restaurant => 
      restaurant.priceRange === params.priceRange
    );
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return filteredRestaurants;
}

export async function bookRestaurant(restaurantId: string, params: {
  date: Date;
  partySize: number;
}): Promise<string> {
  // In a real app, this would integrate with OpenTable or Resy API
  // For now, just return the reservation link
  const restaurant = mockRestaurants.find(r => r.id === restaurantId);
  
  if (!restaurant) {
    throw new Error('Restaurant not found');
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return restaurant.reservationLink;
}