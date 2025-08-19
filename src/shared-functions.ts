export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);

  return date.toLocaleDateString("en-US", {
    //weekday: "short",
    month: "short",
    day: "2-digit",
  });
}

export function calcTimeRead(postlength: number) {
  return Math.ceil(postlength / 320);
}

export function renderTags(tags: string[]): string {
  return tags
    .map(tag => `<a href="/tags/${tag.trim()}" class="tag">${tag.trim()}</a>`)
    .join(" ");
}
