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

export default utils;