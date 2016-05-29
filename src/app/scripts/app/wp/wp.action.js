'use strict';
    angular.module('cjd')
        .config(function($stateProvider){
            $stateProvider.state('site.wp',{
                parent:'site',
                url:'/wp',
                abstract:true,
                views:{
                    'content':{
                        templateUrl:'app/wp/wp.html'
                    }
                }
            })
        });
