/**
 * Common functions for both index.html and restaurant.html files.
 */

// I register the SW only if the browser support this feature
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(function() {
		console.log("Service Worker Registered on /sw.js");
	});
}

DBHelper.fetchRestaurants((error, restaurants) => {
  if (error) {
    callback(error, null);
  } else {
    createIDb(restaurants);
  }
});

function createIDb(jsonData){
	// Add support of indexedDb for multiple browsers
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

	// DB
	var restaurantDb = indexedDB.open("dbRestaurant", 1);

	restaurantDb.onupgradeneeded = function() {
	    var dbResult = restaurantDb.result;

	    // Create object store (then called os) and primary key
	    var restaurantOs = dbResult.createObjectStore("osRestaurant", {keyPath: "id"});
	};

	restaurantDb.onsuccess = function() {
		var dbResult = restaurantDb.result;
	    var restaurantTr = dbResult.transaction("osRestaurant","readwrite");
	    // Create the transaction to the object store
	    var restaurantOsTr = restaurantTr.objectStore("osRestaurant");

	    for(var key in jsonData)
		{
			restaurantOsTr.put({
				id: jsonData[key].id,
				name: jsonData[key].name,
				address: jsonData[key].address,
				neighborhood: jsonData[key].neighborhood,
				createdAt: jsonData[key].createdAt,
				updatedAt: jsonData[key].updatedAt,
				cuisine_type: jsonData[key].cuisine_type,
				latlng: jsonData[key].latlng,
				operating_hours: jsonData[key].operating_hours,
				reviews: jsonData[key].reviews
	    	});
		}

	    // When the transaction is complete ...
	    restaurantTr.oncomplete = function() {
	    	// ... close db
	        dbResult.close();
	    };
	}
}