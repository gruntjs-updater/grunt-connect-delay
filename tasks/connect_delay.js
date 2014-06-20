/*
 * grunt-connect-delay
 * https://github.com/musically-ut/grunt-connect-delay
 *
 * Copyright (c) 2014 Utkarsh Upadhyay
 * Licensed under the MIT license.
 */

'use strict';

var utils = require('../lib/utils');

module.exports = function (grunt) {
    grunt.registerTask('configureDelayRules', 'Configure connect delay rules.', function () {
        var options = this.options({
            rulesProvider: 'connect.delay'
        });
        utils.setLogger(grunt.verbose);
        (grunt.config(options.rulesProvider) || []).forEach(function (rule) {
            rule = rule || {};
            var registeredRule = utils.registerRule({
                url: rule.url,
                delay: rule.delay
            });

            if (registeredRule) {
                grunt.log.ok('Delay rule created for: [' + registeredRule +'].');
            } else {
                try {
                    grunt.log.error('Incorrect delay rule given: ', JSON.stringify(rule));
                } catch (e) {
                    // Unable to stringify the JSON due to circular references
                    grunt.log.error('Incorrect delay rule given.');
                }
            }
        });
    });
};
