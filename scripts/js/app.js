var app = angular.module('myApp', ['ui.bootstrap']);
app.controller('ListController', function ($scope,$http) {
	$scope.curPage = 1,
	$scope.itemsPerPage = 10,
    $scope.numOfPages = 0;
    $scope.loadData = function(pageNumber) {
        $scope.curPage = pageNumber;
        var datum = {};
    	datum["pageNumber"] = pageNumber;
	    datum["limit"] = $scope.itemsPerPage;
     	datum["sort"] = "txDate";
    	var json = JSON.stringify(datum);
        console.log(json);
    	var req = {
    		 method: 'POST',
    		 url: 'http://127.0.0.1:9090/fetchData',
    		 headers: {
    		   'Content-Type': 'application/json'
    		 },
    		 data: json
        }
    	$http(req).then( function(response) {
            $scope.filteredItems = response.data.content;
            $scope.numOfPages = response.data.totalPages;
    		console.log($scope.numOfPages);
        });
    }
});



