load_js("//code.jquery.com/jquery-1.10.2.js");
load_js("//code.jquery.com/ui/1.11.3/jquery-ui.js");

var favorites = JSON.parse(localStorage.favorites);

var tab = Options.add_tab('fav-tab','star',_("Favorites"));
$("#favoriteOptionsBox").val(localStorage.favorites);

var i = 0;
var favList = [];

for(i=0; i<favorites.length+1; i++){
    if(i===0){
        favList = favList+"<ul id=\"sortable\">"
    }
    if(i>=0){
        favList = favList+"<li>"+favorites[i]+"</li>"
    }
    if(i>favorites.length){
        favList = favList+"</ul>"
    }
} //creating list of boards

$(favList).appendTo(tab.content);

$("#sortable").sortable(); //Making all objects with sortable id use the sortable jquery function

//var textarea = $("<textarea></textarea>").css({
//  "font-size": 12,
//  position: "absolute",
//  top: 35, bottom: 35,
//  width: "calc(100% - 20px)", margin: 0, padding: "4px", border: "1px solid black",
//  left: 5, right: 5
//}).appendTo(tab.content);

var submit = $("<input type='button' value='"+_("Update favorites")+"'>").css({
  position: "absolute",
  height: 25, bottom: 5,
  width: "calc(100% - 10px)",
  left: 5, right: 5
}).click(function() {
  localStorage.favorites = textarea.val();
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

//var update_textarea = function() {
//  if (!localStorage.favorites) {
//    textarea.text()}
//  else {
//    textarea.text(localStorage.favorites);
//    apply_fav();
//  }
//};

//update_textarea();
