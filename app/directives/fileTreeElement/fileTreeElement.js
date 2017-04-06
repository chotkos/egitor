app.directive("fileTreeElement", function($compile) {
    return {
        restrict: 'E', 
        link: function(scope){},
        compile:function(tElement,tAttr){
            var contents = tElement.contents().remove();
            var compiledContents;
            return function(scope, iElement, iAttr) {
                if(!compiledContents) {
                    compiledContents = $compile(contents);
                }
                compiledContents(scope, function(clone, scope) {
                         iElement.append(clone); 
                });
            };
        },
        controller: function($scope,$location){
            var guid = function() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };

            $scope.guid = guid();         
            $scope.clickedTreeElement = function(el){
                if(!el.isFolder){ 
                    $location.path('file').search({path: el.path});       
                }
            }   
        },
        scope: {
            child: '=' 
        },
        templateUrl : "app/directives/fileTreeElement/fileTreeElement.html"
    };
});