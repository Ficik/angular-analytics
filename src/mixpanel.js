(function(){
/**
 * @ngdoc overview
 * @name analytics.mixpanel
 * 
 * @description
 * Mixpanel module for angular-analytics
 */
angular.module('analytics.mixpanel', ['analytics'])
	/**
	 * @ngdoc service
	 * @name analytics.mixpanel.mixpanelProvider
	 * @property {string} token identifier for mixpanel
	 * 
	 * @description
	 * Provider for setting mixpanel credentials
	 */
	.provider('mixpanel', ['trackerProvider', function(trackerProvider){
		return {
			token: undefined,
			/**
			 * @ngdoc service
			 * @name analytics.mixpanel.mixpanel
			 * @description
			 * 
			 * # Service for Mixpanel backend.
			 * Should not be called directly. See {@link analytics} and {@link analytics.mixpanel.mixpanelProvider}
			 */
			$get : function(){
				this.protocol = this.protocol || trackerProvider.protocol;
				this.initialize();
				return {
					track: function(category, action, data){
						data = angular.extend({
							category : category
						}, data);
						mixpanel.track(action, data);
					},
					startSession: function(id, data){
						data = angular.extend({
							id : id
						}, data);
						mixpanel.register(data);
					},
					pageview: function(location){
						this.track("pageView", location);
					}
				};
			},
			initialize: function(){
				var self = this;
				/* jshint ignore:start */
				(function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
				for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src=self.protocol+"cdn.mxpnl.com/libs/mixpanel-2.2.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);
				mixpanel.init(this.token);
				/* jshint ignore:end */	
			}
		};
	}]);
})();