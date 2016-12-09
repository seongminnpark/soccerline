// content-script.js

var frames = document.getElementsByName ("if_comment_yesorno");
var commentFrame = frames[0];
var commentParagraph = commentFrame.parentNode
var bottomInstance = commentParagraph.parentNode
var postInstance = bottomInstance.parentNode

var elemDiv = document.createElement('div');
elemDiv.style.cssText = 'width:400px;height:200px;background-color:blue;';

postInstance.appendChild(elemDiv);




