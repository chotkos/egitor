app.controller('fileCtrl', function($scope,$routeParams,repositoryService) { 
    $scope.file = repositoryService.getFileByPath($routeParams.path);    
 
    $('#editor').html($scope.file.content).froalaEditor();
 
});