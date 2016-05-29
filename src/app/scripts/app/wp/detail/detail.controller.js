'use strict';
    angular.module('cjd')
        .controller('wp.detail.controller',function($scope,PostDetail,$stateParams,$ionicLoading,$ionicModal,Media,$state,$ionicSlideBoxDelegate){
            $scope.len = 0;
            $scope.img_list = [];
            $scope.show = function(){
                $ionicLoading.show({
                    template:'努力加载中...'
                })
            };

            $ionicModal.fromTemplateUrl('image-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });

            $scope.show();
            $scope.hide = function(){
                $ionicLoading.hide();
            };
            $scope.title = '详情';
            $scope.ds = {};
            $scope.tags = [];

            PostDetail.get({
                postId:$stateParams.id
            },function(data){
                $scope.tags_title = '标签：';
                $scope.author = '作者：';
                $scope.time = '发布时间：';
                $scope.hide();
                $scope.ds = data;
                $scope.len = data.img_content.length;
                console.log(data['img_content'][3]);
                if(data.tags_name != ''){
                    angular.forEach(data.tags_name,function(value,index,array){
                        var temp = {
                            name:data.tags_name[index],
                            id:data.tags[index]
                        }
                        $scope.tags.push(temp);
                    })
                }
            });
            $scope.goTag = function(tags){
                $state.go('site.wp.tags',{
                    tags:tags
                },{
                    reload:true
                });
            }
            $scope.page = 0;
            $scope.loadMore = function(page,len){
                if(len < page){
                    page++;
                    return $scope.page = page;
                }
            }
            $scope.goPhoto = function(imgs){
                $state.go('site.wp.photo',{
                        imgs:imgs
                    },{
                        reload:true
                    }
                )
            }
            $scope.openModal = function(index) {
                $ionicSlideBoxDelegate.slide(index);
                $scope.modal.show();
            };

            $scope.closeModal = function() {
                $scope.modal.hide();
            };

            // Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
                $scope.modal.remove();
            });
            // Execute action on hide modal
            $scope.$on('modal.hide', function() {
                // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function() {
                // Execute action
            });
            $scope.$on('modal.shown', function() {
                console.log('Modal is shown!');
            });

            // Call this functions if you need to manually control the slides
            $scope.next = function() {
                $ionicSlideBoxDelegate.next();
            };

            $scope.previous = function() {
                $ionicSlideBoxDelegate.previous();
            };

            $scope.goToSlide = function(index) {
                $scope.modal.show();
                $ionicSlideBoxDelegate.slide(index);
            }

            // Called each time the slide changes
            $scope.slideChanged = function(index) {
                $scope.slideIndex = index;
            };
        })
