'use strict';
    angular.module('cjd')
        .config(function($stateProvider){
            $stateProvider.state('site.wp.cate',{
                parent:'site.wp',
                url:'/cate/:cate',
                templateUrl:'app/wp/cate/cate.html',
                controller:'wp.cate.controller'
            })
        })
