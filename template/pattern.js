var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
// s0.initVideo() 
// s0.initImage()
// s0.initCam()

let red = () => src(o0).color(1,0,0)
let green = () => src(o0).color(0,1,0)
let blue = () => src(o0).color(0,0,1)

var sine = () => Math.sin(1 / time * 1) + 1;
let random = () => Math.random();

var t = () => time;

var speed = 20;

osc(1, 0, 1)
.out(o0);

render(o0);

setResolution(1920,1080)

