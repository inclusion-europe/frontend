export default defineNuxtPlugin(() => {
  // Set default meta tags that will be used if no specific meta tags are set
  const config = useRuntimeConfig();
  
  useHead({
    titleTemplate: (title) => {
      return title ? title : config.public.defaultTitle;
    },
    meta: [
      {
        name: 'description',
        content: 'Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.'
      },
      {
        property: 'og:site_name',
        content: 'Inclusion Europe'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:locale',
        content: 'en_EU'
      },
      {
        name: 'twitter:site',
        content: '@inclusioneurope'
      },
      {
        name: 'twitter:creator',
        content: '@inclusioneurope'
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: () => `https://www.inclusion.eu${useRoute().path}`
      }
    ]
  });
});