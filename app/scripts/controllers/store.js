'use strict';

angular.module('storeApp')
	.controller('StoreCtrl', function($scope, $http) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		// $http.get('products/products.json').success(function(data) {
		$http.get('/api/products/').success(function(data) {
			$scope.books = data;
		});
    $scope.mouseOverThing = function(thing) {
        $scope.msg = "Mouse Over: " + thing;
      console.log('\n### msg: ', $scope.msg);
    }
		$scope.searchMsg = 'Use the search to box to search for products. You can also search on the type of products, like "book" or "movie"';
	});