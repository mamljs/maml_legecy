function index(g, pathname, markdown) {
  var html = g.mdc.render(markdown);
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
