(function(){
'use strict';

/**
 * @ngdoc overview
 * @name analytics.ga
 * 
 * @description
 * Google Analytics module for angular-analytics
 */
angular.module('analytics.ga', ['analytics'])
	/**
	 * @ngdoc service
	 * @name analytics.ga.gaProvider
	 * @property {string} token identifier for google analytics (UA-XXXXX-X)
	 * 
	 * @description
	 * Provider for setting analytics credentials
	 * @example
	 * ```js
	 * angular.module('myModule')
	 * 	.config(function(gaProvider){
	 * 		gaProvider.token = 'UA-XXXX-X';
	 * 	})
	 * 	```
	 */
	.provider('ga', function(trackerProvider){
		return {
			token: undefined,
			/**
			 * @ngdoc service
			 * @name analytics.ga.ga
			 * @description
			 * # Service for Google Analytics backend.
			 * Should not be called directly. See {@link analytics} and {@link analytics.ga.gaProvider}
			 */
			$get : function(){
				this.protocol = this.protocol || trackerProvider.protocol;
				this.initialize();
				var self = this;
				var token = function(){
					return self.token;
				};

				return {
					track: function(category, action, data){
						data = angular.extend({
							eventCategory : category,
							eventAction : action
						}, data);						
						console.log("GA event data:", data);
						ga('send', 'event', data);
					},
					startSession: function(id, data){
						data = angular.extend({
							clientId : id,
							cookieDomain : 'none'
						}, data);
						console.log(data);
						ga('create', token(), data);
					},
					pageview: function(location){
						ga('send', {
						  'hitType': 'pageview',
						  'page': location
						});
					}
				};
			},
			initialize: function(){
				var self = this;
				/* jshint ignore:start */
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script',self.protocol+'www.google-analytics.com/analytics.js','ga');
				/* jshint ignore:end */	
				
			}
		};
	});
})();