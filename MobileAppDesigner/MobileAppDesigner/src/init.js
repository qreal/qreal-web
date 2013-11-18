$(function () {
    $("#tools-widget").tabs({
        heightStyle: "fill"
    });

    $.fn.exists = function() {
        return this.length !== 0;
    };
});

