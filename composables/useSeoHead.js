import utils from '~/scripts/utils';

const siteUrl = 'https://www.inclusion.eu';
const fallbackImage = 'https://str.inclusion.eu/5a26bd9ba60fa87b430d4df09.jpeg';
const fallbackDescription =
  'Ambitions. Rights. Belonging. 20 million people with intellectual disabilities and their families in Europe.';

export const createSeoSnapshot = ({
  post,
  defaultTitle,
  path,
  description = fallbackDescription,
  image = fallbackImage,
  normalize = false,
}) => {
  if (!post) {
    return {
      title: defaultTitle,
      description,
      socialImage: image,
      socialImageAlt: 'Illustration for Inclusion Europe article',
      canonicalUrl: `${siteUrl}${path}`,
      publishedTime: null,
      modifiedTime: null,
    };
  }

  const normalizedPost = normalize ? utils.treatPost(post) : post;
  const title = normalizedPost.title
    ? `${normalizedPost.title} | ${defaultTitle}`
    : defaultTitle;
  const resolvedDescription =
    normalizedPost.excerpt?.trim() || description;
  const socialImage = normalizedPost.picture?.picture || image;
  let socialImageAlt = 'Illustration for Inclusion Europe article';
  if (normalizedPost.picture?.alt) {
    socialImageAlt = normalizedPost.picture.alt;
  } else if (normalizedPost.title) {
    socialImageAlt = `Picture for ${normalizedPost.title}`;
  }

  return {
    title,
    description: resolvedDescription,
    socialImage,
    socialImageAlt,
    canonicalUrl: `${siteUrl}${path}`,
    publishedTime: normalizedPost.created_at || null,
    modifiedTime: normalizedPost.modified_at || null,
  };
};

export const snapshotToPageMeta = (snapshot) => ({
  title: snapshot.title,
  link: [
    {
      key: 'canonical',
      rel: 'canonical',
      href: snapshot.canonicalUrl,
    },
  ],
  meta: [
    {
      key: 'description',
      name: 'description',
      content: snapshot.description,
    },
    {
      key: 'og:title',
      property: 'og:title',
      content: snapshot.title,
    },
    {
      key: 'og:description',
      property: 'og:description',
      content: snapshot.description,
    },
    {
      key: 'og:image',
      property: 'og:image',
      content: snapshot.socialImage,
    },
    {
      key: 'og:image:alt',
      property: 'og:image:alt',
      content: snapshot.socialImageAlt,
    },
    {
      key: 'og:url',
      property: 'og:url',
      content: snapshot.canonicalUrl,
    },
    {
      key: 'og:type',
      property: 'og:type',
      content: 'article',
    },
    snapshot.publishedTime
      ? {
          key: 'article:published_time',
          property: 'article:published_time',
          content: snapshot.publishedTime,
        }
      : null,
    snapshot.modifiedTime
      ? {
          key: 'article:modified_time',
          property: 'article:modified_time',
          content: snapshot.modifiedTime,
        }
      : null,
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      key: 'twitter:title',
      name: 'twitter:title',
      content: snapshot.title,
    },
    {
      key: 'twitter:description',
      name: 'twitter:description',
      content: snapshot.description,
    },
    {
      key: 'twitter:image',
      name: 'twitter:image',
      content: snapshot.socialImage,
    },
  ].filter(Boolean),
});

export const buildSeoHeadPayload = (params) => {
  const snapshot = createSeoSnapshot(params);
  return snapshotToPageMeta(snapshot);
};
