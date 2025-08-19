import type { IPost } from "./interfaces";
import { dataPosts } from "./data/data";

export function getAllPosts(key: string = "posts"): IPost[] {
  const data = localStorage.getItem(key);
  if (!data) return [];

  const parsed = JSON.parse(data);
  return Array.isArray(parsed) ? parsed : [parsed];
}

export function saveAllPosts(posts: IPost[], key: string = "posts"): void {
  localStorage.setItem(key, JSON.stringify(posts));
}

export function checkDataExists(key: string = "posts"): boolean {
  return getAllPosts(key).length > 0;
}

export function checkPostByKey(slug: string, key: string = "posts"): boolean {
  return getAllPosts(key).some((p) => p.slug === slug);
}

export function getPostByPath(
  slug: string,
  key: string = "posts"
): IPost | undefined {
  return getAllPosts(key).find((p) => p.slug === slug);
}

export function getPostsByTag(tag: string, key: string = "posts"): IPost[] {
  return getAllPosts(key).filter((p) => p.tags?.includes(tag));
}

export function getPostsByAuthor(author: string, key: string = "posts"): IPost[] {
  return getAllPosts(key).filter((p) => p.author?.includes(author));
}

export function savePost(post: IPost, key: string = "posts"): void {
  if (key === "tmp") {
    localStorage.setItem("tmp", JSON.stringify(post));
    return;
  }

  const posts = getAllPosts(key);

  const index = posts.findIndex((p) => p.id === post.id);

  if (index >= 0) {
    posts[index] = post;
  } else {
    posts.push(post);
  }

  saveAllPosts(posts, key);
}

export function deletePost(slug: string, key: string = "posts"): void {
  const posts = getAllPosts(key).filter((p) => p.slug !== slug);
  saveAllPosts(posts, key);
}

export function addToLocalStorage(min: number = 0, max: number = 10): void {
  const postsToStore = dataPosts.slice(min, max);
  const existingPosts = getAllPosts();
  const mergedPosts = [...existingPosts, ...postsToStore];
  saveAllPosts(mergedPosts);
}
