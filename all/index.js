var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generators');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));
  this.dirs = 'scripts styles'.split(' ');
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.createDirLayout = function createDirLayout() {
  var self = this;
  this.dirs.forEach(function(dir) {
    self.log.create('app/' + dir);
    self.mkdir(path.join('app/', dir));
  });
};

Generator.prototype.createJsFiles = function createJsFiles() {
  this.template('scripts/app.js', 'app/scripts/app.js');

  // AB : this would be more elegantly handled with
  // file globbing, but given the limited number
  // of files, opting to hardcode instead of
  // introduce another dependency (node-glob?)

  this.libfiles = 'ember-1.0.0-RC-1.min.js handlebars-1.0.rc-2.js jquery-1.9.1.min.js'.split(' ');
  var self = this;
  this.libfiles.forEach(function(file) {
    self.template('scripts/libs/' + file, 'app/scripts/libs/' + file);
  });
};

Generator.prototype.createIndexFile = function createIndexFile() {
  this.template('index.html', 'app/index.html');
};

Generator.prototype.createStyleFile = function createStyleFile() {
  this.template('styles/style.css', 'app/styles/style.css');
};

Generator.prototype.createGruntFile = function createGruntFile() {
  this.template('Gruntfile.js', 'Gruntfile.js');
};
