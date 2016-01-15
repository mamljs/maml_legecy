## notes

1. Every `index.md` file in input directory is a web page.
1. Every `index.md` has an accompany `index.yml` as configuration file.
1. `index.yml` inheirts and overrides `index.yml` in ancestor directories.
1. Views' template engine is [nunjucks](https://github.com/mozilla/nunjucks).


## three directories

1. model
1. view
1. site


## sample website

**This** website


## 实现思路

1. 每一个配置项，具体什么含义，最终解释权还得看template是如何写的。
1. 菜单和子页面，得靠配置文件配置，否则不会出现在页面上。 不排除用户创建了页面，但是并不想给它创建链接。
1. 改名为 maml markdown + yaml, 中文名 马猫儿
    1. 全局配置文件 maml.yml, 配置输入和输出目录
        1. content, templates, output
1. 是否 每个 index.md 再搭配一个 template.html 文件？
1. 要能够添加可执行文件到系统bin目录
1. js, css, image 这些放到什么地方？
    1. 跟 index.md 当到同一个目录


## todo

1. try Typyscript
    1. before that, use as much ES6 as possible


## 约定俗成

1. 相对url前后都包含'/'，比如 '/download/', '/blog/', 主页的话是 '/'
    1. 这些写法是错误的: 'download' '/download', 'blog/', '//'
1. 所有的页面都对应文件夹，而不是 html 文件, 比如 '/download/'
    1. 这些写法是错误的：'download.html'， '/download.htm'
