// content-script.js

var inject = function() {
    var frames = document.getElementsByName ("if_comment_yesorno");
    var commentFrame = frames[0];
    var commentParagraph = commentFrame.parentNode
    var bottomInstance = commentParagraph.parentNode
    var postInstance = bottomInstance.parentNode

    var postList = document.createElement('div');
    var pageNumber = getParamsMap()["page"];
    postList.innerHTML = '<li>Test 테스트.. Page Number: ' + pageNumber + ' </li>';
    postInstance.appendChild(postList);
}

var getParamsMap = function () {
    var uri = window.location.href;
    var params = uri.substring(uri.indexOf('?')+1).split('&');
    var paramsMap = {};
    params.forEach(function (p) {
        var v = p.split("=");
        paramsMap[v[0]]=decodeURIComponent(v[1]);
    });
    return paramsMap;
};

inject();