'use strict';
    angular.module('cjd')
        .controller('wp.index.controller',function($scope,GLOBAL,$resource,$ionicLoading,Posts,$state){
            var vm = $scope.vm = {
                moredata: false,
                messages: [],
                pagination: {
                    perPage: 10,
                    page: 1
                },
                init: function () {
                    Posts.query({
                        per_page:vm.pagination.perPage,
                        page:vm.pagination.page
                    },function(data){
                        vm.messages = data;
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
