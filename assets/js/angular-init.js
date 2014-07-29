'use strict';

angular.module('newSwipe', ['ngRoute', 'bardo.directives', 'ngTouch', 'newSwipe.home', 'newSwipe.mobile'], function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

angular.module('newSwipe.home', []);
angular.module('newSwipe.mobile', []);
