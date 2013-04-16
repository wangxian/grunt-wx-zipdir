# grunt-wx-zipdir

> Grunt plugin , zip a directory

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wx-zipdir --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wx-zipdir');
```

### Usage Examples

```js
grunt.initConfig({
  zipdir: {
    webapp: {
      src: ['tasks/', 'test/'],
      dest: 'tmp/abc.zip',

      // zipbin: '/usr/bin/zip', // where is your zip command, default is zip in your $PATH
      exclude: ['.svn', '.DS_Store']}
  }
})
```
it will generate a zip file in : `tmp/abc.zip`


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2013/4/16 - v0.3.0 - give up node-zip package, use os zip command, generate zipfile
* 2013/4/12 - v0.2.0 - description mod.
* 2013/4/12 - v0.1.0 - Initial release.
