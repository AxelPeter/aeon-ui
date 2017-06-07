(function() {
    'use strict';
    
    var MarkdownAttribute = function($rootScope, $anchorScroll, $compile, $http, $sce, $showdown) {
        return {
            restrict: 'A',
            scope: {
                markdown: '@jsMarkdown'
            },
            link: function(scope, element) {
                scope.$watch(function() { return scope.markdown; }, function(newValue) {
                    $http.get(newValue).then(
                        function success(e) {
                            var md = e.data || '';
                            var html = $sce.trustAsHtml($showdown.makeHtml(md));

                            // Put the content in the element
                            element.html(html);
                            $compile(element.contents())(scope);
                            
                            // Scroll if there is an anchor in the URL
                            $anchorScroll();
                            
                            // Notify loaded data
                            $rootScope.$broadcast('jsMarkdown:loaded', html);
                        }, 
                        function error() {
                            throw new Error('Invalid file URL');
                        }
                    );
                });
            }
        };
    };
    
    MarkdownAttribute.$inject = ['$rootScope', '$anchorScroll', '$compile', '$http', '$sce', '$showdown'];
    
    angular.module('wiki')
        .directive('jsMarkdown', MarkdownAttribute);
}());