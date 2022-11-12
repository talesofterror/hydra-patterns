
var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  }); 

  // CanvasRenderingContext2D(2.0, 2.0);

var wave1Size = 100;
var wave1Rotation = 1.5708;
var wave1Shift = 2;

var scale = 0.9;



var pulse1 = () => 0.02 * Math.sin(time / 0.2)
var pulse2 = () => 0.05 * Math.sin(time / 0.2) + 10

var pulse3 = () => 5 * Math.sin(( Math.sin(time * 2)) / 5) + 5
var pulse4 = () => -5 * Math.sin(( Math.sin(time * 2)) / 5) + 5
var pulse5 = () => 0.09 * Math.sin(time / 0.3) + 0.1

var unitSine = () => Math.sin(((Math.PI * 0.7) * 5))

var r = () => src(s0).color(1, 0, 0)
var g = () => src(s0).color(0, 1, 0)
var b = () => src(s0).color(0, 0, 1)
                // .mult(osc(100, 0.01, 0).modulate(noise(10).pixelate(10, 10)))

s0.initImage("assets/primitives-big.png")

solid()
  // .add(r()
  //   // .scrollX(pulse1)
  //   )
  // .add(g()
  //   // .scrollX(pulse2)
  //   )
  .add(g()
    .thresh(0)
    // .invert()
    )
  .add(g()
    .thresh(0)
    // .invert()
    )
.out(o0)

solid()
  .add(r()
    .thresh(pulse1)
    .invert()
    .color(1, 0, 1)
    )
  .add(g())
  .add(b()
    .luma(pulse2)
    ).rotate(0.5, pulse1)
  .mult(src(o2).add(osc(10, 0.5, pulse3).pixelate(50, 50))).kaleid( () => 0.5 * Math.sin(time * 0.1) + 1  ).kaleid(pulse4).rotate(0.5, pulse1)
  .add(src(o0), pulse1)
  .diff(src(o2), pulse1)
  // .add(src(s0), pulse3)
  .sub(src(s0), 0)
  .mult(o0)
  .diff(o2)
.out(o1)

solid()
  // .add(r().thresh(0.5))
  .add(g().thresh(0.5).color(0,0,0))
  .add(b().thresh(0.5))
  .color()
  // .invert()
.out(o2)

render(o1);


setResolution(1080, 1080);
