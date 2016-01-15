var program = require('commander');


program
  .version('0.0.1')
  .command('init', 'initialize a new website')
  .command('build', 'build the website', { isDefault: true })
  .parse(process.argv);
