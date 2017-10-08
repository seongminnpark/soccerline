// content-script.js

// Extract info about current page.
var getParamsMap = function () {
    var uri = window.location.href;
    var params = uri.substring(uri.indexOf('?')+1).split('&');
    var paramsMap = {};

    // Parse raw uri.
    params.forEach(function (p) {
        var v = p.split("=");
        var key = v[0];
        var value = decodeURIComponent(v[1]) ? v[1] : null;
        paramsMap[key] = value;
    });

    // Determine page type.
    console.log(uri.split("/"));
    var subpath = uri.split("/")[3]; // 4th element contains the page type.
    var pageType = null;
    if (subpath == "") {
        pageType = PageTypeEnum.HOME;
    } else if (pageType == "board") {

    } else {
        pageType  = subpath;
    } 
    paramsMap[ParamEnum.PAGETYPE] = pageType;

    // Board category가 set 되어있다면 글 아이디 있는지 확인.
    if (paramsMap[ParamEnum.PAGE_TYPE] == PageTypeEnum.POST) {
    	var searchIndex = "http://soccerline.kr/board".length
    	var postId = uri.substring(uri.indexOf("/", searchIndex)+1,uri.lastIndexOf("?"));
    	paramsMap[ParamEnum.POST_ID] = postId ? postId : null;
	}

    return paramsMap;
};

// Entry point.
var main = function() {
	var paramsMap = getParamsMap()
	console.log(paramsMap)
};

main()