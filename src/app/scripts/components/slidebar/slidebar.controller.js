'use strict';

    angular.module('cjd')
        .controller('slider.controller',function($scope,$http,GLOBAL,$resource,Menus,$ionicSideMenuDelegate,$state){
            $scope.title = GLOBAL.website;
            Menus.query({},function(data){
                $scope.result = data;
            });
            $scope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };
            $scope.goCate = function(obj){
                $state.go('site.wp.cate',{
                    cate:obj,
                },{
                    reload:true
                });
            }
        })
        .controller('toggle.menu',function($scope,$ionicSideMenuDelegate,$ionicScrollDelegate){
            $scope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };

        })
        .controller('tabs.controller',function($scope,AuthenticationService,$window,$state,$cordovaInAppBrowser,$ionicTabsDelegate,$rootScope,Token){
            var options = {
                location: 'no',
                clearcache: 'no',
                toolbar: 'no'
            };
            $ionicTabsDelegate.select(0,true);
            $scope.selectTabWithIndex = function(index) {
                $ionicTabsDelegate.select(index);
            }
            $scope.goAbout = function(id){
                $state.go('site.wp.detail',{
                    id:id
                },{
                    reload:false
                });
            }
            $scope.goAccount = function(){
                $ionicTabsDelegate.select(1,true);
                if (!AuthenticationService.isAuthenticated && !$window.localStorage.token) {
                    $cordovaInAppBrowser.open('http://m.bootskit.com/auth.php?action=implicit', '_blank', options)
                        .then(function (event) {
                        })
                        .catch(function (event) {
                        });
                    //$cordovaInAppBrowser.close();
                    $rootScope.$on('$cordovaInAppBrowser:loadstart', function (e, event) {
                        if (event.url.indexOf('#') > -1) {
                            Token.save(event.url);
                            AuthenticationService.isAuthenticated = true;
                            $cordovaInAppBrowser.close();
                            $state.go('site.account.index');
                        }
                    });
                } else {
                    $state.go('site.account.index');
                }
            }
        })
