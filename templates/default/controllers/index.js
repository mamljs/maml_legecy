var mdc = require('markdown-core/markdown-core-node');


function index(g, config, pathname, markdown) {
  var html = mdc.render(markdown);
  return [
    {
      pathname: pathname,
      data: { html: html },
      view: config.view,
    }
  ]
}


module.exports = { 
  index: index,
};
