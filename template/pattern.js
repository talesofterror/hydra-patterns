var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
// s0.initVideo() 
// s0.initImage()
// s0.initCam()

var sine = () => Math.sin(1 / time * 1) + 1;
let random = () => Math.random();

var kVal = () => Math.sin(time / -1 * -1) * 0.5 + 1;
let nkVal = () => -1 * (Math.sin(time / -1 * -1) * 0.5 +1);

var t = () => time;

var speed = 20;

osc(1, 0, 1)
.out(o0);

render(o0);

setResolution(1920,1080)

