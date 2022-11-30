var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
// s0.initVideo("Monk3_seamless.mp4") 
s0.initVideo("Slime3.loop.mp4") 
// s0.initImage()
// s0.initCam()



var sine = () => (Math.sin(time * 1) + 0.2) * 2;
var sine2 = () => Math.abs(sine() * (Math.sin(time * 0.0001) + 0.02));
var sine3 = () => 0.05 * (Math.sin(time * 0.05) + 0);
var sine3abs = () => Math.abs(0.12 * (Math.sin(time * 0.05) + 0));
var sine4 = () => (Math.sin(time * 20)) * -0.02
var sineabs = () => Math.abs(1 * (Math.sin(time * 0.2) + 0.2));
var sineabs2 = () => Math.abs(0.01 * (Math.sin(time * 0.2) + 0.2));
let random = () => Math.random();

var kVal = () => Math.sin(time / -1 * -1) * 0.5 + 1;
let nkVal = () => -1 * (Math.sin(time / -1 * -1) * 0.5 +1);

var t = () => time;

var speed = 20;

let slimeLuma = src(s0).luma(sine3abs, 0)

osc(60, 0.015, 0)
.out(o0);

osc(60, 0, 0)
.out(o1);

src(o3)
  .layer(slimeLuma)
  .modulate(slimeLuma, 0)
  .add(slimeLuma)
.out(o2)

solid()
  .diff(src(s0), 1)
  .scrollX(sine4, 0)
  // .modulate(src(o2))
  .scale(1.1)
  .luma(0.3, sine3abs)
  // .sub(src(o2).kaleid(0, 0.4).colorama(sine))
  // .modulate(o3)
  // .luma(0.2)
  // .diff(src(s0), 0)
  // .scrollX(sine4, 0)
.out(o3)

render(o2);

setResolution(1920,1080)

