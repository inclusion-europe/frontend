import data from '~/assets/data.json';
import useMyFetch from '~/composables/useMyFetch';

const utils = {};

utils.articlesArray = (amt = 1) => {
  const returnArray = [];

  for (let i = 0; i < amt; i++) {
    returnArray.push(data.article);
  }

  return returnArray;
};

utils.uploadFile = (file) => {
  const formData = new FormData();
  formData.append('attachment', file);

  return useMyFetch('upload', {
    method: 'POST',
    body: formData,
  }).then((res) => res);
};

utils.uniquesInArray = (arr) => {
  const outputArray = arr.filter(
    (v, i, self) => i === self.indexOf(v)
    // It returns the index of the first
    // instance of each value
  );

  return outputArray;
};

utils.isEmptyStr = (str) => !str.replace(/\s/g, '').length;

utils.indicatorScoreColour = (score) => {
  if (Number.isNaN(score)) {
    return '#1E1E1E';
  }

  if (score < 3) return '#c00000';
  if (score < 5) return '#ff9900';
  if (score < 7) return '#dfdf03';
  if (score < 9) return '#92d050';
  return '#00b050';
};

utils.treatPosts = (posts) =>
  posts.map((post) => {
    const toReturn = post;
    toReturn.picture = JSON.parse(post.picture);
    return toReturn;
  });

utils.treatPost = (res) => {
  const post = res;
  post.picture = JSON.parse(post.picture);
  post.content = unescape(post.content);
  post.content_e2r =
    typeof post.content_e2r === 'string'
      ? JSON.parse(post.content_e2r)
      : post.content_e2r;
  post.tags = typeof post.tags === 'string' ? post.tags.split(',') : post.tags;

  return post;
};

utils.scoreRoundFn = (score) => Math.round(score * 10) / 10;

utils.averageFn = (row, fields) => {
  const arr = fields
    .map((field) => row.scores[field]?.score)
    .filter((a) => ![null, undefined, false].includes(a));

  return utils.scoreRoundFn(
    arr.reduce((a, b) => utils.scoreRoundFn(a) + utils.scoreRoundFn(b), 0) /
      arr.length
  );
};

utils.indicatorEvolution = (
  country,
  year,
  score,
  indicator,
  years,
  isAverageCell = false,
  fields = null
) => {
  if (!years.includes((year - 1).toString())) return undefined;

  const datasets = require.context('@/assets/datasets/', false, /\.json$/);
  const previousYearSet = datasets(`./inclusion-indicators-${year - 1}.json`);

  const previousYearData = previousYearSet.data.find(
    (datapoint) => datapoint.country === country
  );

  if (!previousYearData) {
    return undefined;
  }

  if (!isAverageCell) {
    if (!(indicator in previousYearData.scores)) {
      return undefined;
    }

    return (
      utils.scoreRoundFn(score) -
      utils.scoreRoundFn(previousYearData.scores[indicator].score)
    );
  }

  return score - utils.averageFn(previousYearData, fields);
};

utils.formatDate = (unixTime) =>
  new Intl.DateTimeFormat('fr').format(new Date(unixTime));

utils.youtubeParser = (url) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

export default utils;
