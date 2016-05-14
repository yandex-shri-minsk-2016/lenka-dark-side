// (function() {
//     var i, checkCook, cookTitle, offersArray;

//     $('.sidebar-menu__filter').on('click', function() {
//         for (i = 0; i < offersArray; i++) {
//             $("span[id='"+i+"']").parents('.offers').removeClass('hidden-class');
//         }

//         checkCook = $("label[for='"+this.id+"']").text();
//         offersArray = ($(".offers").length);

//         for (i = 0; i < offersArray; i++) {
//             cookTitle = $("span[id='"+i+"']").attr('title');
//             if (checkCook !== cookTitle) {
//                 $("span[id='"+i+"']").parents('.offers').addClass('hidden-class');
//             }
//         }
//     });
// })();



(function() {
    var $checkBoxes = $('.sidebar-menu__filter'),
    $nodes = $('.offers .cook-info__categories'),
        $item,
        $checkbox;

    $checkBoxes.on('click', function() {
        $nodes.each(function(index, item) {
            $item = $(item);
            $checkbox = $('.sidebar-menu__filter[value="' + $item.attr('title') + '"]');
   

            $item.parents('.offers').toggleClass('hidden-class', !$checkbox.prop('checked'));
        });
    });


})();

