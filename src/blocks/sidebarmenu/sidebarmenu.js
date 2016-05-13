(function() {
    var i, checkCook, cookTitle, offersArray;
    $("input").on("click", function() {
        for (i = 0; i < offersArray; i ++) {
            $("span[id='"+i+"']").parents(".offers").removeClass('hidden-class');
        }
        checkCook = $("label[for='"+this.id+"']").text();
        offersArray = ($(".offers").length);
        for (i =0; i < offersArray; i++) {
            cookTitle = $("span[id='"+i+"']").attr("title");
            if (checkCook === cookTitle) {
                console.log("true");
            } else {
                $("span[id='"+i+"']").parents(".offers").addClass('hidden-class');
            }
        }
    });
})();
