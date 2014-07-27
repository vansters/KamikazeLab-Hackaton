(function() {

	'use strict';

    angular.module('newSwipe').config(['$routeProvider',
        function($routeProvider) {
        	
            var md = new MobileDetect( $(window)[0].navigator.userAgent ),
            	view = "";

            if( md.phone() ){
                view = 'homeController.html';
            }else if( md.tablet() ){
                view = 'home.html';
            }else{
                view = 'home.html';
            }

        	$routeProvider.
        		when('/home', {
        			templateUrl: '/views/' + view
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