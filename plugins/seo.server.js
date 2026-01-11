export default defineNuxtPlugin(() => {
  // Set default meta tags on server side
  useHead({
    meta: [
      {
        name: 'description',
        content:
          'Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.',
      },
      {
        property: 'og:description',
        content:
          'Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.',
      },
      {
        property: 'og:image',
        content: 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg',
      },
      {
        property: 'og:site_name',
        content: 'Inclusion Europe',
      },
      {
        property: 'og:locale',
        content: 'en_EU',
      },
      {
        name: 'twitter:site',
        content: '@inclusioneurope',
      },
      {
        name: 'twitter:creator',
        content: '@inclusioneurope',
      },
    ],
  });
});
