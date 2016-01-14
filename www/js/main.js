/**
 * File: main.js
 * Author: polandme
 */

require.config({
    paths: {
        cordova: '../cordova',
        ngCordova: './lib/ng-cordova.min',
        angular: '../lib/ionic/js/angular/angular',
        angularAnimate: '../lib/ionic/js/angular/angular-animate',
        // angularTouch: '../lib/ionic/js/angular/angular-touch',
        angularSanitize: '../lib/ionic/js/angular/angular-sanitize',
        uiRouter: '../lib/ionic/js/angular-ui/angular-ui-router',
        angularCss: './lib/angular-css-injector.min',
        ionic: '../lib/ionic/js/ionic',
        angularIonic: '../lib/ionic/js/ionic-angular',
        jquery: './lib/jquery-1.11.3.min',
        jqueryColor: './lib/jquery.color-2.1.2.min'
        // text: '../bower_components/requirejs-text/text'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularAnimate' : ['angular'],
        'ngCordova': ['angular'],
        'jquery': '$',
        'jqueryColor': {
            deps: ['jquery'],
            exports: 'jqueryColor'
        },
        'angularCss': {
            deps: ['angular'],
            exports: 'angularCss'
        },
        // 'angularTouch' : ['angular'],
        'angularSanitize' : ['angular'],
        'uiRouter' : ['angular'],
        'ionic' :  {'exports' : 'ionic'},
        'angularIonic': ['angular', 'ionic','uiRouter', 'angularAnimate',/* 'angularTouch',*/ 'angularSanitize']
    },
    priority: [
        "angular"
    ]
});

require( [
    'ionic',
    'angular',
    'ngCordova',
    'cordova',
    'app',
    'jquery',
    'angularCss',
    'routes'], function(ionic, angular, ngCordova, cordova, app, $, angularCss) {
    'use strict';

    var start  = function(){
        angular.bootstrap(document, [app['name']]);
    }
    start();
    // (document.body && device) ? start() : ionic.Platform.ready(start);

});