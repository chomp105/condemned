let game = {
    ctx: document.getElementById('gc').getContext('2d'),
    alive: true,
    mx: 0,
    my: 0,
    machineGun: document.getElementById('machine_gun'),
    sniper: document.getElementById('sniper'),
    bullet: document.getElementById('bullet'),
    mapX: 0,
    mapY: 0,
    originShiftX: -1100,
    originShiftY: -1100,
    time: 0,
    lst: Date.now(),
    step: 0,
    drawBackground: () => {
      game.ctx.fillStyle='#778F5B';
      game.ctx.fillRect(game.mapX, game.mapY, 2200, 2200);
      game.ctx.strokeStyle = '#708657';
      game.ctx.lineWidth = 3;
      for (let i = 0; i < 1100/28; i++) {
          game.ctx.beginPath();
          game.ctx.moveTo(game.mapX, i * (1100 / 20) + game.mapY);
          game.ctx.lineTo(game.mapX + 2200, i * (1100 / 20) + game.mapY);
          game.ctx.stroke();
      }
      for (let i = 0; i < 1100/28; i++) {
          game.ctx.beginPath();
          game.ctx.moveTo(i * (2200 / 40) + game.mapX, game.mapY);
          game.ctx.lineTo(i * (2200 / 40) + game.mapX, game.mapY + 2200);
          game.ctx.stroke();             
      }
      game.ctx.lineWidth = 10;
      game.ctx.strokeRect(game.mapX, game.mapY, 2200, 2200);
      game.ctx.lineWidth = 3;
    },
    reset: () => {
      document.getElementById('start_screen').style.display = 'block';
      clearInterval(gameLoopRunner);
      game.mx = 0;
      game.my = 0;
      game.mapX = 0;
      game.mapY = 0;
      player.x = game.getWidth() / 2;
      player.y = game.getHeight() / 2;
      game.originShiftX = -1100;
      game.originShiftY = -1100;
      player.degree = 0;
      player.health = 100;
      player.movement_buffer = [0,0,0,0];
      gun.bulletArray = [];
      zombieHandler.zombies = [];
      player.alive = false;
    },
    updateHealth: () => {
      game.ctx.drawImage(document.getElementById('health_bar'), 25, game.getHeight() - 110, 300, 110);
      game.ctx.fillStyle = "red";
      game.ctx.fillRect(140, game.getHeight() - 60, 175 * (player.health / 100), 18);
    },
    gameLoop: () => {
      game.step = Date.now() - game.lst;
      game.lst = Date.now();
      document.getElementById('gc').width = game.getWidth();
      document.getElementById('gc').height = game.getHeight();
      player.x = game.getWidth() / 2;
      player.y = game.getHeight() / 2;
      game.ctx.clearRect(0, 0, game.getWidth(), game.getHeight());
      game.ctx.save();
      game.ctx.translate(game.originShiftX + player.x, game.originShiftY + player.y);
      game.drawBackground();
      gun.updateBullets();
      zombieHandler.updateZombies();
      game.ctx.restore();
      player.updatePlayer();
      game.ctx.font = "40px Arial";
      if (player.health <= 0) {
        game.reset();
      }
      game.updateHealth();
      game.time++;
      if (game.time > 250 && zombieHandler.zombies.length < 21) {
      game.time = 0;
      zombieHandler.spawnZombies();
      }

      window.requestAnimationFrame(game.gameLoop);
    },
    getWidth: () => {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
    },
    getHeight: () => {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
      );
    }
  }
  
  let gameLoopRunner;
  function startGame() {
    player.alive = true;
    window.requestAnimationFrame(game.gameLoop);
    //gameLoopRunner = setInterval(game.gameLoop, 1000/210);
  }