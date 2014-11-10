angular.module("test", ["ngRoute", "tracker", "mixpanel", "ga"])
	.config(function(trackerProvider, mixpanelProvider, gaProvider) {
		mixpanelProvider.token = "64fdd3c82153d8abee32e5b15fb5a0b1";
		gaProvider.token = "UA-56538254-1";
		trackerProvider.backends = ['ga', 'mixpanel'];
	})
	.config(function($routeProvider, $locationProvider){
		 $routeProvider
            .when('/', {
                templateUrl: '/partials/first.html',
                controller: function($scope, tracker){
                	$scope.track = function(action){
                		tracker.track('First', action, {
                			time: new Date().getTime(),
                			state: 'TEST'
                		});
                	}
                }
            })
            .when('/second', {
                templateUrl: '/partials/second.html',
                controller: function($scope, tracker){
       
                }
            })
            .when('/third', {
                templateUrl: '/partials/third.html',
                controller: function($scope, tracker){
       
                }
            })
            .otherwise('/');
	})
	.run(function(tracker){
		tracker.startSession("session-" + Math.floor(Math.random()*1000), {});
		tracker.track('Test', 'run');
	})