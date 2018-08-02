/* Q1:助教有說，盡量不要直接改外掛的程式碼，而是另外自己在寫一個去搭配、修正，如此將來方便維護
    不過...自己寫相對困難...而且這些外掛的語法還參雜著JS改的真的很痛苦...是否還是先在外掛裡面改
    比較好?
    ps以下的問題我都有自己上網查過，但可能是關鍵字下的不對...或者是回答的答案我看不懂T_T
    我覺得應該有不少是我對jQ的語法不夠理解...每次查資料卻還是看不懂，覺得挫折...*/

/*  Q2:這個外掛中，它原本預設的選擇器是$container，我知道這個寫法應該代表著var $container = $('.container')之類的
      ，我想要它變成var $container = $(.photos)這樣，我試著找出$container到底指哪個選擇器，但我找破頭還是 找不到作者
      在哪裡有宣告var $container到底裝什麼!!!!真的很崩潰!!!
        
/*  Q 3.1:我自己最後想到的方法是...既然找不到，我自己宣告看看...先在全域設一個var $container = $('.photos') (line:57)
          但又不確定有沒有用，索性在每一支函式函式都宣告一次(line:72、92等)，終於更動了作者的設定，但我發現仍就有瑕疵...雖然
           效果有出來，但是position設的位置會跑掉(line:266)...所以還是有bug...
      
      3.2 另外，我還有做一個嘗試，就是直接把非參數的$container全部直接用$('.photos')替換，結果還是失敗了...想知道為什麼
          不能直接這樣替代...
      */

/*  Q4:我看很多外掛起手式固定寫法:(function ($){--blablabla---}(jQuery); 參數為$，用(jQuery)結尾，中間塞所有的變數、函式等
      現在jQ3.3.1版本還是這樣寫嗎?它的意義是什麼?*/
 
 
