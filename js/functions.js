/**
 * Common functions for both index.html and restaurant.html files.
 */

// I register the SW only if the browser support this feature
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(function() {
		console.log("Service Worker Registered on /sw.js");
	});
}