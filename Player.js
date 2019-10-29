class Player{	

	constructor (x, y, r){
		this.pos = createVector(x, y);
		this.r = r;
		this.hasSplit = false;
		this.c1 = random(255);
		this.c2 = random(255);
		this.c3 = random(255);
		this.mass = PI * this.r * this.r;
		this.speed = 30 * Math.pow(this.mass, -0.2);
		this.parts = [];
		this.points = 0;		
	}


	grow(obj){
		var newMass = this.mass + obj.mass;
		this.r = sqrt(newMass/PI);
	}

	update(){
		this.mass = PI * this.r * this.r;
		this.speed = 30 * Math.pow(this.mass, -0.2);
		var velocity = createVector(mouseX-width/2, mouseY-height/2);
		
		if(this.hasSplit){
			velocity.setMag(this.speed*3);
		}
		else{
			velocity.setMag(this.speed);
		}	
		
		this.pos.add(velocity);
		
		this.parts.forEach(function(part){
			part.mass = PI * part.r * part.r;
		var partV = createVector(player.pos.x, player.pos.y);
			partV.sub(part.pos);					
			partV.setMag(player.speed*0.95);
			part.pos.add(partV);
		});		
	}	

	split(){
		this.mass = this.mass/2;
		this.r = sqrt(this.mass/PI);
		this.hasSplit = true;
		var oldX = player.pos.x;
		var oldY = player.pos.y;

		setTimeout(function(){ player.hasSplit=false; }, 800);

		var part = new Player(oldX, oldY, this.r);
		part.c1 = this.c1;
		part.c2 = this.c2;
		part.c3 = this.c3;

		this.parts.push(part);

	}

	touchSplit(e){

		e.preventDefault();		

			var d = dist(e.touches[0].pageX, e.touches[0].pageY, width/2, height/2);
			if(d <= player.r){
				if(player.r > 50){
					player.split();
				}
				
			}
			
	}

	draw(){
		fill(this.c1, this.c2, this.c3);
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
		this.parts.forEach(function(part){
			fill(part.c1, part.c2, part.c3);
			ellipse(part.pos.x, part.pos.y, part.r*2, part.r*2);
		});
	}
}
