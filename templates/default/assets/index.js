mermaid.ganttConfig = {
  axisFormatter: [
    ['%Y-%m-%d', function(d) {
      return d.getDay() == 1;
    }]
  ]
};


$(function() { // todo: options use max width
  mermaid.init(undefined, $('article.markdown-body .mermaid'));
});
