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
import "tw-elements";
import * as Flowbite from "flowbite";
import "@hotwired/turbo-rails";
import ReactOnRails from "react-on-rails";
import TagInput from "../components/common/./forms/tagInput";
import ToastDismisser from "../components/common/configurations/toastDismisser";
import { debounce } from "../util/debounce";
import { ToastCloseButton } from "../components/common/toastCloseButton";
import ScrollToTop from "../components/common/scrollToTop";
import { ScrollDisabler as NavbarScrollDisabler } from "../components/common/navbar/scrollDisabler";
import { ImagesInput } from "../components/common/forms/imagesInput";

const components = {
  TagInput,
  "Configuration.ToastDismisser": ToastDismisser,
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
  "Common.ToastCloseButton": ToastCloseButton,
  "Common.Forms.TipTap": lazy(() =>
    import("../components/common/forms/tiptap/tipTapInput")
  ),
  "Common.Navbar.ScrollDisabler": NavbarScrollDisabler,
  "Common.ScrollToTop": ScrollToTop,
};
ReactOnRails.register(components);
ReactOnRails.setOptions({ turbo: true });

const turboReloadJs = () => {
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
};

const debouncedHandlerForNodes = debounce(() => {
  const nodes = document.querySelectorAll("[data-signal-react-rerender]");
  if (nodes.length) {
    ReactOnRails.reactOnRailsPageLoaded();

    nodes.forEach((each) => each.remove());
  }
}, 100);

document.addEventListener("turbo:load", turboReloadJs);
document.addEventListener("turbo:before-stream-render", function () {
  debouncedHandlerForNodes();
});
