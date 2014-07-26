'use strict';

angular.module('newSwipe', ['ngRoute', 'newSwipe.home'], function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

angular.module('newSwipe.home', []);
