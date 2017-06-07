(function() {
    'use strict';
    
    var TestsCtrl = function($scope, $anchorScroll, $uibModal, toastr, toastrConfig) {
        var vm = this;
        
        vm.dt = new Date();
        vm.options = {
            minDate: new Date(),
            showWeeks: true
        };

        // Mock data for the tag component
        vm.tagItems = [{
            value: 1234,
            name: 'Lorem ipsum'
        }, {
            value: 1472,
            name: 'Dolor sit amet'
        }, {
            value: 1596,
            name: 'In placerat mauris'
        }, {
            value: 1523,
            name: 'Integer non facilisis'
        }, {
            value: 1321,
            name: 'Phasellus dictum'
        }, {
            value: 1234,
            name: 'Lorem ipsum'
        }, {
            value: 1472,
            name: 'Dolor sit amet'
        }, {
            value: 1596,
            name: 'In placerat mauris'
        }, {
            value: 1523,
            name: 'Integer non facilisis'
        }, {
            value: 1321,
            name: 'Phasellus dictum'
        }, {
            value: 1234,
            name: 'Lorem ipsum'
        }, {
            value: 1472,
            name: 'Dolor sit amet'
        }, {
            value: 1596,
            name: 'In placerat mauris'
        }, {
            value: 1523,
            name: 'Integer non facilisis'
        }, {
            value: 1321,
            name: 'Phasellus dictum'
        }];
        
        // Mock data for the checklist component
        vm.checklistItems = [{
            value: 1234,
            name: 'Lorem ipsum',
            selected: true
        }, {
            value: 1472,
            name: 'Dolor sit amet',
            selected: true
        }, {
            value: 1596,
            name: 'In placerat mauris',
            selected: false
        }, {
            value: 1523,
            name: 'Integer non facilisis',
            selected: false
        }, {
            value: 1321,
            name: 'Phasellus dictum',
            selected: false
        }];
        
        // Mock data for the treeview component
        vm.treeviewItems = [{
            id: 123,
            name: 'Sexe',
            selected: {
                'Homme': true
            },
            values: [
                'Homme',
                'Femme'
            ]
        }, {
            id: 124,
            name: 'Lorem ipsum dolor sit amet',
            selected: {
                'Quisque': true,
                'Aliquam': true,
                'Vestibulum': true
            },
            values: [
                'Quisque',
                'Vivamus',
                'Aliquam',
                'Vestibulum'
            ]
        }, {
            id: 125,
            name: 'Suspendisse mattis mi sit',
            values: [
                'Mauris',
                'Sed ac',
                'Praesent'
            ]
        }];
        
        // Set random value for the progression component
        vm.progressionDemo = Math.round(Math.random() * 40);
        
        // Set default value for the toast position
        vm.toastPosition = 'toast-bottom-right';
        
        // View methods
        vm.fn = {
            checklistChanged: function(model) {
                console.log('checklistChanged', model);
            },
            openModal: function() {
                $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'modalTest.html',
                    controller: function ($uibModalInstance) {
                        var self = this;

                        self.ok = function () { $uibModalInstance.close(); };
                        self.cancel = function () { $uibModalInstance.dismiss('cancel'); };
                        
                        return self;
                    },
                    controllerAs: 'modal'
                });
            },
            openToast: function() {
                var random = Math.ceil(Math.random() * 5);
                
                switch (random) {
                    case 1:
                        toastr.success('Hello world!', 'Toastr fun!');
                        break;
                    case 2:
                        toastr.info('We are open today from 10 to 22', 'Information');
                        break;
                    case 3:
                        toastr.warning('Your computer is about to explode!', 'Warning');
                        break;
                    case 4:
                        toastr.error('Your credentials are gone', 'Error');
                        break;
                    case 5:
                        toastr.success('I don\'t need a title to live');
                        break;
                }
            },
            clearAllToasts: function() {
                toastr.clear();
            },
            changeToastsPosition: function() {
                angular.extend(toastrConfig, {
                    positionClass: vm.toastPosition
                });
            },
            validationSubmit: function(form) {
                console.log('validationSubmit', form.$valid, form);
            }
        };
        
        // Scroll to anchor
        $anchorScroll();
        
        return vm;
    };
    
    TestsCtrl.$inject = ['$scope', '$anchorScroll', '$uibModal', 'toastr', 'toastrConfig'];
    
    angular.module('wiki')
        .controller('TestsCtrl', TestsCtrl);
}());