(function() {

    'use strict';

    angular.module('newSwipe.mobile').controller('MobileController', ['$scope', '$http','$timeout',function ($scope, $http, $timeout) {

    	var conn,
			peer = new Peer( makeid() , { key: 'zgy87w70m620529' } );

		peer.on('open', function(id){
			$('#pid').text(id);
		});
          
		peer.on('connection', connect);

		function connect(c){
			conn = c
			$('#rid').val(conn.peer);
			$('#rid').prop('disabled', true);
			$('#progBar').width('100%');
			conn.on('data',function(data){
			 	$('#inputText').val($('#inputText').val()+data);
			});
			conn.on('disconnect', disconnect);
		}

		function disconnect(){
			alert('You are no longer connected to the server!');
			$('#rid').val("");
			$('#rid').prop('disabled', false);
			$('#progBar').width('0%');
			$('#inputText').val("");
		}

		$(document).ready(function(){
			$('#connect').click(function(){
				$('#progBar').css('width', '50%');
				var c = peer.connect($('#rid').val());
				c.on('open', function(){
					connect(c);
				});
			});

			$('#disconnect').click(function(){
				$('#progBar').css('width', '50%');
				disconnect();
			});

			$('#inputText').keypress(function(e){
				var ev = e || window.event;
				var asciiKey = ev.keyCode || ev.which;
				var text = String.fromCharCode(asciiKey);
				text = $('#inputText').val();
				conn.send("categoryNext");
			});

		});



		function makeid() {
			var text = "";
			var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
			// var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for( var i=0; i < 5; i++ ) {
			  text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			  return text;
		};

    	// var conn,
     //        peer = new Peer( makeid() , { key: 'zgy87w70m620529' } );
  
     //    peer.on('open', function(id){
     //        $scope.idChannel = id;
     //    });
      
     //    peer.on('connection', connect);
        
     //    function connect(c){
     //        conn = c;
     //        $scope.message = "Ahora estas conectado";
     //        conn.on('data',function(data){
     //            console.log("Ahora tenemos data :: " + data);
     //            // $('#inputText').val($('#inputText').val()+data);
     //        });
     //        conn.on('disconnect', disconnect);
     //    }

     //    function disconnect(){
     //        alert("Ahora esta libre");
     //    }

     //  $(document).ready(function(){
     //    $('#connect').click(function(){
     //      $('#progBar').css('width', '50%');
     //      var c = peer.connect($('#rid').val());
     //      c.on('open', function(){
     //        connect(c);
     //      });
     //    });
     //    $('#disconnect').click(function(){
     //      $('#progBar').css('width', '50%');
     //      disconnect();
     //    });
     //    $('#inputText').keypress(function(e){
     //      var ev = e || window.event;
     //      var asciiKey = ev.keyCode || ev.which;
     //      text = String.fromCharCode(asciiKey);
     //      //text = $('#inputText').val();
     //      conn.send(text);
     //    });

     //  });

     //  function makeid() {
     //    var text = "";
     //    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
     //    // var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     //    for( var i=0; i < 5; i++ ) {
     //      text += possible.charAt(Math.floor(Math.random() * possible.length));
     //    }
     //      return text;
     //  };



    }]);

}());