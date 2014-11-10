angular.module('tracker', [])
	/**
	 * tracker
	 */
	.provider('tracker', function() {
		return {
			backends : [],
			$get: function($injector, $rootScope, $location){
				var backends = this.backends.map(function(x){
					return $injector.get(x);
				});
				var wrapper = {
					track: function(category, action, data){
						console.log("event", category, action, data);
						for (var i in backends){
							backends[i].track(category, action, data);
						}
					},
					startSession: function(id, data){
						console.log('creating session', id, data);
						for (var i in backends){
							backends[i].startSession(id, data);
						}
					},
					pageview: function(location){
						console.log('logging location', location);
						for (var i in backends){
							backends[i].pageview(location);
						}	
					}
				};

				$rootScope.$on('$locationChangeSuccess', function(){
					wrapper.pageview($location.path());
				});

				return wrapper;
			}
		};
	});