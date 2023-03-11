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

var sine1 = () => Math.abs(-0.01 * Math.sin(time * 0.5) + 0);
var sine2 = () => Math.abs(0.1 * Math.sin(time * 0.5) + -1.57);
var sine3 = () => Math.abs(1.0 * Math.sin(time * 1) + 1.5);
var sine4 = () => 0.3 * Math.sin(time * 0.2) + 0.5;

let random = () => Math.random();

var t = () => time;

let speed = 20
let gridSize = 250
let gridTime = -0.1 
let threshVal = 0.010

osc(gridSize, gridTime, 0).thresh(threshVal - 0.005).rotate(sine1)
  .mult(osc(gridSize-150, gridTime, 0).thresh(threshVal).rotate(sine2))
  .modulate(osc(5, 0.2, 0))
.layer(osc(gridSize, gridTime, 0).luma(0.04).rotate(sine1)
  .mult(osc(gridSize-150, gridTime, 0).luma(0.04).rotate(sine2)
  ).modulate(osc(5, 0.2, 0))
  .colorama(sine4)
)
// .layer(src(o1).color(sine1, 1, sine4), 1)
// .kaleid([3, 10, 2, 5].fast(1))
//.diff(src(o1)).sub(src(o1), 0.3)
.out(o0);

osc(gridSize, gridTime, 0).luma(0.04).rotate(sine1)

  // .kaleid([3, 10, 2, 5].fast(sine3))
.out(o1);

render(o0);

setResolution(2560,1440)

