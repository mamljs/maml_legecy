var mustache = require('mustache');
var mdc = require('markdown-core/markdown-core-node');
var configuration = require('./configuration');
var file = require('./file');


var layout = file.read('templates/layout.html');


// clear the old output and re-copy assets
file.reset();


function generate_html(link) {
    var config = configuration.get(link);
    var markdown = file.read(link, 'index.md');
    var html = mdc.render(markdown);
    html = mustache.render(layout, {
        content: html,
        title: config.title + config.title_suffix,
        brand: config.brand,
        navbar: config.menu.reduce((result, _link) => {
                if(link == _link) { // todo: change to starts with
                    return result +  '<li class="active"><a href="' + _link + '">' + configuration.get(_link).name + '</a></li>';
                } else {
                    return result +  '<li><a href="' + _link + '">' + configuration.get(_link).name + '</a></li>';
                }
            }, '')
    });
    file.write(link, 'index.html', html);
}


// generate html for every index.md
file.list().forEach(page => generate_html(page));
