# grunt-connect-delay v0.1.0

This plugin provides a delay middleware for Grunt Connect / Express. It can be
used for introducing artificial delays before proxying certain URLs based on
RegExp rules.

## Getting started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

### Options

##### rulesProvider
Type: `String`

Default value: `connect.delay`

This is the config section in the Gruntfile from where the delay rules will be
read.

##### Rule's format:

`{url: '__from__', delay: __milliseconds__}`

Where:
 * `__from__`: RegExp string to match
 * `__milliseconds__`: The delay in milliseconds to introduce before proceeding with proxying


#### Usage

In your project's Gruntfile:
 * Include the `delayRequest` snippet
 * Add a section named `delay` to your existing Connect definition.
 * Load the plugin: `grunt.loadNpmTasks('grunt-connect-delay')`

```js
var delayRequestSnippet = require('grunt-connect-delay/lib/utils').delayRequest;
grunt.initConfig({
    connect: {
        delay: [
            { url: '^/api/.*$', delay: 10000 } // Delay calls to API by 10sec
        ],
        dev: {
            options: {
                middleware: function (connect) {
                    return [
                           delayRequestSnippet
                      // , rewriteRequestSnippet
                      // , proxyRequestSnippet
                      // , connect.static(path.resolve(dir))
                    ];
                }
            }
        }
    },
    /* Optional */
    configureDelay: {
        options: {
            rulesProvider: 'connect.delay'
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-connect-delay');
```

Though I haven't tested it, it should work in a similar fashion with
`grunt-express` task as well.