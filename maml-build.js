var R = require('ramda');
var program = require('commander');
var nunjucks = require('nunjucks');
var mdc = require('markdown-core/markdown-core-node');
var configuration = require('./configuration');
var file = require('./file');


program
  .version(require('./package.json').version)
  .option('-o, --output <output>', 'specify output directory')
  .parse(process.argv);


var g = global;


// default output directory is 'dist'
g.output = program.output || 'dist';


// set template engine defaults
nunjucks.configure('views', { autoescape: false });


// reset output
file.clean();
file.copyAssets();


// read all configurations files
g.config = {};
file.list().forEach(pathname => {
  g.config[pathname] = configuration.get(pathname);
});


// generate html for every index.md
file.list().forEach(pathname => generate_html(pathname));


// generate html page for a pathname
function generate_html(pathname) {
  var config = g.config[pathname];
  var markdown = file.read(pathname, 'index.md');
  var html = mdc.render(markdown);
  html = nunjucks.render(`${config.view}.html`, R.merge({
    g: g,
    pathname: pathname,
    html: html,
  }, config));
  file.write(pathname, 'index.html', html);
}


console.log('Website built');
