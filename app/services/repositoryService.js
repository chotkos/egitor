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
            const tree = dirTree('./Repository/Repository');  
            tree.isRoot=true;
            return tree;
        },
        getFileByPath: function (path) { 

            return $.get(path, function( data ) { 
                return data;
            });  

        },
        setRepositorySource: function (newRepository) {
            localStorage.setItem("egitor_repository_url", newRepository.url);
            localStorage.setItem("egitor_repository_login", newRepository.login);
            localStorage.setItem("egitor_repository_password", newRepository.password);

            var success = function (data) {
                $(document).trigger('reloadRepository');
            };
            var failure = function (data) {
                $(document).trigger('reloadRepository');
            };

            batExecutorService.executeBat("clearRepo.bat",  function(){}, function(){}, []);
            setTimeout(function(){
                batExecutorService.executeBat("getNewRepo.bat", success, failure, [newRepository.url+' '+newRepository.login +' '+ newRepository.password]);
            },5000)

        }

    }

}]);