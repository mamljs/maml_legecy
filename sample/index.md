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
1. `name` and `title`. `name` is required, it's used as page link name. `title` is optional, it's used as page title.  If `title` is missing, then by default it is the same as `name`.


## usage

Show help: `node index.js -h`

Compile: `node index.js -i sample -o output`


## sample website

**This** website


## 实现思路

1. 遍历整个树形文件夹结构，形成一个大的数据结构。后续的操作都基于这个大的数据结构进行，不再读取文件。
