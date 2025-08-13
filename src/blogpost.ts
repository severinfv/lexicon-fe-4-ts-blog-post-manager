// maybe blogpost html element

export function buildPostPage(postId: string): HTMLElement {

    const post = JSON.parse(postId)

    const date = new Date(post.timestamp).toDateString();
    const timeRead = Math.ceil(post.content.length/320);

    const newPostPageEl = document.createElement('article');


    newPostPageEl.innerHTML = /*html*/ `
        <div class="postInfo">
            <p class="date">${date}</p>
            <p class="timeRead">${timeRead} min read</p>
            <p class ="tags">${post.tags}</p>
        </div>
        <div class="contentInfo">
            <h1 class="title">${post.title}</h1>
            <figure class="imgMain">
                <img src=${post.image}/>
            </figure>
            <p class="content">${post.content}</p>
            <p class="author">Published by: ${post.author}</p>
        </div>
        <div class="editMenu">
            <button class="like-btn" type="button">
            <span class="material-symbols-outlined">heart_check</span>
            </button>
            <button class="edit-btn" type="button">
            <span class="material-symbols-outlined">edit_square</span>
            </button>
        </div>
    `;

    newPostPageEl.addEventListener('click', (e) => editPostOnClick(e));

    return newPostPageEl;
}

function editPostOnClick(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const todoEl = target.closest<HTMLElement>('.editMenu');
    if (todoEl === null) return;

    if (target.closest('.like-btn')) console.log("liked");
    if (target.closest('.edit-btn')) console.log("edited");
}