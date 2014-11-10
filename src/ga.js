angular.module('analytics.ga', [])
	.provider('ga', function(){
		return {
			token: undefined,
			$get : function(){
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
				}		
			},
			initialize: function(){
				/* jshint ignore:start */
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
				/* jshint ignore:end */	
				
			}
		};
	});