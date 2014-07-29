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

		$scope.nextCategory = function() {
			conn.send("categoryNext");
		};

		$scope.prevCategory = function() {
			conn.send("categoryPrev");
		};

		$scope.nextNew = function() {
			conn.send("newNext");
		};

		$scope.prevNew = function() {
			conn.send("prevNew");
		};

		$scope.downNew =  function() {
			alert("Down");
		};

		$(document).ready(function(){
			var c = peer.connect('acb123');
			c.on('open', function(){
				connect(c);
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

    }]);

}());


/*			$('#connect').click(function(){
				var c = peer.connect('acb123');
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
			});*/