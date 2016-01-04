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
1. page could be hidden, which means won't appear in menu


## usage

Show help: `node index.js -h`

Compile: `node index.js -i sample -o output`


## sample website

**This** website


## 实现思路

1. 遍历整个树形文件夹结构，形成一个大的数据结构。后续的操作都基于这个大的数据结构进行，不再读取文件。
1. 要做到以下几点：
    - 给定任意页面，能够按顺序列出它的子页面
    - 给定任意页面，能够获取它的任意属性。（name, path, title, markdown 等等）
1. 只要有 `index.md` 和 `index.yaml` 就要执行编译动作。 但是这个页面不一定会出现在 menu 列表中。
1. underscore `_.assign(dst, source)` 可以轻易实现配置的继承
    - `console.log(_.assign({a: 1, c: [1,2,3]}, {b: 2, c: [2,3,4]}));`
1. 配置文件还要支持json格式。 貌似yaml是json的超集？ 所以parse的时候全部当作yaml就可以了。


## todo

1. try Typyscript
    1. before that, use as much ES6 as possible


## 约定俗成

1. 相对url前后都包含‘／’，比如 '/download/', '/blog/', 主页的话是 '/'。
    1. 这些写法是错误的: 'download' '/download', 'blog/', '//'
1. 所有的页面都对应文件夹，而不是 html 文件, 比如 '/download/'
    1. 这些写法是错误的：'download.html'， ‘／download.htm’
