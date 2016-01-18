var R = require('ramda');
var program = require('commander');
var nunjucks = require('nunjucks');
var path = require('path');
var configuration = require('./configuration');
var file = require('./file');


program
  .version(require('./package.json').version)
  .option('-o, --output <output>', 'specify output directory')
  .parse(process.argv);


var g = global;
// default output directory is 'dist'
g.output = program.output || 'dist';
// read all configurations files
g.config = {};
file.list().forEach(pathname => {
  g.config[pathname] = configuration.get(pathname);
});


// set template engine defaults
nunjucks.configure('views', { autoescape: false });


// reset output
file.clean();
file.copyAssets();


// generate html for every index.md
file.list().forEach(pathname => dispatch(pathname));


function Page(pathname) {
  this.pathname = pathname;
  this.markdown = file.read(pathname, 'index.md');
  const config = g.config[pathname];
  for (var attr in config) {
    this[attr] = config[attr];
  }
  this.g = g;
  this.html = 'hello world';
  this.generate = function() {
    const html = nunjucks.render(`${this.view}.html`, this);
    file.write(this.pathname, 'index.html', html);
  }
}


// process a pathname
function dispatch(pathname) {
  var page = new Page(pathname);
  const controller = require(path.resolve(`./controllers/${page.controller}`));
  const action = controller[page.action];
  action(page);
}


console.log('Website built');
