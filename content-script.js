// content-script.js

var inject = function(postList) {
    var commentFrame = document.getElementsByName("if_comment_yesorno")[0];
    var commentParagraph = commentFrame.parentNode
    var bottomInstance = commentParagraph.parentNode
    var postInstance = bottomInstance.parentNode

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
    var parser = new DOMParser();
    var doc = parser.parseFromString(responseText, "text/html");
    var postList = doc.createElement('div');
    postList.id = "postList";

    var boardForm = doc.getElementsByName("board")[0];
    var titleTable = boardForm.parentNode;
    var centerArea = titleTable.parentNode;
    var centerTables = centerArea.children;

    // Remove write post button.
    var writeButton = centerTables[1].children[1].children[1].children[2].children[0];
    writeButton.parentNode.removeChild(writeButton);

    // Fix page number links.
    var pageButtons = centerTables[5].children[0].children[0].children[0].children;
    for (var i=0; i < pageButtons.length; i++) {
        var parameters = pageButtons[i].getAttribute("href");;
        pageButtons[i].href = "https://www.soccerline.co.kr/slboard/list.php" + parameters;
    }

    // Second table contains board title, Fifth table contains page numbers.
    postList.appendChild(centerTables[1].cloneNode(true));
    postList.appendChild(centerTables[2].cloneNode(true));
    postList.appendChild(centerTables[3].cloneNode(true));
    postList.appendChild(centerTables[4].cloneNode(true));
    postList.appendChild(centerTables[5].cloneNode(true));

    inject(postList);
}

var main = function() {
    var pageNumber = getParamsMap()["page"];
    var code = getParamsMap()["code"];
    httpGetAsync("https://www.soccerline.co.kr/slboard/list.php?page="+pageNumber+"&code="+code,injectCallback);
}

main();