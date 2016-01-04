var fs = require('fs');
var path = require('path');
var mkdirp = require("mkdirp");
var program = require('commander');
var exec = require('child_process').exec;


program.version('0.0.1')
    .option('-i, --input [path]', 'Path to the input directory')
    .option('-o, --output [path]', 'Path to the output directory')
    .parse(process.argv);


function reset() {
    exec('rm -rf ' + program.output + '/*', function(error, stdout, stderr) {
        exec('cp -r node_modules/markdown-core/dist ' + path.join(program.output, 'dist'), function(error, stdout, stderr) {
            exec('rm ' + path.join(program.output, 'dist/markdown-core.min.js'));
        });
    });
}


function read(relative_path) {
    var absolute_path = path.join(program.input, relative_path);
    return fs.readFileSync(absolute_path, 'utf8');
}


function write(relative_path, content) {
    var absolute_path = path.join(program.output, relative_path);
    mkdirp(path.dirname(absolute_path), function (err) {
        fs.writeFileSync(absolute_path, content);
    });
}


module.exports = {
    reset: reset,
    read: read,
    write: write
};
