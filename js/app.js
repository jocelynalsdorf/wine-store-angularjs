var app = angular.module("wineApp", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider){
  $routeProvider
  .when("/wines", {
    templateUrl: "templates/wines.html",
    controller: "wineCtrl"
  })
  .when("/edit/:id", {
    templateUrl: "templates/edit.html",
    controller: "editWineCtrl"
  })
  .otherwise({
    redirectTo: "/wines"
  });

}]);



app.controller("wineCtrl", function($scope, $http, $routeParams){
  $scope.wineList = [];


  $scope.saveWine = function(){

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

});

app.controller("editWineCtrl", function($scope, $http, $routeParams){
    
    $http.get("http://daretodiscover.herokuapp.com/wines/" + $routeParams.id)
      // .then(function(wine){
      //   console.log(wine);
      //   $scope.wine = wine.data;
      // })
      // if you use .then, the object comes back with more stuff so you need to add .data
      .success(function(wine){
        $scope.wine = wine;
        
      })
  });