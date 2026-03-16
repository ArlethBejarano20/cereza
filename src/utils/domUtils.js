export function renderInRoot(html) {
  const root = document.getElementById("app-root");
  if (!root) return;
  root.innerHTML = "";
  if (typeof html === "string") {
    root.innerHTML = html;
  } else if (html instanceof HTMLElement) {
    root.appendChild(html);
  }
}

export function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}
