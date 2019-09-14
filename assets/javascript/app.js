var catagories = ["Gundams", "Anime", "HunterxHunter", "JoJo"];

// need to fix movie
$("#add-gif").on("click", function(event) {
  event.preventDefault();

  var catagory = $("#name-input")
    .val()
    .trim();
  if (!catagory) {
    return false;
  }
  catagories.push(catagory);
  $("#name-input").val("");

  renderButtons();
});

function renderButtons() {
  $("#name-display").empty();

  for (var i = 0; i < catagories.length; i++) {
    var $button = $("<button>");
    $button.addClass("catagory btn-primary p-3 btn-block");
    $button.attr("data-name", catagories[i]);
    $button.text(catagories[i]);
    $("#name-display").append($button);
  }
}

function displyGifs() {
  var gif = $(this).attr("data-name");
  var url = `https://api.giphy.com/v1/gifs/search?q=${gif}&limit=10&api_key=YvBDD9aLimyr1TevbeBPaHSptUhhjmgl`;

  $.ajax({
    url,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    // ========================

    $("#gifs-appear-here").empty();
    if (!results.length) {
      $("#gifs-appear-here").prepend(`<h1>No Gifs Found for ${gif}!</h1>`);
    } else {
      for (var i = 0; i < results.length; i++) {
        var $gifCard = $("<div>").addClass("card");
        var $gifBody = $("<div>").addClass("card-body");
        var $subtitle = $("<h6>")
          .text( `Rating : ${results[i].rating}`)
          .addClass("card-subtitle");
        var $title = $("<h5>")
          .text(results[i].title)
          .addClass("card-title");
        var $upload = $("<p>")
          .text(`Uploaded on: ${results[i].import_datetime.split(" ")[0]}`)
          .addClass("card-text");
        var $img = $("<img>").attr({
          src: results[i].images.fixed_height_still.url,
          "data-still": results[i].images.fixed_height_still.url,
          "data-animate": results[i].images.fixed_height.url,
          "data-state": "still",
          class: "gif card-img-top"
        });
        $gifCard.append($img, $gifBody.append($title, $subtitle, $upload));
        $("#gifs-appear-here").prepend($gifCard);
      }
    }
  });
}

const pausePlayGif = event => {
  const state = $(event.target).attr("data-state");
  if (state === "still") {
    $(event.target).attr({
      "data-state": "animate",
      src: $(event.target).attr("data-animate")
    });
  } else {
    $(event.target).attr({
      "data-state": "still",
      src: $(event.target).attr("data-still")
    });
  }
};

$(document).on("click", ".catagory", displyGifs);
$(document).on("click", ".gif", pausePlayGif);

renderButtons();
