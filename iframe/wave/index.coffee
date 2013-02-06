#! coffeescript 
# forked from yuu_hara's "某ゲームの背景に流れる波っぽいやつ" http://jsdo.it/yuu_hara/uCVu
# 波全体の基線
baseline = 100
# 波が上下に動く幅
moveRange = 100
# 波の数
waveNum = 5
# フレームレート
rate = 30
# 振幅の倍率。増やすと大きく波打つ
ampScale = 1.1
# ベースになる波とたくさん描く方の波との振幅の比率。増やすとばらける　
waveRatio = 2
# 位相の周期。360が基準で、減らすと早く波打つ
# ※小さくし過ぎると波打ってる感が出ません
phaseCycle = 360
# 位相の進む単位
phaseDelta = 2 * Math.PI / phaseCycle
# 波
window.waves = []
# 全体の位相
globalPhase = 0

# 波形クラス
class Wave
    constructor: ->
        @amp = Math.random() * 7
        @freq = (Math.random() + 0.5) * 0.01
        @phase = Math.random() * 100
        @offset = Math.random() * 5
    point: (i) ->
        getBaseline() + @offset +  @amp * (Math.sin(@freq * i + @phase + phaseDelta * globalPhase))

# 1分ごとに基線を上下させる
getBaseline = ->
    date = new Date
    baseline - moveRange * Math.abs((date.getSeconds() + date.getMilliseconds() / 1000) - 30) / 30

changeSize = ->
    content = document.getElementById 'content'
    content.offsetHeight = window.innerHeight
    content.offsetWidth = window.innerWidth
    
    wave = document.getElementById 'wave'
    wave.height = window.innerHeight
    wave.width = window.innerWidth
                                     
initialize = ->
    # 基線を揺らすための緩やかな波
    baseWave = new Wave
    # 波を生成しておく（描画はまだ
    w = 0
    while w < waveNum
        waves.push new Wave
        w++
    canvas = document.getElementById 'wave'
    ctx = canvas.getContext '2d'
    # この無名関数の中身を繰り返す
    main = ->
        # 描画領域全体を黄色く塗りつぶす
        ctx.fillStyle = '#fcd800'
        ctx.fillRect 0, 0, canvas.width, canvas.height
        # 上半分を白く塗りつぶす
        ctx.fillStyle = "#fff"
        i = 0
        while i < 2
            wave = waves[i]
            ctx.beginPath()
            ctx.moveTo 0, 0
            j = 0
            while j <= canvas.width
                ctx.lineTo(j, (wave.point(j) * waveRatio + baseWave.point(j)) * ampScale)
                j++
            ctx.lineTo canvas.width, 0
            ctx.lineTo 0, 0
            ctx.closePath()
            ctx.fill()
            i++
         # 波線を描画する
        ctx.fillStyle = "#000"
        ctx.lineWidth = 2
        for wave in  waves
            ctx.beginPath()
            ctx.moveTo(-1, wave.point -1)
            i = 0
            while i <= canvas.width
                ctx.lineTo(i, ((wave.point(i)) * waveRatio + (baseWave.point(i))) * ampScale)
                i++
            ctx.stroke()
            ctx.lineWidth = 1
        # 全体の位相をすすめる
        globalPhase = (globalPhase + 1) % phaseCycle
        # 無名関数を繰り返して実行するタイマー
        # 1000 / rateミリ秒ごとに実行する
        setTimeout(main, 1000 / rate)
    main()
window.onload = ->
    changeSize()
    initialize()
window.onresize = ->
    changeSize()