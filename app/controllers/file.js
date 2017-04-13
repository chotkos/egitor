app.controller('fileCtrl', function ($scope, $routeParams, repositoryService) {

    $scope.file = {
        path: $routeParams.path,
        name: $routeParams.name
    };

    var successHandler = function (data) {
        $scope.file.content = data;

        $('#editor').html($scope.file.content).froalaEditor({
            toolbarButtons: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'outdent', 'indent', 'clearFormatting', 'insertTable', 'html']
        });


        $('#editor').froalaEditor('events.on', 'keydown', (e) => {
            if (e.originalEvent.ctrlKey) {
                repositoryService.commitPush($scope.file);
            }
        }, true);
    };

    var promise = repositoryService.getFileByPath($routeParams.path);
    promise.then(successHandler);

    $(document).keypress("s", function (e) {
        if (e.originalEvent.ctrlKey) {
            repositoryService.commitPush($scope.file);
        }
    });

});