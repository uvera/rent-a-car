export default function () {
    const foundElements = document.querySelectorAll('[data-feature-toast]')
    foundElements.forEach(element => element.remove())
}