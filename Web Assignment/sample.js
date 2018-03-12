function tplyoutube(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
        e.preventDefault();
        // prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#pac-input").val()).replace(/%20/g, "+"),
            maxResults: 2,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
        });
        // execute the request
        request.execute(function(response) {
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function(index, item) {
                $.get("item.html", function(data) {
                    $("#results").append(tplyoutube(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                });
            });
            resetVideoHeight();
        });
    });

    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyBN5Xv4tdVYOPzeMufzNJYJY2KKrZ11y0s");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}