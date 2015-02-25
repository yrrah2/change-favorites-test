load_js("//code.jquery.com/ui/1.11.3/jquery-ui.js");

var favorites = JSON.parse(localStorage.favorites);

var tab = Options.add_tab('fav-tab','star',_("Favorites"));

var i = 0;
var favList = [];
var minusList = [];
var helpMessage = "";
helpMessage = "<span>Drag the boards to sort them.</span>";
$(tab.content).append(helpMessage);

for(i=0; i<favorites.length; i++){
    if(i===0){ //This triggers on first run of loop
        favList += "<div id=\"sortable\" style=\"display: inline-block\">";
    }
    favList += "<div>"+favorites[i]+"</div>";
    if(i==favorites.length){ //This triggers on last run of loop
        favList += "</div>";
    }
} //creating list of boards

for(i=0; i<favorites.length; i++){
    if(i==0){
        minusList += "<div>";
    }
    minusList += "<div> - </div>";
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
    var favStor = $(".ui-sortable").html()
    while(favStor.indexOf("<div class=\"\" style=\"\">")!=-1){ //If .indexOf returns -1 then the string is not there
        favStor = favStor.replace("<div class=\"\" style=\"\">","<div>");
    }
    while(favStor.indexOf("</div><div>")!=-1){
        favStor = favStor.replace("</div><div>","\",\"");
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
