var program = require('commander');
var exec = require('child_process').exec;


program
  .version('1.0.0')
  .option('-t, --template <template>', 'specify website template')
  .parse(process.argv);


// default template is 'default'
var template = program.template || 'default';


// copy initial content to the new website
exec(`cp -r ${__dirname}/templates/${template}/* .`, (err) => {
  if(err != null) {
    console.log(err);
  }
});


console.log('Website initialized');
