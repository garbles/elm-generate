# Elm Generate

## Wat?

Generates boilerplate code for Elm modules. Once Elm has support for macros (or something), then this library will probably be useless.

## Installing

```
npm install elm-generate -g
```

## Using

```
$ node bin/index.js --help

  Because Elm doesn't do code generation yet.

  Usage
    $ elm-generate <name>

  Options
    -t, --type     Type of module. Either html, util or native. (default: html)
    -s, --src      Relative location of source folder (default: src)
    -o, --output   The output file location (default: parsed from module name)

  Examples
    $ elm-generate MyModule -t html
    $ elm-generate MyModule.MyUtil -t util -s farts
    $ elm-generate MyModule.MyNativeUtil -t native
```
