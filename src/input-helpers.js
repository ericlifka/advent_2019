import fs from 'fs'

export const getLines = day =>
  fs.readFileSync(`data/${day}`, { encoding: "utf8" })
    .split('\n')
    .slice(0, -1);