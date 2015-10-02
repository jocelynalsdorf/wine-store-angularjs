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

app.factory("WineRoutes", function($http, $routeParams){
  var factory = {};


  //get request for all wines

  factory.getWinesRequest = function(){
    return $http.get("http://daretodiscover.herokuapp.com/wines")
  }

  //get request for specified wine
  factory.getWineRequest = function(wineId){
    return  $http.get("http://daretodiscover.herokuapp.com/wines/" + wineId)
  }
  //post request
  factory.addWineRequest = function(wineData){
    return $http.post("http://daretodiscover.herokuapp.com/wines", wineData)
  }
//put request 
  factory.editWineRequest = function(wineId, wineData) {
  return $http.put("http://daretodiscover.herokuapp.com/wines/" + wineId, wineData)
  }

  return factory;
});

app.controller("wineCtrl", function($scope, $http, $routeParams, WineRoutes ){
  $scope.wineList = [];
  $scope.WineRoutes = WineRoutes;

  $scope.saveWine = function(){


    WineRoutes.addWineRequest($scope.wine)
        .then(function(){
        $("#add-wine-modal").modal("hide");
        location.reload();
      });
  }
    WineRoutes.getWinesRequest()
      .success(function(wines){
        $scope.wines = wines;
        
      })
      .error(function(){
        alert("something went wrong");
      })

});

app.controller("editWineCtrl", function($scope, $http, $routeParams, WineRoutes){
    
    WineRoutes.getWineRequest($routeParams.id)
      // .then(function(wine){
      //   console.log(wine);
      //   $scope.wine = wine.data;
      // })
      // if you use .then, the object comes back with more stuff so you need to add .data
      .success(function(wine){
        $scope.wine = wine;
        
      })

      $scope.editWine = function(){
        WineRoutes.editWineRequest($routeParams.id, $scope.wine)
        .then(function(){
       
        alert("changed it");
      });
      }
  });