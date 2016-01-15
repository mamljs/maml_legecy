var program = require('commander');
var nunjucks = require('nunjucks');
var mdc = require('markdown-core/markdown-core-node');
var configuration = require('./configuration');
var file = require('./file');


program
  .version('1.0.0')
  .option('-o, --output <output>', 'specify output directory')
  .parse(process.argv);


// default output directory is 'dist'
global.output = program.output || 'dist';


// set template engine defaults
nunjucks.configure('views', { autoescape: false });


// clean output
file.clean();


// read all configurations files
var configs = {};
file.list().forEach(pathname => {
  configs[pathname] = configuration.get(pathname);
});


// generate html for every index.md
file.list().forEach(pathname => generate_html(pathname));


// generate html page for a pathname
function generate_html(pathname) {
  var config = configs[pathname];
  var markdown = file.read(pathname, 'index.md');
  var html = mdc.render(markdown);
  html = nunjucks.render(config.view, {
    configs: configs,
    pathname: pathname,
    config: config,
    markdown: markdown,
    html: html,
  });
  file.write(pathname, 'index.html', html);
}


console.log('Website built');
