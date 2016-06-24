# Elm Generate

## Wat?

Generates [boilerplate code](https://github.com/garbles/elm-generate/blob/master/src/templates/html.elm) for Elm modules. Once Elm has support for macros (or something), then this library will probably be useless.

## Installing

```
npm install elm-generate -g
```

## Using

```
$ elm-generate --help

  Because Elm doesn't do code generation yet.

  Usage
    $ elm-generate <name>

  Options
    -t, --type     Type of module. Either html, util or native. (default: html)
    -s, --src      Relative location of source folder (default: src)
    -o, --output   The output file location (default: parsed from module name)

  Examples
    $ elm-generate MyModule -t html
    $ elm-generate My.Deeply.Nested.Module -s src/My
    $ elm-generate MyModule.MyUtil -t util -o Farts.elm
    $ elm-generate MyModule.MyNativeUtil -t native
```
