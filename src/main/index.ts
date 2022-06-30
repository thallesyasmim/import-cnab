import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(`${__dirname}/../../requirements/CNAB.txt`)
  stream.pipe(res)
})

server.listen(5858)
