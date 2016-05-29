'use strict';
    angular.module('cjd')
        .controller('wp.cate.controller',function($scope,$http,$stateParams,Posts,$ionicLoading,$state){
            var cate = $stateParams.cate.split(',');
            $scope.name = cate[0];
            var vm = $scope.vm = {
                title: cate[1],
                name : cate[0],
                moredata: false,
                messages: [],
                pagination: {
                    perPage: 10,
                    page: 1
                },
                init: function () {
                    Posts.query({
                        'filter[category_name]':$scope.name,
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
                        'filter[category_name]':$scope.name,
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
