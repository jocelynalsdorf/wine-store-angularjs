var app = angular.module("wineApp", []);

app.controller("wineCtrl", function($scope, $http){
  $scope.wineList = [];
  $scope.saveWine = function(){
    // $scope.wineList.push({name: $scope.name, year: $scope.year, grapes: $scope.grapes, region: $scope.region, price: $scope.price, image: $scope.image, description: $scope.description});

  console.log($scope.wine);
     $http.post("http://daretodiscover.herokuapp.com/wines", $scope.wine)
        .then(function(){
        $("#add-wine-modal").modal("hide");
        location.reload();
      });
  }
    $http.get("http://daretodiscover.herokuapp.com/wines")
      .success(function(wines){
        $scope.wines = wines;
      })
      .error(function(){
        alert("something went wrong");
      })

     
  // }
      
 



});