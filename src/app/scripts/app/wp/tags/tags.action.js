'use strict';
    angular.module('cjd')
        .config(function($stateProvider){
            $stateProvider.state('site.wp.tags',{
                parent:'site.wp',
                url:'/tags/:tags',
                templateUrl:'app/wp/tags/tags.html',
                controller:'wp.tags.controller'
            })
        })
