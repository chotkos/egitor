app.factory('repositoryService', ['batExecutorService', function (batExecutorService) {
    var repository = {
        isRoot: true,
        isFolder: true,
        name: "Repository",
        path: "./",
        family: [{
                isRoot: false,
                isFolder: true,
                name: "MyNotes",
                path: "./MyNotes",
                family: [{
                        isRoot: false,
                        isFolder: false,
                        name: "Note1",
                        family: [],
                        path: "./MyNotes/Note1.html",
                        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

                    },
                    {
                        isRoot: false,
                        isFolder: false,
                        name: "Note2",
                        family: [],
                        path: "./MyNotes/Note2.html",
                        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

                    },
                    {
                        isRoot: false,
                        isFolder: true,
                        name: "Details",
                        path: "./MyNotes/Details",
                        family: [{
                                isRoot: false,
                                isFolder: true,
                                name: "Details",
                                path: "./MyNotes/Details/Details",
                                family: [{
                                        isRoot: false,
                                        isFolder: false,
                                        name: "Note1",
                                        path: "./MyNotes/Details/Details/Note1.html",
                                        family: [],
                                        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

                                    },
                                    {
                                        isRoot: false,
                                        isFolder: false,
                                        name: "Note2",
                                        path: "./MyNotes/Details/Details/Note2.html",
                                        family: [],
                                        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

                                    },
                                    {
                                        isRoot: false,
                                        isFolder: false,
                                        name: "Note3",
                                        path: "./MyNotes/Details/Details/Note3.html",
                                        family: [],
                                        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                    }
                                ],
                            },
                            {
                                isRoot: false,
                                isFolder: false,
                                name: "FreeNote",
                                path: "./MyNotes/Details/FreeNote.html",
                                family: [],
                                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                            }
                        ]
                    }
                ],
            },
            {
                isRoot: false,
                isFolder: false,
                name: "FreeNote",
                path: "./FreeNote.html",
                content: "<b>some bold<b/>",
                family: []
            }
        ]
    };
    return {
        get: function () {
            return repository;
        },
        getFileByPath: function (path) {
            var all = this.get();
            var pathArray = path.split("/");
            pathArray.shift();

            function findFileRecursive(pathArray, node) {
                for (var i = 0; i < node.family.length; i++) {
                    var item = node.family[i];
                    if (item.isFolder) {
                        var newPath = pathArray.slice(0);
                        newPath.shift();
                        var deeperResults = findFileRecursive(newPath, item);
                        if (deeperResults) return deeperResults;
                    } else if (item.name + '.html' == pathArray[0])
                        return item;
                }
            }

            return findFileRecursive(pathArray, all);
            return null;

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