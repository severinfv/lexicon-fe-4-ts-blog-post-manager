import './css/style.css';
import { v4 as generateId } from 'uuid';
import { dummyPosts } from './data'
import type { IPost } from './types';

const blogPostAreaEl = document.querySelector<HTMLElement>('.posts')!;

//const newPostEl = createNewPostEl(newPost);
//postListEl.insertAdjacentElement('afterbegin', newPostEl);

populateBlogWithPosts();

blogPostAreaEl.addEventListener('click', (e) => openPost(e));


// #################### Functions below ####################


function createNewPostEl(post: IPost): HTMLElement {
    const { id, author, timestamp, title, tags, images, content, featured } = post;
    const classes = ['post'];

    if (tags) {
        for (let tag of tags) {
            classes.push(tag);
        }
    }

    const newPostEl = document.createElement('article');

    const date = new Date(timestamp);
    const timeRead = Math.ceil(content.length/320);

    newPostEl.id = String(id);
    newPostEl.classList.add(...classes);

    /* href="${title.replace(/\s+/g, '-').toLowerCase()}"  */

    newPostEl.innerHTML = /*html*/ `
    <p class="date">${date.toDateString()}</p>
    <p class="title">${title}</p>
    <p class="time">${timeRead} min read</p>

    `;
    localStorage.setItem(id,  JSON.stringify(post));


    return newPostEl;
}

function populateBlogWithPosts(): void {
  dummyPosts.forEach((p) => {
    blogPostAreaEl.insertAdjacentElement('beforeend', createNewPostEl(p));
  });
}

function openPost(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const postEl = target.closest<HTMLElement>('.post');
    if (postEl === null) return;


    let postString = localStorage.getItem(postEl.id)!;

    let post = JSON.parse(postString)

   // location.replace("/mynewpost");

    blogPostAreaEl.innerHTML = /*html*/ `
        <h1>${post.title}</h1>

`;


}