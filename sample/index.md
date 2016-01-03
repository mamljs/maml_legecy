# `website.md`

`website.md` is a static website generator. User writes in markdown + yaml, `website.md` generates html.


## notes

1. `*.md` contains page content.
1. `*.yaml` contains configuration.
1. for every directory, there is a `index.md`.
1. for every `*.md`, there is a `*.yaml` with the same name.
1. `*.yaml` inherits `index.yaml` in the same directory.
1. `index.yaml` inherites `index.yaml` in parent directory.


## usage

Show help: `node index.js -h`

Compile: `node index.js -i sample -o output`


## sample website

**This** website
