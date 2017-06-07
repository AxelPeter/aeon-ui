(function() {
    'use strict';

    var SwitchCtrl = function() {
        var component = this;

        // Init
        component.$onInit = function() {
             component.isRequired = angular.isDefined(component.required);
        };
    };
            
    var SwitchComponent = {
        require: 'ngModel',
        bindings: {
            ngModel: '=',
            ngChange: '&',
            name: '@',
            required: '@isRequired',
            labelOn: '@',
            labelOff: '@',
            variantClass: '@'
        },
        template: [
            '<div class="switch {{ variantClass }}" ng-class="{ \'active\': component.ngModel }">',
                '<label class="switch-label" ng-class="{ \'focus\': component.hasFocus }">',
                    '<input name="{{ component.name }}" class="switch-control" type="checkbox" ng-model="component.ngModel" ng-required="component.isRequired" ng-change="component.ngChange({ value: component.ngModel })" ng-focus="component.hasFocus = true" ng-blur="component.hasFocus = false">',
                    '<span class="switch-bullet"></span>',
                    '<span class="switch-off" ng-if="component.labelOff.length" ng-bind="component.labelOff"></span>',
                    '<span class="switch-on" ng-if="component.labelOn.length" ng-bind="component.labelOn"></span>',
                '</label>',
            '</div>'
        ].join(''),
        controller: SwitchCtrl,
        controllerAs: 'component'
    };
    
    angular.module('aeon-ui')
        .component('uiSwitch', SwitchComponent);
}());