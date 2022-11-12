var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  }) 

s0.initImage("assets/videodrome-body-die.jpeg");
    
    src(s0)
	    .posterize(1.808, () => Math.sin(time / 0.1 * 10))
	    .add(osc(500, 0.2, 2)
		    .diff(shape(100, 1.5, 0.5))
		    .rotate(2)
		    .pixelate(200, 200)
		    .rotate(2))
	    .mult(s0)
	    .pixelate(500, 500)
	    .out();