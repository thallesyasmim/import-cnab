import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
  fs.readFile(`${__dirname}/../../requirements/CNAB.txt`, (err, data) => {
    res.end(data)
  })
})

server.listen(5858)
