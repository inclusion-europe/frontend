export default (request, opts) => {
  const config = useRuntimeConfig();

  return $fetch(request, { baseURL: config.public.backendUrl, ...opts });
};
