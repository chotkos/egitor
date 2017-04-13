app.directive("fileTreeElement", function ($compile) {
    return {
        restrict: 'E',
        link: function (scope) {},
        compile: function (tElement, tAttr) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function (scope, iElement, iAttr) {
                if (!compiledContents) {
                    compiledContents = $compile(contents);
                }
                compiledContents(scope, function (clone, scope) {
                    iElement.append(clone);
                });
            };
        },
        controller: function ($scope, $location) {
            var guid = function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };

            $scope.guid = guid();
            $scope.clickedTreeElement = function (el) {
                if (el.extension) {
                    $location.path('file').search({
                        path: el.path,
                        name: el.name
                    });
                }

                var getByScopeId = function (id) {
                    var filterfn = function (i, el) {
                        var sc = angular.element(el).scope();

                        return sc && sc.$id == id;
                    };
                    // low hanging fruit -- actual scope containers
                    var result = $('.ng-scope').filter(filterfn);
                    if (result && result.length) return result;

                    // try again on everything...ugh
                    return $(':not(.ng-scope)').filter(filterfn);
                }
                if (el.extension) {
                    var element = getByScopeId(this.$id);
                    console.log(element[0]);
                    $('.active-file').removeClass("active-file");
                    $(element[0]).addClass("active-file");
                }
            }
        },
        scope: {
            child: '='
        },
        transclude: true,
        templateUrl: "app/directives/fileTreeElement/fileTreeElement.html"
    };
});