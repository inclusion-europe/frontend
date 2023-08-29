import data from '@/assets/data.json'

const utils = {}

utils.articlesArray = (amt = 1) => {
  let returnArray = []

  for (let i = 0; i < amt; i++) {
    returnArray.push(data.article)
  }

  return returnArray;
}

export default utils;