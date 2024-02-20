import data from '@/assets/data.json'
import axios from './axios'

const utils = {}

utils.articlesArray = (amt = 1) => {
  let returnArray = []

  for (let i = 0; i < amt; i++) {
    returnArray.push(data.article)
  }

  return returnArray;
}

utils.uploadFile = (file) => {
    let formData = new FormData();
    formData.append("attachment", file);

    return axios.post("upload", formData).then((res) => {
      return res.data
    });
}

utils.uniquesInArray = (arr) => {
  let outputArray = arr.filter(function (v, i, self) {

      // It returns the index of the first
      // instance of each value
      return i == self.indexOf(v);
  });

  return outputArray;
}

utils.isEmptyStr = (str) => {
    return !str.replace(/\s/g, '').length
}

utils.indicatorScoreColour = (score) => {
  if (isNaN(score)) {
    return '#1E1E1E'
  }

  if (score < 3) return '#c00000';
  if (score < 5) return '#ff9900';
  if (score < 7) return '#dfdf03';
  if (score < 9) return '#92d050';
  return '#00b050'
}

export default utils;