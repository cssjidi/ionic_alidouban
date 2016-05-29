'use strict';
    angular.module('cjd')
        .config(function($stateProvider){
            $stateProvider.state('site.wp.detail',{
                parent:'site.wp',
                url:'/detail/:id',
                templateUrl:'app/wp/detail/detail.html',
                controller:'wp.detail.controller'
            })
        })
