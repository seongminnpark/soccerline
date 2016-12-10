// content-script.js

var inject = function(postListHTML) {
    var frames = document.getElementsByName ("if_comment_yesorno");
    var commentFrame = frames[0];
    var commentParagraph = commentFrame.parentNode
    var bottomInstance = commentParagraph.parentNode
    var postInstance = bottomInstance.parentNode

    var postList = document.createElement('div');
    var pageNumber = getParamsMap()["page"];
    postList.innerHTML = postListHTML;
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

var httpGetAsync = function(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

var injectCallback = function(responseText) {
    postListHTML = responseText;
    inject(postListHTML);
}

httpGetAsync("https://www.soccerline.co.kr/slboard/list.php?page=9&code=locker",injectCallback);


