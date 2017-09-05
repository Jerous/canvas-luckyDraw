## 更新日誌：
> v0.01

* 首次提交

<br>

> v0.02

* 大轉盤與九宮格 `awards` 獎品數組結構，由字符串，修改為對象；該對象包含兩個屬性，`type` 和 `content`，使用 `type` 屬性來決定獎項是否為文字，或者圖片。更加靈活，並且清晰；

* 九宮格去除可配置屬性 `awardsRowLen`，而是以 `awards` 屬性的長度，來決定每行每列顯示幾個獎項；

* 文檔變得更友好更易於閱讀了。

<br>

> v0.03

* 九宮格引入 `hasButton` 屬性；該屬性默認為 'true'，若設置成 'false'，將不再繪製默認的抽獎按鈕；用戶可通過對象的 `luckyDraw()` 方法，定制抽獎按鈕。


<br>

## 引入：
> [下載](https://github.com/Musiky/canvas-luckyDraw/blob/master/src/dist/luckyDraw.min.js) `luckyDraw.min.js` 並引入。不依賴任何第三方庫

``` html
<script src="./src/dist/luckyDraw.min.js"></script>
```

## 使用：

### 九宮格抽獎

[查看演示效果](https://musiky.github.io/canvas-luckyDraw/sudoku.html)

**最簡單的使用：**
``` html
<body>
     <canvas id="canvas" width="500px" height="500px">
        Canvas not supported
     </canvas>
</body>
<script src="./src/dist/luckyDraw.min.js"></script>
<script>
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    new Sudoku({
        sudokuSize: canvas.width,

        awards: [
            {type: 'text', content: '30元話費'},
            {type: 'text', content: 'iphone8'},
            {type: 'losing', content: '未中獎'},
            {type: 'text', content: 'MackBook Pro'},
            {type: 'image', content: 'https://img12.360buyimg.com/n7/jfs/t4807/209/1436278963/496606/8e486549/58f0884eNcec87657.jpg'},
            {type: 'losing', content: '未中獎'},
            {type: 'image', content: 'https://img11.360buyimg.com/n7/jfs/t3187/325/423764794/213696/f4eb1dbd/57b68142Nbe104228.jpg'},
            {type: 'text', content: '火星一日遊'}
        ],
        
        finish: function (index) {
            switch(this.awards[index].type) {
                case 'text':
                    alert('🎉恭喜您中得：' + this.awards[index].content);
                    break;
                case 'image':
                    if (index === 4) alert('🎉恭喜您中得戰爭磨坊水冷機');
                    else if (index === 6) alert('🎉恭喜您中得魔聲耳機');
                    break;
                case 'losing':
                    alert('💔很遺憾，您沒有中獎~');
                    break;
            }
        }

    }).render(canvas, context);
</script>
```

<br>

**可配置參數：**

| 屬性 | 是否必選 | 類型 | 備註 | 默認值 |
| :-- | :--: | :-- | :-- | :--: |
| sudokuSize | 是 | *Number* | 九宮格的尺寸，一般為 canvas 的尺寸 | ø |
| awards | 是| *Object* | 獎品信息，每組對象代表一個獎項，對像中有兩個屬性，type 和content；<br>type 有三個可能的值：<br><br>`text：`將content 中的值輸出為普通文本；<br> `losing：`將content 中的值輸出普通文本，狀態為未中獎；<br>`image：`將content 中的圖片地址渲染為圖片。 | ø |
| sudokuItemRadius | 否 | *Number* | 獎項小方塊的圓角大小 | 8 |
| sudokuItemUnactiveColor | 否 | *String* | 獎項方塊的顏色 | rgb(255, 235, 236) |
| sudokuItemUnactiveTxtColor | 否 | *String* | 獎項方塊文字的顏色 | rgb(48, 44, 43) |
| sudokuItemUnactiveShadowColor | 否 | *String* | 獎項方塊陰影的顏色 | rgb(255, 193, 200) |
| sudokuItemActiveColor | 否 | *String* | 跳動方塊的顏色 | rgb(254, 150, 51) |
| sudokuItemActiveTxtColor | 否 | *String* | 跳動方塊文字的顏色 | rgb(255, 255, 255) |
| sudokuItemActiveShadowColor | 否 | *String* | 跳動方塊陰影的顏色 | rgb(255, 193, 200) |
| buttonColor | 否 | *String* | 按鈕的顏色 | rgb(255, 216, 1) |
| buttonTxtColor | 否 | *String* | 按鈕文字的顏色 | rgb(172, 97, 1) |
| buttonShadowColor | 否 | *String* | 按鈕陰影的顏色 | rgb(253, 177, 1) |
| duration | 否 | *Number* | 動畫時長 | 4000 |
| velocity | 否 | *Number* | 動畫速率變化值（峰值） | 300 |
| hasButton | 否| *String* | 九宮格是否自帶按鈕；<br>若設置為`false`，九宮格沒有按鈕，需要用戶在外部自定義抽獎按鈕；<br>抽獎按鈕需調用對象的`luckyDraw( )` 方法；<br> | 'true' |
| finish | 否 | *Callback* | 獲取獎品信息後的回調，返回一個下標，根據該下標查找抽到什麼獎品 | ø

<br>

> 手動調用抽獎的方法

``` javascript
var sudoku = new Sudoku({
    // ...
    hasButton: 'false'
    // ...
});

sudoku.render(canvas, context);

button.addEventListener('click', function (e) {
    sudoku.luckyDraw(context);
})
```

<br>

## 大轉盤抽獎

[查看演示效果](https://musiky.github.io/canvas-luckyDraw/rouletteWheel.html)

**最簡單的使用：**
``` html
<body>
    <canvas id="canvas" width="500" height="500">
        Canvas not supported
    </canvas>
</body>

<script src="./src/dist/luckyDraw.min.js"></script>
<script>
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    new RouletteWheel({
        centerX: canvas.width / 2,
        centerY: canvas.height / 2,
        outsideRadius: 200,

        awards: [
            {type: 'text', content: 'iphone8'},
            {type: 'text', content: '大保健'},
            {type: 'text', content: '10元話費'},
            {type: 'image', content: 'https://img12.360buyimg.com/n7/jfs/t4807/209/1436278963/496606/8e486549/58f0884eNcec87657.jpg'},
            {type: 'losing', content: '未中獎'}
        ],

        finish: function (index) {
            switch(this.awards[index].type) {
                case 'text':
                    alert('🎉恭喜您中得：' + this.awards[index].content);
                    break;
                case 'image':
                    alert('🎉恭喜您中得：戰爭磨坊水冷機箱');
                    break;
                case 'losing':
                    alert('💔很遺憾，您沒有中獎~');
                    break;
            }
        }
        
    }).render(canvas, context);

</script>
```

<br>

**可配置參數：**

| 屬性 | 是否必選 | 類型 | 備註 | 默認值 |
| :-- | :--: | :-- | :-- | :--: |
| centerX | 是 | *Number* | 大轉盤圓心x軸坐標，一般為畫布寬度的一半 | ø |
| centerY | 是 | *Number* | 大轉盤圓心y軸坐標，一般為畫布高度的一半 | ø |
| outsideRadius | 是 | *Number* | 大轉盤的半徑，這個值乘以二不能大於 canvas 畫布的寬或者高喲！ | ø |
| awards | 是| *Object* | 獎品信息，每組對象代表一個獎項，對像中有兩個屬性，type 和content；<br>type 有三個可能的值：<br><br>`text：`將content 中的值輸出為普通文本；<br> `losing：`將content 中的值輸出普通文本，狀態為未中獎；<br>`image：`將content 中的圖片地址渲染為圖片。 | ø |
| evenColor | 否 | *String* | 大轉盤第偶數個獎品盤顏色 | #FF6766 |
| oddColor | 否 | *String* | 大轉盤第奇數個獎品盤顏色 | #FD5757 |
| loseColor | 否 | *String* | 大轉盤未中獎錶盤顏色 | #F79494 |
| textColor | 否 | *String* | 大轉盤獎品文字顏色 | White |
| arrowColorFrom | 否 | *String* | 指針漸變色的第一個顏色 | #FFFC95 |
| arrowColorTo | 否 | *String* | 指針漸變色的第二個顏色 | #FF9D37 |
| buttonFont | 否 | *String* | 抽獎按鈕的文字 | 開始抽獎 |
| buttonFontColor | 否 | *String* | 抽獎按鈕文字的顏色 | #88411F |
| buttonColorFrom | 否 | *String* | 抽獎按鈕漸變色的第一個顏色 | #FDC964 |
| buttonColorTo | 否 | *String* | 抽獎按鈕漸變色的第二個顏色 | #FFCB65 |
| startRadian | 否 | *Number* | 大轉盤繪製的起始角度 | 0 |
| duration | 否 | *Number* | 大轉盤旋轉的時間 | 4000 |
| velocity | 否 | *Number* | 大轉盤旋轉的速率峰值 | 10 |
| finish | 否 | *Callback* | 獲取獎品信息後的回調，返回一個下標，根據該下標查找抽到什麼獎品 | ø |

<br>

## 刮刮卡抽獎

[查看演示效果](https://musiky.github.io/canvas-luckyDraw/scratchCard.html)

**最簡單的使用：**
``` html
<body>
    <canvas id="canvas" width="250" height="50">
        Canvas not supported
    </canvas>
</body>

<script src="./src/dist/luckyDraw.min.js"></script>
<script>
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    new ScratchCard({
        awardBackgroundImage: 'http://tse3.mm.bing.net/th?id=OIP.X7zblF16pKGur6refGZsWQEsDg&pid=15.1'
    }).render(canvas, context);
</script>
```

<br>

**可配置參數：**

| 屬性 | 是否必選 | 類型 | 備註 | 默認值 |
| :-- | :--: | :-- | :-- | :--: |
| awardBackgroundImage | 是 | *String* | canvas 的背景圖片，刮開塗層後的獎項 | ø |
| style | 否 | *String* | 控制 canvas 的樣式 | ø |
| eraserSize | 否 | *String* | 控制橡皮擦的半徑大小，單位 px | 15 |
| coverColor | 否 | *String* | 控製表面塗層的顏色 | #B5B5B5 |
| ratio | 否 | *Number* | 刮開面積佔總面積的多少比例後，會觸發callback。值在0到1之間 | 0.8 |
| callback | 否 | *Function* | 在刮開面積佔總面積的比例超過設定值時觸發，亦可作為一個獨立的參數存在。回調函數內可以調用this.clearCover()方法清除掉刮開層的所有像素。 | null |