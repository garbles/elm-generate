'use strict';

var path = require('path');
var meow = require('meow');
var chalk = require('chalk');
var template = require('lodash/template');
var File = require('vinyl');
var vfs = require('vinyl-fs');
var through = require('through2');

var generateOutputPath = require('./lib/generateOutputPath');

var help = '\n  Usage\n    $ elm generate <name>\n\n  Options\n    -t, --type     Type of module. Either html, util or native. (default: html)\n    -s, --src      Relative location of source folder (default: src)\n    -o, --output   The output file location (default: parsed from module name)\n\n  Examples\n    $ elm generate MyModule -t html\n    $ elm generate MyModule.MyUtil -t util -s farts\n    $ elm generate MyModule.MyNativeUtil -t native\n';

var alias = {
  s: 'src',
  t: 'type',
  o: 'output'
};

var cli = meow(help, { alias: alias });
var moduleType = cli.flags.type || 'html';

var noInput = cli.input.length === 0;
var invalidType = ['html', 'util', 'native'].indexOf(moduleType) < 0;

if (noInput || invalidType) {
  cli.showHelp();
} else {
  (function () {
    var rootDir = process.cwd();
    var moduleName = cli.input[0];
    var srcDir = path.join(rootDir, cli.flags.src || 'src');
    var isNative = moduleType === 'native';
    var templateFile = isNative ? path.join(__dirname, 'templates/native.js') : path.join(__dirname, 'templates/' + moduleType + '.elm');
    var outputPath = cli.flags.output ? path.join(rootDir, cli.flags.output) : generateOutputPath(moduleName, srcDir, isNative);
    var context = { moduleName: moduleName };

    vfs.src(templateFile).pipe(through.obj(function (file, enc, cb) {
      var contents = template(file.contents.toString(enc))(context);

      var next = new File({
        path: outputPath,
        contents: new Buffer(contents)
      });

      console.log(chalk.green('Created ' + outputPath));

      this.push(next);
      cb();
    })).pipe(vfs.dest(rootDir));
  })();
}