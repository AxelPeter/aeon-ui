(function() {
    'use strict';
    
    var ConfigApp = function($stateProvider, $urlRouterProvider, $uiViewScrollProvider, $toastrConfig) {
        // To scroll to top on view changed (to use with autoscroll="true" on all ui-view)
        $uiViewScrollProvider.useAnchorScroll();
        
        // Config for routes
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'partials/home.html'
            })
            .state('components', {
                url: '/components',
                templateUrl: 'partials/components.html',
                controller: 'ComponentsCtrl',
                controllerAs: 'vm'
            })
            .state('icons', {
                url: '/icons',
                templateUrl: 'partials/icons.html'
            })
            .state('guidelines', {
                url: '/guidelines',
                templateUrl: 'partials/guidelines.html'
            })
            .state('tests', {
                url: '/tests',
                templateUrl: 'partials/tests.html',
                controller: 'TestsCtrl',
                controllerAs: 'vm'
            });
        
        // Config for toastr
        angular.extend($toastrConfig, {
            allowHtml: true,
            closeButton: true,
            closeHtml: [
                '<button type="button" class="toast-close-button" role="button">',
                    '<i class="fa fa-times"></i>',
                '</button>'
            ].join(''),
            positionClass: 'toast-bottom-right',
            maxOpened: 5,
            newestOnTop: true,
            progressBar: true,
            timeOut: 5000,
            extendedTimeOut: 1000
        });
    };
    
    var InitApp = function($rootScope, $transitions, $window) {
        // Check for viewport
        var isMobile = function () {
            var winWidth = $window.innerWidth || $window.outerWidth;
            return winWidth < 992;
        };

        // Nav Helper
        $rootScope.navOpened = true;
        var closeAll = function() { 
            $rootScope.navOpened = false;
            $rootScope.sidebarOpened = false; 
        };
        var openNav = function(menu) { 
            $rootScope.navOpened = ($rootScope.navOpened !== menu) ? menu : false;
            $rootScope.sidebarOpened = false;
        };
        $rootScope.openNav = openNav;
        $rootScope.closeAll = closeAll;

        // Sidebar Helper
        $rootScope.sidebarOpened = !isMobile();
        var toggleSidebar = function() { 
            $rootScope.navOpened = false;
            $rootScope.sidebarOpened = !$rootScope.sidebarOpened;
        };
        $rootScope.toggleSidebar = toggleSidebar;

        // When the View is changed, close the Sidebar
        $transitions.onBefore({ to: true, from: true }, closeAll);

        // Check on resize if window is 'mobile'
        angular.element($window).on('resize', closeAll);
    };
    
    ConfigApp.$inject = ['$stateProvider', '$urlRouterProvider', '$uiViewScrollProvider', 'toastrConfig'];
    InitApp.$inject = ['$rootScope', '$transitions', '$window'];
    
    angular
        .module('wiki', [
            'ngAnimate', 'ngSanitize' ,'ngTouch', 
            'ui.bootstrap', 'ui.router', 'toastr', 'ng-showdown',
            'aeon-ui'
        ])
        .config(ConfigApp)
        .run(InitApp);
}());