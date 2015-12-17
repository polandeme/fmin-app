/**
 * File: main.js
 * Author: polandme
 */

require.config({
    paths: {
        cordova: '../cordova',
        angular: '../lib/ionic/js/angular/angular',
        angularAnimate: '../lib/ionic/js/angular/angular-animate',
        // angularTouch: '../lib/ionic/js/angular/angular-touch',
        angularSanitize: '../lib/ionic/js/angular/angular-sanitize',
        uiRouter: '../lib/ionic/js/angular-ui/angular-ui-router',
        ionic: '../lib/ionic/js/ionic',
        angularIonic: '../lib/ionic/js/ionic-angular'
        // text: '../bower_components/requirejs-text/text'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularAnimate' : ['angular'],
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
    'cordova',
    'ionic',
    'angular',
    'app',
    'routes'], function(cordova, ionic, angular, app) {
    'use strict';

    var start  = function(){
        angular.bootstrap(document, [app['name']]);
    }
    start();
    // (document.body && device) ? start() : ionic.Platform.ready(start);

});