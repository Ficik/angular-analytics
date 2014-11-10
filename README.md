# Angular-analytics

wrapper for various web analytics tools.

currently supported:
- Google analytics
- mixpanel.com

## [Documentation](http://ficik.github.io/angular-analytics/api/analytics)

configure backends

```js
angular.module("myTrackingModule", ["analytics", "analytics.ga", "analytics.mixpanel"])
	.config(function(trackerProvider, gaProvider, mixpanelProvider){
		mixpanelProvider.token = "SOMETOKEN";
		gaProvider.token = "UA-XXXXXXX-X"
		trackerProvider.backends = ["ga", "mixpanel"];
	})

```

create session:
```js
// session_id, session_data
tracker.startSession("session-"+Math.floor(Math.random*10000), {
	lang: "en"
});
```

track event:
```js
// category, action, event_data
tracker.track("Social", "like_clicked", {
	post: post_id
});
```




## TODO

- documentation