export interface IPost {
  id: string;
  author: string;
  timestamp: string;
  title: string;
  tags: string[];
  image: string;
  content: string;
  featured: boolean;
}
