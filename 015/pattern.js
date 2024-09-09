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

let red = (source) => src(source).color(1,0,0)
let green = (source) => src(source).color(0,1,0)
let blue = (source) => src(source).color(0,0,1)

var sine = () => -Math.abs(1.1 * Math.sin(time * -0.2)+2)
let random = () => Math.random();

var t = () => time;

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

  let camGreenThresh = () => green(s3).thresh(0.20).add(solid(0, 1, 0))
  let camGreenThresh_Invert = () => green(s3).thresh(0.1).invert()
  let camBlueThresh_Invert = () => blue(s3).invert().thresh(0.9999).mult(solid(0,0,1))

cam()
// .diff(o1, 0.02)
// .add(o1, () => 1 * Math.sin(time * 0.2))
// .add(o1, -0.7) <-- good
.mult(o1, sine)
// .layer(o1, 1)
// .colorama(0, 0.02)
.out(o0);

red(s3)
.add(camGreenThresh_Invert().scrollX(0.005))
.mult(camGreenThresh().scrollY(0.005))
// .layer(camBlueThresh_Invert())
.diff(camBlueThresh_Invert(), () => -Math.abs(20 * Math.sin(time * 1.5 )))
.invert()
.out(o1);

solid(0,0,0)
.out(o2);

solid(0,0,0)
.out(o3);

render(o0);

setResolution(1920,1080)

