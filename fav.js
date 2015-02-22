var favorites = JSON.parse(localStorage.favorites);

var tab = Options.add_tab('fav-tab','star',_("Favorites"));
$("#favoriteOptionsBox").val(localStorage.favorites);

var favButton = ""; //This allows setting the variable to a string that includes itself the first time

for(i=0; i<favorites.length; i++){var favButton = favButton+"<div>"+favorites[i]+" </div>";} //creating list of boards
$(favButton).appendTo(tab.content) //appending them to tab after so they dont each go on new line.

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
  }

  if (/immediate()/.test(localStorage.favorites)) {
    proc(); // Apply the script immediately
  }
  else {
    $(proc); // Apply the script when the page fully loads
  }
};

var update_textarea = function() {
  if (!localStorage.favorites) {
    textarea.text()}
  else {
    textarea.text(localStorage.favorites);
    apply_fav();
  }
};

update_textarea();
