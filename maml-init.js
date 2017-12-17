var program = require('commander')
var exec = require('child_process').exec

program
  .version(require('./package.json').version)
  .option('-t, --template <template>', 'specify website template')
  .parse(process.argv)

// default template is 'default'
var template = program.template || 'default'

// copy template content into current folder and run `npm install`
exec(`wget https://github.com/mamljs/maml-template-${template}/archive/master.zip
      unzip master.zip
      cp -r maml-template-${template}-master/assets .
      cp -r maml-template-${template}-master/controllers .
      cp -r maml-template-${template}-master/models .
      cp -r maml-template-${template}-master/views .
      cp -r maml-template-${template}-master/package.json .
      rm -rf master.zip && rm -rf maml-template-${template}-master
      npm install`,
  (err) => {
    console.log(err || 'Website initialized')
  }
).stdout.pipe(process.stdout) // real time output

console.log(`Website initializing with template '${template}'`)
