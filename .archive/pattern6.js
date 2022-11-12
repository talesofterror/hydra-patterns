
var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  }); 

  // CanvasRenderingContext2D(2.0, 2.0);

var wave1Size = 100;
var wave1Rotation = 1.5708;
var wave1Shift = 1;

var pulse1 = () => 10 * Math.sin(time / 1)
var pulse2 = () => 0.2 * Math.sin(time / 0.5)

var pulse3 = () => 0.2 * Math.sin(time / 0.7) + 0.5
var pulse4 = () => 0.1 * Math.sin(time / 0.5) + 0.3
var pulse5 = () => 0.09 * Math.sin(time / 0.3) + 0.1

s0.initVideo("assets/corngal.mp4")
src(s0)
  .out(o0);

src(o0)
  .diff(
    osc(1, 0, pulse1),
      0.1)
  .diff(o2)
  .modulate(o3, 0.2)
  // .mult(src(o0).posterize(10, 1).invert())
    .out(o1);

shape(3, 0.2, 0.05).scale(1, pulse2, 1).scrollY(0, 0.7)
    .add(
      shape(3, 0.2, 0.05).scale(1, pulse2, 1).scrollY(-0.22, -0.7).rotate(3.1) 
        , 1)
    .modulate(
      osc(10, 0.5, 0)
        .modulate(osc(50, 0.5, 0).rotate(1.5))
    )
    .repeatY(3)
    .scrollX(0.2, 0.5)
    .repeatX([3, 4, 5, 6].fast(10), 2)
    .rotate(pulse2, 0.5)
    .add(
      src(o0)
        .posterize(1.8, 1)
        .invert(10)
    , 0.01)
    .sub(
      noise([0.5, 1.5, 3].fast(10), 0.1)
        .posterize(10, 1)
        .modulate(
          osc(10, 0.5, 0)
          // .pixelate([2, 10, 5], [10, 5, 2])
        )
    , 0.7)
    .out(o2);


shape(100, pulse3, pulse3)
  .diff(
    shape(100, pulse4, pulse4)
  )
  .diff(
    shape(100, pulse5, pulse5)
  )
  .scale(0.3).scrollY(0.8).scrollX(-0.5).repeatY(2).scale(0.7, 1).scrollX(0.9).scrollY(0.7)
  .add(
    shape(4, 0.1, 0.5).scale(1.2, 0.3).posterize(10, 1).shift(0.1, 0.2, 0.3).scrollX(0.8).scrollY(-0.2)
    .add(shape(4, 0.1, 3).scale(0.3, 0.3).scrollX(0.8).scrollY(-0.2)).shift(1.2, 1.3, 1.5)
  )
  .out(o3)

render();

function out1osc1 (size, time, shift){
  return osc(size, time, shift)
  // .thresh()
}

function wave1RotSine() {
  return Math.sin( (time/ 0.7) ) * 0.2;
}