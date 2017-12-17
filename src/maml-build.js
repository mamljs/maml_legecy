const program = require('commander')
const nunjucks = require('nunjucks')
const path = require('path')
const configuration = require('./configuration')
const file = require('./file')

program
  .version(require('../package.json').version)
  .option('-o, --output <output>', 'specify output directory')
  .parse(process.argv)

const g = global
// default output directory is 'dist'
g.output = program.output || 'dist'
// read all configurations files
g.config = {}
file.list().forEach(pathname => {
  g.config[pathname] = configuration.get(pathname)
})

// set template engine defaults
nunjucks.configure('views', { autoescape: false })

file.copyAssets()

function Page (pathname) {
  this.pathname = pathname
  this.markdown = file.read(pathname, 'index.md')
  const config = g.config[pathname]
  for (const attr in config) {
    this[attr] = config[attr]
  }
  this.g = g
  this.generate = function () {
    const html = nunjucks.render(`${this.view}.html`, this)
    file.write(this.pathname, 'index.html', html)
  }
}

// generate html for every index.md
file.list().forEach(pathname => {
  const page = new Page(pathname)
  const controller = require(path.resolve(`./controllers/${page.controller}`))
  const action = controller[page.action]
  action(page)
})

console.log('Website built')
