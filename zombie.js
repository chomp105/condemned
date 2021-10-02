function Zombie(x, y, degree) {
    this.x = x;
    this.y = y;
    this.degree = degree;
    this.health = 100;
    this.attackCounter = 100;
    this.draw = () => {
        game.ctx.strokeStyle = '#2e2e42';
        game.ctx.lineWidth = 5;
        game.ctx.fillStyle = '#074a00';
        game.ctx.beginPath();
        game.ctx.arc(0 + 24, 0 + 33, 15, 0, 2 * Math.PI);
        game.ctx.fill(); 
        game.ctx.stroke();
        game.ctx.beginPath();
        game.ctx.arc(0 - 24, 0 + 33, 15, 0, 2 * Math.PI);
        game.ctx.fill(); 
        game.ctx.stroke();
        game.ctx.beginPath();
        game.ctx.arc(0, 0, 40, 0, 2 * Math.PI);
        game.ctx.fill();
        game.ctx.stroke();
        game.ctx.drawImage(document.getElementById('wound'), 0 - 80, 0 - 40, 200, 90);
    };
}

let zombieHandler = {
  zombies: [],
  targetSystem: (i) => {
    zombieHandler.zombies[i].degree = Math.atan2(-((player.x - game.originShiftX - player.x) - zombieHandler.zombies[i].x), ((player.y - game.originShiftY - player.y) - zombieHandler.zombies[i].y));
    xv = -Math.sin(zombieHandler.zombies[i].degree) * 0.5 * game.step / 4;
    yv = Math.cos(zombieHandler.zombies[i].degree) * 0.5 * game.step / 4;
  },
  attack: (i) => {
    if (zombieHandler.zombies[i].attackCounter > 0) {
      zombieHandler.zombies[i].attackCounter--;
    } else {
      player.health -= 10;
      zombieHandler.zombies[i].attackCounter = 100;
    }
  },
  collision: () => {
    for (let i = 0; i < zombieHandler.zombies.length; i++) {
      for (let j = 0; j < gun.bulletArray.length; j++) {
        if (Math.sqrt(Math.pow(zombieHandler.zombies[i].x - gun.bulletArray[j].x, 2) + Math.pow(zombieHandler.zombies[i].y - gun.bulletArray[j].y, 2)) < 42) {
          if (gun.bulletArray[j].autoBullet) {
            zombieHandler.zombies[i].health -= 20;
          } else {
            zombieHandler.zombies[i].health -= 200;
          }
          gun.bulletArray.splice(j, 1);
        }
      }
    }
  },
  updateZombies: () => {
    for (let i = 0; i < zombieHandler.zombies.length; i++) {
      zombieHandler.targetSystem(i);
      if (Math.sqrt(Math.pow(Math.abs((player.x - game.originShiftX - player.x) - zombieHandler.zombies[i].x), 2) + Math.pow(Math.abs((player.y - game.originShiftY - player.y) - zombieHandler.zombies[i].y), 2)) > 84) {
        zombieHandler.zombies[i].y += yv;
        zombieHandler.zombies[i].x += xv;
      } else {
        zombieHandler.attack(i);
      }
      game.ctx.save();
      game.ctx.translate(zombieHandler.zombies[i].x, zombieHandler.zombies[i].y);
      game.ctx.rotate(zombieHandler.zombies[i].degree);
      zombieHandler.zombies[i].draw();
      game.ctx.restore();
      game.ctx.fillStyle = 'rgba(0,0,0,0.5)';
      game.ctx.fillRect(zombieHandler.zombies[i].x - 40, zombieHandler.zombies[i].y + 80, 80, 20);
      game.ctx.fillStyle = 'red';
      game.ctx.fillRect(zombieHandler.zombies[i].x - 40, zombieHandler.zombies[i].y + 80, 80 * (zombieHandler.zombies[i].health / 100), 20);
      zombieHandler.collision();
      if (zombieHandler.zombies[i].health <= 0) {
        zombieHandler.zombies.splice(i, 1);
      }
    }
  },
  spawnZombies: () => {
    zombieHandler.zombies.push(new Zombie(Math.random() * (2200 - 0) + 0, Math.random() * (2200 - 0) + 0, 0));
  }
}