var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

var a = new Audio({

  })

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
var sine1 = () => 0.05 * Math.sin(time * 0.1) + 0;
var sine1b = () => sine1() * 1;
var sine2 = () => 0.78 * Math.sin(time * 0.5) + 1;
var sine3 = () => 10 * Math.sin(time * 0.5) + 1000;
let random = () => Math.random();

console.log(sine2())

// SCRAMBLE
// Works best within diff()
var scrambleScrYPhase = () => 0.05 * Math.sin(time * 0.1) + 2.5;
var scrambleScrXPhase = () => scrambleScrYPhase() * 3;
var scramblePixOsc = () => 10 * Math.sin(time * 0.5) + 0;
var scrambleScrollYOsc = () => 0.5 * Math.sin(time * 0.1) + scrambleScrYPhase();
var scrambleScrollXOsc = () => 100 * Math.sin(time * 0.5) + scrambleScrXPhase();
let scramble1 = () =>
  src(o1)    // PASS IN CHANNEL FOR FEEDBACK
  .pixelate(scramblePixOsc(), scramblePixOsc())
  .scrollY(scrambleScrollYOsc)
  .scrollX(scrambleScrollXOsc);

// RGB FUZZER MODULATION
// Seperate control for rgb channels
let phase = -0.003
let amp = 0.001
var rgbFuzzerModOsc1 = () => amp * Math.sin(time * 0.5) - phase;
var rgbFuzzerModOsc2 = () => amp * Math.sin(time * 0.5) - phase;
let rgbFuzzerMod = () =>
  src(o1)
  .layer(red().thresh(0.5).luma(0.2).color(1, 0, 0)) // lower thresh() value = bigger color area btw 0.01 and 0.9
  .layer(green().thresh(0.2).luma(0.2).color(0, 1, 0))
  .layer(blue().thresh(0.04).luma(0.2).color(0, 0, 1))
  .modulate(src(o1), rgbFuzzerModOsc2) // source feedback // modulation btw 0.01 and 0.09
  .modulate(scramble1(), rgbFuzzerModOsc1) // source feedback? // modulation btw 0.01 and 0.09
   
var t = () => time;

var speed = 10;

// setInterval(addValue, 500)

console.log(cam())

cam()
.out(o0);

cam()
  .diff(scramble1())
  .modulate(rgbFuzzerMod(), 0.001)
  .diff(rgbFuzzerMod())
  .diff(cam().posterize(8, 1), sine2)
  .diff(cam().posterize(4, 1), 0.02)

.out(o1)

render(o1);

setResolution(1920,1080);
