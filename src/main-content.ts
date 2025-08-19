import "./css/style.css";
// import { v4 as generateId } from "uuid";
import * as Storage from "./data-access";
import type { IPost } from "./interfaces";
import { formatTimestamp, calcTimeRead, renderTags } from "./shared-functions";
import { buildPostPage } from "./blogpost-show";

if (!Storage.checkDataExists()) Storage.addToLocalStorage();

const mainContent = document.querySelector<HTMLElement>(".content")!;
const postsContainer = document.querySelector<HTMLElement>(".posts-inner")!;
const featuredSection =
  document.querySelector<HTMLElement>(".featured-articles")!;
const featuredPostsContainer =
  featuredSection.querySelector<HTMLElement>(".featured-inner")!;

mainContent.addEventListener("click", (e) => openPost(e));

let postsShown = 0;

if (Storage.checkPostByKey(location.pathname)) {
  const post: IPost = Storage.getPostByPath(location.pathname)!;
  postsContainer.innerHTML = "";
  postsContainer.insertAdjacentElement("beforeend", buildPostPage(post));
} else if (location.pathname.includes("tags")) {
  initPostsFeed(10, location.pathname.split("tags/").pop());
} else {
  initPostsFeed(4);
  initFeaturedPosts();
}

// #################### Functions bellow ####################

function initPostsFeed(nrOfPosts: number = 2, tag?: string): void {
  postsContainer.innerHTML = "";

  let posts: IPost[] = Storage.getAllPosts().filter((p) => !p.featured);

  if (tag) {
    posts = posts.filter((p) => p.tags?.includes(tag));
  }
  console.log(posts.length);
  const postsToShow = posts.slice(0, postsShown + nrOfPosts);
  postsToShow.forEach((post) => {
    console.log(post.tags);

    const postEl = createPostRefEl(post);
    postsContainer.insertAdjacentElement("beforeend", postEl);
  });

  postsShown += nrOfPosts;

  handleLoadMoreButton(posts.length, nrOfPosts);
}

export function initFeaturedPosts(): void {
  const featuredPosts = Storage.getAllPosts().filter((p) => p.featured);
  featuredPostsContainer.innerHTML = "";

  featuredPosts.forEach((post) => {
    const postEl = createFeaturedRefEl(post);
    featuredPostsContainer.insertAdjacentElement("beforeend", postEl);
  });

  if (featuredPosts.length > 3) {
    initFeaturedCarousel(featuredPostsContainer);
  }
}

function createPostRefEl(post: IPost): HTMLElement {
  const el = document.createElement("article");
  el.id = post.slug;

  const tags: string[] = ["post"];
  if (post.tags) tags.push(...post.tags);

  el.classList.add(...tags);

  el.innerHTML = /*html*/ `
    <p class="date-ref">${formatTimestamp(post.timestamp)}</p>
    <p class="title-ref">${post.title}</p>
    <p class="timeRead-ref">${calcTimeRead(post.content.length)} min read</p>
  `;

  return el;
}

function createFeaturedRefEl(post: IPost): HTMLElement {
  const el = document.createElement("article");
  el.id = post.slug;

  const tags: string[] = ["post", "feature"];
  if (post.tags) tags.push(...post.tags);
  el.classList.add(...tags);

  el.innerHTML = /*html*/ `
    <figure class="img-ref"><img src="${post.image}" alt="${post.title}"></figure>
    <p class="title-ref">${post.title}</p>
  `;

  return el;
}

function handleLoadMoreButton(totalPosts: number, postsNr: number): void {
  let loadBtn = document.querySelector<HTMLButtonElement>(".load-more-btn");
  if (!loadBtn) {
    loadBtn = document.createElement("button");
    loadBtn.className = "load-more-btn";
    loadBtn.innerText = "Load More";
    loadBtn.addEventListener("click", () => initPostsFeed(postsNr));
    postsContainer.insertAdjacentElement("afterend", loadBtn);
  }

  loadBtn.style.display = postsShown >= totalPosts ? "none" : "inline-block";
}

function openPost(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const postEl = target.closest<HTMLElement>(".post");
  if (postEl === null) return;

  const post: IPost = Storage.getPostByPath(postEl.id)!;

  location.replace(post.slug);
}

function createMaterialButton(
  iconName: string,
  className: string = "material-symbols-outlined"
): HTMLSpanElement {
  const btn = document.createElement("button");
  const icon = document.createElement("span");
  icon.className = className;
  icon.innerText = iconName;
  btn.insertAdjacentElement("afterbegin", icon);
  return btn;
}

function initFeaturedCarousel(inner: HTMLElement) {
  const container = inner.parentElement!;

  const prevBtn = createMaterialButton("arrow_circle_left");
  container.insertAdjacentElement("afterbegin", prevBtn);

  const nextBtn = createMaterialButton("arrow_circle_right");
  container.insertAdjacentElement("beforeend", nextBtn);

  let scrollIndex = 0;

  function scrollToIndex(index: number) {
    const child = inner.children[index] as HTMLElement;
    if (!child) return;
    inner.scrollTo({ left: child.offsetLeft - 300, behavior: "smooth" });
  }

  nextBtn.onclick = () => {
    if (scrollIndex < inner.children.length - 3) {
      prevBtn.classList.remove("deactivate");
      scrollIndex++;
      scrollToIndex(scrollIndex);
    } else {
      nextBtn.classList.add("deactivate");
    }
  };

  prevBtn.onclick = () => {
    if (scrollIndex > 0) {
      nextBtn.classList.remove("deactivate");
      scrollIndex--;
      scrollToIndex(scrollIndex);
    } else {
      prevBtn.classList.add("deactivate");
    }
  };
}
