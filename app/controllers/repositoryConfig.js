app.controller('repositoryConfigCtrl', function ($scope, repositoryService) {

    $scope.url = localStorage.getItem("egitor_repository_url");
    $scope.password = localStorage.getItem("egitor_repository_password");
    $scope.login = localStorage.getItem("egitor_repository_login");

    $scope.changeRepository = function () {
        var newRepo = {
            url: $scope.url,
            login: $scope.login,
            password: $scope.password
        };

        repositoryService.setRepositorySource(newRepo);
    }

});