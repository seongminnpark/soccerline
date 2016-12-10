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


var originalScript = 'function checkIt() {  \
  var s_form = document.search;\
  if(s_form.key.value == "") {\
    alert("검색어를 입력하고 검색을 시도해 주시기 바랍니다.");\
    s_form.key.focus();\
    return false;\
  } else if(s_form.key.value == "윰댕" || s_form.key.value == "ㅅㅅ" || s_form.key.value == "ㅈㅈ" || s_form.key.value == "ㅅㄱ" || s_form.key.value == "ㄳ" || s_form.key.value == "ㅇㄷ" || s_form.key.value == "야동" || s_form.key.value == "슴가" || s_form.key.value == "섹스" ||  s_form.key.value == "몰카" || s_form.key.value == "sex" || s_form.key.value == "아이템베이" || s_form.key.value == "웹디" || s_form.key.value == "sdc" || s_form.key.value == "파란셀카" || s_form.key.value == "기악" || s_form.key.value == "숙대" || s_form.key.value == "김희연"){\
    alert("검색하시려는 문자열에 검색 불가능한 단어를 포함하고 있습니다.");\
    s_form.key.value="";\
    s_form.key.focus();\
    return false;\
  } else {\
    s_form.submit();\
  }\
}\
function alert_mss() {\
    if(search.keyfield.value == "content")\
    {\
        document.search.cx.value="partner-pub-3326313360473532:gbw83w-pg3r";\
        document.search.cof.value="FORID:10";\
        document.search.ie.value="EUC-KR";\
        document.search.q.value=search.key.value;\
        document.search.action="http://www.soccerline.co.kr/google.htm";\
        document.search.method="get";\
        document.search.target="_blank";\
    }\
}'

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

    // Add callback to search button.
    addJS(originalScript);

    // Second table contains board title, Fifth table contains page numbers.
    postList.appendChild(centerTables[1].cloneNode(true));
    //postList.appendChild(centerTables[2].cloneNode(true));
    postList.appendChild(centerTables[3].cloneNode(true));
    postList.appendChild(centerTables[4].cloneNode(true));
    postList.appendChild(centerTables[5].cloneNode(true));

    inject(postList);
}             

function addJS(jsCode) {
    var s = document.createElement('script');

    s.type = 'text/javascript';
    s.innerText = jsCode;
    document.getElementsByTagName('head')[0].appendChild(s);
}


var main = function() {
    var pageNumber = getParamsMap()["page"];
    var code = getParamsMap()["code"];
    httpGetAsync("https://www.soccerline.co.kr/slboard/list.php?page="+pageNumber+"&code="+code,injectCallback);
}

main();