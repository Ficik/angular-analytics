# Angular-analytics

wrapper for various web analytics tools.

currently supported:
- Google analytics
- mixpanel.com

## Usage

configure backends

```
angular.module("myTrackingModule", ["analytics", "analytics.ga", "analytics.mixpanel"])
	.config(function(analyticsProvider, gaProvider, mixpanelProvider){
		mixpanelProvider.token = "SOMETOKEN";
		gaProvider.token = "UA-XXXXXXX-X"
		analyticsProvider.backends = ["ga", "mixpanel"];
	})

```