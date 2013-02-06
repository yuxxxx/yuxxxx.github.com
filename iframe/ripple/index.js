// forked from yuu_hara's "某ゲームの背景に流れる丸いやつ" http://jsdo.it/yuu_hara/mNoC
// forked from yuu_hara's "forked: my canvas 6" http://jsdo.it/yuu_hara/mamml
// forked from 5509's "my canvas 6" http://jsdo.it/5509/qaAo
$(document).ready(function(){
    var frameRate = 1000.0/30,
        speedRate = 0.5, //横方向の速度調整
        colors = ["#e2c7d5", "#c7d5e2", "#d5c7e2", "#c7e2d5"],
	    background = $('#background');
    
    // 新しい○を生成する
    var Taurus = function() {
        this.element = $('<div class="taurus">')[0];
        // 位置とサイズの指定
        this.position = {
            x : randomNum(20, window.innerWidth),
            y : randomNum(0 , window.innerHeight)
        };
        
        //移動速度の指定
        this.setSpeed = function() {
            this.xSpeed = randomNum(1, 3) * speedRate;
            this.ySpeed = {
                freq : randomNum(0, 5),
                amp  : randomNum(0, 15)
            };
        };
    
        //色、サイズの指定とdiv要素への反映
        this.setStyle = function () {
            var size = randomNum(10, 15);
            var style = this.element.style;
            style.border = [size + 'px', colors[Math.floor(randomNum(0, 4))], 'solid'].join(' ');
            style.left   = this.position.x + 'px';
            style.top    = this.position.y + 'px';
            style.height = size + 'px';
            style.width  = size + 'px';
        };
        
        //○をリセットする
        this.reset = function() {
            this.position = {
                x : window.innerWidth + 50,
                y : randomNum(0 , window.innerHeight)
            };
            this.setSpeed();
            this.setStyle();
        };
        
        this.setSpeed();
        this.setStyle();
    };

    // 最小〜最大の間でランダムな数を返す
    function randomNum(minInt, maxInt) {
        var ran = Math.random();
        return minInt + maxInt * ran;
    }
    
    //○を初期化してdiv要素を親要素に追加
    function init(taurusCount) {
        var tauruses = [];
        for (var i=0; i<taurusCount; i++) {
            tauruses[i] = new Taurus();
            background.append(tauruses[i].element);
        }
        return tauruses;
    }
    
    //div要素の配置
    function placeElements(tauruses) {
        for (var i in tauruses) {
            var taurus = tauruses[i];
            //横の位置
            taurus.position.x -= taurus.xSpeed;
            if (taurus.position.x < -80) { 
                taurus.reset();
            }
            //上下の揺れ幅
            var dy = taurus.ySpeed.amp * Math.sin(taurus.ySpeed.freq * taurus.position.x * Math.PI / 720);
            //div要素に反映
            taurus.element.style.top  = (taurus.position.y + dy) + 'px';
            taurus.element.style.left =  taurus.position.x       + 'px';
        }
    }
    
    var tauruses = init(30);
    setInterval(function() { placeElements(tauruses); }, frameRate);

    $(window).resize(function() {
        background[0].style.height = window.innerHeight + "px";
    });
    setTimeout(function() { $(window).resize(); }, 1);
});
