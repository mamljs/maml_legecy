var program = require('commander');
var path = require('path');
var exec = require('child_process').exec;


program
  .version('1.0.0')
  .option('-t, --template <template>', 'website template')
  .parse(process.argv);


var template = program.template || 'default';


var current_path = path.resolve('.'); // current directory
exec(`
  cp ${__dirname}/templates/maml.yml ${current_path}/
  cp -r ${__dirname}/templates/${template}/layout ${current_path}/
  cp -r ${__dirname}/templates/${template}/content ${current_path}/
`, (err) => {
  if(err != null) {
    console.log(err);
  }
});


console.log(`Website initialized at ${current_path}`);
