import fs from 'fs'

export const getLines = day =>
  fs.readFileSync(`data/${day}`, { encoding: "utf8" })
    .split('\n')
    .slice(0, -1);

export const getLine = day =>
  getLines(day)[ 0 ]
