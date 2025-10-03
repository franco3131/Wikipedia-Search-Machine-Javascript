$(function () {

  // Handle form submit (works for Enter key too)
  $("#searchForm").on("submit", function (e) {
    e.preventDefault(); // stop full page reload

    var response = $("#string").val();

    if (!response) return;

    // Optional: show a neutral "Searching…" status
    $(".text").text("Searching…");

    var url =
      "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions%7Cextracts%7Cinfo" +
      "&titles=Main+Page&generator=search&exlimit=10&exsentences=5" +
      "&rvprop=&exintro=1&inprop=url&gsrsearch=" +
      encodeURIComponent(response) +
      "&callback=?";

    $.getJSON(url, function (data) {
      var html = "";
      for (var prop in data.query.pages) {
        html +=
          "<a href='" +
          data.query.pages[prop].fullurl +
          "' target='_blank'><div class='block'>" +
          data.query.pages[prop].extract +
          "</div></a>";
      }

      $(".text").html(html || "No results found.");
    });
  });

  // Also allow explicit button click (calls form submit)
  $(".searchBtn").on("click", function () {
    $("#searchForm").trigger("submit");
  });

});
