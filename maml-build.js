var R = require('ramda');
var program = require('commander');
var nunjucks = require('nunjucks');
var path = require('path');
var mdc = require('markdown-core/markdown-core-node');
var configuration = require('./configuration');
var file = require('./file');


program
  .version(require('./package.json').version)
  .option('-o, --output <output>', 'specify output directory')
  .parse(process.argv);


var g = global;
g.mdc = mdc;
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


// process a pathname
function dispatch(pathname) {
  var markdown = file.read(pathname, 'index.md');
  var config = g.config[pathname];
  var controller = require(path.resolve(`./controllers/${config.controller}`));
  var action = controller[config.action];
  action(g, pathname, markdown).forEach((page) => {
    var data = R.merge(config, { g: g, pathname: page.pathname, markdown: markdown });
    data = R.merge(data, page.data);
    var html = nunjucks.render(`${page.view}.html`, data);
    file.write(page.pathname, 'index.html', html);
  });
}


console.log('Website built');
