var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
// s0.initVideo() 
// s0.initImage()

/* use cam() function with parenthesis */
s3.initCam()
 let cam = () => src(s3)

let red = () => cam().color(1,0,0)
let green = () => cam().color(0,1,0)
let blue = () => cam().color(0,0,1)

var sine = () => Math.sin(time * .1) + 0
var sine2 = () => Math.sin(time * .08) + 1.3
var sineNeg = () => Math.sin(time * -.1) + 0
var sineAbs = () => Math.abs(sine())
var sineAbsNeg = () => Math.abs(-sine())
let random = () => Math.random();

var t = () => time;

var speed = 20;

let layerValue = () => 0
let toggle = () => true;
document.addEventListener("click", () => {
  if (toggle) {
    layerValue = () => 1
  } else {layerValue = () => 0}
  toggle = !toggle
  console.log(toggle)
})

// GRID
let gridSize = 400 // 120 through 160 are weird. 150 is null // below 100 needs height adjustment
let gridTime = 0.0 
let threshVal = 0.010
let gridOsc1 = () => Math.abs(-0.01 * Math.sin(time * 0.5) + 0);
let gridOsc2 = () => Math.abs(0.1 * Math.sin(time * 0.5) + -1.57);
let grid = () => 
  osc(gridSize, gridTime, 0).thresh(threshVal - 0.005).rotate(0)
    .mult(osc(gridSize-150, gridTime, 0).thresh(threshVal).rotate(1.571)) // 
    // .modulate(osc(5, gridTime, 0))

let modGrid = () => 
  osc(gridSize, gridTime, 0).luma(0.04).rotate(gridOsc1)
  .mult(osc(gridSize-150, gridTime, 0).luma(0.04).rotate(gridOsc2).color(1, 0, -1))
    .modulate(osc(5, gridTime, 0))
    .colorama(5)
    .color(1.5, 0.2, sine1)

// SCRAMBLE
// Works best within diff()
var scramblePixOsc = () => 10 * Math.sin(time * 0.5) + 1000;
var scrambleScrollYOsc = () => 0.05 * Math.sin(time * 0.1) + 1;
var scrambleScrollXOsc = () => 10 * Math.sin(time * 0.5) + 1000;
let scramble1 = () =>
  src(o1)    // PASS IN CHANNEL FOR FEEDBACK
  .pixelate(scramblePixOsc(), scramblePixOsc())
  .scrollY(scrambleScrollYOsc)
  .scrollX(scrambleScrollXOsc)

// RGB FUZZER MODULATION
// Seperate control for rgb channels
let rgbFuzzerMod = () =>
  src(o1)
  .layer(red().thresh(0.1).luma(0.2).color(1, 0, 0)) // lower thresh() value = bigger color area btw 0.01 and 0.9
  .layer(green().thresh(0.2).luma(0.2).color(0, 1, 0))
  .layer(blue().thresh(0.04).luma(0.2).color(0, 0, 1))
  .modulate(src(o1), 0.04) // source feedback // modulation btw 0.01 and 0.09
  .modulate(scramble1(), 0.01) // source feedback? // modulation btw 0.01 and 0.09

cam()
.add(red(), sine)
.add(green(), sineNeg)
.add(green(), sineAbsNeg)
.thresh(0.1)
// .diff(o1, sine2)
.diff(o1, sine)
.diff(o1, layerValue)
.layer(cam().luma(sine2))
.layer(o1)
.out(o0);

cam()
.sub(green(), 0.7)
.sub(blue(), 0.9)
.add(red())
.thresh(0.01)
.sub(blue())
.sub(green())
.invert()
.out(o1)

render(o0);

setResolution(1920,1080)

