(function() {
    'use strict';
    
    var AnchorAttribute = function(AnchorsFactory) {
        var anchorLink = function(scope, element) {
            var anchor = {
                id: element[0].id,
                title: scope.title || angular.element(element[0]).text(),
                error: scope.error,
                value: scope.value,
                offset: 0,

                isHidden: angular.isUndefined(scope.isHidden),
                isGroup: angular.isDefined(scope.isGroup),
                isHeader: angular.isDefined(scope.isHeader)
            };

            // Add offset method to the element to get the real offset
            element.offset = function() {
                var element = this[0];
                var body = document.documentElement || document.body;
                var scrollX = window.pageXOffset || body.scrollLeft;
                var scrollY = window.pageYOffset || body.scrollTop;

                return {
                    left: element.getBoundingClientRect().left + scrollX,
                    top: element.getBoundingClientRect().top + scrollY
                };
            };

            // If the anchor has moved, we have to repositionning it in the summary
            scope.$watch(function() { 
                return element.offset().top; 
            }, function(value) {
                anchor.offset = value;
                AnchorsFactory.reorder(anchor);
            });

            // Add the anchor to the factory
            AnchorsFactory.add(anchor);

            // If value changed
            scope.$watch('value', function (value) {
                anchor.value = value;
                AnchorsFactory.update(anchor);
            });

            // If value has error
            scope.$watch('error', function (value) {
                anchor.error = value;
                AnchorsFactory.update(anchor);
            });

            // If hidden/visible value change
            scope.$watch('isHidden', function(value) {
                anchor.isHidden = value;
                AnchorsFactory.update(anchor);
            });

            // If $destroy
            scope.$on('$destroy', function() {
                AnchorsFactory.delete(anchor);
            });
        };
        
        return {
            restrict: 'A',
            scope: {
                title: '@',
                error: '=anchorError',
                value: '=anchorValue',
                isHidden: '=',
                isGroup: '@',
                isHeader: '@'
            },
            link: anchorLink
        };
    };

    var AnchorsFactory = function($filter) {
        var self = {};
        var anchorsList = [];

        // To get the anchors list
        self.get = function() {
            return anchorsList;
        };

        // To add an anchor
        self.add = function(anchor) {
            anchorsList.push(anchor);
        };

        // To update an anchor
        self.update = function(anchor) {
            var index = anchorsList.indexOf(anchor);
            if (index > -1) { anchorsList[index] = anchor; }
        };

        // To delete an anchor
        self.delete = function(anchor) {
            var index = anchorsList.indexOf(anchor);
            if (index > -1) { anchorsList.splice(index, 1); }
        };

        // To reorder the anchors list
        self.reorder = function() {
            anchorsList = $filter('orderBy')(anchorsList, 'offset');
        };

        return self;
    };

    var SummaryCtrl = function($anchorScroll, $location, AnchorsFactory) {
        var component = this;

        // Scrolling management
        $anchorScroll.yOffset = Math.max(parseInt(component.scrollOffset), 0);
        var scrollTo = function(e) {
            // To prevent the browser scroll to anchor (if link)
            e.preventDefault();

            // Set hash to URL
            var hash = (e.target.getAttribute('href')).replace('#','');
            $location.hash(hash);

            // Scroll to anchor
            $anchorScroll();

            return false;
        };

        // Exposed method
        component.fn = {
            getAnchors: AnchorsFactory.get,
            scrollTo: scrollTo
        };
    };

    var SummaryComponent = {
        bindings: {
            scrollOffset: '@'
        },
        template: [
            '<div class="summary">',
                '<dl class="summary-list">',
                    '<dt ng-repeat-start="anchor in component.fn.getAnchors()" ng-if="!anchor.isHidden" data-href="#{{ anchor.id }}" ',
                        'ng-class="{ \'summary-header\': anchor.isHeader, \'summary-title\': anchor.isGroup, \'is-empty\': (!anchor.value && !anchor.isGroup), \'has-error\': anchor.error }">',
                        '<a ng-if="anchor.id" href="#{{ anchor.id }}" ng-click="component.fn.scrollTo($event)">{{ anchor.title }}</a>',
                        '<span ng-if="!anchor.id">{{ anchor.title }}</span>',
                    '</dt>',
                    '<dd ng-repeat-end ng-if="anchor.value && !anchor.isHidden">',
                        '<pre>{{ anchor.value }}</pre>',
                    '</dd>',
                '</dl>',
            '</div>'
        ].join(''),
        controller: SummaryCtrl,
        controllerAs: 'component'
    };
    
    AnchorAttribute.$inject = ['AnchorsFactory'];
    AnchorsFactory.$inject = ['$filter'];
    SummaryCtrl.$inject = ['$anchorScroll', '$location', 'AnchorsFactory'];
    
    angular.module('aeon-ui')
        .directive('uiAnchor', AnchorAttribute)
        .factory('AnchorsFactory', AnchorsFactory)
        .component('uiSummary', SummaryComponent);
}());