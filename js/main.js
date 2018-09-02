$(document).ready(function() {
    
    $('#shopping-cart .twicks').click(function() {
        $('.shopping-content-base').fadeIn('fast')
        $('#full-screen-cover').fadeIn('fast')
    });
    
    $('#full-screen-cover').click(function() {
        $(this).fadeOut('fast')
        $('.shopping-content-base').fadeOut('fast')
    });    
            

    $('.shopping-content .fa-times').click(function() {
        $(this).closest('.treasure').remove()
    });
});
