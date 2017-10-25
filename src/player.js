let opAudio = null

function start() {

    canvasSize = 100

    let ctx = view.getContext('2d')
    ctx.fillStyle = "hsla(200, 60%, 80%,0.33)"

   opAudio = new Audio('Op_100_No_10_Tender_Flower.mp3')

    let play = true;

    opAudio.addEventListener('ended', function () {
        play = false
    })


    //opAudio.autoplay = true
    let audioContext = new AudioContext()
    let source = audioContext.createMediaElementSource(opAudio)
    source.connect(audioContext.destination)

    let analyser = audioContext.createAnalyser()
    source.connect(analyser)
    analyser.fftsize = 1024

    let U = 1
    let Y = 1
    function renderFrame() {
        requestAnimationFrame(renderFrame)
        let frequencyData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(frequencyData)

        view.width+=0
       /* a = -frequencyData.reduce(function(sum,i,index) {return sum+(index < 256 ? i : 0)}) / 8000
        b = frequencyData.reduce(function(sum,i,index) {return sum+(index > 256 && index < 512  ? i : 0)}) / 90
        c = frequencyData.reduce(function(sum,i,index) {return sum+(index > 512 && index < 768 ? i : 0)}) / 40

        */
        a = -1.8, b = -2.0
            c = frequencyData.reduce(function(sum,i,index) {return sum+(index < 128 ? i : 0)}) / 10000 - 1
            d = -0.9
        total = frequencyData.reduce(function(sum,i) {return sum+i}) / 8
        for(let i = 0; i < total+100;i ++) {

            addPoint(a,b,c,d)
        }

    }
    if(play)
        renderFrame()

    function addPoint(a, b, c, d) {
        x=(canvasSize/2)+(canvasSize/6)*(X=Math.sin(a*Y)+c*Math.cos(a*U))
        y=(canvasSize/2)+(canvasSize/6)*(Y=Math.sin(b*U)+d*Math.cos(b*Y))
        ctx.beginPath()
        ctx.arc(x,y,0.5,0,Math.PI*2)
        ctx.fill()
        U=X
    }

}

function pause() {
    opAudio.pause()
}

function play() {
    opAudio.play()
}
