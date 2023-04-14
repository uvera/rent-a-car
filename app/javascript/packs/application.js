/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// Uncomment to copy all static images under ./images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('./images', true)
// const imagePath = (name) => images(name, true)

import React, { lazy } from "react";
import "flowbite";
import "@hotwired/turbo-rails";
import ReactOnRails from "react-on-rails";
import TagInput from "../components/common/./forms/tagInput";
import { debounce } from "../util/debounce";
import ScrollToTop from "../components/common/scrollToTop";
import { ScrollDisabler as NavbarScrollDisabler } from "../components/common/navbar/scrollDisabler";
import { ImagesInput } from "../components/common/forms/imagesInput";
import * as Flowbite from "flowbite";
import { Application } from "@hotwired/stimulus";
import TransitionController from "../controllers/transitionController";
import AutoclickController from "../controllers/autoclickController";

const components = {
  "Common.Forms.LocationInput": lazy(() =>
    import("../components/common/forms/locationInput")
  ),
  "Common.Forms.ErrorEraser": lazy(() =>
    import("../components/common/forms/errorEraser")
  ),
  "Cars.ImageGallery": lazy(() => import("../components/cars/ImageGallery")),
  "Cars.CarScheduler": lazy(() => import("../components/cars/CarScheduler/CarScheduler")),
  TagInput,
  "Common.Flashes.FlashMessages": lazy(() =>
    import("../components/common/flashes/flashMessages")
  ),
  "Common.Forms.ImagesInput": lazy(() =>
    import("../components/common/forms/imagesInput").then(
      ({ ImagesInput }) => ({ default: ImagesInput })
    )
  ),
  "Common.Forms.MultiSelect": lazy(() =>
    import("../components/common/forms/multiSelect")
  ),
  "Common.Forms.SingleSelect": lazy(() =>
    import("../components/common/forms/singleSelect")
  ),
  "Common.Forms.TipTap": lazy(() =>
    import("../components/common/forms/tiptap/tipTapInput")
  ),
  "Common.Navbar.ScrollDisabler": NavbarScrollDisabler,
  "Common.ScrollToTop": ScrollToTop,
};
ReactOnRails.register(components);
ReactOnRails.setOptions({ turbo: true });

const application = Application.start();

// Configure Stimulus development experience
application.debug = false;
window.Stimulus = application;

application.register("transition", TransitionController);
application.register("autoclick", AutoclickController);

const flowbiteReinit = debounce(() => {
  Flowbite.initDropdowns();
  Flowbite.initCarousels();
  Flowbite.initModals();
  Flowbite.initAccordions();
  Flowbite.initPopovers();
  Flowbite.initTabs();
  Flowbite.initTooltips();
  Flowbite.initDrawers();
  Flowbite.initDials();
  Flowbite.initDismisses();
  Flowbite.initCollapses();
}, 100);

const debouncedHandlerForNodes = debounce(() => {
  const reactRerenderNodes = document.querySelectorAll(
    "[data-signal-react-rerender]"
  );
  if (reactRerenderNodes.length) {
    ReactOnRails.reactOnRailsPageLoaded();

    reactRerenderNodes.forEach((each) => each.remove());
  }

  const flowbiteNodes = document.querySelectorAll(
    "[data-signal-flowbite-reinit]"
  );
  if (flowbiteNodes.length) {
    flowbiteReinit();

    flowbiteNodes.forEach((each) => each.remove());
  }
}, 100);

document.addEventListener("turbo:load", flowbiteReinit);

document.addEventListener("turbo:frame-render", () => {
  flowbiteReinit();
});
document.addEventListener("turbo:before-stream-render", function (event) {
  event.target?.classList?.add("animate-fade-out-opacity-350");

  debouncedHandlerForNodes();
});

document.addEventListener("turbo:before-render", (event) => {
  event?.detail?.newBody
    ?.querySelector("main")
    ?.classList?.add("animate-fade-in-opacity-350");
});

// document.addEventListener("turbo:visit", () => {
//   let main = document.querySelector("main");
//   if (main.dataset.turboTransition == "false") return;
//
//   let [movement, scale] = ["15px", "0.99"];
//
//   if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//     [movement, scale] = ["7px", "1"];
//   }
//   main.style.transformOrigin = "50% 0%";
//   main.dataset.animatingOut = true;
//
//   main.animate(
//     [
//       { opacity: 1, transform: "translateY(0px) scale(1)" },
//       { opacity: 0, transform: `translateY(${movement}) scale(${scale})` },
//     ],
//     { duration: 300, easing: "cubic-bezier(0.45, 0, 0.55, 1)" }
//   );
//
//   Promise.all(main.getAnimations().map((animation) => animation.finished)).then(
//     () => {
//       if (main.dataset.animatingOut) main.style.visibility = "hidden";
//     }
//   );
// });
//
// document.addEventListener("turbo:load", () => {
//   let main = document.querySelector("main");
//   if (main.dataset.turboTransition == "false") return;
//
//   let [movement, scale] = ["-10px", "0.99"];
//
//   if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//     [movement, scale] = ["-5px", "1"];
//   }
//   main.style.visibility = "visible";
//   main.style.transformOrigin = "50% 0%";
//   delete main.dataset.animatingOut;
//
//   main.animate(
//     [
//       { opacity: 0, transform: `translateY(${movement}) scale(${scale})` },
//       { opacity: 1, transform: "translateY(0px) scale(1)" },
//     ],
//     { duration: 150, easing: "cubic-bezier(0.45, 0, 0.55, 1)" }
//   );
// });
