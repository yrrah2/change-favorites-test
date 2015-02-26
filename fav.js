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
};
var removeBoard = function(boardNumber){
	favorites.splice(boardNumber, 1);
	localStorage.favorites = JSON.stringify(favorites);
	$("#sortable > div:nth-child("+(boardNumber+1)+")").remove();
	$("#minusList > div:nth-child("+(favorites.length+1)+")").remove();
};
var submitFavorites = function() {
    localStorage.favorites = generateList();
    document.location.reload();
};

//Creating content
for(i=0; i<favorites.length; i++){
    if(i===0){ //This triggers on first run of loop
        favList += "<div id=\"sortable\" style=\"cursor: pointer; float: left;display: inline-block\">";
    }
    favList += "<div id=\"favBoard"+i+"\">"+favorites[i]+"</div>";
    if(i==favorites.length){ //This triggers on last run of loop
        favList += "</div>";
    }
} //creating list of boards
for(i=0; i<favorites.length; i++){
    if(i==0){
        minusList += "<div id=\"minusList\" style=\"display: inline-block\">";
    }
    minusList += "<div id=\"delBoard"+i+"\" onclick=\"removeBoard("+i+")\" style=\"cursor: pointer; margin-left: 5px\">-</div>";
    if(i==favorites.length){ //This triggers on last run of loop
        minusList += "</div>";
    }
}
var submit = $("<input onclick=\"submitFavorites()\" type=\"button\" value=\""+_("Update favorites")+"\">").css({
    position: "absolute",
    height: 25, bottom: 5,
    width: "calc(100% - 10px)",
    left: 5, right: 5
});

//Adding content to the tab
$(tab.content).append(helpMessage); //Adding the help message to the tab
$(favList).appendTo(tab.content);  //Adding the list of favorite boards to the tab
$(minusList).appendTo(tab.content); //Adding the list of minus symbols to the tab
$(submit).appendTo(tab.content); //Adding button to the tab

$("#sortable").sortable(); //Making all objects with sortable id use the sortable jquery function
