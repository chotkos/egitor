var app = angular.module('egitorApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "empty.html",
    }) 
    .when("/file", {
        templateUrl: "app/views/file.html",
        controller: 'fileCtrl',
        file: 'file'
    }) 
    .when("/repositoryConfig", {
        templateUrl: "app/views/repositoryConfig.html",
        controller: 'repositoryConfigCtrl'
    }) 
}]);


app.controller('mainCtrl', function($scope,repositoryService) {
    $scope.repository = repositoryService.get(); 
});