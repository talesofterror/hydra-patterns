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

let red = () => src(o0).color(1,0,0)
let green = () => src(o0).color(0,1,0)
let blue = () => src(o0).color(0,0,1)

var sine = () => Math.sin(time * 0.2) + 1;
var sine1 = () => 0.05 * Math.sin(time * 0.1) + value;
var sine1b = () => sine1() * -1;
var sine2 = () => Math.sin(time * 0.5) + 1;
var sine3 = () => 10 * Math.sin(time * 0.5) + 1000;
let random = () => Math.random();

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
   
var t = () => time;

var speed = 20;

// setInterval(addValue, 500)

cam()
.out(o0);

cam()
.diff(scramble1())
.modulate(rgbFuzzerMod(), 0.2)
.diff(rgbFuzzerMod())
// .layer(red().thresh(0.02).luma(0.2).color(1, 0, 0)) // lower thresh() value = bigger color area btw 0.01 and 0.09
// .layer(green().thresh(0.09).luma(0.2).color(0, 1, 0))
// .layer(blue().thresh(0.06).luma(0.2).color(0, 0, 1))
// .modulate(src(o1), 0.04)

.out(o1)

render(o1);

setResolution(1920,1080)

