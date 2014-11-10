(function(){
/**
 * @ngdoc overview
 * @name analytics
 * @description
 * # Configuration
 * create your analytics module with dependencies on this module
 * and desired tracker backends
 *
 * currently supported backends:
 * 
 * - analytics.ga - [Google Analytics](http://www.google.com/analytics/)
 * - analytics.mixpanel - [Mixpanel.com](http://mixpanel.com)
 *
 * ```
 * angular.module('tracker', ['analytics', 'analytics.ga', 'analytics.mixpanel'])
 *   .config(function(analyticsProvider, gaProvider, mixpanelProvider) {
 *     mixpanelProvider.token = "SOMETOKEN";
 *     gaProvider.token = "UA-XXXXXXX-X";
 *     analyticsProvider.backends = ["ga", "mixpanel"];
 *   });
 * ```
 */
angular.module('analytics', [])
	/**
	 * @ngdoc service
	 * @name analytics.trackerProvider
	 * @property {array} backends list of enabled backends
	 * 
	 */
	.provider('tracker', function() {
		return {
			backends : [],
			/**
			 * @ngdoc service
			 * @name analytics.tracker
			 * @description
			 * # Wrapper for web analytics trackers
			 */
			$get: function($injector, $rootScope, $location){
				var backends = this.backends.map(function(x){
					return $injector.get(x);
				});
				var wrapper = {
					/**
					 * @ngdoc method
					 * @name track
					 * @methodOf analytics.tracker
					 * @param {string} category category of event
					 * @param {string} action action of event
					 * @param {object} data simple object containing additional informations for event
					 * @description
					 * # Track event
					 * method for generic event you want to log
					 * @example
					 * ```
					 * .controller(function($scope, tracker, social){
					 * 	 $scope.socialBtnClicked = function(event){
					 * 	 	tracker.track("Social", "click", {
					 * 	 		network: social.network(event),
					 * 	 		type: social.type(event)
					 * 	 	});
					 * 	  	social.process(event);
					 * 	 };
					 * });
					 * ```
					 */
					track: function(category, action, data){
						for (var i in backends){
							backends[i].track(category, action, data);
						}
					},
					/**
					 * @ngdoc method
					 * @name startSession
					 * @methodOf analytics.tracker
					 * @param {string} id   unique identifier of session
					 * @param {object} data simple object containing session data
					 * @description
					 * # Creates new session 
					 * @example
					 * ```
					 * .run(function(tracker, translations){
					 *   tracker.startSession("session-" + Math.floor(Math.random() * 10000), {
					 *   	lang: translations.lang
					 *   });
					 * });
					 * ```
					 */
					startSession: function(id, data){
						for (var i in backends){
							backends[i].startSession(id, data);
						}
					},
					/**
					 * @ngdoc method
					 * @name pageview
					 * @methodOf analytics.tracker
					 * @param  {string} location path
					 * @description
					 * # Logs path visit
					 * This method is called automatically on $locationChangeSuccess event,
					 * so you should call it manually only if you're not using ngRoute or similar router
					 * @example
					 * ```
					 * .run(function(tracker, translations){
					 *   $rootScope.$on('locationChanged', function(location){
					 *     wrapper.pageview(location);
					 *   });
					 * });
					 * ```
					 */
					pageview: function(location){
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
})();