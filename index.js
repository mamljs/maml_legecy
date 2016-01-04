var yaml = require('js-yaml');
var mustache = require('mustache');
var mdc = require('markdown-core/markdown-core-node');
var configuration = require('./configuration');
var file = require('./file');


var layout = file.read('templates/layout.html');


file.reset();


function generate_page(link) {
    var config = configuration.get(link);
    var markdown = file.read(link, 'index.md');
    var html = mdc.render(markdown);
    html = mustache.render(layout, {
        content: html,
        title: config.title + config.title_suffix,
        brand: config.brand,
        navbar: config.menu.reduce(function(result, _link){
                return result +  '<li><a href="' + _link + '">' + configuration.get(_link).name + '</a></li>'
            }, '')
    });
    file.write(link, 'index.html', html);
}



generate_page('/blog/');
generate_page('/download/');
generate_page('/');



// function generate_home_page() {
//     var config = configuration.get('/');
//     var markdown = file.read('index.md');
//     var html = mdc.render(markdown);
//     html = mustache.render(layout, {
//         content: html,
//         title: config.title + config.title_suffix,
//         brand: config.name,
//         navbar: config.menu.map(function(link) {
//                 return '<li><a href="/' + link + '/">' + link + '</a></li>';
//             }).join('')
//     });
//     file.write('index.html', html);
//
//     config.menu.forEach(link =>  generate_level_one_page(link));
// }
//
//
// function generate_level_one_page(link) {
//     var config = yaml.safeLoad(file.read('index.yaml'));
//     var markdown = file.read(link + '/index.md');
//     var html = mdc.render(markdown);
//     var html = mustache.render(layout, {
//         content: html,
//         title: link + config.title_suffix,
//         brand: config.name,
//         navbar: config.menu.map(function(_link) {
//                 if(link == _link) {
//                     return '<li class="active"><a href="/' + _link + '/">' + _link + '</a></li>';
//                 } else {
//                     return '<li><a href="/' + _link + '/">' + _link + '</a></li>';
//                 }
//             }).join('')
//     });
//     file.write(link + '/index.html', html);
// }
//
// generate_home_page();
