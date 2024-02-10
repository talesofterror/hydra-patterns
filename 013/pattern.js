var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
s0.initVideo("womans.face.2color.mp4") 
s1.initVideo("womans.face2.2color.mp4") 
// s0.initImage()

/* use cam() function with parenthesis */
// s3.initCam()
//  let cam = () => src(s3)

let red = (source) => src(source).color(1,0,0)
let green = (source) => src(source).color(0,1,0)
let blue = (source) => src(source).color(0,0,1)

let randNum = () => Math.random() * 2
let randNum2 = () => Math.random() * 20

var sine = () => 0.01 * Math.sin(time * 0.1) + 0.02;
var sine2 = () => Math.abs(0.9 * Math.sin(time * 0.02) + 0.02)
var sine3 = () => Math.abs(0.2 * Math.sin(time * 0.2) + 1.5)

var speed = 20;

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

// osc(1, 0, 1).layer(grid()).out(o0);

let darkenedGirl = () => 
  src(s1).mult(s1).thresh(0.1)

let noise1 = () => 
  noise(800, 0.01)
  // .thresh(0.01)
  // .scrollX(0.01, 0.005)

src(s0).thresh(0.2)
  .modulate(o1, sine2)
.out(o0)

noise1()

.out(o1)

render();

setResolution(1920,1080)

