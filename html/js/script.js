$(document).ready(function() {
    $(".m-tit a").click(function() {
        $(".m-about").slideToggle("800")
    });
    $(".m-about .w-icon").click(function() {
        $(".m-about").slideUp("800")
    });
    $(".customlink").each(function() {
        if ($(this).attr("href") == decodeURI(location.href)) {
            $(this).addClass("select");
            return false
        }
    })
});
$(window).load(function() {
    $(".postbg").height($(".g-mn").height())
});
