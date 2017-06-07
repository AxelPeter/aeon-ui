(function() {
    'use strict';
    
    var GuidelinesCtrl = function($anchorScroll) {
        
        // Scroll to anchor
        $anchorScroll();
    };
    
    GuidelinesCtrl.$inject = ['$anchorScroll'];
    
    angular.module('wiki')
        .controller('GuidelinesCtrl', GuidelinesCtrl);
}());