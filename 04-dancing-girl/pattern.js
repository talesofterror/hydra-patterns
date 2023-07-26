var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
s0.initVideo("dancing-girl.revloop.mp4") 
// s0.initImage()
// s0.initCam()

let red = () => src(o0).color(1,0,0)
let green = () => src(o0).color(0,1,0)
let blue = () => src(o0).color(0,0,1)

var sine = () => 0.5 * Math.sin(time * 0.2) + 00;
var sine2 = () => 0.2 * Math.sin(time * 0.2) + 1;
var sineabs = () => Math.abs(0.25 * Math.sin(time * 0.1) + 0.5)
var sineabs2 = () => Math.abs(0.22 * Math.sin(time * 0.1) + 0.6)
var smallsineabs = () => 0.04 * Math.sin(time * 0.1) + 0.02
var smallsine = () => 0.01 * Math.sin(time * 0.1) + 0.02
let random = () => Math.random();

var t = () => time;

var speed = 20;
let portalSides = 100;
let portalScale = 3.2;

src(s0).thresh(0.5).color(0.5, 0.6, 0.6)
  .layer(src(s0)
    // .invert()
    .luma(0.8)
    .color(0.3, 1, 1)
  )
  .layer(src(s0).thresh(0.2)
    // .invert()
    .luma(0.6)
    .color(sine, sine, sineabs)
    .mult(osc(10, 0.02, 2))
  )
  .modulate(src(o0).thresh(0.1), smallsineabs)
  .modulate(src(o0))
  .diff(src(o1))
  .layer(shape(portalSides, 0.2).scale(portalScale, 0.84, 1)
    .invert()
    .luma(0.8)
    .invert() 
    .modulate(noise(10, 0.01))
  )
.out(o0);

src(s0).thresh(0.5).color(0.5, 0.6, 0.6)
  .layer(src(s0)
    .invert()
    .luma(0.4)
    .color(0.3, 1, 1)
  )
  .layer(src(s0).thresh(0.07)
    .invert()
    .luma(0.6)
    .color(sine, sine, sineabs)
  )
  .diff(osc(10, 0.02, 1), sine2)
  .layer(shape(portalSides, 0.2).scale(portalScale - 0.3, 0.84, 1)
    .invert()
    .luma(0.8)
    .modulate(noise(10, 0.01))
  ).invert(sine2)
.out(o1);

render(o0);

setResolution(1920,1080)

