var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
// s0.initVideo() 
s0.initImage("images/spheres_small.fs.png")

/* use cam() function with parenthesis */
// s3.initCam()
//  let cam = () => src(s3)

let red = () => src(o0).color(1,0,0)
let green = () => src(o0).color(0,1,0)
let blue = () => src(o0).color(0,0,1)

var sine = () => Math.sin(1 / time * 1) + 1;
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

src(s0)
  .modulate(
      grid().invert().scrollX(1, 0.002)
      .add(grid().invert().scrollX(1, 0.001).scrollY(1, 0.001))
      ).sub(o1)
  .layer(src(o1).luma(0.3))
  .layer(src(s0).luma(2))
  .modulate(src(o0).luma(0.3).scrollX(1, 0.2).scrollY(1, 0.2))
  .layer(src(s0).thresh(0.2).luma(0.5).thresh(0.2).mult(s0))
.out(o0);

src(s0).thresh(0.25)
  .mult(osc(10, 0.002, 0).rotate(1.6).modulate(noise(1.4, 0.02)))
  .layer(osc(100, -0.002).luma(0.5).rotate(1.6))
  .mult(src(s0).thresh(0.18).invert().add(src(o2), 0.6))
.out(o1)

solid(1, 0, 1)
  .layer(osc(20, -0.02, 1).rotate(1.2))
.out(o2)

render(o0);

setResolution(1920,1080)

