'use strict';
    angular.module('cjd')
    .factory('AuthenticationService', function() {
        var auth = {
            isAuthenticated: false,
            isAdmin: false
        }
        return auth;
    })
    .service('phoneService',function($http,WEBURL){
        this.method = 'GET';
        this.url = WEBURL;
        $http({
            url:WEBURL,
            withCredentials:true,
            method:this.method
        })
    })
    .factory('Token',function($location,$window){
        return {
            get:function(url) {
                alert(url);
                if(url === ''){
                    return;
                }
                var hash = url.split('#');
                var queryString = hash[1];
                var queries = queryString.split("&");
                var params = {}
                for (var i = 0; i < queries.length; i++) {
                    var pair = queries[i].split('=');
                    params[pair[0]] = pair[1];
                }
                return params;
            },
            save:function(url){
                var obj = this.get(url);
                $window.localStorage.token = obj.access_token;
            }

        }
    })
    .service('ExpressService',function($window) {
        this.time = (Date.parse(new Date())/1000);
        //$scope.time1 = (Date.parse(new Date())/1000);
        if ($window.localStorage.express_time && $window.localStorage.express_time < this.time) {

        }
    })
    .factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                }
                return config;
            },
            requestError: function(rejection) {
                return $q.reject(rejection);
            },
            /* Set Authentication.isAuthenticated to true if 200 received */
            response: function (response) {
                if (response != null && response.status == 200 && $window.localStorage.token && !AuthenticationService.isAuthenticated) {
                    AuthenticationService.isAuthenticated = true;
                }
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection != null && rejection.status === 401 && ($window.localStorage.token || AuthenticationService.isAuthenticated)) {
                    delete $window.localStorage.token;
                    AuthenticationService.isAuthenticated = false;
                    $location.path("/site/login");
                }
                return $q.reject(rejection);
            }
        };
    })
    .factory('Menus',function($resource,GLOBAL){
        return $resource('http://www.alidouban.com/wp-json/wp/v2/categories',{

        }, {
            query:{
                method:'GET',
                withCredentials:true,
                cache:true,
                isArray:true,
            }
        });
    })
    .factory('Media',function($resource){
        return $resource('http://www.alidouban.com/wp-json/wp/v2/media?:theQquery',{
            theQquery: '@theQquery'
        },{
            query:{
                method:'GET',
                withCredentials:true,
                cache:true,
                isArray:true
            }
        })
    })
    .factory('Posts',function($resource,GLOBAL){
        //return $resource('/posts/?:theQquery', {
        return $resource('http://www.alidouban.com/wp-json/wp/v2/posts/?:theQquery', {
            theQquery: '@theQquery'
        }, {
            query: {
                method: 'GET',
                cache: true,
                isArray: true
        }
        });
    })
    .factory('PostDetail',function($resource,GLOBAL){
        return $resource('http://www.alidouban.com/wp-json/wp/v2/posts/:postId', {
            postId: '@postId'
        }, {
            query: {
                method: 'GET',
                cache: true,
                isArray: true
            }
        });
    })
    .factory('PageDetail',function($resource,GLOBAL){
        return $resource('http://alidouban.com/wp-json/wp/v2/pages/:pageId', {
            pageId: '@pageId'
        }, {
            query: {
                method: 'GET',
                cache: true,
                isArray: true
            }
        });
    })
    .factory('Users',function($resource){
        return $resource('http://www.xiaodouban.com/wp-json/wp/v2/users/:uid', {
            uid: '@uid'
        }, {
            query: {
                method: 'GET',
                cache: true,
                isArray: true
            }
        });
    })
    .factory('LoginService',function($resource,GLOBAL){
        return $resource('/oauth', {}, {
            query: {
                method: 'POST',
                withCredentials:true,
                cache: true,
                isArray: true,
                header:{
                    'Last-Modified':'Tue, 08 Sep 2015 08:42:05 GMT'
                }
            }
        });
    })
    .factory('LoginService1',function($http,GLOBAL,$q){
       var service = {
           getCode : function(data) {
               var deferred  = $q.defer();
               var promise = deferred.promise;
               if(typeof data !== 'object') return;
               $http({
                   method: 'POST',
                   url:'/oauth2',
                   cache: true,
                   headers: {
                       'Content-Type':'application/x-www-form-urlencoded',
                       'Content-Length': data.length
                   },
                   data:data
               }).success(function(data){
                   deferred.resolve(data);
               }).error(function(error){
                   deferred.reject(error);
               })
               return promise;
           }
       }
        return service;
    })

