import type { IPost } from "./interfaces";
import { editPostPage } from "./blogpost-edit";
import { formatTimestamp, calcTimeRead, renderTags } from "./shared-functions";
import { savePost } from "./data-access";

export function buildPostPage(post: IPost): HTMLElement {
  const coverAreaEl = document.querySelector<HTMLElement>(".cover")!;
  const featuredEl = document.querySelector<HTMLElement>(".featured-articles")!;
  featuredEl.classList.add("reverse");


  const newPostPageEl = document.createElement("article");
  newPostPageEl.id = post.id;
  newPostPageEl.classList.add("blogpost");

  const postContentEl = post.content
    .split("\n")
    .map((line) => line.trim())
    .map((line) => `<p>${line}</p>`)
    .join("");

  coverAreaEl.innerHTML = /*html*/ `
        <div class="postMeta">
            <p class="date">${formatTimestamp(post.timestamp)}</p>
            <p class="timeRead">${calcTimeRead(post.content.length)} min read</p>
            <p class ="tags">${renderTags(post.tags)}</p></div>
        <div class="postTitle"><h1>${post.title}</h1>
        <div class="editMenu">
           <button class="like-btn" type="button">
            <span class="material-symbols-outlined like-span">heart_check</span>
            </button> 
            <button class="edit-btn" type="button">
            <span class="material-symbols-outlined">edit_square</span>
            </button>
            </div></div>
`;

  newPostPageEl.innerHTML = /*html*/ `
        <div class="postBody">
            <figure class="imgMain">
                <img src="${post.image}"/>
            </figure>
            <div class="textMain">${postContentEl}</div>
            <p class="authorMain">Published by: ${post.author}</p>
        </div>
        
    `;

 post.featured 
 ? coverAreaEl.querySelector<HTMLElement>(".like-span")!.classList.remove("deactivate") 
 : coverAreaEl.querySelector<HTMLElement>(".like-span")!.classList.add("deactivate");


  coverAreaEl.addEventListener("click", (e) => editPostOnClick(e, post));

  return newPostPageEl;
}

function editPostOnClick(event: MouseEvent, post: IPost): void {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const editEl = target.closest<HTMLElement>(".editMenu");
  if (editEl === null) return;
  if (target.closest(".edit-btn")) editPostContent(post);
  if (target.closest(".like-btn"))  {
        post.featured = !post.featured
        savePost(post);
post.featured ?  target.classList.remove("deactivate") 
 : target.classList.add("deactivate");
  }
}

function editPostContent(post: IPost): void {
  const blogPostAreaEl = document.querySelector<HTMLElement>(".content")!;
  blogPostAreaEl.innerHTML = ``;
  blogPostAreaEl.insertAdjacentElement("afterbegin", editPostPage(post));
}
