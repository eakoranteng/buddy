var buddy = angular.module('buddy', ['ngCookies']);

buddy.controller('mainCtrl', function($scope, $http, $timeout, $cookies) {
	$scope.dailyCount = 0;
	$scope.ratingData = {
		location: null,
		rating: null
	};

	var animateBadge = function() {
		$scope.animate = true;
		$timeout(function() {
			$scope.animate = false;
		}, 1000);
	};
	var getTodayTotal = function() {
		$http.post('server/daily_count.php', {location: $scope.ratingData.location})
		.then(function(response) {
			$scope.dailyCount = parseInt(response.data);
		});
	};
	var send = function(callback) {
		$http.post('server/buddy.php', $scope.ratingData);
	};

	if ($cookies.get('location')) {
		$scope.ratingData.location = $cookies.get('location');
		getTodayTotal();
		$scope.loginPassed = true;
	}

	$scope.submitLogin = function() {
		getTodayTotal();
		if ($scope.rememberShop) {
			var expireDate = new Date();
  			expireDate.setDate(expireDate.getDate() + 7);
			$cookies.put('location', $scope.ratingData.location, {'expires': expireDate});
		}
		$scope.loginPassed = true;
	};
	
	$scope.excellent = function() {
		$scope.excellentLabel = true;
		$scope.dailyCount += 1;
		animateBadge();
		$timeout(function() {
			$scope.excellentLabel = false;
		}, 1500);
		send();
	};
	$scope.good = function() {
		$scope.goodLabel = true;
		$scope.dailyCount += 1;
		animateBadge();
		$timeout(function() {
			$scope.goodLabel = false;
		}, 1500);
		send();
	};
	$scope.average = function() {
		$scope.averageLabel = true;
		$scope.dailyCount += 1;
		animateBadge();
		$timeout(function() {
			$scope.averageLabel = false;
		}, 1500);
		send();
	};
	$scope.notHappy = function() {
		$scope.notHappyLabel = true;
		$scope.dailyCount += 1;
		animateBadge();
		$timeout(function() {
			$scope.notHappyLabel = false;
		}, 1500);
		send();
	};

	$scope.logout = function() {
		$cookies.remove('location');
		$scope.loginPassed = false;
	};
	
});
