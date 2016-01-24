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


function Page(pathname) {
  this.pathname = pathname;
  this.markdown = file.read(pathname, 'index.md');
  var config = g.config[pathname];
  for (var attr in config) {
    this[attr] = config[attr];
  }
  this.g = g;
  this.generate = function() {
    var html = nunjucks.render(`${this.view}.html`, this);
    file.write(this.pathname, 'index.html', html);
  }
}


// generate html for every index.md
file.list().forEach(pathname => {
  var page = new Page(pathname);
  var controller = require(path.resolve(`./controllers/${page.controller}`));
  var action = controller[page.action];
  action(page);
});


console.log('Website built');
