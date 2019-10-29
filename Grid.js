class Grid{

	constructor(size){
		this.s = size;
	}

	draw(){
		for(i = 0; i < 5*height/this.s; i++){
			stroke(50, 50, 200, 20);
			line(-2*width, -2*height+i*this.s, width*3, -2*height+i*this.s);
		}		

		for(i = 0; i < 5*width/this.s; i++){
			stroke(50, 50, 200, 20);
			line(-2*width+i*this.s, -2*height, -2*width+i*this.s, height*3);
		}
	}
}
