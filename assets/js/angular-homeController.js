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
            dev:        [{'source': 'Alt1040',  'url': 'http://feeds.hipertextual.com/alt1040'}, {'source': 'Alt1040', 'url': 'http://feeds.hipertextual.com/appleweblog-es'}],
            design:     [{'source': 'TutsPlus', 'url': 'http://design.tutsplus.com/posts.atom'}],
            strategy:   [{'source': 'Alt1040',  'url': 'http://feeds.feedburner.com/celularis'}, {'source': 'Alt1040', 'url': 'http://feeds.hipertextual.com/altfoto'}]
        };

        $scope.news = [];

        $scope.categories = [
            {
                "name": "strategy",
                "text": "Estrategia",
                "news": [],
                "img": "images/icon-strategy.png"
            },
            {
                "name": "tech",
                "text": "Tecnología",
                "news": [],
                "img": "images/icon-tech.png"
            },
            {
                "name": "design",
                "text": "Diseño",
                "news": [],
                "img": "images/icon-design.png"
            },
            {
                "name": "dev",
                "text": "Programación",
                "news": [],
                "img": "images/icon-dev.png"
            }
        ];
        // $scope.categories = [ {"name": "design", "text": "Tecnología, "}'Diseño', 'Tecnología', 'Estrategia', 'Programación']

        $scope.categoriesConfig = {
            infinite: true,
            onBeforeChange: function  (event) {
                // console.log(event);
            },
            onAfterChange: function (event) {
                // $scope.activeCategory = $scope.categories[event.currentSlide];
                // console.log(event.currentSlide);
                // console.log("Left :: " + $scope.activeCategory);
                if ( _.isUndefined($scope.categories[event.currentSlide+1])) {
                    // console.log("Center  :: " + $scope.categories[0]);
                    $scope.activeC = $scope.categories[0];
                } else {
                    // console.log("Center :: " + $scope.categories[event.currentSlide+1]);
                    $scope.activeC = $scope.categories[event.currentSlide+1];
                }

                var x = $scope.activeC.name;
                if($scope.catagoriesInfo.hasOwnProperty(x) ){
                    var aux = $scope.catagoriesInfo[x];
                    _.each(aux, function(element, index) {
                        // console.log(element);
                        $scope.getSourceRss(element.url, element.source);
                    });

                }
            },
            pauseOnHover: true,
            slidesToShow: 3,
        };

        $scope.categoriesHandle = {

        };

        $scope.newsConfig = {
            autoplay: true,
            autoplaySpeed: 10000,
            pauseOnHover: true,
            slidesToShow: 3
        };

        $scope.newsHandle = {

        };


        $scope.initAplication = function () {
            $scope.activeC = $scope.categories[1];
            var x = $scope.activeC.name;
            // console.log($scope.activeC);
            var aux = $scope.catagoriesInfo[x];
            _.each(aux, function(element, index) {
                $scope.getSourceRss(element.url, element.source);
            });
            // console.log($scope.activeC);
            // var data = getCategoryData($scope.categories[$scope.categoryIndex]);
            // _.each(data, function(element, index) {
            //     $scope.getSourceRss(element.url, element.source);
            // });
        };


        // $timeout(function() {
        //     console.log("Aciendo Click");
        //     $('#next').click();
        //     $('#prev').click();
        // }, 5000);

        $scope.getSourceRss = function( url, source) {

            $http.jsonp($scope.urlApiGoogle + encodeURIComponent(url))
                .success(function(data, status, headers, config) {
                    var x = data.responseData.feed.entries;
                    var dat = [];
                    $scope.news = [];
                    _.each(x, function(element, index) {
                        $scope.news.push({
                            'image': getImage(element.content),
                            'title': element.title,
                            'source': source,
                            'publishedDate': element.publishedDate,
                            'description': element.contentSnippet
                        });
                    });
                    // console.log($scope.news);
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

        // PeerJs Connector ---------------------------------------

        var conn,
            peer = new Peer( 'acb123' , { key: 'zgy87w70m620529' } );
  
        peer.on('open', function(id){
            $scope.idChannel = id;
        });
      
        peer.on('connection', connect);
        
        function connect(c){
            conn = c;
            $scope.message = "Ahora estas conectado";
            conn.on('data',function(data){
                checkCommand(data);
            });
            conn.on('disconnect', disconnect);
        }

        function disconnect(){
            alert("Ahora esta libre");
        }

        function checkCommand (command){
            // console.log($scope.activeC);

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
            }
        }
      // $(document).ready(function(){
      //   $('#connect').click(function(){
      //     $('#progBar').css('width', '50%');
      //     var c = peer.connect($('#rid').val());
      //     c.on('open', function(){
      //       connect(c);
      //     });
      //   });
      //   $('#disconnect').click(function(){
      //     $('#progBar').css('width', '50%');
      //     disconnect();
      //   });
      //   $('#inputText').keypress(function(e){
      //     var ev = e || window.event;
      //     var asciiKey = ev.keyCode || ev.which;
      //     text = String.fromCharCode(asciiKey);
      //     //text = $('#inputText').val();
      //     conn.send(text);
      //   });

      // });



      function makeid() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        // var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 4; i++ ) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
          return text;
      };



        // // PeerJs Conector -------------------------------------
        // var conn,
        //     peer = new Peer('a5sw', { key: 'zgy87w70m620529' });

        // peer.on('open', function(id){
        //     console.log("Tenemos Conexion");
        // });

        // peer.on('connection', connect);

        // function connect(c){
        //     conn = c
        //     console.log("Conexion con :: " + conn.peer);
        //     conn.on('data',function(data){
        //         console.log("Tenemos Data :: " + data);
        //     });
        //     conn.on('disconnect', disconnect);
        // }

        // function disconnect(){
        //     console.log("Estas desconectado");
        // }


    }]);

}()); 
