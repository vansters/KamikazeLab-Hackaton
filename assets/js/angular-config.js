(function() {

	'use strict';

    angular.module('newSwipe').config(['$routeProvider',
        function($routeProvider) {

        	$routeProvider.
        		when('/home', {
        			templateUrl: '/views/home.html'
        		}).
        		otherwise({
                	redirectTo: '/'
            	});
        }
    ]);

    angular.module('newSwipe').config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);

}());