$(document).ready(function() {
  

  /*Q1原本想要在全域設定以下變數，裝jQ物件，以精簡原本的程式碼，
    但是照這樣的部分這樣設定瀏覽器看不懂，我錯在哪...
    var Nav_Others = $('#nav_others').clone();
    var Cart = $('#cart-container');
    var Showing = $('#cart-container.cartshow');
    var Hiding = $('#cart-container.carthide');*/

  $('body').on('click', '#responsive-btn-cart', function() {
    var nav_others = $('#nav_others').clone();
    $('#cart-container.carthide').removeClass('carthide')
    $('#cart-container').html(nav_others);
    $('#cart-container').addClass('cartshow')  
  });
  
  /* Q2:我本來想要製造效果:
        當off-cnavas顯現中，我點body的任一處，就可以讓它自動收合
        所以想這樣寫:$('body').on('click', 'body', function() {......}，但失敗了
        ，下面這個寫法雖然能順利地將off-canvas關起來，但是僅限點擊黑色範圍內，
        而不同於我想要的效果:點擊畫面內任一處即使之消失*/

  $('body').on('click', '#cart-container.cartshow', function() {
    $('#cart-container.cartshow').removeClass('cartshow').addClass('carthide')
    $('#cart-container.carthide').empty()
  });


  $(window).resize(function(){
    if ($(window).width() >= 768){
      $('#cart-container').removeClass();
    }
  });

  $('#navi').responsive_nav();


  var myAccordion = new $.Zebra_Accordion('.Zebra_Accordion',{
    collapsible:true,
    show:true
  })


});






   