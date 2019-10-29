class Enemy{

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
		this._target = 0;
		this.points = 0;
		this.fused = false;		
	}

	grow(obj){
		var newMass = this.mass + obj.mass;
		this.r = sqrt(newMass/PI);
	}

	getTarget(array){		

		var nearest = 9999;
		
		array.forEach(function(dot){

			var d = dist(enemy.pos.x, enemy.pos.y, dot.pos.x, dot.pos.y);

			if(d < nearest){
				nearest = d;
				enemy._target = dot;
			}

		});

		var d = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y);

		if(d < this.r + 500 && player.r < this.r){
			this._target = player;
		}

		var targetD = dist(this.pos.x, this.pos.y, this._target.pos.x, this._target.pos.y);

		if(this.r/2 > this._target.r && this.r > 50 && !this.fused && targetD < 100){
			this.split();
		}
		
	}

	update(){
		this.mass = PI * this.r * this.r;
		this.speed = 30 * Math.pow(this.mass, -0.2);
		var velocity = createVector(this._target.pos.x, this._target.pos.y);
		velocity.sub(this.pos);
		
		if(this.hasSplit){
			velocity.setMag(this.speed*3);
		}
		else{
			velocity.setMag(this.speed);
		}	
		
		this.pos.add(velocity);
		
		this.parts.forEach(function(part){
			part.mass = PI * part.r * part.r;
		var partV = createVector(enemy.pos.x, enemy.pos.y);
			partV.sub(part.pos);					
			partV.setMag(enemy.speed*0.95);
			part.pos.add(partV);
		});		
	}

	split(){
		this.mass = this.mass/2;
		this.r = sqrt(this.mass/PI);
		this.hasSplit = true;
		var oldX = enemy.pos.x;
		var oldY = enemy.pos.y;

		setTimeout(function(){ enemy.hasSplit=false; }, 800);

		var part = new Enemy(oldX, oldY, this.r);
		part.c1 = this.c1;
		part.c2 = this.c2;
		part.c3 = this.c3; 

		this.parts.push(part);

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
