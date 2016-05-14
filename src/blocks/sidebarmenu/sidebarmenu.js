(function() {
    var i, checkCook, cookTitle, offersArray;

    $('.sidebar-menu__filter').on('click', function() {
        for (i = 0; i < offersArray; i++) {
            $("span[id='"+i+"']").parents('.offers').removeClass('hidden-class');
        }

        checkCook = $("label[for='"+this.id+"']").text();
        offersArray = ($(".offers").length);

        for (i = 0; i < offersArray; i++) {
            cookTitle = $("span[id='"+i+"']").attr('title');
            if (checkCook !== cookTitle) {
                $("span[id='"+i+"']").parents('.offers').addClass('hidden-class');
            }
        }
    });
})();

// (function() {
//     var $nodes = $('.offers .cook-info__categories'),
//         $checkBoxes = $('.sidebar-menu__filter'),
//         $item,
//         title;

//     $checkBoxes.on('click', function(event) {
//            $nodes.each(function(offerIndex, offer) {
//                     $checkBoxes.each(function(index, item) {
//                         // var isChecked = $item.attr('checked');
//                         // console.log($(item).prop('checked'), index);
//                         $item = $(item);
//                         title = $item.val();

//                         // console.log(isChecked);

//                         // $('bludo').toggleClass('class', !isChecked);
//                         console.log(index, $item.prop('checked'), $(offer).attr('title'), title);
//                         $(offer).parents('.offers').toggleClass('hidden-class', !$item.prop('checked') && $(offer).attr('title') === title);
//                     });  
//             });


//     });  
// })();
