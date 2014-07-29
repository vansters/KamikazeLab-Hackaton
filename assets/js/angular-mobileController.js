(function() {

    'use strict';

    angular.module('newSwipe.mobile').controller('MobileController', ['$scope', '$http','$timeout',function ($scope, $http, $timeout) {

    	var conn,
			peer = new Peer( makeid() , { key: 'zgy87w70m620529' } );

		peer.on('open', function(id){
			$('#pid').text(id);
		});

		$scope.stopDrag = false;
          
		peer.on('connection', connect);

		function connect(c){
			conn = c
			$('#rid').val(conn.peer);
			$('#rid').prop('disabled', true);
			$('#progBar').width('100%');
			conn.on('data',function(data){
				window.open(data,'_blank');
				$scope.stopDrag = false;
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

		$scope.downNew =  function($event) {
			if ($scope.stopDrag) {
				return 0;
			} else {
				conn.send("downNew");
				$scope.stopDrag = true;
			}
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