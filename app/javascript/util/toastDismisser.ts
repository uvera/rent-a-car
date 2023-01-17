export default function () {
  setTimeout(() => {
    const foundElements = document.querySelectorAll("[data-feature-toast]");
    foundElements.forEach((element) => element.remove());
  }, 2500);
}
