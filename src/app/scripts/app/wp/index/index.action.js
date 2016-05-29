'use strict';
    angular.module('cjd')
        .config(function($stateProvider){
            $stateProvider.state('site.wp.index',{
                parent:'site.wp',
                url:'/index',
                templateUrl:'app/wp/index/index.html',
                controller:'wp.index.controller'
            })
        })
