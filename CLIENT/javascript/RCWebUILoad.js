var RongWebModule = angular.module("RongWebModule", ["RongWebIMWidget"]);
RongWebModule.controller("RongWebController", ["$scope", "WebIMWidget", function($scope, WebIMWidget) {
    $scope.targetType = 1;
    $scope.targetId = null;
    $scope.mark = false;
    $scope.initialization = function () {
        WebIMWidget.init({
            appkey: AppKey,
            token: Token,
            style: {
                width: 500,
                height: 600,
                bottom: 0,
                right: 0,
                positionFixed: false,
            },
            displayConversationList: true,
            conversationListPosition: WebIMWidget.EnumConversationListPosition.right,
            displayMinButton: true,
            onSuccess: function() {
                $scope.user = id;
                document.title = '客户：' + id;
            },
            onError: function() {}
        });
        $scope.mark = true;
    };
    $scope.setconversation = function() {
        if (!!$scope.targetId && $scope.mark) {
            WebIMWidget.setUserInfoProvider(function(targetId, obj) {
                obj.onSuccess({
                    name: "用户：" + targetId
                });
            });
            WebIMWidget.setConversation(Number($scope.targetType), $scope.targetId, "用户：" + $scope.targetId);
            WebIMWidget.show();
        }
    };
    $scope.show = function() {
        WebIMWidget.show();
    };
    $scope.hidden = function() {
        WebIMWidget.hidden();
    };
    // $scope.send = function() {
    //     var saying = inputMsgDom.val();
    //     funJson.sendTextMsgPrivate(saying, $scope.targetId);
    // };
}]);
