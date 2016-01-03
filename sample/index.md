# `website.md`

`website.md` is a static website generator written in node.js. User writes in markdown + yaml, `website.md` generates html.


## notes

1. Every web page is a directory, but not vice versa.
1. Every directory contains `index.md` and `index.yaml`.
1. `index.md` is page content, `index.yaml` is page configuration.
1. `index.yaml` inherites `index.yaml` in parent directory.
1. There is n special directories:
    - `templates/` contains page templates.
       - templates are based on [mustache](https://github.com/janl/mustache.js).


## usage

Show help: `node index.js -h`

Compile: `node index.js -i sample -o output`


## sample website

**This** website
