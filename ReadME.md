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
