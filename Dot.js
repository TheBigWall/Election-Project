class Dot{	

	constructor(){
		this.pos = createVector(random(-2*width, width*3), random(-2*height, height*3));
		this.r = parseInt(random(8, 12));
		this.c1 = random(255);
		this.c2	= random(255);
		this.c3	= random(255);
		this.mass = PI * this.r * this.r;
		this.seekit = false;
	}

	jitter(){
		this.pos.x += random(-0.6, 0.6);
		this.pos.y += random(-0.6, 0.6);
	}

	update(){
		this.jitter();
	}

	draw(){
		fill(this.c1, this.c2, this.c3);
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}

}
