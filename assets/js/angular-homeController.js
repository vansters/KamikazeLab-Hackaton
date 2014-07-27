(function() {

    'use strict';

    angular.module('newSwipe.home').controller('HomeController', ['$scope', '$http','$timeout',function ($scope, $http, $timeout) {

        $scope.urlApiGoogle = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=';

        this.theNextWeb = 'http://feeds2.feedburner.com/thenextweb';
        this.mashableRSS = 'http://feeds.mashable.com/Mashable';
        this.awwwarsRSS = 'http://feeds.feedburner.com/awwwards-sites-of-the-day';
        this.techCrunchRSS = 'http://feeds.feedburner.com/TechCrunch/';

        $scope.catagoriesInfo = {
            tech:       [{'source': 'Mashable', 'url': 'http://feeds.mashable.com/Mashable'}, {'source': 'TechCrunch', 'url': 'http://feeds.feedburner.com/TechCrunch'}],
            dev:        [{'source': 'Codrops',  'url': 'http://feeds2.feedburner.com/tympanus'}],
            design:     [{'source': 'Awwwards - Sites of the day', 'url': 'http://feeds.feedburner.com/awwwards-sites-of-the-day'}],
            strategy:   [{'source': 'Puro Marketing ',  'url': 'http://feeds.feedburner.com/puromarketing'}]
        }

        $scope.news = [];


        $scope.basicCategories = ['Tecnología', 'Programación', 'Diseño', 'Estrategia'];
        // $scope.basicCategories = ['Tecnología'];
        $scope.categories = [];

        $scope.categoriesConfig = {
            dots: false,
            autoplay: true,
            autoplaySpeed: 10000,
            // centerMode: true,
            onBeforeChange: function  (event) {
                // console.log("Estoy Cambiando");
            },
            pauseOnHover: true,
            slidesToShow: 3,
        };

        $scope.categoriesHandle = {

        };

        $scope.newsConfig = {
            dots: false,
            autoplay: true,
            autoplaySpeed: 10000,
            // centerMode: true,
            onBeforeChange: function  (event) {
                // console.log("Estoy Cambiando");
            },
            pauseOnHover: true,
            slidesToShow: 3,
        };

        $scope.newsHandle = {

        };


        $scope.initAplication = function () {
            $scope.categories = _.sample($scope.basicCategories, 4);
            var data = getCategoryData($scope.categories[0]);
            _.each(data, function(element, index) {
                $scope.getSourceRss(element.url, element.source);
                // console.log(p);
                // console.log(p);
                // console.log(element);
            });
            // console.log(data);
            // console.log($scope.dat);
            // $scope.dat
            // console.log($scope.categories);
            // console.log($scope.dat);
        };


        // $timeout(function() {
        //     console.log("Aciendo Click");
        //     $('#next').click();
        //     $('#prev').click();
        // }, 5000);

        $scope.getSourceRss = function( url, source) {

            console.log("Fuente :: " + source);

            $http.jsonp($scope.urlApiGoogle + encodeURIComponent(url))
                .success(function(data, status, headers, config) {
                    $scope.images = [];
                    $scope.titles = [];
                    $scope.dates = [];
                    $scope.descriptions = [];
                    var x = data.responseData.feed.entries;
                    var dat = [];
                    _.each(x, function(element, index) {
                        $scope.images.push(getImage(element.content));
                        $scope.titles.push(element.title);
                        $scope.dates.push(element.publishedDate);
                        $scope.descriptions.push(element.contentSnippet);
                        $scope.news.push({
                            'image': getImage(element.content),
                            'title': element.title,
                            'source': source,
                            'publishedDate': element.publishedDate,
                            'description': element.contentSnippet
                        });
                    });
                });

        };



        function getImage (contentString) {
            var aux = $(contentString);
            // console.log(aux);
            // // _.each(aux, function(element, index) {
            // //     // console.log(element);
            // // });
            return $(aux[0]).attr("src");
        };

        function getCategoryData (category) {
            // console.log(category);
            switch(category){
                case 'Tecnología':
                    return $scope.catagoriesInfo.tech;
                break;
                case 'Programación':
                    return $scope.catagoriesInfo.dev;
                break;
                case 'Diseño':
                    return $scope.catagoriesInfo.design;
                break;
                case 'Estrategia':
                    return $scope.catagoriesInfo.strategy;
                break;
            }
        };

    }]);

// var h = new Object(); // or just {}
// h['one'] = 1;
// h['two'] = 2;
// h['three'] = 3;

// // show the values stored
// for (var k in h) {
//     // use hasOwnProperty to filter out keys from the Object.prototype
//     if (h.hasOwnProperty(k)) {
//         alert('key is: ' + k + ', value is: ' + h[k]);
//     }
// }

}()); 
