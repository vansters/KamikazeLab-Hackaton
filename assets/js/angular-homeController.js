(function() {

    'use strict';

    angular.module('newSwipe.home').controller('HomeController', ['$scope', '$http', function ($scope, $http) {

        // this.urlBase = 'http://feeds2.feedburner.com/thenextweb';
        this.urlBase = 'http://feeds.mashable.com/Mashable';
        this.urlApiGoogle = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=';
        this.feedDataAuthor = {};
        $scope.feedData = [];

        $http.jsonp(this.urlApiGoogle + encodeURIComponent(this.urlBase))
            .success(function(data, status, headers, config) {
                var x = data.responseData.feed.entries;
                _.each(x, function(element, index) {
                    element.img = getImage(element.content);
                    $scope.feedData.push(element);   
                });
            });

    }]);

    function getImage (contentString) {
        var aux = $(contentString);
        return $(aux[0]).attr("src");
    }

}());