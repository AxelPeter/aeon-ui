(function() {
    'use strict';
    
    var ComponentsCtrl = function() {
        var vm = this;
        
        // Mock data for the Checklist component
        vm.checklistItems = [{
            value: 1,
            name: 'Lorem ipsum',
            selected: true
        }, {
            value: 2,
            name: 'Dolor sit amet',
            selected: true
        }, {
            value: 3,
            name: 'In placerat mauris',
            selected: false
        }, {
            value: 4,
            name: 'Integer non facilisis',
            selected: false
        }, {
            value: 5,
            name: 'Phasellus dictum',
            selected: false
        }, {
            value: 6,
            name: 'Viverra velit ultricies',
            selected: true
        }, {
            value: 7,
            name: 'Curabitur eleifend',
            selected: false
        }, {
            value: 8,
            name: 'Donec id justo eget',
            selected: false
        }];
        vm.checklistChange = function(value) {
            console.log('checklistChange', value);
        };

        // Mock data for the Progression component
        vm.progressionDemo = Math.round(Math.random() * 40);
        vm.progressionChange = function() {
            vm.progressionDemo = Math.round(Math.random() * 40);
        };

        // Mock data for the Switch component
        vm.switchDemo = true;
        vm.switchChange = function(value) {
            console.log('switchChange', value);
        };

        // Mock data for the Tag component
        vm.tagDemo = [{
            value: 1,
            name: 'Lorem ipsum'
        }, {
            value: 2,
            name: 'Dolor sit amet'
        }, {
            value: 3,
            name: 'In placerat mauris'
        }, {
            value: 4,
            name: 'Integer non facilisis'
        }, {
            value: 5,
            name: 'Phasellus dictum'
        }, {
            value: 6,
            name: 'Viverra velit ultricies'
        }, {
            value: 7,
            name: 'Curabitur eleifend'
        }, {
            value: 8,
            name: 'Donec id justo eget'
        }];
        vm.tagChange = function(value) {
            console.log('tagChange', value);
        };

        // Mock data for the Treeview component
        vm.treeviewDemo = [{
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
        vm.treeviewChange = function(value) {
            console.log('treeviewChange', value);
        };

        // Mock data for the Uploader component
        vm.uploaderChange = function(value) {
            console.log('uploaderChange', value);
        };
    };
    
    angular.module('wiki')
        .controller('ComponentsCtrl', ComponentsCtrl);
}());
