// MORSHU

var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  }) 

//   var parent = document.parent;

//   parent.innerWidth = hydra.canvas.offsetHeight;
//   parent.innerHeight = hydra.canvas.offsetHeight;


//   fitToContainer(hydra.canvas);

//   function fitToContainer(c){
//     // Make it visually fill the positioned parent
//     c.style.width ='100%';
//     c.style.height='100%';
//     // ...then set the internal size to match
//     c.width  = canvas.offsetWidth;
//     c.height = canvas.offsetHeight;
//   }

//   s0.initImage("assets/MORSHU.png");

//   src(s0).out();

s0.initImage("assets/MORSHU.png");
src(s0)
	.modulate(osc(0.6, 0.5, 0)
		.diff(osc(1, 0.6, 0)
			.rotate(0))).modulate(noise(1)).posterize(5, 2)
	.diff(src(s0)
		.diff(osc(0.6, 1, 2))
		.posterize(5, 10))
.diff(src(s0)
		.modulate(noise(0.6, 0.5, 1))
		.posterize(2, 2))
	.out();