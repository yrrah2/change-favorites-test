load_js("//code.jquery.com/ui/1.11.3/jquery-ui.js"); //Making the dragging much smoother

//Setting variables
var favorites = JSON.parse(localStorage.favorites);
var tab = Options.add_tab('fav-tab','star',_("Favorites"));
var i = 0;
var favList = [];
var minusList = [];
var helpMessage = "<span>Drag the boards to sort them.</span><br></br>";

//Setting functions
var generateList = function(){
	var favStor = [];
    for(i=1; i<favorites.length+1; i++){
        favStor.push($("#sortable > div:nth-child("+i+")").html());
    }
	return JSON.stringify(favStor);
}; //This will generate a list of boards based off of the list on the screen
var removeBoard = function(boardNumber){
	favorites.splice(boardNumber, 1);
	localStorage.favorites = JSON.stringify(favorites);
	$("#sortable > div:nth-child("+(boardNumber+1)+")").remove();
	$("#minusList > div:nth-child("+(favorites.length+1)+")").remove();
}; //This removed a board from favorites, localStorage.favorites and the page
var addBoard = function(){
	$("#sortable").append("<div>"+($("#plusBox").val())+"</div>");
	$("#minusList").append("<div onclick=\"removeBoard("+favorites.length+")\" style=\"cursor: pointer; margin-left: 5px\">-</div>");
	favorites.push($("#plusBox").val());
	localStorage.favorites = JSON.stringify(favorites);
	$("#plusBox").remove(); //Refreshing the last 3 elements to move the box down
	$("#plus").remove();
	$("#submitFavorites").remove();
	$(plusBox).appendTo(tab.content);
	$(plus).appendTo(tab.content);
	$(submit).appendTo(tab.content);
};

//Creating content
for(i=0; i<favorites.length; i++){
    if(i===0){ //This triggers on first run of loop
        favList += "<div id=\"sortable\" style=\"cursor: pointer; float: left;display: inline-block\">";
    }
    favList += "<div>"+favorites[i]+"</div>";
    if(i==favorites.length){ //This triggers on last run of loop
        favList += "</div>";
    }
} //Creating list of boards
for(i=0; i<favorites.length; i++){
    if(i==0){
        minusList += "<div id=\"minusList\" style=\"color: #0000FF;display: inline-block\">";
    }
    minusList += "<div onclick=\"removeBoard("+i+")\" style=\"cursor: pointer; margin-left: 5px\">-</div>";
    if(i==favorites.length){ //This triggers on last run of loop
        minusList += "</div>";
    }
} //Creating list of minus symbols to remove unwanted boards
var space = $("<br></br>");
var plusBox = $("<input id=\"plusBox\" type=\"text\">").$( "#target" ).keydown(function( event )) {
if ( event.which == 13 ) {
event.preventDefault();
$("#plus").click();
}
});
var plus = $("<div id=\"plus\" onclick=\"addBoard()\">+</div>").css({
	cursor: "pointer",
	color: "#0000FF"
}); //Creating plus symbol to add wanted boards
var submit = $("<input id=\"submitFavorites\" onclick=\"document.location.reload();\" type=\"button\" value=\""+_("Refresh")+"\">").css({
    position: "absolute",
    height: 25, bottom: 5,
    width: "calc(100% - 10px)",
    left: 5, right: 5
});

//Adding content to the tab
$(tab.content).append(helpMessage); //Adding the help message to the tab
$(favList).appendTo(tab.content);  //Adding the list of favorite boards to the tab
$(minusList).appendTo(tab.content); //Adding the list of minus symbols to the tab
$(space).appendTo(tab.content);
$(plusBox).appendTo(tab.content);
$(plus).appendTo(tab.content); //Adding the plus to the tab
$(submit).appendTo(tab.content); //Adding button to the tab

$("#sortable").sortable(); //Making all objects with sortable id use the sortable jquery function
