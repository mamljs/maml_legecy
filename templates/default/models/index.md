## notes

1. Every `index.md` file in input directory is a web page.
1. Every `index.md` has an accompany `index.yml` as configuration file.
1. `index.yml` inheirts and overrides `index.yml` in ancestor directories.
1. Views' template engine is [nunjucks](https://github.com/mozilla/nunjucks).


## directories

1. models
1. views
1. dist


## conventions

1. pathname starts with and ends with `/`
    1. example: '/', '/download/', '/blog/'
    1. wrong: 'download' '/download', 'blog/'
1. each page is a directory, not file
    1. example: '/download/', '/blog/'
    1. wrong: '/download.html'， '/blog.htm'
