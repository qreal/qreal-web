$(function () {
    $("#tools-widget").tabs({
        heightStyle: "fill"
    });

    $.fn.exists = function () {
        return this.length !== 0;
    };

    $("#addPage").button({
        icons: {
            primary: "ui-icon-plusthick"
        },
        text: false
    });

    $(function () {
        //$(".pages-list").sortable();
        //$(".pages-list").disableSelection();


        $(".pages-list").selectable();
        $("#selectable").selectable();
    });
});