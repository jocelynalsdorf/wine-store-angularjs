var app = angular.module("wineApp", ["ngRoute", "ngResource", "ngAnimate"]);

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

//factory to use if server is not restful--they are all  refactored out of this app below
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

//factory for $resources to use if server is restful
//
app.factory("Wine", function($resource){
  return $resource("http://daretodiscover.herokuapp.com/wines/:id", {
    id: "@id"}, {
      update: {
        method: "PUT"
      }
  });
});

app.controller("wineCtrl", function($scope, $http, $routeParams, WineRoutes, Wine ){
  $scope.wineList = [];
  $scope.WineRoutes = WineRoutes;

//gets wines on page load using $resource
  Wine.query(function(wines){
      $scope.wines = wines;
    });
//adds a new wine
  $scope.saveWine = function(){
    Wine.save($scope.wine, function(){
      location.reload();
  });

//only use this route technique and factory if server setup is not REST/CRUD
    // WineRoutes.addWineRequest($scope.wine)
    //     .then(function(){
    //     $("#add-wine-modal").modal("hide");
    //     location.reload();
    //   });
  }
   
});

app.controller("editWineCtrl", function($scope, $http, $routeParams, WineRoutes, Wine, $location){
    
  Wine.get({id: $routeParams.id}, function(wine){
    $scope.wine = wine;
    console.log(wine);
  });

    //only use this if non-restful an not using $resources
    // WineRoutes.getWineRequest($routeParams.id)
    //   // .then(function(wine){
    //   //   console.log(wine);
    //   //   $scope.wine = wine.data;
    //   // })
    //   // if you use .then, the object comes back with more stuff so you need to add .data
    //   .success(function(wine){
    //     $scope.wine = wine;
        

    $scope.editWine = function(){
      Wine.update({id: $routeParams.id}, $scope.wine, function(){
        $location.path("/wines");
      });
    }
      //   WineRoutes.editWineRequest($routeParams.id, $scope.wine)
      //   .then(function(){
      //   alert("changed it");
      // });
      
  });