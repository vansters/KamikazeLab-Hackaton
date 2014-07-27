'use strict';

// angular.module('newSwipe', ['ngRoute', 'slick', 'newSwipe.home'], function($interpolateProvider) {
angular.module('newSwipe', ['ngRoute', 'bardo.directives', 'newSwipe.home', 'newSwipe.mobile'], function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

angular.module('newSwipe.home', []);
angular.module('newSwipe.mobile', []);
