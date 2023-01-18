const useCsrf = () => {
  const token = document.querySelector<HTMLMetaElement>(
    "meta[name='csrf-token']"
  ).content;
  const param = document.querySelector<HTMLMetaElement>(
    "meta[name='csrf-param']"
  ).content;
  return { token, param };
};

export { useCsrf };
