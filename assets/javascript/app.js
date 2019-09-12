var catagories = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// need to fix movie
$("#add-gif").on("click", function(event) {
  event.preventDefault();

  var catagory = $("#name-input")
    .val()
    .trim();
  console.log(catagory);
  catagories.push(catagory);
  $("#name-input").val("");

  renderButtons();
});

function renderButtons() {
  $("#name-display").empty();

  for (var i = 0; i < catagories.length; i++) {
    var a = $("<button>");
    a.addClass("catagory");
    a.attr("data-name", catagories[i]);
    a.text(catagories[i]);
    $("#name-display").append(a);
  }
}

function displyGifs() {
  var gif = $(this).attr("data-name");
  var url = `https://api.giphy.com/v1/gifs/search?q=${gif}&limit=10&api_key=YvBDD9aLimyr1TevbeBPaHSptUhhjmgl`;

  $.ajax({
    url,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;
    // ========================
    $("#gifs-appear-here").empty();
    for (var i = 0; i < results.length; i++) {
      var $animalDiv = $("<div>");
      var $p = $("<p>").text(results[i].rating);
      var $img = $("<img>").attr("src", results[i].images.fixed_height.url);
      $animalDiv.append($p, $img);
      $("#gifs-appear-here").prepend($animalDiv);
    }
  });
}





$(document).on("click", ".catagory", displyGifs);

renderButtons();
