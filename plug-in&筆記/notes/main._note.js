$(document).ready(function() {
  
  /*自己寫出來了，給自己牡蠣!，各種問題包含要使用on、用什麼方法等等
  其中有一個關鍵，就是測試對jq時，對照著開法者模式的elemtents看!
  像我後來發現很多時候一開始jq會動，後來卻不理我的關鍵，就是在選擇器下錯了!
  會下錯的原因在於，jq啟用時常變動了html的架構，既然架構已經變動了，那就
  要照著變動過後的架構去設定選擇器，否則它當然會不知道你在跟它說啥!*/

  /*Q1原本想要在全域設定以下變數，裝jQ物件，以精簡原本的程式碼，
    但是照註解的部分這樣設定瀏覽器看不懂，我錯在哪...*/
  /*var Nav_Others = $('#nav_others').clone();
    var Cart = $('#cart-container');
    var Showing = $('#cart-container.cartshow');
    var Hiding = $('#cart-container.carthide');*/

  // 一定要用on，因為你所更動、設定的物件，一開始是不存在的
  $('body').on('click', '#responsive-btn-cart', function() {
    var nav_others = $('#nav_others').clone();
    // 這邊是用on的原因--.carthide一開始並未存在於html中
    $('#cart-container.carthide').removeClass('carthide')
    /* Q2:為何不會每點一次'#responsive-btn-cart'就插入一串ul導致容器塞爆?
       A2:html這個method並不是像before和after那些method一樣是單純的插入
         而是「先清空在插入」，是一個「覆蓋」的概念!*/ 
    $('#cart-container').html(nav_others);
    $('#cart-container').addClass('cartshow')  
  });
  
  // 上面在#cart-container新添加了.cartshow，既然它為後來才加入html的class，必須用on
  /* Q3:我本來想要製造效果:當off-cnavas顯現中，我點body的任一處，就可以讓它自動收合
        所以想這樣寫:$('body').on('click', 'body', function() {......}，但失敗了
        ，下面這個寫法雖然能順利地將off-canvas關起來，但是僅限點擊黑色範圍內，
        而不同於我想要的效果:典籍畫面內任一處即使之消失*/

  $('body').on('click', '#cart-container.cartshow', function() {
    // 如此一來能正確吃到css動畫效果:讓width從33%縮回0%
    $('#cart-container.cartshow').removeClass('cartshow').addClass('carthide')
    // 把width縮回0後，由於我們之前clone進來的nav_others還在，必須要將他的內容清空，才不會留在畫面中
    $('#cart-container.carthide').empty()
    // $('#cart-container.carthide').css('display', 'none');
    /*設定dsiplay:none有兩個問題，
    1.在carthide被設定過的css不會在show時自動消失，代表我們需要對$('#cart-container.cartshow')
      設定display:block
    2.會導致畫面瞬間消失，而不是我們想要的動畫效果
      */
  });


  $(window).resize(function(){
    if ($(window).width() >= 768){
      $('#cart-container').removeClass();
      /* 如果是平板以上的視窗/容器，則讓cart-container回歸到初始狀態，如果是用css('display','none')
         則還得再多寫一行 else{...}，會比較沒效率
         $('#cart-container').css('display', 'none');
         } 
         else{
         $('#cart-container').css('display', 'block');
         */   
    }
  });

  $('#navi').responsive_nav();

  /*失敗的寫法
  $('.photos').carousel({
    num: 3, //要显示的数量，应该是个奇数
    maxWidth: 1197, //代表中央图片的宽度
    maxHeight: 542, //中央图片的高度
    autoPlay: true, //是否自动滚动播放
    showTime: 4000, //autoPlay为true时这个属性才有用
    animationTime: 1000, //
    scale: 0.8,
    distance: 50);
  });*/

  // 練習插入他人的外掛:呼叫可以折疊文字的外掛
  var myAccordion = new $.Zebra_Accordion('.Zebra_Accordion',{
    collapsible:true,
    show:true
  })


});



/*如同我自己的體驗，和老師所說，修別人的東西的確會比較痛苦T_T
  我只是想要捯到一個效果:在視窗於平板調腦以上時，維持原狀就好，等到視窗是為平板以下，塞入插建
  然後在視窗又回到平板以上時，回復原狀

  比想像中的難超多...!尤其是怎麼在變動視窗時停用外掛這件事上，如果不是單純用+-class的方法，
  外掛一被插入，更動了css，甚至html，常常就一去不復返了，關不掉...

  而且這個外掛還有一個地方很怪，又或許是我jQ寫錯...
  如果是後來才插入這個外掛，外掛會失靈，不會給dd height !導致dd裡的元素會跟下面的元素疊在一起...
  我已經花太多時間，既然自始就插入這個只有2kb的外掛對效能來說應該問題不大，就放著吧!

  以下是其他嘗試失敗的設定，想要利用+-calss去控制等等
  $('#Footer .col-5 .col-4 dl.Zebra_Accordion').removeClass('Zebra_Accordion');
  $('#Footer .col-5 .col-4 dl dd').css({
    display: 'block',
    opacity: '1',
    height:'auto'
  });
*/



   