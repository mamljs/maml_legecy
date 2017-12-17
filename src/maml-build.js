const program = require('commander')
const nunjucks = require('nunjucks')
const path = require('path')
const configuration = require('./configuration')
const file = require('./file')

program
  .version(require('../package.json').version)
  .option('-o, --output <output>', 'specify output directory')
  .parse(process.argv)

// default output directory is 'dist'
const output = program.output || 'dist'
// read all configurations files
const configs = {}
file.list().forEach(pathname => {
  configs[pathname] = configuration.get(pathname)
})

// set template engine defaults
nunjucks.configure('views', { autoescape: false })

file.copyAssets(output)

function Page (pathname) {
  this.pathname = pathname
  this.markdown = file.read(pathname, 'index.md')
  const config = configs[pathname]
  for (const attr in config) {
    this[attr] = config[attr]
  }
  this.configs = configs
  this.generate = function () {
    const html = nunjucks.render(`${this.view}.html`, this)
    file.write(output, this.pathname, 'index.html', html)
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
