import http from 'http'
import fs from 'fs'
import { Stream } from 'stream'

const PORT = process.env.PORT || 5858

export const server = http
  .createServer((req, res) => {
    const stream = fs.createReadStream(`${__dirname}/../../requirements/CNAB.txt`)

    const writableStream = new Stream.Writable()
    writableStream._write = (chunk, enconding, next) => {
      console.log(chunk.toString())
      next()
    }

    stream.pipe(writableStream)
  })
  .listen(PORT, () => console.log(`Server is running at ${PORT}`))
