app.controller('repositoryConfigCtrl', function($scope,repositoryService) { 
     
    $scope.url = localStorage.getItem("egitor_repository_url");
 
    $scope.changeRepository = function(){
        repositoryService.setRepositorySource($scope.url);
        
    }
 
});