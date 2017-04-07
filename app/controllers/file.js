app.controller('fileCtrl', function ($scope, $routeParams, repositoryService) {

        $scope.file = { 
            path: $routeParams.path,
            name: $routeParams.name
        };

    var successHandler = function (data) {
        $scope.file.content = data;

        $('#editor').html($scope.file.content).froalaEditor();
    };

    var promise = repositoryService.getFileByPath($routeParams.path);
    promise.then(successHandler);


});