$(document).ready(function() {
    
    $('#shopping-cart .twicks').click(function() {
        $('.shopping-content-base').fadeIn('fast')
        $('#full-screen-cover').fadeIn('fast')
    });
    
    $('#full-screen-cover').click(function() {
        $(this).fadeOut('fast')
        $('.shopping-content-base').fadeOut('fast')
        $('a img').css('z-index', '0');
    });    
            

    $('.shopping-content .fa-times').click(function() {
        $(this).closest('.treasure').remove()
    });

     $('a img').click(function() {
        $('#full-screen-cover').fadeIn()
        $(this).css('z-index', '2')
    });
});
