// constants/Events.ts
export type Event = {
  id: string;
  title: string;
  category: 'sports' | 'concerts' | 'campus';
  description: string;
  image: string; // URL or local asset
};

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Campus Soccer Match',
    category: 'sports',
    description: 'Come cheer for the campus team!',
    image: 'https://picsum.photos/200/300?random=1',
  },
  {
    id: '2',
    title: 'Live Concert',
    category: 'concerts',
    description: 'Enjoy live music near Foggy Bottom.',
    image: 'https://picsum.photos/200/300?random=2',
  },
  {
    id: '3',
    title: 'Student Meetup',
    category: 'campus',
    description: 'Meet new people and join clubs.',
    image: 'https://picsum.photos/200/300?random=3',
  },
  // Add at least 2-3 more events per category
];