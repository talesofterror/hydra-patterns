var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
s0.initVideo("Monk3_seamless.mp4") 
// s0.initVideo("Slime3.loop.mp4") 
// s0.initImage()
// s0.initCam()

let red = () => src(s0).color(1,0,0)
let green = () => src(s0).color(0,1,0)
let blue = () => src(s0).color(0,0,1)

var sine = () => 0.02 * (Math.sin(time * .05) + 0);
var sine2 = () => 1 * (Math.sin(time * .05) + 0);
var sineAbs = () => Math.abs(1 * (Math.sin(time * 0.07) + Math.random()))
var sine2Abs = () => Math.abs(1 * (Math.sin(time * .05) + 0));
var sinePixelAbs = () => Math.abs(10 * (Math.sin(time * .05) + 0));
var sineColorama = () => Math.abs(0.5 * (Math.sin(time * .5) + 0));
let random = (time) => Math.random(time);

var kVal = () => Math.sin(time / -1 * -1) * 0.5 + 1;
let nkVal = () => -1 * (Math.sin(time / -1 * -1) * 0.5 +1);

var t = () => time;

var speed = 20;

let slimeLuma = src(s0).luma(sineAbs, 0)

src(s0)
  // .invert()
  .sub(red())
  .sub(blue())
  .diff(src(o1))
  .modulate(src(o1), sine)
  .diff(src(o2))
  .modulate(o3, sineAbs)
  .diff(o3, sine2Abs)
  .modulate(src(o3), sineAbs)
  .mult(src(o1).invert().sub(green()), sine2)
.out(o0);

src(s0)
  .add(blue(), sineAbs)
  .luma(0.4)
.out(o1);

src(s0)
  .invert()
  .thresh(0.9)
  // .invert()
  .luma(0.5)
  .color(0.5, sineAbs, sineAbs)
.out(o2)

src(s0)
  .invert()
  .sub(blue())
  .sub(green())
  .thresh(0.6)
  .invert()
  .mult(osc(500, 0.2, 1.5)
    .modulate(noise(3, 0.1), 1)
    .rotate(0.2, 0.1)
    )
  .color(0, 1, 0)
  .luma(0.4, 0.2)
.out(o3)

render();

setResolution(1920,1080)

