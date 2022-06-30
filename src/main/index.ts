import http from 'http'
import fs from 'fs'

const PORT = process.env.PORT || 5858

export const server = http
  .createServer((req, res) => {
    const stream = fs.createReadStream(`${__dirname}/../../requirements/CNAB.txt`)
    stream.pipe(res)
  })
  .listen(PORT, () => console.log(`Server is running at ${PORT}`))
