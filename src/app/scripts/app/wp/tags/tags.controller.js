'use strict';
    angular.module('cjd')
        .controller('wp.tags.controller',function($scope,$http,$stateParams,Posts,$ionicLoading,$state){
            var cate = $stateParams.tags;
            $scope.name = cate;
            var vm = $scope.vm = {
                title: cate,
                moredata: false,
                messages: [],
                pagination: {
                    perPage: 10,
                    page: 1
                },
                init: function () {
                    Posts.query({
                        'filter[tag]':vm.title,
                        'page':1
                    },function(data){
                        $scope.tagsList = data;
                    });
                },
                show: function (message) {
                    if (message.static) {
                        message.static = false;
                    } else {
                        message.static = true;
                    }
                },
                doRefresh: function () {
                    $timeout(function () {
                        $scope.$broadcast('scroll.refreshComplete');
                    }, 1000);
                },
                loadMore: function () {
                    Posts.query({
                        'filter[tag]':vm.title,
                        per_page:vm.pagination.perPage,
                        page:vm.pagination.page++
                    },function(data){
                        //$scope.listIndex = $scope.listIndex.concat(data);
                        vm.messages = vm.messages.concat(data);
                        if (data.length == 0) {
                            vm.moredata = true;
                        };
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
                },
                goDetail : function(id){
                    $state.go('site.wp.detail',{
                        id:id
                    },{
                        reload:true
                    });
                }
            }
            vm.init();
        })
