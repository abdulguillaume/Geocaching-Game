var MyApp;
(function (MyApp) {
    angular.module('MyApp', ['ionic', 'ui.router', 'ngCordova'])
        .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // Define routes
        $stateProvider
            .state('geolocation', {
            url: '/geolocation',
            templateUrl: '/ngApp/views/tab-geolocation.html',
            controller: MyApp.Controllers.GeolocationController,
            controllerAs: 'controller'
            //views: {
            //    'tab-geolocation': {
            //        templateUrl: '/ngApp/views/tab-geolocation.html',
            //        controller: MyApp.Controllers.GeolocationController,
            //        controllerAs: 'controller'
            //    }
            //}
        })
            .state('tab.camera', {
            url: '/camera',
            views: {
                'tab-camera': {
                    templateUrl: '/ngApp/views/tab-camera.html',
                    controller: MyApp.Controllers.CameraController,
                    controllerAs: 'controller'
                }
            }
            //templateUrl: '/ngApp/views/some-quotes.html',
            //controller: MyApp.Controllers.QuoteController,
            //controllerAs: 'controller'
        })
            .state('tab.quotes', {
            url: '/quotes',
            views: {
                'tab-quotes': {
                    templateUrl: '/ngApp/views/some-quotes.html',
                    controller: MyApp.Controllers.QuoteController,
                    controllerAs: 'controller'
                }
            }
            //templateUrl: '/ngApp/views/some-quotes.html',
            //controller: MyApp.Controllers.QuoteController,
            //controllerAs: 'controller'
        })
            .state('home', {
            url: '/',
            templateUrl: '/ngApp/views/tab-home.html',
            controller: MyApp.Controllers.HomeController,
            controllerAs: 'controller'
        })
            .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: '/ngApp/views/tabs.html'
        })
            .state('tab.dash', {
            url: '/dash',
            views: {
                'tab-dash': {
                    templateUrl: '/ngApp/views/tab-dash.html',
                    controller: MyApp.Controllers.DashController,
                    controllerAs: 'controller'
                }
            }
        })
            .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: '/ngApp/views/tab-chats.html',
                    controller: MyApp.Controllers.ChatsController,
                    controllerAs: 'controller'
                }
            }
        })
            .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: '/ngApp/views/chat-detail.html',
                    controller: MyApp.Controllers.ChatDetailController,
                    controllerAs: 'controller'
                }
            }
        })
            .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: '/ngApp/views/tab-account.html',
                    controller: MyApp.Controllers.AccountController,
                    controllerAs: 'controller'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        //$urlRouterProvider.otherwise('/tab/quotes');
        //$urlRouterProvider.otherwise('/');
        $urlRouterProvider.otherwise('/geolocation');
    });
})(MyApp || (MyApp = {}));
//# sourceMappingURL=app.js.map