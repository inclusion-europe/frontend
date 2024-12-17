import data from '@/assets/data.json';
import axios from './axios';

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

    return axios.post('upload', formData).then((res) => res.data);
};

utils.uniquesInArray = (arr) => {
    const outputArray = arr.filter(
        (v, i, self) => i === self.indexOf(v),
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

utils.findOtherCountryIndicatorYears = (years, country) => {
    const returnedYears = [];
    const datasets = require.context('@/assets/datasets/', false, /\.json$/);
    years.forEach((year) => {
        const yearlySet = datasets(`./inclusion-indicators-${year}.json`);

        const dataForThatYear = yearlySet.data.find(
            (datapoint) => datapoint.country === country,
        );
        if (dataForThatYear) {
            returnedYears.push(year);
        }
    });

    return returnedYears;
};

utils.indicatorEvolution = (country, year, score, indicator, years) => {
    if (!years.includes((year - 1).toString())) return undefined;

    const datasets = require.context('@/assets/datasets/', false, /\.json$/);
    const previousYearSet = datasets(`./inclusion-indicators-${year - 1}.json`);

    const previousYearData = previousYearSet.data.find(
        (datapoint) => datapoint.country === country,
    );

    if (!previousYearData || !(indicator in previousYearData.scores)) {
        return undefined;
    }

    return (
        Math.round(score * 10) / 10 -
        Math.round(previousYearData.scores[indicator].score * 10) / 10
    );
};

export default utils;
