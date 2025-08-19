export interface IPost {
  id: string;
  author: string;
  timestamp: number;
  title: string;
  tags: string[];
  image: string;
  content: string;
  featured: boolean;
  slug: string
}

/*
interface IPostCollab extends IPost
{
  author2: string
} */