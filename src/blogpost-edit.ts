import type { IPost } from "./interfaces";
import * as Storage from './data-access';

export function editPostPage(post: IPost): HTMLFormElement {

  localStorage.setItem("tmp", JSON.stringify(post));
  const tmpPost: IPost = JSON.parse(localStorage.getItem("tmp")!);

  const newEditPageEl = document.createElement("form");
  newEditPageEl.className  = "edit-form";

  const inputTitle = document.createElement("input");
  inputTitle.value = post.title;
  inputTitle.dataset.field = "title";


  const inputTags = document.createElement("input");
  inputTags.value = post.tags.toString();
  inputTags.dataset.field = "tags";

  const inputImg = document.createElement("input");
  inputImg.value = post.image;
  inputImg.dataset.field = "image";


  const inputText = document.createElement("textarea");
  inputText.value = post.content;
  inputText.dataset.field = "content";

  const inputAuthor = document.createElement("input");
  inputAuthor.value = post.author;
  inputAuthor.dataset.field = "author";

  const submitButton = document.createElement("button");
  submitButton.className  = "save-btn";
  submitButton.type  = "button";
  submitButton.innerText = "Save Post";

  newEditPageEl.append(inputTitle, inputTags, inputImg, inputText, inputAuthor, submitButton);

   newEditPageEl.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const field = target.dataset.field;
    if (!field) return;
    saveTempOnChange(target.value, tmpPost, field);
  });

  newEditPageEl.addEventListener('click', (e) => savePostOnClick(e, tmpPost, post.slug));
  
  return newEditPageEl;
}

function saveTempOnChange(value: string, tmp: IPost, field: string): void {

    if (field == "tags") {
        tmp.tags = value.split(/[\s,]+/).map(tag => tag.trim()).filter(tag => tag.length > 0);
    } else if (field == "title") {
        tmp.title = value
        tmp.slug =  `/${tmp[field].replace(/\s+/g, '-').toLowerCase()}`
    }

    else {
        tmp[field] = value;
    }
    Storage.savePost(tmp, "tmp");
}

function savePostOnClick(event: MouseEvent, tmpPost: IPost, postKey: string, mainKey: string = "posts"): void {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.closest('.save-btn')) {
        tmpPost.timestamp = Date.now()

        if (tmpPost.slug != postKey) {
             Storage.deletePost(postKey, mainKey);
        }

        Storage.savePost(tmpPost, mainKey);
        localStorage.removeItem("tmp")
        location.assign(tmpPost.slug); 
        console.log(tmpPost.content)
    }
}

