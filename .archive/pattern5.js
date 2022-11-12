
var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  }); 

  // CanvasRenderingContext2D(2.0, 2.0);

var wave1Size = 100;
var wave1Rotation = 1.5708;
var wave1Shift = 1;

s0.initImage("assets/videodrome-body-die.jpeg")
src(s0) 
  .posterize(100, 4.5)
  .modulate(osc(1, 5, 0)
    , 0.02)
  .out(o0);


out1osc1(wave1Size, 0.1, wave1Shift)
  .rotate( ({time}) =>  wave1RotSine()  
    + wave1Rotation, 0)
  .add(
    out1osc1(wave1Size/5, -0.1, wave1Shift)
      .rotate(wave1Rotation, 0)
    .modulate(
      osc(40, 0, 0)
        .thresh(0.5)
        .rotate(wave1Rotation - 0.2, 0)  
     , 0.035 )
  )
  .posterize(5, 1)
  .color(1, 1, 0.8)
.out(o1);
    
noise(0.5, 0.5)
  // .mult(
  //   shape(4, 0.5, 0)
  //   .scrollY(0.5, 1)
  // )
  .thresh(0.001)
.out(o2);


src(o0)
  .mult(o1)
  .modulate(o1, 0.01)
  // .posterize(10, 10)
  // .modulate(o2, 0.009)
  .modulate(
    osc(0, 0.2, 0)
      .rotate(wave1Rotation - 0.2)
    .thresh(0.01)
  , 0.0065
  )
  .out(o3)

render(o3);

function out1osc1 (size, time, shift){
  return osc(size, time, shift)
  // .thresh()
}

function wave1RotSine() {
  return Math.sin( (time/ 0.7) ) * 0.2;
}