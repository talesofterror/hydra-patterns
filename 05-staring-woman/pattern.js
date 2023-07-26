var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
s0.initVideo("staring-woman.clipped.rev.loop.mp4") 
// s0.initImage()
// s0.initCam()

let red = () => src(o0).color(1,0,0)
let green = () => src(o0).color(0,1,0)
let blue = () => src(o0).color(0,0,1)

var sine = () => 0.02 * Math.sin(time * 0.1) + 0;
var sine2 = () => 0.5 * Math.sin(time * 0.05) + 0;
var sine3 = () => 0.5 * Math.sin(time * 0.02) + 0;
let random = () => Math.random();

var t = () => time;

var speed = 20;

let layer = src(s0).invert().luma(0.2, 0.2).color(0.5, 1, 1)
            .diff(osc(10, -0.004, 0.5))
        

solid()
    
  .layer(src(s0).invert().luma(0.2, 0.2).color(0.5, 1, 1)
    .diff(osc(10, -0.004, 0.5))
    .modulate(osc(1, 0.02, 1), -0.02))
  .layer(src(s0).invert().luma(0.4).color(1, 0.5, 1)
    .diff(osc(2, -0.04, 1))
    .modulate(osc(1, 0.04, 1), 0.023))  
  .layer(src(s0).invert().luma(0.76, 0.2).color(0.2, 1, 0.5)
    .modulate(osc(2, -0.04, 1), 0.023))

  .layer(shape(4, 1).invert().luma(0.4).color(sine3, sine2, 1).colorama(20)
    .scale(1.8, 0.82, 1.08)
    .modulate(osc(2, 0.04, 0), 0.015))
  
  .scale(0.6)
  
  .modulate(osc(10, -0.01, 0), 0.03)
  // .invert()
  .add(layer.colorama(10.03), 0.3)
  .modulate(layer, sine)
  .scale(1)
  
  
.out(o0);

render(o0);

setResolution(1920,1080)

