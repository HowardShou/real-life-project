8/22

1.blog_post的content尾端的comments，雖然看起來版面是沒有問題，不過總覺得該部分的html的架構可能有問題...

2.product_detail關於input[type="number"]，找過資料後，還是無法弄出客製化的spinner...


8/16

1.最大的問題還是在FDI_1與FDI_2這兩個大容器的切版，很明顯還是跟設計稿有落差，但是我真的盡力了...
應該是我哪邊的架構沒有規劃好

2.呈上，可以看的出來，雖然沒有出現scrollbar，但是FDI這兩個容器還是多出了不必要的白邊，我研究了兩小時以上
...DEV-toll看到快爛掉了，也嘗試改html架構，仍舊找不出問題在哪，希望能找出盲點T_T

3.覆蓋、置中、absolute要設在哪個點上比較適合等，是我現在在做RWD時最常遇到的狀況，雖然最後大都能解決問題
，不過總是要嘗試各種方法才會知道最佳解，除了多練習外，之後有機會也想參考看看助教和老師在面對這些設計稿時
是怎麼切版，對齊、覆蓋等技巧，相信自己這樣一直摸索下來，在觀摩資深的你們下的邏輯架構，應該會有些體悟XD

-------------------------------------------
8/12

1.了解margin:0 -15px設置的意義，解決跑版問題

2.順便修正在xs small device(width<=767px)時nav靠太近與一兩個小地方跑版




-------------------------------------------
8/11

1.刪除非必要的外掛，能用bootstrap就用bootstrap

2.兩個問題:

2.1 bootstrap navbar的使用問題:
由於設計稿的nav很長，因此畫面一縮小很快就會產生推擠，雖然可以用隱藏元素的方式解決
但是應該還是要開一個off-canvas之類的讓使用者可以點選吧?是否有其他更好的解決方案呢...

2.2 找不出的留白:
觀察後，發現當視窗約小於900px時，右邊似乎有殘留的padding導致畫面右邊總會有一點留白，
視窗越小越明顯，我找了好久還是找不出問題所在QQ... 
