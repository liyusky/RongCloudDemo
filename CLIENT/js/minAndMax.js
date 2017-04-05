function minbtn() {
    RongConversationDom.hide(); //会话区关闭
    RongConversationListDom.hide(); //列表区关闭
    RongWidgetMinBtnDom.show(); //最小化标签展现
}

function showbtn() {
    RongConversationDom.show(); //会话区show
    RongConversationListDom.show(); //列表区show
    RongWidgetMinBtnDom.hide(); //最小化标签hide
}

function closeConversation() {
    var str = "<div class='rongcloud-Messages-history'>" +
        "<b onclick='getHistory()'>查看历史消息</b>" +
        "</div>";
    RongConversationDom.hide(); //会话区hide
    RongCloudMessagesInnerDom.html(str); //清空会话展现区
}

function minimize() {
    RongConversationDom.hide(); //会话区hide
}
