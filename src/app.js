const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const path = require('path')
const route = require('./helper/route')
const openUrl = require('./helper/openUrl')
const getPort = require('get-port')

class Server {
  constructor (config) {
    this.conf = Object.assign({}, conf, config)
  }

  start() {
    getPort({port: this.conf.port}).then(port => {
      this.conf.port = port
      const server = http.createServer((req, res) => {
        const filePath = path.join(this.conf.root, req.url)
        route(req, res, filePath, this.conf)
      }).listen(this.conf.port, _ => {
        const addr = `http://${this.conf.hostname}:${this.conf.port}`
        console.info(`Server start at ${chalk.green(addr)}`)
        openUrl(addr)
      })
    })
  }
}

module.exports = Server