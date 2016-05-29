'use strict';
angular.module('cjd')
    .config(function($stateProvider){
        $stateProvider.state('site.wp.video',{
            parent:'site.wp',
            url:'/video',
            templateUrl:'app/wp/video/video.html',
            controller:'wp.video.controller'
        })
    })
