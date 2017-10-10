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
    // Example: http://http://soccerline.kr/board/14216168?searchType=0
    // urn: /board/14216168?searchType=0
    // subpath: ["board", "14216168"]
    var urn  = uri.substring("http://soccerline.kr".length);
    var indexEnd = urn.indexOf("?") != -1 ? urn.indexOf("?") : urn.length
    var subpath = urn.substring(urn.indexOf("/")+1,indexEnd);
    var subpathList = subpath.split("/");
    var pageType = null;
    var postId   = null;

    if (subpathList.length >= 1) {
        
        switch (subpathList[0]) {
            case "": 
                pageType = PageTypeEnum.HOME
                break;
            case PageTypeEnum.BOARD:
                // Subpath가 board라면 글 아이디 있는지 확인.
                if (subpathList.length >= 2) {
                    pageType = PageTypeEnum.POST; 
                    postId = subpathList[1];
                } else {
                    pageType = PageTypeEnum.BOARD; 
                }
                break; 
            default: 
                pageType = subpathList[0];
                break;
        }
    }

    paramsMap[ParamEnum.PAGE_TYPE] = pageType;
    paramsMap[ParamEnum.POST_ID]   = postId;

    return paramsMap;
};

// Entry point.
var main = function() {
	var paramsMap = getParamsMap()
	console.log(paramsMap)
};

main()