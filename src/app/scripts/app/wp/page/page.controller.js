'use strict';
    angular.module('cjd')
        .controller('wp.page.controller',function($scope,PageDetail,$stateParams){
            PageDetail.get({
                pageId:$stateParams.id
            },function(data){
                $scope.author = '作者：';
                $scope.author_name = '阿里豆瓣'
                $scope.time = '发布时间：';
                $scope.ds = data;

            });
        })
