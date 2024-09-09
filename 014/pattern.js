var hydra = new Hydra({
  canvas: document.getElementById("myCanvas"),
  detectAudio: false
});

// s0.initScreen()
s0.initVideo("flowers.mp4")
// s0.initImage()

/* use cam() function with parenthesis */
// s3.initCam()
//  let cam = () => src(s3)

let red = () => src(o0).color(1, 0, 0)
let green = () => src(o0).color(0, 1, 0)
let blue = () => src(o0).color(0, 0, 1)

var sine = () => 1.2 * Math.sin(1 / time * 1) + 2;
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
    .mult(osc(gridSize - 150, gridTime, 0).thresh(threshVal).rotate(1.571)) // 
// .modulate(osc(5, gridTime, 0))

let modGrid = () =>
  osc(gridSize, gridTime, 0).luma(0.04).rotate(gridOsc1)
    .mult(osc(gridSize - 150, gridTime, 0).luma(0.04).rotate(gridOsc2).color(1, 0, -1))
    .modulate(osc(5, gridTime, 0))
    .colorama(5)
    .color(1.5, 0.2, sine1)

// SCRAMBLE
// Works best within diff()
var scramblePixOsc = () => 1 * Math.sin(time * 0.5) + 1;
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

let flowers = () =>
  src(s0)
    .scale(1.4)

let scanlines = () =>
  (osc(1200, 0.01, 5).colorama(10).rotate(1.6))

let frameShape = () =>
  shape(4, 0.869, 0.001).scale(1, 0.734, 1.44)
    .modulate(osc(10, 0.02, 1).rotate(1.6))


let frameWave1 = () =>
  shape(4, 0.869, 0.001).scale(1, 1.94, 1.44)
    .modulate(osc(10, 0.02, 1).rotate(1.6))

let frameCut1 = () =>
  shape(4, 0.869, 0.001).scale(1, 0.794, 1.44)
    .modulate(osc(10, 0.02, 1).rotate(1.6))

let frameWave2 = () =>
  shape(4, 0.869, 0.001).scale(1, 0.634, 1.44)
    .modulate(osc(10, 0.02, 1).rotate(1.6))

let frameCut2 = () =>
  shape(4, 0.869, 0.001).scale(1, 0.894, 1.44)
    .modulate(osc(10, 0.02, 1).rotate(1.6))

let mainWave = () =>
  osc(10, 0.02, 10)
    .modulate(
      osc(10, 0.02, 5).rotate(1.6)
    ).rotate(1.6)

//original o2
let flowerThresh = () =>
  flowers().thresh(0.2)
    .mult(
      osc(6, 0.02, 0.3).rotate(1.6)
        .modulate(
          noise(10, 0.05)
        )
    )

let bgThresh = () =>
  flowers().invert().thresh(0.6)
    .mult(mainWave())
    .mult(frameShape())
// 

let outerWave = () =>
  mainWave().rotate(3.14)
    .mult(frameShape().invert())

flowers()
  .mult(scanlines())
  .modulate(o2, sine)
  .diff(mainWave())
  .diff(flowerThresh())
  .mult(frameShape())
  .diff(bgThresh(), 0.2)
  .add(outerWave(), 0.5)
  .mult(frameWave2())
  .add(o3)
  .out(o0);

frameWave2()
.repeatX(2)
.invert()
.add(o2)
.add(mainWave())
.scale(1, 1, 1)
// .luma(0.01, 0.1)
// .layer(solid(0.5, 0.1, 1))
.sub(osc(10, 0.02, 1).scrollY(1.2))
  // .add(frameShape())
  .out(o1)

shape(6, 0.05, 0.01)
  .add(shape(2, 0.05, 0.01))
  .scale(1, 5, 9)
  .repeatX(10)
  .repeatY(10, 20)
  .scrollX(0.5, -0.001)
  .scrollY(0.5, 0.01)
  .rotate(0.5)
  .modulate(osc(100, 0.02, 0))
  .modulate(noise(1, 0.02))
  // .invert()
  // .kaleid(5).rotate(0.01, 0.05)
  .scale(2)
  .out(o2)

solid(1, 1, 1)
  // .modulate(osc(10, 0.02, 5).rotate(1.6)).rotate(1.6)
  .sub(frameShape())
  .sub(o2)
  // .mult(scramble1())
  .out(o3)

render(o0);

setResolution(1920, 1080)

