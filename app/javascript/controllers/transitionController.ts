import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.element.classList.add("animate-in", "fade-in", "duration-700");
  }
}
