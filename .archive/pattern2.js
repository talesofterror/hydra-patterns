
// JUST RAINBOW
//
// var sine = () => Math.sin(time * 2 * 0.3) + 2;
// var kVal = () => Math.sin(time / 0.4 * 1) * 50 + 5;
//
// var t = () => time;
// var swaySpeed = 1;
// var swayIntensity = 5;
// var stripeSize = 6; //inverse
// var wiggleSync = 10;
// var colorShift = 5;
//
// osc(swayIntensity, swaySpeed1, colorShift).pixelate(stripeSize, stripeSize)
//     .modulate(osc(swayIntensity, swaySpeed1, colorShift)
//         .rotate(wiggleSync, 0)
//     )
//     // .scale(0.5, 0.5, 1)

// FOUR SCREENS
//
// osc(swayIntensity, swaySpeed, colorShift).pixelate(stripeSize, stripeSize)
//     .modulate(osc(swayIntensity, swaySpeed, colorShift)
//         .rotate(wiggleSync, 0)
//     .scrollX(0)
// ).out(o0)

// shape(6, 0.5, 0.01)
//     .sub(o0)
//     .scale(0.7, 0.5, 1)
// .out(o1)

// src(o0).scrollX(xShift)
// .out(o2)

// shape(6, 0.5, 0.01).sub(o0).scale(0.7, 0.5, 1)
// .out(o3)

// render();


var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });
  

var sine = () => Math.sin(time * 2 * 0.3) + 2;
var kVal = () => Math.sin(time / 0.4 * 1) * 50 + 5;

var t = () => time;
var swaySpeed = 1;
var swayIntensity = 5;
var stripeSizeX = 20; //inverse
var stripeSizeY = 1; //inverse
var wiggleSync = 500;
var colorShift = 4;
var colorShift2 = colorShift + 0.824;
var modColorShift = colorShift + 0;
// var xShift = 3;



osc(swayIntensity, swaySpeed, colorShift).pixelate(stripeSizeX, stripeSizeY)
    .modulate(osc(swayIntensity, swaySpeed, modColorShift)
        .rotate(wiggleSync, 0)
    .scrollX(0)
).out(o0)

s0.initImage("assets/snack1/bg1.png");
// s1.initImage("assets/snack1/boxlines.png")
    src(o0)
        .mult(shape(6, 0.5, 0.01))
        .modulate(o2)
        .scale(0.7, 0.5, 1)
.out(o1)

// shape(6, 0.5, 0.01)
//     .modulate(o2)
//     .scale(0.7, 0.5, 1)
// .out(o1)

osc(swayIntensity, swaySpeed, colorShift).pixelate(stripeSizeX, stripeSizeY)
    .modulate(osc(swayIntensity, swaySpeed, colorShift2)
        .rotate(wiggleSync, 0)
    ).rotate(() => Math.sin((time / 0.5) * 0.5) - 3)
    .posterize(1.4, 10)
    // .diff(osc(2.5, -1, 2.5)).pixelate(15, 10)
.out(o3)

shape(6, 0.5, 0.01)
    .mult(o3)
        // .scale(0.7, 0.5, 1)
        .repeatX(2)
        .scale(1.0, 1.0, 1)
        .scrollY(0, 2)
        .kaleid(5)
.out(o2)

render();



// osc(40, 0).out(o0)
// osc(40, 0).out(o1)
// src(o0).thresh().out(o2)
// src(o0).thresh().out(o3)
// render()




