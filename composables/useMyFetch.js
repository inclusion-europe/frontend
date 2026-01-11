import { useRuntimeConfig } from '#app';

export default (request, opts = {}) => {
  // Only call useRuntimeConfig if in a Nuxt context
  let baseURL = undefined;
  try {
    const config = useRuntimeConfig();
    baseURL = config.public?.backendUrl || config.backendUrl;
  } catch (e) {
    // Not in Nuxt context, fallback to env or default
    baseURL = process.env.NUXT_PUBLIC_BACKEND_URL || '/';
  }
  return $fetch(request, { baseURL, ...opts });
};
