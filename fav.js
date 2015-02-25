load_js("//code.jquery.com/ui/1.11.3/jquery-ui.js");

var favorites = JSON.parse(localStorage.favorites);

var tab = Options.add_tab('fav-tab','star',_("Favorites"));
$("#favoriteOptionsBox").val(localStorage.favorites);

var i = 0;
var favList = [];
var helpMessage = "";
helpMessage = "<span>Drag the boards to sort them.</span>";
$(tab.content).append(helpMessage);

for(i=0; i<favorites.length; i++){
    if(i===0){ //This triggers on first run of loop
        favList = favList+"<div id=\"sortable\">";
    }
    favList = favList+"<div>"+favorites[i]+"</div>";
    if(i==favorites.length){ //This triggers on last run of loop
        favList = favList+"</div>";
    }
} //creating list of boards

$(favList).appendTo(tab.content);

$("#sortable").sortable(); //Making all objects with sortable id use the sortable jquery function

var submit = $("<input type='button' value='"+_("Update favorites")+"'>").css({
    position: "absolute",
    height: 25, bottom: 5,
    width: "calc(100% - 10px)",
    left: 5, right: 5
}).click(function() {
    while(favStor.indexOf("div")>0)){
        var favStor = $(".ui-sortable").html().replace("<div class=\"\" style=\"\">","<div>");
        favStor = favStor.replace("</div><div>",",");
    }
    favStor = favStor.replace("</div>","");
    favStor = favStor.replace("<div>","");
    localStorage.favorites = "[\"" + favStor + "\"]";
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
