(function() {

    'use strict';

    angular.module('newSwipe.home').controller('HomeController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

        $scope.urlApiGoogle = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=';

        $scope.catagoriesInfo = {
            femexfut:       [{'source': 'Femexfut', 'url': 'http://miseleccion.mx/feed/'}],
            tech:       [{'source': 'Mashable', 'url': 'http://feeds.mashable.com/Mashable'   }, {'source': 'TechCrunch', 'url': 'http://feeds.feedburner.com/TechCrunch'}],
            dev:        [{'source': 'Alt1040',  'url': 'http://feeds.hipertextual.com/alt1040'}, {'source': 'AppleWebBlog', 'url': 'http://feeds.hipertextual.com/appleweblog-es'}],
            design:     [{'source': 'TutsPlus', 'url': 'http://design.tutsplus.com/posts.atom'}],
            strategy:   [{'source': 'Celularis',  'url': 'http://feeds.feedburner.com/celularis'}, {'source': 'AltFoto', 'url': 'http://feeds.hipertextual.com/altfoto'}]
        };

        $scope.news = [];

        $scope.categories = [
            {
                "name": "design",
                "text": "Diseño",
                "img": "images/icon-design.png"
            },
            {
                "name": "femexfut",
                "text": "Mi Selección",
                "img": "images/icon-fut.png"
            },
            {
                "name": "tech",
                "text": "Tecnología",
                "img": "images/icon-tech.png"
            },
            {
                "name": "strategy",
                "text": "Estrategia",
                "img": "images/icon-strategy.png"
            },
            {
                "name": "dev",
                "text": "Programación",
                "img": "images/icon-dev.png"
            }
        ];


        //  Categories Slider Config & Controller
        $scope.categoriesConfig = {
            infinite: true,
            onBeforeChange: function  (event) {

            },
            onAfterChange: function (event) {

                if ( _.isUndefined($scope.categories[event.currentSlide+1])) {
                    $scope.activeC = $scope.categories[0];
                } else {
                    $scope.activeC = $scope.categories[event.currentSlide+1];
                }

                var x = $scope.activeC.name;
                if($scope.catagoriesInfo.hasOwnProperty(x) ){
                    var aux = $scope.catagoriesInfo[x];
                    _.each(aux, function(element, index) {
                        $scope.getSourceRssUpdate(element.url, element.source);
                    });
                }

            },
            pauseOnHover: true,
            slidesToShow: 3
        };

        $scope.categoriesHandle = { };

        //  News Slider Config & Controller
        $scope.newsConfig = {
            slidesToShow: 3,
            onAfterChange: function (event) {

                if ( _.isUndefined($scope.news[event.currentSlide+1])) {
                    $scope.activeN = 0;
                } else {
                    $scope.activeN = event.currentSlide+1;
                }

            }
        };

        $scope.newsHandle = { };


        $scope.initAplication = function () {

            $scope.activeC = $scope.categories[1];
            $scope.activeN = 1;
            var x = $scope.activeC.name;
            var aux = $scope.catagoriesInfo[x];
            _.each(aux, function(element, index) {
                $scope.getSourceRss(element.url, element.source);
            });

        };

        $scope.getSourceRss = function( url, source) {

            $http.jsonp($scope.urlApiGoogle + encodeURIComponent(url))
                .success(function(data, status, headers, config) {
                    var x = data.responseData.feed.entries;
                    $scope.news = [];
                    _.each(x, function(element, index) {
                        $scope.news.push({
                            'image': getImage(element.content),
                            'title': element.title,
                            'source': source,
                            'publishedDate': element.publishedDate,
                            'description': element.contentSnippet,
                            'link': element.link
                        });
                    });
                });

        };

        $scope.getSourceRssUpdate = function(url, source, mode) {

            $http.jsonp($scope.urlApiGoogle + encodeURIComponent(url))
                .success(function(data, status, headers, config) {
                    var x = data.responseData.feed.entries;
                    _.each(x, function(element, index) {
                        $scope.news[index].image = getImage(element.content);
                        $scope.news[index].title = element.title;
                        $scope.news[index].source = source;
                        $scope.news[index].publishedDate = element.publishedDate;
                        $scope.news[index].description = element.contentSnippet;
                        $scope.news[index].link = element.link;
                    });
                });
                
        };



        function getImage (contentString) {

            try {
                var aux = $(contentString);
                return $(aux[0]).attr("src");
            }
            catch(err) {
                return ""
            }

        };

        function getCategoryData (category) {

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


        // PeerJs Connector ---------------------------------------
        var conn,
            peer = new Peer( 'acb123' , { key: 'zgy87w70m620529' } );
  
        peer.on('open', function(id){
            $scope.idChannel = id;
        });
      
        peer.on('connection', connect);
        
        function connect(c){
            conn = c;
            conn.on('data',function(data){
                checkCommand(data);
            });
            conn.on('disconnect', disconnect);
        }

        function disconnect(){
            alert("Ahora esta libre");
        }

        function checkCommand (command){

            switch (command) {
                case 'categoryNext':
                    $('#next').click();
                break;
                case 'categoryPrev':
                    $('#prev').click();
                break;
                case 'newNext':
                    $('#nextNew').click();
                break;
                case 'prevNew':
                    $('#prevNew').click();
                break;
                case 'downNew':
                    sendURL();
                break;
            }
        }

        function sendURL (data) {
            conn.send($scope.news[$scope.activeN].link);
            conn.on('disconnect', disconnect);
        }

      function makeid() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        // var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 4; i++ ) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
          return text;
      };

    }]);

}()); 
