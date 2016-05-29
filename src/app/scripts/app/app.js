(function(){
    'use strict';
    angular.module('cjd',['ionic','ngResource','ngCordova',"ngSanitize","com.2fdevs.videogular","com.2fdevs.videogular.plugins.controls","com.2fdevs.videogular.plugins.overlayplay","com.2fdevs.videogular.plugins.poster"])
        .run(function($rootScope,$location,$http,$state,$ionicPlatform,AuthenticationService,$window){
            $rootScope.$on('$stateChangeStart',function(event,toState,toStateParmas){
                $rootScope.toState = toState;
                $rootScope.toStateParmas = toStateParmas;
            });
            $rootScope.$on('$stateChangeSuccess',function(event,toState,toParmas,fromState,fromParams){
                $rootScope.previousStateName = fromState.name;
                $rootScope.previousStateParms = fromParams;
            });
            $ionicPlatform.ready(function(){
               if(window.cordova && window.cordova.plugins.Keyboard){
                   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
               }
                if(window.StatusBar){
                    StatusBar.styleDefault();
                }
            });
            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                //redirect only if both isAuthenticated is false and no token is set
                if (toState != null && toState.access != null && toState.access.requiredAuthentication && !AuthenticationService.isAuthenticated && !$window.localStorage.token) {
                    $location.path("/site/login");
                }
            });
            //$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            //$http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        })
        .config(function($stateProvider,$urlRouterProvider,$httpProvider,$ionicConfigProvider){

            //$ionicConfigProvider.platform.ios.tabs.style('standard');
            $ionicConfigProvider.platform.ios.tabs.position('bottom');
            //$ionicConfigProvider.platform.android.tabs.style('standard');
            $ionicConfigProvider.platform.android.tabs.position('standard');
            //
            //$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
            //$ionicConfigProvider.platform.android.navBar.alignTitle('left');
            //
            //$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
            //$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
            //
            //$ionicConfigProvider.platform.ios.views.transition('ios');
            //$ionicConfigProvider.platform.android.views.transition('android');


            $httpProvider.interceptors.push('TokenInterceptor');
            $urlRouterProvider.otherwise('/site/wp/index');
                                //.when('/cate/:cate', '/site/wp/cate/:cate');
            $stateProvider.state('site',{
                url:'/site',
                abstract:true,
                templateUrl:'components/slidebar/slidebar.html'
            });

            $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.defaults.transformRequest = [function(data) {
                /**
                 * The workhorse; converts an object to x-www-form-urlencoded serialization.
                 * @param {Object} obj
                 * @return {String}
                 */
                var param = function(obj) {
                    var query = '';
                    var name, value, fullSubName, subName, subValue, innerObj, i;

                    for (name in obj) {
                        value = obj[name];

                        if (value instanceof Array) {
                            for (i = 0; i < value.length; ++i) {
                                subValue = value[i];
                                fullSubName = name + '[' + i + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value instanceof Object) {
                            for (subName in value) {
                                subValue = value[subName];
                                fullSubName = name + '[' + subName + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value !== undefined && value !== null) {
                            query += encodeURIComponent(name) + '='
                                + encodeURIComponent(value) + '&';
                        }
                    }

                    return query.length ? query.substr(0, query.length - 1) : query;
                };

                return angular.isObject(data) && String(data) !== '[object File]'
                    ? param(data)
                    : data;
            }];
        })


})();
