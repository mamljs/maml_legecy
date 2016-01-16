var mdc = require('markdown-core/markdown-core-node');


function index(g, pathname, markdown) {
  var html = mdc.render(markdown);
  return [
    {
      pathname: pathname,
      data: { html: html },
      view: g.config[pathname].view,
    }
  ]
}


module.exports = {
  index: index,
};
