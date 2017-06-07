(function() {
    'use strict';

    // var UploaderLink = function() {
        
    // };

    var UploaderCtrl = function($scope, $window) {
        var component = this;
        var file = new $window.FileReader();

        // Init
        component.$onInit = function() {
             component.background = null;
             component.isRequired = angular.isDefined(component.required);

            // Set events if defined in parameters
            if (angular.isFunction(component.onProgress)) { file.onprogress = component.onProgress; }
            if (angular.isFunction(component.onError)) { file.onerror = component.onError; }
        };

        // Methods
        var checkValidity = function(file) {
            var errors = {};

            // Check file size
            if (angular.isDefined(component.size) && file.size > parseInt(component.size)) { errors.size = true; }

            return errors;
        };

        var onChange = function(input) {
            // Check file loaded
            var errors = checkValidity(input.files[0]);

            console.log($scope);

            // Read file if valid
            if (!Object.keys(errors).length) { 
                component.isActive = true;
                component.hasError = false;
                file.readAsDataURL(input.files[0]);

                // Callback on change
                if (angular.isFunction(component.ngChange)) { component.ngChange({ value: input.files[0] }); }
            }
            else { 
                component.isActive = false;
                component.hasError = true;
                component.background = null;

                // Callback on error
                if (angular.isFunction(component.onError)) { component.onError(errors); }
            }

            $scope.$apply();
        };

        var onLoad = function(e) {
            $scope.$apply(function() {
                component.background = 'url(' + file.result + ')';
            });

            // Callback on load
            if (angular.isFunction(component.onLoad)) { component.onLoad(e); }
        };

        // On load
        file.onload = onLoad;

        // On change (ngChange don't work on input file)
        $scope.onChange = onChange;
    };

    var UploaderComponent = {
        require: 'ngModel',
        transclude: true,
        bindings: {
            ngModel: '<',
            ngChange: '&',
            name: '@',
            accept: '@',
            size: '@',
            required: '@isRequired',
            variantClass: '@',
            onLoad: '&',
            onProgress: '&',
            onError: '&'
        },
        template: [
            '<div class="uploader {{ component.variantClass }}" ng-class="{ \'active\': component.isActive, \'focus\': component.hasFocus, \'error\': component.ngModel.$invalid && (component.ngModel.$touched || component.ngModel.$$parentForm.$submitted) }">',
                '<input name="{{ component.name }}" class="uploader-input" type="file" accept="{{ component.accept }}" ng-model="component.ngModel" ng-required="component.isRequired" ng-focus="component.hasFocus = true" ng-blur="component.hasFocus = false" onchange="angular.element(this).scope().onChange(this)" valid-file>',
                '<div class="uploader-content" ng-style="{ \'background-image\': component.background }" ng-transclude></div>',
            '</div>'
        ].join(''),
        controller: UploaderCtrl,
        controllerAs: 'component'
    };

    // var UploaderComponent = function() {
    //     return {
    //         require: 'ngModel',
    //         transclude: true,
    //         scope: {
    //             ngModel: '<',
    //             ngChange: '&',
    //             accept: '@',
    //             size: '@',
    //             required: '@',
    //             variantClass: '@',
    //             onLoad: '&',
    //             onProgress: '&',
    //             onError: '&'
    //         },
    //         template: [
    //             '<div class="uploader {{ component.variantClass }}" ng-class="{ \'active\': component.isActive, \'focus\': component.hasFocus, \'error\': component.ngModel.$invalid && (component.ngModel.$touched || component.ngModel.$$parentForm.$submitted) }">',
    //                 '<input class="uploader-input" type="file" accept="{{ component.accept }}" ng-model="component.ngModel" ng-required="component.required" ng-focus="component.hasFocus = true" ng-blur="component.hasFocus = false" onchange="angular.element(this).scope().onChange(this)" valid-file="component.">',
    //                 '<div class="uploader-content" ng-style="{ \'background-image\': component.background }" ng-transclude></div>',
    //             '</div>'
    //         ].join(''),
    //         link: UploaderLink,
    //         controller: UploaderCtrl,
    //         controllerAs: 'component'
    //     };
    // };

    var ValidFile = function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                // Change event is fired when file is selected
                element.bind('change', function() {
                    scope.$apply(function() {
                        // The ngModel with input file doesn't update when changed
                        ctrl.$setViewValue(element.val());
                        ctrl.$render();
                    });
                });
            }
        };
    };
    
    UploaderCtrl.$inject = ['$scope', '$window'];
    
    angular.module('aeon-ui')
        .directive('validFile', ValidFile)
        .component('uiUploader', UploaderComponent);
}());