(function() {
    'use strict';

    var ProgressionCtrl = function() {
        var component = this;

        // Update the value percentage
        var updatePercent = function(value) {
            if (angular.isNumber(value)) {
                var valueNow = value - component.valueMin;
                var valueMax = component.valueMax - component.valueMin;
                
                // Round the value
                component.valuePercent = Math.round(valueNow / valueMax * 100);
            }
            else { throw new Error('ng-model is not a Number'); }
        };

        // Init
        component.$onInit = function() {
            // Check mandatory bindings
            if (angular.isNumber(component.valueMin)) { throw new Error('value-min is not a Number'); }
            if (angular.isNumber(component.valueMax)) { throw new Error('value-max is not a Number'); }

            // Then update the value percentage
            component.valuePercent = 0;
            updatePercent(component.ngModel);
        };

        // On changes
        component.$onChanges = function() {
            updatePercent(component.ngModel);
        };

        // Exposed method
        component.fn = {
            updatePercent: updatePercent
        };
    };
    
    var ProgressionComponent = {
        require: 'ngModel',
        bindings: {
            ngModel: '<',
            valueMin: '@',
            valueMax: '@',
            variantClass: '@'
        },
        template: [
            '<div class="progression">',
                '<dl class="progress-header">',
                    '<dt class="progress-label">{{ component.valuePercent }}%</dt>',
                    '<dd class="progress-desc">{{ component.ngModel }}/{{ component.valueMax }}</dd>',
                '</dl>',
                '<div class="progress">',
                    '<div class="progress-bar {{ component.variantClass }}" role="progressbar" aria-valuenow="{{ component.ngModel }}" aria-valuemin="{{ component.valueMin }}" aria-valuemax="{{ component.valueMax }}" style="width: {{ component.valuePercent }}%;">',
                        '<span class="sr-only">{{ component.valuePercent }}%</span>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''),
        controller: ProgressionCtrl,
        controllerAs: 'component'
    };
    
    angular.module('aeon-ui')
        .component('uiProgression', ProgressionComponent);
}());