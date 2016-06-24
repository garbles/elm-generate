const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const template = require('lodash/template')
const File = require('vinyl')
const vfs = require('vinyl-fs')
const through = require('through2')

const generateOutputPath = require('./lib/generateOutputPath')

const help = `
  Usage
    $ elm generate <name>

  Options
    -t, --type     Type of module. Either html, util or native. (default: html)
    -s, --src      Relative location of source folder (default: src)
    -o, --output   The output file location (default: parsed from module name)

  Examples
    $ elm generate MyModule -t html
    $ elm generate MyModule.MyUtil -t util -s farts
    $ elm generate MyModule.MyNativeUtil -t native
`

const alias = {
  s: 'src',
  t: 'type',
  o: 'output'
}

const cli = meow(help, {alias})
const moduleType = cli.flags.type || 'html'

const noInput = cli.input.length === 0
const invalidType = ['html', 'util', 'native'].indexOf(moduleType) < 0

if (noInput || invalidType) {
  cli.showHelp()
} else {
  const rootDir = process.cwd()
  const moduleName = cli.input[0]
  const srcDir = path.join(rootDir, cli.flags.src || 'src')
  const isNative = moduleType === 'native'
  const templateFile =
    isNative
      ? path.join(__dirname, 'templates/native.js')
      : path.join(__dirname, `templates/${moduleType}.elm`)
  const outputPath =
    cli.flags.output
      ? path.join(rootDir, cli.flags.output)
      : generateOutputPath(moduleName, srcDir, isNative)
  const context = {moduleName}

  vfs.src(templateFile)
    .pipe(through.obj(function (file, enc, cb) {
      const contents = template(file.contents.toString(enc))(context)

      const next = new File({
        path: outputPath,
        contents: new Buffer(contents)
      })

      console.log(chalk.green(`Created ${outputPath}`))

      this.push(next)
      cb()
    }))
    .pipe(vfs.dest(rootDir))
}
