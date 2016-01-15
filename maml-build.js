var fs = require('fs');
var yaml = require('js-yaml');
var nunjucks = require('nunjucks');
var mdc = require('markdown-core/markdown-core-node');
var configuration = require('./configuration');
var file = require('./file');


// load global maml configuration
global.maml = yaml.safeLoad(fs.readFileSync('maml.yml', 'utf8'));
// todo: apply default maml configuration if null


// set template engine defaults
nunjucks.configure(global.maml.layout, { autoescape: false });


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
  html = nunjucks.render(config['layout'], {
    pathname: pathname,
    config: config,
    markdown: markdown,
    html: html,
    configs: configs,
  });
  file.write(pathname, 'index.html', html);
}


console.log(`Website generated`);
