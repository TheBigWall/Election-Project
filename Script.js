var grid;
var player;
var enemy;
var objects = [];
var c;
var paused;

function setup(){

	c = createCanvas(windowWidth, windowHeight);
	c.style('display', 'block');

	paused = false;	

	var objectCount = 1000;
	for(i = 0; i < objectCount; i++){		
		objects.push(new Dot());
	}

	grid = new Grid(40);
	player = new Player(width/2, height/2, 40);
	enemy = new Enemy(0, 0, 40);

	c.touchStarted(player.touchSplit);	
	
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
	if(!player.hasSplit && player.r >= 50){
		if(keyCode == 32){
		player.split();
		}	
	}

	if(keyCode == 80){
		paused = !paused;
	}
		
}

function draw(){

	background(255);

	textSize(30);
	text("Votes: " + String(player.points), 0, height-30);
	text("Enemy Votes: " + String(enemy.points), width - 280, 30);

	translate(width/2 - player.pos.x, height/2 - player.pos.y);
	grid.draw();	
	
	if(!paused){
		enemy.getTarget(objects);
	enemy.update();
	player.update();	
	checkCollide(player, enemy);
	objects.forEach(function(obj){		
		obj.update();		
		obj.draw();
	});
	enemy.draw();
	player.draw();

	}
	else{

		textSize(50);
		text("PAUSE", player.pos.x-100, player.pos.y);
	}
	
}
