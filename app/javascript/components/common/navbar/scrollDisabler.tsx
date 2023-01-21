import { useEffect } from "react";

const ScrollDisabler = (props: { parentSelector: string }) => {
  const targetNode = document.querySelector(props.parentSelector);
  const config: MutationObserverInit = { attributes: true };
  const callback: MutationCallback = (mutationList, _) => {
    mutationList.forEach((mutation) => {
      if (mutation.type !== "attributes") {
        return;
      }
      if (targetNode.classList.contains("hidden")) {
        document.body.classList.remove("overflow-hidden");
      } else {
        document.body.classList.add("overflow-hidden");
      }
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  useEffect(() => {
    return () => observer.disconnect();
  }, []);

  return null;
};

export { ScrollDisabler };
