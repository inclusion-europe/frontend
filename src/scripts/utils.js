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

export default utils;
