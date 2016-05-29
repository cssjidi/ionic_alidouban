'use strict';
    angular.module('cjd')
        .config(function($stateProvider){
            $stateProvider.state('site.wp.photo',{
                parent:'site.wp',
                url:'/page/:id',
                templateUrl:'app/wp/page/page.html',
                controller:'wp.page.controller'
            })
        })
