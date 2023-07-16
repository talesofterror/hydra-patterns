var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
// s0.initVideo() 
s0.initImage("images/cityscape.50percent.fs_16color.png")
s1.initImage("images/radiation.top.red.25percent.fs_8color.png")
s2.initImage("images/radiation.top.yellow.25percent.fs_8color.png")

/* use cam() function with parenthesis */
// s3.initCam()
//  let cam = () => src(s3)

let red = (source) => src(source).color(1,0,0)
let green = (source) => src(source).color(0,1,0)
let blue = (source) => src(source).color(0,0,1)


let sineSpeed = 0.016
let sineSpeedD10 = sineSpeed / 10
let sineSpeedM10 = sineSpeed * 10
let hopSpeed = 1000
var sine = () => 1 * Math.sin(time * sineSpeed) + 1;
var sineAbs = () => Math.abs(1 * Math.sin(time * sineSpeed) + 1);
var sineAbs2 = () => Math.abs(1 * Math.sin(time * -sineSpeed) + 1);
var sineAbsD10 = () => Math.abs(1 * Math.sin(time * sineSpeedD10) + 1);
var sineAbsM10 = () => Math.abs(1 * Math.sin(time * sineSpeedM10) + 0);
var sineAbsHop = () => Math.abs(0.3 * Math.sin(time * hopSpeed) - 0.2);
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
  src(o0)
  .layer(red(s0).thresh(0.1).luma(0.2).color(1, 0, 0)) // lower thresh() value = bigger color area btw 0.01 and 0.9
  .layer(green(s0).thresh(0.2).luma(0.2).color(0, 1, 0))
  .layer(blue(s0).thresh(0.04).luma(0.2).color(0, 0, 1))
  .modulate(src(o0), 0.04) // source feedback // modulation btw 0.01 and 0.09
  .modulate(scramble1(), 0.01) // source feedback? // modulation btw 0.01 and 0.09

let frosting = () => 
  src(s0)
  .diff(src(s1).scale(0.2))
  .diff(s2)
  .sub(src(o0).thresh(0.4))
  .modulate(src(s0), sineAbs)
  .diff(src(s0), sineAbs)

let shapeRadiation = () => 
  osc(500, -0.002, 0)
  .kaleid(2)
  .add(shape(8, 0.2, 0.5))
  .diff(shape(6, 0.3, 0.5))
  .scroll(0, 0.14)
  .pixelate(100, 100)

let candyRotation = 0
// let candyRotation = sineAbsM10()
let candy = () => 
  src(s0)
  .diff(s1)
  .mult(s2)
  .layer(src(s0).luma(sineAbs, 1.2)
  )
  .diff(osc(50, -0.0, sineAbs).rotate(candyRotation)
  .modulate(osc(5, 0.02, 0).rotate(0))
  .kaleid(100)
  .scroll(0, 0.14)
  .modulate(shapeRadiation(), 0.02)
  )  

let cityThresh = () => 
  src(s0)
  .thresh(0.45)  

let candyBlue = () => 
  cityThresh()
  .add(candy())
  .sub(frosting())
  .add(s0, sineAbs)
  .add(o0, sineAbs2)
  // .mult(src(s0).invert(), sineAbsD10)
  .sub(src(o0))

// osc(1, 0, 1).diff((grid()))
candyBlue()
  .mult(osc(1500, 0.02, sineAbs).rotate(1.6), sineAbsHop)
.out(o0)

candyBlue()
  .invert()
.out(o1)

src(o0)
  .mult(cityThresh().invert())
  .add(s0)
  .mult(s1)
  .add(s2)
  // .sub(green(o3), 1)
  .sub(frosting())
.out(o2)

shapeRadiation()
  .sub(blue(o3), 1)
  .sub(green(o3), 1)
  .layer(red(s0).luma(0.02, 0.02), 0.5)
.out(o3)

render(o2);

setResolution(1920,1080)

