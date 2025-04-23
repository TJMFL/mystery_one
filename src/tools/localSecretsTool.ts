import { LocalSecret } from '../types';

// Mock local secrets/insider tips
const mockSecrets: LocalSecret[] = [
  {
    id: '1',
    title: 'The Green Mill\'s Hidden Tunnels',
    description: 'This historic jazz club has secret underground tunnels from the Prohibition era that Al Capone used. Ask the bartender for the story!',
    neighborhood: 'Uptown',
    category: 'History',
    tags: ['Jazz', 'Speakeasy', 'Al Capone']
  },
  {
    id: '2',
    title: 'Secret Pizza at The Drifter',
    description: 'This speakeasy-style bar underneath the Green Door Tavern serves amazing flatbread pizzas, but they\'re not on the regular menu. You have to know to ask for them!',
    neighborhood: 'River North',
    category: 'Food',
    tags: ['Speakeasy', 'Hidden Menu', 'Pizza']
  },
  {
    id: '3',
    title: 'Chicago Cultural Center Dome',
    description: 'The world\'s largest Tiffany glass dome is completely free to visit at the Chicago Cultural Center. Most tourists miss this hidden gem!',
    neighborhood: 'Loop',
    category: 'Architecture',
    tags: ['Free', 'Art', 'Hidden Gem']
  },
  {
    id: '4',
    title: 'The 606 Bloomingdale Trail Secrets',
    description: 'While walking The 606 elevated trail, look for small art installations hidden among the plants. There\'s a special sound installation near Damen Ave!',
    neighborhood: 'Bucktown',
    category: 'Art',
    tags: ['Outdoors', 'Walking', 'Public Art']
  }
];

export async function getLocalSecrets(params: {
  category?: string;
  neighborhood?: string;
  tags?: string[];
}): Promise<LocalSecret[]> {
  let filteredSecrets = [...mockSecrets];
  
  if (params.category) {
    filteredSecrets = filteredSecrets.filter(secret => 
      secret.category.toLowerCase() === params.category?.toLowerCase()
    );
  }
  
  if (params.neighborhood) {
    filteredSecrets = filteredSecrets.filter(secret => 
      secret.neighborhood.toLowerCase() === params.neighborhood?.toLowerCase()
    );
  }
  
  if (params.tags && params.tags.length > 0) {
    filteredSecrets = filteredSecrets.filter(secret => 
      params.tags?.some(tag => 
        secret.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
      )
    );
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return filteredSecrets;
}