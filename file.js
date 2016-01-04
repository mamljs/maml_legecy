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


function read() {
    var absolute_path = program.input;
    for(var i = 0; i < arguments.length; i++) {
        absolute_path = path.join(absolute_path, arguments[i]);
    }
    return fs.readFileSync(absolute_path, 'utf8');
}


function write() {
    var content = arguments[arguments.length - 1];
    var absolute_path = program.output;
    for(var i = 0; i < arguments.length - 1; i++) {
        absolute_path = path.join(absolute_path, arguments[i]);
    }
    mkdirp(path.dirname(absolute_path), function (err) {
        fs.writeFileSync(absolute_path, content);
    });
}


module.exports = {
    reset: reset,
    read: read,
    write: write
};