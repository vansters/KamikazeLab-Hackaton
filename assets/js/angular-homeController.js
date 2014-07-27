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

        // PeerJs Connector ---------------------------------------

        var conn,
            peer = new Peer( makeid() , { key: 'zgy87w70m620529' } );
  
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
            switch (command) {
                case 'categoryNext':
                    $('#next').click();   
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
        for( var i=0; i < 5; i++ ) {
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
