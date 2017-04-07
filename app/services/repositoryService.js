app.factory('repositoryService', ['batExecutorService', function (batExecutorService) {

    return {
        get: function () {
            var success = function (data) {
                alert('Success:' + data);
            };
            var failure = function (data) {
                alert('Failed to execute batch:' + data);
            };

            const dirTree = require('directory-tree');
            const tree = dirTree('./Repository');  
            tree.isRoot=true;
            return tree;
        },
        getFileByPath: function (path) { 

            return $.get(path, function( data ) { 
                return data;
            });  

        },
        setRepositorySource: function (url) {
            localStorage.setItem("egitor_repository_url", url);

            var success = function (data) {
                alert('Success:' + data);
            };
            var failure = function (data) {
                alert('Failed to execute batch:' + data);
            };

            return batExecutorService.executeBat("electronTest.bat", success, failure, ["'test text'"]);

        }

    }

}]);