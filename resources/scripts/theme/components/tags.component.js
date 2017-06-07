(function() {
    'use strict';

    var TagsCtrl = function($scope, $filter) {
        var component = this;

        // Init
        component.$onInit = function() {
            component.test = true;

            // Default value
            if (!angular.isNumber(component.maxTags)) { component.maxTags = 5; }

            angular.forEach(component.ngModel, function(value) {
                value.selected = true;
            });
        };

        // Apply the change to the ngModel
        var updateModel = function() {
            var model = $filter('filter')(component.ngModel, { selected: false });

            // Trigger the change
            component.ngChange({ value: model });
        };

        // Pass item's property 'selected' to false
        var unselectItem = function(item) {
            item.selected = false;

            // Update model
            updateModel();
        };

        // Pass all items' property 'selected' to false
        var unselectAll = function() {
            angular.forEach(component.ngModel, function(value) {
                value.selected = false;
            });

            // Update model
            updateModel();
        };

        // Exposed methods
        component.fn = {
            unselectItem: unselectItem,
            unselectAll: unselectAll
        };
    };

    var TagsComponent = {
        require: 'ngModel',
        bindings: {
            ngModel: '<',
            ngChange: '&',
            maxTags: '@'
        },
        template: [
            '<div class="tags" ng-show="(component.ngModel | filter: { selected: true }).length">',
                '<button type="button" class="btn btn-sm btn-link tag" ',
                    'ng-repeat="item in component.ngModel | filter: { selected: true } | limitTo: component.maxTags" ng-click="component.fn.unselectItem(item)">',
                    '{{ item.name }}<i class="fa fa-times"></i>',
                '</button>',
                '<span class="btn btn-sm btn-link tag-overflow" ng-if="(component.ngModel | filter: { selected: true }).length > component.maxTags">+{{ (component.ngModel | filter: { selected: false }).length - component.maxTags }}</span>',
                '<button type="button" class="btn btn-sm btn-primary tag-clear" ',
                    'ng-click="component.fn.unselectAll()">',
                    '<i class="fa fa-times"></i>', 
                '</button>',
            '</div>',
        ].join(''),
        controller: TagsCtrl,
        controllerAs: 'component'
    };

    TagsCtrl.$inject = ['$scope', '$filter'];
    
    angular.module('aeon-ui')
        .component('uiTags', TagsComponent);
}());