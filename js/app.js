var app = angular.module("wineApp", []);

app.controller("wineCtrl", function($scope, $http){
  $scope.wineList = [];
  
    $http.get("http://daretodiscover.herokuapp.com/wines")
      .success(function(wines){
        $scope.wines = wines;
      })
      .error(function(){
        alert("something went wrong");
      })
});