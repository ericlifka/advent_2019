export const parseInteger = str => parseInt(str, 10);

export const reduceSum = (prev, cur) => prev + cur

export const reduceCountOccurance = (searchElem) =>
  (sum, cur) =>
    searchElem === cur
      ? sum + 1
      : sum

export const ascending = (l, r) => l - r
export const descending = (l, r) => r - l

export const splitter = (splitStr = '') =>
  str => str.split(splitStr)