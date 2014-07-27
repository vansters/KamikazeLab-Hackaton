(function() {

    'use strict';

    angular.module('newSwipe.home').controller('HomeController', ['$scope', '$http','$timeout',function ($scope, $http, $timeout) {

        // this.urlBase = 'http://feeds2.feedburner.com/thenextweb';
        this.mashableRSS = 'http://feeds.mashable.com/Mashable';
        this.awwwarsRSS = 'http://feeds.feedburner.com/awwwards-sites-of-the-day';
        this.urlApiGoogle = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=';

        $scope.categories = ['Tecnología', 'Programación', 'Diseño ', 'Estrategia'];

        $scope.onBeforeChange =  function() {
            console.log("Hola Mundo");
        };
        // function cambio () {
        //     console.log("Hola");
        // };
        // $scope.cambio = function (hola) {
            // console.log("Cambiando");
        // };

        $http.jsonp(this.urlApiGoogle + encodeURIComponent(this.mashableRSS))
            .success(function(data, status, headers, config) {
                $scope.images = [];
                $scope.titles = [];
                $scope.dates = [];
                $scope.descriptions = [];
                var x = data.responseData.feed.entries;
                _.each(x, function(element, index) {
                    $scope.images.push(getImage(element.content));
                    $scope.titles.push(element.title);
                    $scope.dates.push(element.publishedDate);
                    $scope.descriptions.push(element.contentSnippet);
                });
            });

    }]);

    function getImage (contentString) {
        var aux = $(contentString);
        return $(aux[0]).attr("src");
    }

}());