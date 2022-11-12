
var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  }); 

  // CanvasRenderingContext2D(2.0, 2.0);

var wave1Size = 100;
var wave1Rotation = 1.5708;
var wave1Shift = 1;

var pulse1 = () => 1 * Math.sin(time / 0.2) + 20
var pulse2 = () => 0.2 * Math.sin(time / 0.5)

var pulse3 = () => 1 * Math.sin(time / 0.7) + 500
var pulse4 = () => 0.1 * Math.sin(time / 0.5) + 0.3
var pulse5 = () => 0.09 * Math.sin(time / 0.3) + 0.1

var r = () => src(o2).color(1, 0, 0)
var g = () => src(o2).color(0, 1, 0)
var b = () => src(o2).color(0, 0, 1)
                // .mult(osc(100, 0.01, 0).modulate(noise(10).pixelate(10, 10)))

s0.initVideo("assets/tsukiko.mp4")
src(s0)
  .out(o0);

src(o0)
  // .diff(r().mult(b(), pulse1))
  .posterize( pulse1 , 0.3).shift(pulse2, pulse3, 0.5).luma(0.6, 0.15)  
  // .add(solid().r())
  .out(o2);

solid().add(r()).add(g().scrollX(0.5)).add(b())
  // .diff(r().mult(b(), pulse1))
  .sub(solid(o0).modulate(osc(100, 1, 1)))
  .out(o3)

render(o3);




function out1osc1 (size, time, shift){
  return osc(size, time, shift)
}

function wave1RotSine() {
  return Math.sin( (time/ 0.7) ) * 0.2;
}