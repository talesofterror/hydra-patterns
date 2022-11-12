
var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });


s0.initVideo("assets/mario-nutting-clipped2.mp4");

src(s0).posterize(50, 4.5).out(o0)

src(o0)
  .thresh(0.1)
  .invert()
  .out(o2)

osc(12, 1, 2).pixelate(10, 10)
  .modulate(o0)
  .diff(o0)
  .modulate(s0, () => Math.sin(time/0.5) * 0.5)
  .sub(o2)
  .mult(o3, 1.5)
  .add(o2, 1).invert().luma(0.2, 0.01)
  .mult(o0, 0.5)
  .out(o1)

  shape(5, 0.005, 0.6)
    .scrollX(0.2).scrollY(0.2)
    .kaleid(10)
    .thresh(0.3)
    .rotate(1, 1).invert()
    // .sub(osc(50, 0.2, 5).thresh(0.6).rotate(0.9))
    // .add(osc(50, 0.1).thresh(0.6).rotate(0.3))
      .mult(o2).invert()
    
      

    .modulate( shape(5, 0.005, 0.5)
      .scroll(0.2, 0.2)
      // .thresh(1)
      .kaleid(2).rotate(1, 1.5).color(1, 1, 1)    )
    // .diff( shape(5, 0.005, 0.5)
    // .scroll(0.2, 0.2)
    // // .thresh(1)
    // .kaleid(1).rotate(1, 2).color(1, 1, 1)    )
    // .diff(osc(1).rotate(1, 1) )
  // .invert()
  .out(o3)

 render()