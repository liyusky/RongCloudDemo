function remove(thisDom) {
    var str = "<div class='rongcloud-Messages-history'>" +
        "<b onclick='getHistory()'>查看历史消息</b>" +
        "</div>";
    var wrapDom = thisDom.parents(".father-sign").eq(0);
    var id = wrapDom.attr("data-target-id");
    targetIdJson[id] = false;
    wrapDom.remove();
    RongCloudMessagesInnerDom.html(str);
}
