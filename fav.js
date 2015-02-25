load_js("//code.jquery.com/ui/1.11.3/jquery-ui.js");

var favorites = JSON.parse(localStorage.favorites);

var tab = Options.add_tab('fav-tab','star',_("Favorites"));

var i = 0;
var favList = [];
var minusList = [];
var helpMessage = "";
helpMessage = "<span>Drag the boards to sort them.</span><br></br>";
$(tab.content).append(helpMessage);

var generateList = function(){
	var favStor = [];
    for(i=1; i<favorites.length+1; i++){
        favStor.push($("#sortable > div:nth-child("+i+")").html());
    }
    favStor = JSON.stringify(favStor);
	return favStor;
};

//localStorage.favorites
var window.nTORemoveBoard = 1;//number of times remove board was run
var removeBoard = function(boardNumber){
    var newFavorites = JSON.parse(generateList());
    newFavorites.splice(boardNumber, 1);
    newFavorites = JSON.stringify(newFavorites);
    $("#sortable > div:nth-child("+(boardNumber+1)+")").remove();
    $("#minusList > div:nth-child("+(nTORemoveBoard)+")").remove();
    window.localStorage.favorites = newFavorites;
    window.favorites = localStorage.favorites;
    window.nTORemoveBoard += 1;
};

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
    if(i==favorites.length){
        minusList += "</div>";
    }
}

$(favList).appendTo(tab.content);
$(minusList).appendTo(tab.content);

$("#sortable").sortable(); //Making all objects with sortable id use the sortable jquery function

var submit = $("<input type='button' value='"+_("Update favorites")+"'>").css({
    position: "absolute",
    height: 25, bottom: 5,
    width: "calc(100% - 10px)",
    left: 5, right: 5
}).click(function() {
    localStorage.favorites = generateList();
    document.location.reload();
}).appendTo(tab.content);

var apply_fav = function() {
  var proc = function() {
    $('.fav-tab').remove();
    $('script')
      .last()
      .after($("<script></script>")
        .addClass("fav-tab")
        .text(localStorage.favorites)
      );
  };

  if (/immediate()/.test(localStorage.favorites)) {
    proc(); // Apply the script immediately
  }
  else {
    $(proc); // Apply the script when the page fully loads
  }
};
