$(function () {
  // Ensure container for results
  if ($(".text").length === 0) {
    $("body").append('<div class="text"></div>');
  }

  // If no form, wrap the input and add a button
  if ($("#searchForm").length === 0) {
    const $input = $("#string");
    if ($input.length) {
      $input.wrap('<form id="searchForm" action="about:blank" novalidate></form>');
      const $btn = $('<button type="submit" class="searchBtn">Search</button>');
      $input.after($btn);
    }
  }

  // Submit handler (works for Enter and click)
  $(document).on("submit", "#searchForm", function (e) {
    e.preventDefault();
    const q = $("#string").val().trim();
    if (!q) { $(".text").html("<em>Please enter a term.</em>"); return; }

    const url = "https://en.wikipedia.org/w/api.php";
    const params = {
      action: "query",
      format: "json",
      prop: "revisions|extracts|info",
      titles: "Main Page",
      generator: "search",
      exlimit: 10,
      exsentences: 5,
      exintro: 1,
      inprop: "url",
      gsrsearch: q,
      origin: "*"
    };

    $(".text").html("<em>Searching…</em>");

    $.getJSON(url, params)
      .done(function (data) {
        const pages = (data && data.query && data.query.pages) || {};
        const list = Object.values(pages);
        if (!list.length) { $(".text").html("<em>No results.</em>"); return; }
        const html = list.map(p =>
          `<a href="${p.fullurl}" target="_blank" rel="noopener">
             <div class="block">${p.extract || "(no preview)"}</div>
           </a>`
        ).join("");
        $(".text").html(html);
      })
      .fail(function (xhr) {
        console.error("Wikipedia API error:", xhr.status, xhr.responseText);
        $(".text").html("<em>Sorry, the search failed. Check console.</em>");
      });
  });
});
