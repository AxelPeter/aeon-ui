(function() {
    'use strict';

    var ChecklistCtrl = function($filter) {
        var component = this;

        // Init
        component.$onInit = function() {
            // Default values
            if (!angular.isNumber(component.minLength)) { component.minLength = 3; }
            if (!angular.isNumber(component.maxTags)) { component.maxTags = 5; }
            if (angular.isUndefined(component.selectionLabel)) { component.selectionLabel = 'Select elements containing:'; }
            if (angular.isUndefined(component.selectAllLabel)) { component.selectAllLabel = 'Include'; }
            if (angular.isUndefined(component.unselectAllLabel)) { component.unselectAllLabel = 'Exclude'; }
            if (angular.isUndefined(component.emptyLabel)) { component.emptyLabel = 'No result'; }
            if (angular.isUndefined(component.itemsLengthLabel)) { component.itemsLengthLabel = 'Number of items:'; }
        };

        // Apply the change to the ngModel
        var updateModel = function() {
            var model = $filter('filter')(component.ngModel, { selected: true });

            // Trigger the change
            component.ngChange({ value: model });
        };

        // Pass item value to false
        var unselectItem = function(item) {
            item.selected = false;

            // Update model
            updateModel();
        };

        // Pass all items values to false
        var unselectAll = function() {
            angular.forEach(component.ngModel, function(value) {
                value.selected = false;
            });

            // Update model
            updateModel();
        };

        // Pass all items filtered to true or false
        var selectFilteredAll = function(selected) {
            var itemsFiltered = $filter('filter')(component.ngModel, { name: component.searchValue });
            angular.forEach(itemsFiltered, function(value) {
                value.selected = selected;
            });

            // Update model
            updateModel();
        };

        // Exposed methods
        component.fn = {
            updateModel: updateModel,
            unselectItem: unselectItem,
            unselectAll: unselectAll,
            selectFilteredAll: selectFilteredAll
        };
    };

    var ChecklistComponent = {
        require: 'ngModel',
        bindings: {
            minLength: '@',
            maxTags: '@',
            placeholder: '@',
            emptyLabel: '@',
            selectionLabel: '@',
            selectAllLabel: '@',
            unselectAllLabel: '@',
            itemsLengthLabel: '@',
            ngModel: '<',
            ngChange: '&'
        },
        template: [
            '<div class="checklist">',
                '<div class="checklist-result form-group">',
                    '<p>{{ component.itemsLengthLabel }} <strong>{{ (component.ngModel | filter: { name: component.searchValue }).length + \'/\' + component.ngModel.length }}</strong></p>',
                '</div>',
                '<div class="checklist-search form-group has-feedback">',
                    '<input class="form-control input-rounded" placeholder="{{ component.placeholder }}" type="text" ',
                        'ng-minlength="minLength" ng-model="component.searchValue" autocomplete="off">',
                    '<span class="fa fa-search form-control-feedback" aria-hidden="true"></span>',
                '</div>',
                '<div class="checklist-selection form-group" ng-show="component.searchValue">',
                    '<p>',
                        '{{ component.selectionLabel }} &laquo;<strong>{{ component.searchValue }}</strong>&raquo;<br />',
                        '<button type="button" class="btn btn-xs btn-default" ng-click="component.fn.selectFilteredAll(true)">{{ component.selectAllLabel }}</button> ',
                        '<button type="button" class="btn btn-xs btn-default" ng-click="component.fn.selectFilteredAll(false)">{{ component.unselectAllLabel }}</button>',
                    '</p>',
                '</div>',
                '<div class="form-group checkbox-list checkbox-list-bordered">',
                    '<div class="checkbox checkbox-custom" ng-repeat="item in component.ngModel | filter: { name: component.searchValue }">',
                        '<label>',
                            '<input type="checkbox" value="{{ item.value }}" ng-model="item.selected" ng-change="component.fn.updateModel()">',
                            '<span>{{ item.name }}</span>',
                        '</label>',
                    '</div>',
                    '<p ng-if="!(component.ngModel | filter: { name: component.searchValue }).length">{{ component.emptyLabel }}</p>',
                '</div>',
                '<div class="tags form-group" ng-show="(component.ngModel | filter: { selected: true }).length">',
                    '<button type="button" class="btn btn-sm btn-link tag" ',
                        'ng-repeat="item in component.ngModel | filter: { selected: true } | limitTo: component.maxTags" ng-click="component.fn.unselectItem(item)">',
                        '{{ item.name }}<i class="fa fa-times"></i>',
                    '</button>',
                    '<span class="btn btn-sm btn-link tag-overflow" ng-if="(component.ngModel | filter: { selected: true }).length > component.maxTags">+{{ ((component.ngModel | filter: { selected: true }).length - component.maxTags) }}</span>',
                    '<button type="button" class="btn btn-sm btn-primary tag-clear" ',
                        'ng-click="component.fn.unselectAll()">',
                        '<i class="fa fa-times"></i>', 
                    '</button>',
                '</div>',
            '</div>'
        ].join(''),
        controller: ChecklistCtrl,
        controllerAs: 'component'
    };

    ChecklistCtrl.$inject = ['$filter'];
    
    angular.module('aeon-ui')
        .component('uiChecklist', ChecklistComponent);
}());