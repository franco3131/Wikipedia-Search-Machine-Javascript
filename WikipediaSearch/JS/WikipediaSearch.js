$(function () {
  $("#searchForm").on("submit", function (e) {
    e.preventDefault();

    const q = $("#string").val().trim();
    if (!q) return;

    $("#results").text("Searching…");       // neutral status

    const url = "https://en.wikipedia.org/w/api.php?" + $.param({
      action: "query",
      format: "json",
      origin: "*",                   // <-- CORS, not JSONP
      formatversion: 2,
      generator: "search",
      gsrsearch: q,
      prop: "extracts|info",
      inprop: "url",
      exintro: 1,
      explaintext: 1,
      exsentences: 3,
      gsrnamespace: 0,
      gsrlimit: 10
    });

    $.getJSON(url).done(data => {
      const pages = (data.query && data.query.pages) || [];
      const html = pages.map(p => `
        <a href="${p.fullurl}" target="_blank" rel="noopener">
          <div class="block">${p.extract || "(no extract)"}</div>
        </a>`).join("");

      $("#results").html(html || "No results found.");
    }).fail(() => {
      $("#results").text("Search failed. Please try again.");
    });
  });

  $(".searchBtn").on("click", () => $("#searchForm").trigger("submit"));
});
