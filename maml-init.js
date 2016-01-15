var path = require('path');
var exec = require('child_process').exec;


var template = 'default'; // todo: read template name from argv


var current_path = path.resolve('.'); // current directory
exec(`
  cp ${__dirname}/templates/maml.yml ${current_path}/
  cp -r ${__dirname}/templates/${template}/layout ${current_path}/
  cp -r ${__dirname}/templates/${template}/content ${current_path}/
`);


console.log(`Website initialized at ${current_path}`);
