!function(){"use strict";angular.module("cjd",["ionic","ngResource","ngCordova","ngSanitize","com.2fdevs.videogular","com.2fdevs.videogular.plugins.controls","com.2fdevs.videogular.plugins.overlayplay","com.2fdevs.videogular.plugins.poster"]).run(["$rootScope","$location","$http","$state","$ionicPlatform","AuthenticationService","$window",function(e,t,o,n,i,a,r){e.$on("$stateChangeStart",function(t,o,n){e.toState=o,e.toStateParmas=n}),e.$on("$stateChangeSuccess",function(t,o,n,i,a){e.previousStateName=i.name,e.previousStateParms=a}),i.ready(function(){window.cordova&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.StatusBar&&StatusBar.styleDefault()}),e.$on("$stateChangeStart",function(e,o,n,i,s){null==o||null==o.access||!o.access.requiredAuthentication||a.isAuthenticated||r.localStorage.token||t.path("/site/login")})}]).config(["$stateProvider","$urlRouterProvider","$httpProvider","$ionicConfigProvider",function(e,t,o,n){n.platform.ios.tabs.position("bottom"),n.platform.android.tabs.position("standard"),o.interceptors.push("TokenInterceptor"),t.otherwise("/site/wp/index"),e.state("site",{url:"/site","abstract":!0,templateUrl:"components/slidebar/slidebar.html"}),o.defaults.headers.put["Content-Type"]="application/x-www-form-urlencoded",o.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",o.defaults.withCredentials=!0,o.defaults.transformRequest=[function(e){var t=function(e){var o,n,i,a,r,s,l,c="";for(o in e)if(n=e[o],n instanceof Array)for(l=0;l<n.length;++l)r=n[l],i=o+"["+l+"]",s={},s[i]=r,c+=t(s)+"&";else if(n instanceof Object)for(a in n)r=n[a],i=o+"["+a+"]",s={},s[i]=r,c+=t(s)+"&";else void 0!==n&&null!==n&&(c+=encodeURIComponent(o)+"="+encodeURIComponent(n)+"&");return c.length?c.substr(0,c.length-1):c};return angular.isObject(e)&&"[object File]"!==String(e)?t(e):e}]}])}(),angular.module("cjd").constant("GLOBAL",{website:"阿里豆瓣"}),angular.module("cjd").config(["$stateProvider",function(e){e.state("site.wp",{parent:"site",url:"/wp","abstract":!0,views:{content:{templateUrl:"app/wp/wp.html"}}})}]),angular.module("cjd").config(["$stateProvider",function(e){e.state("site.wp.cate",{parent:"site.wp",url:"/cate/:cate",templateUrl:"app/wp/cate/cate.html",controller:"wp.cate.controller"})}]),angular.module("cjd").controller("wp.cate.controller",["$scope","$http","$stateParams","Posts","$ionicLoading","$state",function(e,t,o,n,i,a){var r=o.cate.split(",");e.name=r[0];var s=e.vm={title:r[1],name:r[0],moredata:!1,messages:[],pagination:{perPage:10,page:1},init:function(){n.query({"filter[category_name]":e.name,page:1},function(t){e.tagsList=t})},show:function(e){e["static"]?e["static"]=!1:e["static"]=!0},doRefresh:function(){$timeout(function(){e.$broadcast("scroll.refreshComplete")},1e3)},loadMore:function(){n.query({"filter[category_name]":e.name,per_page:s.pagination.perPage,page:s.pagination.page++},function(t){s.messages=s.messages.concat(t),0==t.length&&(s.moredata=!0),e.$broadcast("scroll.infiniteScrollComplete")})},goDetail:function(e){a.go("site.wp.detail",{id:e},{reload:!0})}};s.init()}]),angular.module("cjd").config(["$stateProvider",function(e){e.state("site.wp.detail",{parent:"site.wp",url:"/detail/:id",templateUrl:"app/wp/detail/detail.html",controller:"wp.detail.controller"})}]),angular.module("cjd").controller("wp.detail.controller",["$scope","PostDetail","$stateParams","$ionicLoading","$ionicModal","Media","$state","$ionicSlideBoxDelegate",function(e,t,o,n,i,a,r,s){e.len=0,e.img_list=[],e.show=function(){n.show({template:"努力加载中..."})},i.fromTemplateUrl("image-modal.html",{scope:e,animation:"slide-in-up"}).then(function(t){e.modal=t}),e.show(),e.hide=function(){n.hide()},e.title="详情",e.ds={},e.tags=[],t.get({postId:o.id},function(t){e.tags_title="标签：",e.author="作者：",e.time="发布时间：",e.hide(),e.ds=t,e.len=t.img_content.length,console.log(t.img_content[3]),""!=t.tags_name&&angular.forEach(t.tags_name,function(o,n,i){var a={name:t.tags_name[n],id:t.tags[n]};e.tags.push(a)})}),e.goTag=function(e){r.go("site.wp.tags",{tags:e},{reload:!0})},e.page=0,e.loadMore=function(t,o){return t>o?(t++,e.page=t):void 0},e.goPhoto=function(e){r.go("site.wp.photo",{imgs:e},{reload:!0})},e.openModal=function(t){s.slide(t),e.modal.show()},e.closeModal=function(){e.modal.hide()},e.$on("$destroy",function(){e.modal.remove()}),e.$on("modal.hide",function(){}),e.$on("modal.removed",function(){}),e.$on("modal.shown",function(){console.log("Modal is shown!")}),e.next=function(){s.next()},e.previous=function(){s.previous()},e.goToSlide=function(t){e.modal.show(),s.slide(t)},e.slideChanged=function(t){e.slideIndex=t}}]),angular.module("cjd").config(["$stateProvider",function(e){e.state("site.wp.index",{parent:"site.wp",url:"/index",templateUrl:"app/wp/index/index.html",controller:"wp.index.controller"})}]),angular.module("cjd").controller("wp.index.controller",["$scope","GLOBAL","$resource","$ionicLoading","Posts","$state",function(e,t,o,n,i,a){var r=e.vm={moredata:!1,messages:[],pagination:{perPage:10,page:1},init:function(){i.query({per_page:r.pagination.perPage,page:r.pagination.page},function(e){r.messages=e})},show:function(e){e["static"]?e["static"]=!1:e["static"]=!0},doRefresh:function(){$timeout(function(){e.$broadcast("scroll.refreshComplete")},1e3)},loadMore:function(){i.query({per_page:r.pagination.perPage,page:r.pagination.page++},function(t){r.messages=r.messages.concat(t),0==t.length&&(r.moredata=!0),e.$broadcast("scroll.infiniteScrollComplete")})},goDetail:function(e){a.go("site.wp.detail",{id:e},{reload:!0})}};r.init()}]),angular.module("cjd").config(["$stateProvider",function(e){e.state("site.wp.photo",{parent:"site.wp",url:"/page/:id",templateUrl:"app/wp/page/page.html",controller:"wp.page.controller"})}]),angular.module("cjd").controller("wp.page.controller",["$scope","PageDetail","$stateParams",function(e,t,o){t.get({pageId:o.id},function(t){e.author="作者：",e.author_name="阿里豆瓣",e.time="发布时间：",e.ds=t})}]),angular.module("cjd").config(["$stateProvider",function(e){e.state("site.wp.tags",{parent:"site.wp",url:"/tags/:tags",templateUrl:"app/wp/tags/tags.html",controller:"wp.tags.controller"})}]),angular.module("cjd").controller("wp.tags.controller",["$scope","$http","$stateParams","Posts","$ionicLoading","$state",function(e,t,o,n,i,a){var r=o.tags;e.name=r;var s=e.vm={title:r,moredata:!1,messages:[],pagination:{perPage:10,page:1},init:function(){n.query({"filter[tag]":s.title,page:1},function(t){e.tagsList=t})},show:function(e){e["static"]?e["static"]=!1:e["static"]=!0},doRefresh:function(){$timeout(function(){e.$broadcast("scroll.refreshComplete")},1e3)},loadMore:function(){n.query({"filter[tag]":s.title,per_page:s.pagination.perPage,page:s.pagination.page++},function(t){s.messages=s.messages.concat(t),0==t.length&&(s.moredata=!0),e.$broadcast("scroll.infiniteScrollComplete")})},goDetail:function(e){a.go("site.wp.detail",{id:e},{reload:!0})}};s.init()}]),angular.module("cjd").config(["$stateProvider",function(e){e.state("site.wp.video",{parent:"site.wp",url:"/video",templateUrl:"app/wp/video/video.html",controller:"wp.video.controller"})}]),angular.module("cjd").controller("wp.video.controller",["$scope","$http","$stateParams","Posts","$ionicLoading","$state","$sce",function(e,t,o,n,i,a,r){e.config={sources:[{src:r.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"),type:"video/mp4"},{src:r.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"),type:"video/webm"},{src:r.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"),type:"video/ogg"}],tracks:[{src:"http://www.videogular.com/assets/subs/pale-blue-dot.vtt",kind:"subtitles",srclang:"en",label:"English","default":""}],theme:"/assets/css/vendor.css",plugins:{poster:"http://www.videogular.com/assets/images/videogular.png"}}}]),angular.module("cjd").factory("AuthenticationService",function(){var e={isAuthenticated:!1,isAdmin:!1};return e}).service("phoneService",["$http","WEBURL",function(e,t){this.method="GET",this.url=t,e({url:t,withCredentials:!0,method:this.method})}]).factory("Token",["$location","$window",function(e,t){return{get:function(e){if(alert(e),""!==e){for(var t=e.split("#"),o=t[1],n=o.split("&"),i={},a=0;a<n.length;a++){var r=n[a].split("=");i[r[0]]=r[1]}return i}},save:function(e){var o=this.get(e);t.localStorage.token=o.access_token}}}]).service("ExpressService",["$window",function(e){this.time=Date.parse(new Date)/1e3,e.localStorage.express_time&&e.localStorage.express_time<this.time}]).factory("TokenInterceptor",["$q","$window","$location","AuthenticationService",function(e,t,o,n){return{request:function(e){return e.headers=e.headers||{},t.localStorage.token&&(e.headers.Authorization="Bearer "+t.localStorage.token),e},requestError:function(t){return e.reject(t)},response:function(o){return null!=o&&200==o.status&&t.localStorage.token&&!n.isAuthenticated&&(n.isAuthenticated=!0),o||e.when(o)},responseError:function(i){return null!=i&&401===i.status&&(t.localStorage.token||n.isAuthenticated)&&(delete t.localStorage.token,n.isAuthenticated=!1,o.path("/site/login")),e.reject(i)}}}]).factory("Menus",["$resource","GLOBAL",function(e,t){return e("http://www.alidouban.com/wp-json/wp/v2/categories",{},{query:{method:"GET",withCredentials:!0,cache:!0,isArray:!0}})}]).factory("Media",["$resource",function(e){return e("http://www.alidouban.com/wp-json/wp/v2/media?:theQquery",{theQquery:"@theQquery"},{query:{method:"GET",withCredentials:!0,cache:!0,isArray:!0}})}]).factory("Posts",["$resource","GLOBAL",function(e,t){return e("http://www.alidouban.com/wp-json/wp/v2/posts/?:theQquery",{theQquery:"@theQquery"},{query:{method:"GET",cache:!0,isArray:!0}})}]).factory("PostDetail",["$resource","GLOBAL",function(e,t){return e("http://www.alidouban.com/wp-json/wp/v2/posts/:postId",{postId:"@postId"},{query:{method:"GET",cache:!0,isArray:!0}})}]).factory("PageDetail",["$resource","GLOBAL",function(e,t){return e("http://alidouban.com/wp-json/wp/v2/pages/:pageId",{pageId:"@pageId"},{query:{method:"GET",cache:!0,isArray:!0}})}]).factory("Users",["$resource",function(e){return e("http://www.xiaodouban.com/wp-json/wp/v2/users/:uid",{uid:"@uid"},{query:{method:"GET",cache:!0,isArray:!0}})}]).factory("LoginService",["$resource","GLOBAL",function(e,t){return e("/oauth",{},{query:{method:"POST",withCredentials:!0,cache:!0,isArray:!0,header:{"Last-Modified":"Tue, 08 Sep 2015 08:42:05 GMT"}}})}]).factory("LoginService1",["$http","GLOBAL","$q",function(e,t,o){var n={getCode:function(t){var n=o.defer(),i=n.promise;return"object"==typeof t?(e({method:"POST",url:"/oauth2",cache:!0,headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":t.length},data:t}).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),i):void 0}};return n}]),angular.module("cjd").controller("slider.controller",["$scope","$http","GLOBAL","$resource","Menus","$ionicSideMenuDelegate","$state",function(e,t,o,n,i,a,r){e.title=o.website,i.query({},function(t){e.result=t}),e.toggleLeft=function(){a.toggleLeft()},e.goCate=function(e){r.go("site.wp.cate",{cate:e},{reload:!0})}}]).controller("toggle.menu",["$scope","$ionicSideMenuDelegate","$ionicScrollDelegate",function(e,t,o){e.toggleLeft=function(){t.toggleLeft()}}]).controller("tabs.controller",["$scope","AuthenticationService","$window","$state","$cordovaInAppBrowser","$ionicTabsDelegate","$rootScope","Token",function(e,t,o,n,i,a,r,s){var l={location:"no",clearcache:"no",toolbar:"no"};a.select(0,!0),e.selectTabWithIndex=function(e){a.select(e)},e.goAbout=function(e){n.go("site.wp.detail",{id:e},{reload:!1})},e.goAccount=function(){a.select(1,!0),t.isAuthenticated||o.localStorage.token?n.go("site.account.index"):(i.open("http://m.bootskit.com/auth.php?action=implicit","_blank",l).then(function(e){})["catch"](function(e){}),r.$on("$cordovaInAppBrowser:loadstart",function(e,o){o.url.indexOf("#")>-1&&(s.save(o.url),t.isAuthenticated=!0,i.close(),n.go("site.account.index"))}))}}]),angular.module("cjd").run(["$templateCache",function(e){e.put("app/wp/wp.html",'<ion-nav-view></ion-nav-view><ion-tabs class="tabs-icon-top tabs-color-active-calm tabs-assertive"><ion-tab title="首页" icon-off="ion-home" icon-on="ion-home" href="#/site/wp/index"></ion-tab><ion-tab title="关于" icon-off="ion-information-circled" href="#/site/wp/page/72" icon-on="ion-information-circled" ng-click=""></ion-tab></ion-tabs>'),e.put("components/slidebar/slidebar.html",'<ion-side-menus ng-controller="slider.controller" enable-menu-with-back-views="true"><ion-pane ion-side-menu-content=""><ion-nav-bar class="bar-calm"><ion-nav-back-button class="button-icon ion-arrow-left-c"></ion-nav-back-button></ion-nav-bar><ion-nav-bar class="bar-assertive"><ion-nav-buttons side="left"><button menu-toggle="toggleLeft" class="button button-icon icon ion-navicon"></button></ion-nav-buttons></ion-nav-bar><ion-nav-view name="content"></ion-nav-view></ion-pane><ion-side-menu side="left"><ion-header-bar class="bar bar-header bar-calm"><h1 class="title">{{title}}</h1></ion-header-bar><ion-content has-header="true"><ion-list><div ng-repeat="t in result track by $index"><ion-item menu-close="" ng-hide="t.slug ===\'uncategorized\'" ng-click="goCate([t.slug,t.name]);">{{t.name}}<span class="badge badge-assertive">{{t.count}}</span></ion-item></div></ion-list></ion-content></ion-side-menu></ion-side-menus>'),e.put("app/wp/cate/cate.html",'<ion-view view-title="{{vm.title}}"><ion-content><ion-refresher pulling-text="加载更多" on-refresh="vm.doRefresh()"></ion-refresher><section ng-repeat="rm in vm.messages" ng-click="vm.goDetail(rm.id)" class="half"><img ng-src="{{rm.featured_image_thumbnail_url}}" alt="{{rm.featured_image.title.rendered}}"><h2>{{rm.title.rendered}}</h2></section><ion-infinite-scroll ng-if="!vm.moredata" on-infinite="vm.loadMore()" distance="1%"></ion-infinite-scroll></ion-content></ion-view>'),e.put("app/wp/detail/detail.html",'<ion-view view-title="{{ds.title.rendered}}"><ion-content><div class="detail padding"><h1>{{ds.title.rendered}}</h1><div class="info"><span class="fl">{{author}} {{ds.author_name}}</span> <span class="fr">{{time}} {{ds.date| date:\'MM/dd/yyyy\' }}</span></div><div class="clearfix"></div><div class="tags">{{tags_title}} <a ng-click="goTag(tag.name)" class="button button-small button-default" ng-repeat="tag in tags">{{tag.name}}</a></div><div class="content"><div class="half-img" ng-repeat="img in ds[\'img_content\']"><a class="box" id="{{$index}}" ng-click="openModal($index)"><img ng-src="{{img}}" width="100%" alt=""></a></div></div></div><script id="image-modal.html" type="text/ng-template"><div class="modal image-modal transparent" ng-click="closeModal()"> <ion-slide-box on-slide-changed="slideChanged(index)" show-pager="false"> <ion-slide ng-repeat="oImage in ds[\'img_content\']"> <img ng-src="{{oImage}}" class="fullscreen-image" /> </ion-slide> </ion-slide-box> </div></script></ion-content></ion-view>'),e.put("app/wp/detail/switchsrc.html",'<img src="{{img_src}}" alt="">'),e.put("app/wp/index/index.html",'<ion-view view-title="首页"><ion-content><ion-refresher pulling-text="加载更多" on-refresh="vm.doRefresh()"></ion-refresher><section ng-repeat="rm in vm.messages" ng-click="vm.goDetail(rm.id)" class="half"><img ng-src="{{rm.featured_image_thumbnail_url}}" alt="{{rm.featured_image.title.rendered}}"><h2>{{rm.title.rendered}}</h2></section><ion-infinite-scroll ng-if="!vm.moredata" on-infinite="vm.loadMore()" distance="1%"></ion-infinite-scroll></ion-content></ion-view>'),e.put("app/wp/page/page.html",'<ion-view view-title="{{ds.title.rendered}}"><ion-content><div class="detail padding"><h1>{{ds.title.rendered}}</h1><div class="info"><span class="fl">{{author}} {{author_name}}</span> <span class="fr">{{time}} {{ds.date| date:\'MM/dd/yyyy\' }}</span></div><div class="clearfix"></div><div class="content" ng-bind-html="ds.content.rendered"></div></div></ion-content></ion-view>'),e.put("app/wp/tags/tags.html",'<ion-view view-title="{{vm.title}}"><ion-content><ion-refresher pulling-text="加载更多" on-refresh="vm.doRefresh()"></ion-refresher><section ng-repeat="rm in vm.messages" ng-click="vm.goDetail(rm.id)" class="half"><img ng-src="{{rm.featured_image_thumbnail_url}}" alt="{{rm.featured_image.title.rendered}}"><h2>{{rm.title.rendered}}</h2></section><ion-infinite-scroll ng-if="!vm.moredata" on-infinite="vm.loadMore()" distance="1%"></ion-infinite-scroll></ion-content></ion-view>'),e.put("app/wp/video/video.html",'<videogular vg-theme="config.theme"><vg-media vg-src="config.sources" vg-tracks="config.tracks"></vg-media><vg-controls><vg-play-pause-button></vg-play-pause-button><vg-time-display>{{ currentTime | date:\'mm:ss\' }}</vg-time-display><vg-scrub-bar><vg-scrub-bar-current-time></vg-scrub-bar-current-time></vg-scrub-bar><vg-time-display>{{ timeLeft | date:\'mm:ss\' }}</vg-time-display><vg-volume><vg-mute-button></vg-mute-button><vg-volume-bar></vg-volume-bar></vg-volume><vg-fullscreen-button></vg-fullscreen-button></vg-controls><vg-overlay-play></vg-overlay-play><vg-poster vg-url="config.plugins.poster"></vg-poster></videogular>')}]);