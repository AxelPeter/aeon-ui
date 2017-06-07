(function() {
    'use strict';

    var TreeviewCtrl = function($filter) {
        var component = this;

        // Init
        component.$onInit = function() {
            // Default values
            if (angular.isUndefined(component.minLength)) { component.minLength = 3; }

            component.isEmpty = false;
        };

        // Exposed methods
        component.fn = {
            getNbResult: function(search) {
                var nbResult = 0;
                // Add search length to nbResult
                angular.forEach(component.ngModel, function(item) {
                    nbResult += $filter('filter')(item.values, search).length;
                });
                component.isEmpty = (nbResult === 0);
            },
            initSelectedValues: function(item) {
                if (!angular.isObject(item.selected)) { 
                    item.selected = {};
                }
            },
            unselectItem: function(item, key) {
                item.selected[key] = false;

                // Trigger the change
                component.ngChange({ value: component.ngModel });
            }
        };
    };

    var TreeviewComponent = {
        require: 'ngModel',
        bindings: {
            minLength: '@',
            placeholder: '@',
            emptyLabel: '@',
            ngModel: '<',
            ngChange: '&'
        },
        template: [
            '<div class="treeview">',
                '<div class="treeview-search form-group has-feedback">',
                    '<input class="form-control input-rounded" placeholder="{{ component.placeholder }}" type="text" ',
                        'ng-minlength="component.minLength" ng-model="component.searchValue" ng-change="component.fn.getNbResult(component.searchValue)" autocomplete="off">',
                    '<span class="fa fa-search form-control-feedback" aria-hidden="true"></span>',
                '</div>',
                '<div class="form-group">',
                    '<ul class="treeview-list treeview-list-bordered">',
                        '<li ng-repeat="item in component.ngModel" ',
                            'ng-if="(item.values | filter: component.searchValue).length" ',
                            'ng-class="{ \'open\': !item.collapse }" ng-init="component.fn.initSelectedValues(item)">',
                            '<button type="button" class="treeview-btn" ng-click="item.collapse = !item.collapse">',
                                '<span class="toggle"><i class="fa fa-caret-right" aria-hidden="true"></i></span>',
                                '<span class="link" ng-bind="item.name"></span>',
                            '</button>',
                            '<ul class="treeview-container">',
                                '<li ng-repeat="value in item.values | filter: component.searchValue" class="treeview-checkbox checkbox checkbox-custom">',
                                    '<label>',
                                        '<input type="checkbox" ng-model="item.selected[value]" ng-change="component.ngChange({ value: component.ngModel })">',
                                        '<span ng-bind="value"></span>',
                                    '</label>',
                                '</li>',
                            '</ul>',
                        '</li>',
                        '<li ng-if="component.isEmpty">{{ component.emptyLabel }}</li>',
                    '</ul>',
                '</div>',
                '<div class="tags form-group">',
                    '<span ng-repeat="item in component.ngModel">',
                        '<button type="button" class="btn btn-sm btn-link tag" ',
                            'ng-repeat="(key, value) in item.selected" ng-show="value" ng-click="component.fn.unselectItem(item, key)">',
                            '{{ key }}<i class="fa fa-times"></i>',
                        '</button>',
                    '</span>',
                '</div>',
            '</div>',
        ].join(''),
        controller: TreeviewCtrl,
        controllerAs: 'component'
    };

    TreeviewCtrl.$inject = ['$filter'];

    angular.module('aeon-ui')
        .component('uiTreeview', TreeviewComponent);
}());