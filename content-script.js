// content-script.js

// Extracted parameters from page's URI.
const ParamEnum = {
	POST_ID       : "postId",
	SEARCH_TEXT   : "searchText",
	SEARCH_TYPE   : "searchType",
	CATEORY_DEPTH : "categoryDepth01",
  	PAGE          : "page",
};

// Each board has a unique categoryDepth01.
const BoardEnum = { 
	SOCCER            : "1",
	SOCCER_VIDEO      : "2",
	SOCCER_COLUMN     : "3",
	SOCCER_UPVOTED    : "4",
  	LOCKERROOM        : "5",
  	VIDEO             : "6",
  	GAME              : "7",
  	BET               : "8",
  	LOCKEROOM_UPVOTED : "9",
  	VOTE              : "10",
};	

// Extract info about current page.
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

// Entry point.
var main = function() {
	var paramsMap = getParamsMap()
	console.log(paramsMap)
	alert("Hello World");
};

main()