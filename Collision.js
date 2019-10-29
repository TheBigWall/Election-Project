checkCollide = function(player, enemy){	

	var dPlayerEnemy = dist(player.pos.x, player.pos.y, enemy.pos.x, enemy.pos.y);
	if(dPlayerEnemy < player.r + enemy.r){

			if(enemy.r > player.r){
				player.pos.x = width/2;
				player.pos.y = height/2;
				player.r = 40;				
				player.parts = [];
				enemy.points += 100;
				enemy.grow(player);
			}
			if(player.r > enemy.r){
				enemy.pos.x = 0;
				enemy.pos.y = 0;
				enemy.parts = [];
				enemy.r = 40;
				player.points += 100;
				player.grow(enemy);
			}

		}

	objects.forEach(function(obj){
		var d = dist(player.pos.x, player.pos.y, obj.pos.x, obj.pos.y);
		var dEnemy = dist(enemy.pos.x, enemy.pos.y, obj.pos.x, obj.pos.y);				

		if(d < player.r + obj.r){
			obj.pos = createVector(random(-2*width, width*3), random(-2*height, height*3));
			player.points += 10;
			player.grow(obj);			
		}
		if(dEnemy < enemy.r + obj.r){
			obj.pos = createVector(random(-2*width, width*3), random(-2*height, height*3));
			enemy.points += 10;
			enemy.grow(obj);			
		}
		enemy.parts.forEach(function (partEnemy){

			var d = dist(obj.pos.x, obj.pos.y, partEnemy.pos.x, partEnemy.pos.y);

			if(d < obj.r + partEnemy.r){
				obj.pos = createVector(random(-2*width, width*3), random(-2*height, height*3));
				partEnemy.grow(obj);
			}

		});
		player.parts.forEach(function (partPlayer){

			var d = dist(obj.pos.x, obj.pos.y, partPlayer.pos.x, partPlayer.pos.y);

			if(d < obj.r + partPlayer.r){
				obj.pos = createVector(random(-2*width, width*3), random(-2*height, height*3));
				partPlayer.grow(obj);
			}

		});
	});

	enemy.parts.forEach(function(enemyPart){

		var d = dist(enemy.pos.x, enemy.pos.y, enemyPart.pos.x, enemyPart.pos.y);

		if(d < enemy.r + enemyPart.r && enemy.r > enemyPart.r+2){
			enemy.parts.splice(enemy.parts.indexOf(enemyPart), 1);			
			enemy.grow(enemyPart);
			enemy.fused = true;
			setTimeout(function(){ enemy.fused = false; }, 1000);
		}
	});

	player.parts.forEach(function(playerPart){

		var d = dist(player.pos.x, player.pos.y, playerPart.pos.x, playerPart.pos.y);

		if(d < player.r + playerPart.r && player.r > playerPart.r+2){
			player.parts.splice(player.parts.indexOf(playerPart), 1);			
			player.grow(playerPart);	
		}
	});



	var velocity = createVector(mouseX-width/2, mouseY-height/2);	
	if(player.pos.x > 3*width){		
		velocity.setMag(player.speed);
		player.pos.sub(velocity);
		player.pos.x = 3*width;	
	}
	if(player.pos.x < -2*width){		
		velocity.setMag(player.speed);
		player.pos.sub(velocity);
		player.pos.x = -2*width;	
	}
	if(player.pos.y > height*3){		
		velocity.setMag(player.speed);
		player.pos.sub(velocity);
		player.pos.y = height*3;	
	}
	if(player.pos.y < -height*2){		
		velocity.setMag(player.speed);
		player.pos.sub(velocity);
		player.pos.y = -height*2;	
	}

	if(enemy.pos.x < player.pos.x - width/2){
		text("ENEMY", player.pos.x - width/2, enemy.pos.y);
		if(enemy.pos.y > player.pos.y + height/2){
			text("ENEMY", player.pos.x - width/2, player.pos.y + height/2);
		}
		else if(enemy.pos.y < player.pos.y - height/2){
			text("ENEMY", player.pos.x - width/2, player.pos.y - height/2+30);
		}
	}

	if(enemy.pos.x > player.pos.x + width/2){
		text("ENEMY", player.pos.x + width/2 - 100, enemy.pos.y);
		if(enemy.pos.y > player.pos.y + height/2){
			text("ENEMY", player.pos.x + width/2-100, player.pos.y + height/2);
		}
		else if(enemy.pos.y < player.pos.y - height/2){
			text("ENEMY", player.pos.x + width/2-100, player.pos.y - height/2+30);
		}
	}

	if(enemy.pos.y < player.pos.y - height/2){
		text("ENEMY", enemy.pos.x, player.pos.y - height/2 + 30);
		if(enemy.pos.x < player.pos.x - width/2){
			text("ENEMY", player.pos.x - width/2, player.pos.y - height/2+30);
		}
		else if(enemy.pos.x > player.pos.x + width/2){
			text("ENEMY", player.pos.x + width/2-100, player.pos.y - height/2+30);
		}
	}

	if(enemy.pos.y > player.pos.y + height/2){
		text("ENEMY", enemy.pos.x, player.pos.y + height/2 - 30);
		if(enemy.pos.x > player.pos.x + width/2){
			text("ENEMY", player.pos.x + width/2-100, player.pos.y + height/2 - 35);
		}
		else if(enemy.pos.x < player.pos.x + width/2){
			text("ENEMY", player.pos.x - width/2, player.pos.y + height/2 - 35);
		}
	}

}
