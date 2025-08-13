import type { IPost } from './types';

export const dummyPosts: IPost[] = [
  {
    id: '1',
    author: 'Severin',
    timestamp: '2024 August 13, 15:10:00',
    title: 'Hello Worlds',
    tags: ['travel'],
    image: '',
    content: 'I surfed',
    featured: false,
  },
  {
    id: '2',
    author: 'Severi',
    timestamp: '2025 August 13, 15:12:00',
    title: 'I  can surf',
    tags: ['travel', 'adventures'],
    image: '',
    content: 'I surfed',
    featured: false,
  },
];