// 以下為本carousel的js的程式碼
// 以下為本carousel的js的程式碼
// 以下為本carousel的js的程式碼
(function ($) {
    if ($ === undefined) {
        return;
    }
  
    // var $container = $('.photos')

    var defaultConfig = {
        num: 3, //要显示的数量，应该是个奇数
        maxWidth: 250, //代表中央图片的宽度
        maxHeight: 150, //中央图片的高度
        autoPlay: true, //是否自动滚动播放
        showTime: 1000, //autoPlay为true时这个属性才有用
        animationTime: 300, //
        scale: 0.8,
        distance: 50
    };


    function getzIndexValue(num, direction) {
      // var $container = $('.photos')
        var zIndexs = [];
        for (var i = 0; i < num; i++) {
            if (i <= (num - 1) / 2) {
                zIndexs.push(i);
            } else {
                zIndexs.push((num - 1) / 2 - i);
            }
        }
        if (direction === 'left') {
            zIndexs.reverse();
            return zIndexs;
        }
        if (direction === 'right') {
            return zIndexs;
        }

    }

    function scroll($container, direction) {
      // var $container = $('.photos')
        if ($container.data('isanimating')) {
            return;
        }
        var config = $container.data('config');
        var halfShowNum = (config.num - 1) / 2;
        var scales, i, newIndex;
        var totalNum = $container.data('totalNum');
        var targetCss;
        var firstIndexBeforeScroll, lastIndexBeforeScroll;
        if (direction === 'left') {
            newIndex = ($container.data('index') - 1 + totalNum) % totalNum;
        } else if (direction === 'right') {
            newIndex = ($container.data('index') + 1) % $container.data('totalNum');
        } else {
            return;
        }
        // $container.find('ul li').stop(true, true);
        var tempIndexsInfo = getShowIndexs($container);
        firstIndexBeforeScroll = tempIndexsInfo.indexs[0];
        lastIndexBeforeScroll = tempIndexsInfo.indexs[config.num - 1];
        $container.data('index', newIndex);
        var showIndexsInfo = getShowIndexs($container);
        var zIndexs = getzIndexValue(config.num, direction);
        if (totalNum === config.num) {
            animationTimeForEdge = 0
        } else if (totalNum - config.num === 2) {
            animationTimeForEdge = config.animationTime / 2;
        } else {
            animationTimeForEdge = config.animationTime;
        }

        /*
         showIndexsInfo = {
         indexs: [5, 6, 0, 1, 2]
         hashIndexs: {
         '5': 0,
         '6': 1,
         '0': 2,
         '1': 3,
         '2': 4
         }
         }
         */
        $container.find('ul li').each(function (index, element) {
          // var $container = $('.photos')  
            i = showIndexsInfo.hashIndexs[index];

            if (i !== undefined) {
                scales = Math.pow(config.scale, Math.abs(i - halfShowNum));
                $container.data('isanimating', true);
                $(element).css({
                    display: 'block',
                    'z-index': zIndexs[i] + 9999
                }).animate({
                    width: scales * config.maxWidth,
                    height: scales * config.maxHeight,
                    left: i * config.distance + (1 - scales) * config.maxWidth * Number(i > halfShowNum),
                    top: (1 - scales) * config.maxHeight / 2
                }, config.animationTime, function () {
                    $container.data('isanimating', false);
                });

            } else {
                scales = Math.pow(config.scale, halfShowNum);
                //if(direction === 'right' && index === firstIndexBeforeScroll){
                //    console.log('right' + index);
                //} else if(direction === 'left' && index === lastIndexBeforeScroll) {
                //    console.log('left' + index);
                //}

                targetCss = {
                    display: 'none',
                    left: halfShowNum * config.distance + (1 - scales) * config.maxWidth / 2,
                    top: 0
                };
                if (direction === 'left' && index === lastIndexBeforeScroll) {

                    $(element).css('z-index', -1).animate({
                        left: "-=" + config.distance + "px"
                    }, config.animationTime, function () {
                        $(element).css(targetCss);
                    });
                } else if (direction === 'right' && index === firstIndexBeforeScroll) {

                    $(element).css('z-index', -1).animate({
                        left: "+=" + config.distance + "px"
                    }, config.animationTime, function () {
                        $(element).css(targetCss);
                    });
                } else {
                    $(element).css({
                        display: 'none',
                        width: scales * config.maxWidth,
                        height: scales * config.maxHeight,
                        left: halfShowNum * config.distance + (1 - scales) * config.maxWidth / 2,
                        top: 0
                    });
                }
            }

        });
    }

    function getConfig(newConfig) {
      // var $container = $('.photos')
        var config = null;
        if (typeof newConfig === 'object' && newConfig !== null) {
            config = {};
            for (var prop in defaultConfig) {
                if (defaultConfig.hasOwnProperty(prop)) {
                    config[prop] = defaultConfig[prop];
                }
            }
            for (prop in newConfig) {
                if (newConfig.hasOwnProperty(prop) && config.hasOwnProperty(prop)) {
                    config[prop] = newConfig[prop];
                }
            }
        }
        return config;
    }

    function getShowIndexs($container) {
      // var $container = $('.photos')
        var showIndexs = [];
        var temp;
        var halfShowNum = ($container.data('config').num - 1) / 2;
        var currentIndex = $container.data('index') || 0;
        var totalNum = $container.data('totalNum') || 0;
        for (var i = -halfShowNum; i <= halfShowNum; i++) {
            temp = currentIndex + i;
            showIndexs.push((temp < 0 ? (temp + totalNum) : temp) % totalNum);
        }
        var hashIndexs = {};
        for (i = 0; i < showIndexs.length; i++) {
            hashIndexs[showIndexs[i]] = i;
        }
        return {
            indexs: showIndexs,
            hashIndexs: hashIndexs
        };
    }

    function initStyle($container) {
      // var $container = $('.photos')
        var showIndexsInfo = getShowIndexs($container);

        var zIndex = 9999;
        var scales;
        var config = $container.data('config');
        var halfShowNum = (config.num - 1) / 2;
        var listWidth = halfShowNum * config.distance * 2 + config.maxWidth;
        var containerWidth = $container.width();
        var containerHeight = $container.height();
        if (containerWidth < listWidth) {
            $container.width(listWidth);
        }
        if (containerHeight < config.maxHeight) {
            $container.height(config.maxHeight);
        }
        $container.find('ul li img').css({
            width: "100%",
            height: "100%"
        });
        $container.find('ul').css({
            position: 'relative',
            width: listWidth,
            height: config.maxHeight,
            'list-style': 'none',
            padding: 0,
            margin: 0,
            marginLeft: '50%',
            marginRight: '50%',
            left: -listWidth / 2,
            /*customize:
            top: ($container.height() - config.maxHeight) / 2
            */
        });

        $container.find('.left').css({
            position: 'absolute',
            left: 10,
            top: '50%',
            'z-index': 9999 + $container.data('totalNum') + 1
        });

        $container.find('.right').css({
            position: 'absolute',
            right: 10,
            top: '50%',
            'z-index': 9999 + $container.data('totalNum') + 1
        });

        $container.find('ul li').each(function (index, element) {
            var i = showIndexsInfo.hashIndexs[index];
            if (i !== undefined) {
                scales = Math.pow(config.scale, Math.abs(i - halfShowNum));
                zIndex = 9999 + (i > halfShowNum ? (config.num - 1 - i) : i);
                $(element).css({
                    display: 'block',
                    position: 'absolute',
                    'z-index': zIndex,
                    overflow: 'hidden',
                    width: scales * config.maxWidth,
                    height: scales * config.maxHeight,
                    left: i * config.distance + (1 - scales) * config.maxWidth * Number(i > halfShowNum),
                    top: (1 - scales) * config.maxHeight / 2
                });
            } else {
                scales = Math.pow(config.scale, halfShowNum);
                $(element).css({
                    display: 'none',
                    position: 'absolute',
                    overflow: 'hidden',
                    width: scales * config.maxWidth,
                    height: scales * config.maxHeight,
                    left: halfShowNum * config.distance + (1 - scales) * config.maxWidth / 2,
                    top: 0
                });
            }

        });
    }


    $.fn.carousel = function (param) {
      // var $container = $('.photos')
        var config;
        var totalNum;
        var $target;
        $(this).each(function(index, target) {
            $target = $(target);
            if (typeof param === 'object' && param !== null) {
                config = getConfig(param);
                totalNum = $target.find('ul li').length;
                if (totalNum <= 0 || totalNum % 2 === 0) {
                    return;
                }
                if (config.num <= 0 || config.num > totalNum) {
                    config.num = totalNum;
                }
                $target.data('config', config);
                $target.data('index', 0);
                $target.data('totalNum', totalNum);
                initStyle($target);

                $target.find('.left').off('click').on('click', (function($target) {
                    return function() {
                        scroll($target, 'left');
                    }
                })($target));
                $target.find('.right').off('click').on('click',(function($target) {
                    return function() {
                        scroll($target, 'right');
                    }
                })($target));

                (function($target) {
                    var autoPlay;
                    clearInterval($target.data('auto'));
                    if($target.data('config').autoPlay) {
                        autoPlay = setInterval(function() {
                            scroll($target, 'right');
                        }, $target.data('config').showTime);
                        $target.data('auto', autoPlay);
                        $target.find('ul').off('mouseenter').on('mouseenter', function() {
                            clearInterval($target.data('auto'));
                        }).off('mouseleave').on('mouseleave', function() {
                            autoPlay = setInterval(function() {
                                scroll($target, 'right');
                            }, $target.data('config').showTime);
                            $target.data('auto', autoPlay);
                        });
                    } else {
                        $target.find('ul').off('mouseenter').off('mouseleave');
                    }
                })($target);
            }

        });

    };

})(jQuery);

