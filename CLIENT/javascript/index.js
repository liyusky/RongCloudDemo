var RongWebModule = angular.module("RongWebModule", ["RongWebIMWidget"]);

RongWebModule.controller("RongWebController", ["$scope", "WebIMWidget", "$http", function($scope, WebIMWidget, $http) {

    $scope.targetType = 1; //1：私聊 更多会话类型查看http://www.rongcloud.cn/docs/api/js/global.html#ConversationType
    $scope.targetId = null;
    $scope.mark = false;
    $scope.initProviderMark = true;

    $scope.initialization = function () {
        WebIMWidget.init({
            appkey: AppKey,
            token: Token,
            displayConversationList: true,
            conversationListPosition: WebIMWidget.EnumConversationListPosition.right,
            displayMinButton: true,
            style:{
                right: 3,
                bottom: 3,
                width: 500,
                height: 600,
                positionFixed: false
            },
            onSuccess: function(id) {
                $scope.user = id;
                $scope.mark = true;
                document.title = '用户：' + id;
                console.log($scope);
                // console.log('连接成功：' + id);
            },
            onError: function(error) {
                // console.log('连接失败：' + error);
            }
        });
        $scope.initProvider();
    }
    $scope.initProvider = function () {
        if ($scope.initProviderMark && !!$scope.targetId) {
            WebIMWidget.setUserInfoProvider(function(targetId, obj) {
                obj.onSuccess({
                    name: "用户aaaa：" + targetId
                });
            });
            WebIMWidget.setGroupInfoProvider(function(targetId, obj){
                obj.onSuccess({
                    name:'群组：' + targetId
                });
            });
            $scope.initProviderMark = false;
        }
    }
    $scope.setconversation = function() {
        if (!!$scope.targetId && $scope.mark) {
            $scope.initProvider();
            WebIMWidget.setConversation(Number($scope.targetType), $scope.targetId, "用户xxxxxxxx：" + $scope.targetId);
            WebIMWidget.show();
        }
    }

    $scope.show = function() {
        WebIMWidget.show();
    }

    $scope.hidden = function() {
        WebIMWidget.hidden();
    }

    // WebIMWidget.show();


    // // 示例：获取 userinfo.json 中数据，根据 targetId 获取对应用户信息
    // WebIMWidget.setUserInfoProvider(function(targetId,obj){
    //     $http({
    //       url:"/userinfo.json"
    //     }).success(function(rep){
    //       var user;
    //       rep.userlist.forEach(function(item){
    //         if(item.id==targetId){
    //           user=item;
    //         }
    //       })
    //       if(user){
    //         obj.onSuccess({id:user.id,name:user.name,portraitUri:user.portraitUri});
    //       }else{
    //         obj.onSuccess({id:targetId,name:"用户："+targetId});
    //       }
    //     })
    // });

    // 示例：获取 online.json 中数据，根据传入用户 id 数组获取对应在线状态
    // WebIMWidget.setOnlineStatusProvider(function(arr, obj) {
    //     $http({
    //         url: "/online.json"
    //     }).success(function(rep) {
    //         obj.onSuccess(rep.data);
    //     })
    // });

}]);
