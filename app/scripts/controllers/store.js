'use strict';

angular.module('storeApp')
	.controller('StoreCtrl', function($scope, $http) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$http.get('products/products.json').success(function(data) {
			$scope.books = data;
		});
		$scope.searchMsg = 'Use the search to box to search for products. You can also search on the type of products, like "book" or "movie"';
	});