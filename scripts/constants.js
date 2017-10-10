// constants.js

// Page type.
const PageTypeEnum = {
	HOME   : "home",
	NEWS   : "news",
	TV     : "tv",
	LEAGUE : "league",
	BOARD  : "board",
	POST   : "post",
	NOTICE : "notice",
	MEMBER : "member",
};

// Extracted parameters from page's URI.
const ParamEnum = {
	POST_ID       : "postId",
	SEARCH_TEXT   : "searchText",
	SEARCH_TYPE   : "searchType",
	CATEORY_DEPTH : "categoryDepth01",
  	PAGE          : "page",
  	PAGE_TYPE     : "pageType",
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