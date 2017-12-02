$(document).ready(function () {
  $('.list-group-item-action').on('click', function() {
    $('.list-group-item-action').each(function() {
      $(this).removeClass('active');
    })
    $(this).addClass('active');
  });

  var $sections = $('.section');
  $(window).scroll(function () {
    var currentScroll = $(this).scrollTop();
    var $currentSection;

    $sections.each(function(){
      // divPosition is the position down the page in px of the current section we are testing
      var divPosition = $(this).offset().top;

      // If the divPosition is less the the currentScroll position the div we are testing has moved above the window edge.
      // the -1 is so that it includes the div 1px before the div leave the top of the window.
      if( divPosition - 100 < currentScroll ){
        // We have either read the section or are currently reading the section so we'll call it our current section
        $currentSection = $(this);

        // If the next div has also been read or we are currently reading it we will overwrite this value again. This will leave us with the LAST div that passed.
      }

      // This is the bit of code that uses the currentSection as its source of ID
      var id;
      if ($currentSection == undefined) {
        id = "introduction";
      }
      else {
        id = $currentSection.attr('id');
      }
      $('.list-group-item-action').each(function() {
        if ($(this).attr('href') == "#"+id) {
          $(this).addClass('active');
        }
        else {
          $(this).removeClass('active');
        }
      });
    })
  });
})
