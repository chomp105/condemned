let player = {
    x: game.getWidth() / 2,
    y: game.getHeight() / 2,
    degree: 0,
    health: 100,
    movement_buffer: [0,0,0,0],
    collide: () => {
        if (game.originShiftX > -45) {
            game.originShiftX = -45;
        }
        if (game.originShiftY > -45) {
            game.originShiftY = -45;
        }
        if (game.originShiftX < -2155) {
            game.originShiftX = -2155;
        }
        if (game.originShiftY < -2155) {
            game.originShiftY = -2155;
        }
    },
    move: () => {
        if ((player.movement_buffer[0] && player.movement_buffer[2]) || (player.movement_buffer[0] && player.movement_buffer[3]) || (player.movement_buffer[1] && player.movement_buffer[2]) || (player.movement_buffer[1] && player.movement_buffer[3])) {
            if (player.movement_buffer[0] && player.movement_buffer[2]) {
                game.originShiftX += 0.707 * game.step / 4;
                game.originShiftY += 0.707 * game.step / 4;
            } else if (player.movement_buffer[0] && player.movement_buffer[3]) {
                game.originShiftX -= 0.707 * game.step / 4;
                game.originShiftY += 0.707 * game.step / 4;
            } else if (player.movement_buffer[1] && player.movement_buffer[2]) {
                game.originShiftX += 0.707 * game.step / 4;
                game.originShiftY -= 0.707 * game.step / 4;
            } else if (player.movement_buffer[1] && player.movement_buffer[3]) {
                game.originShiftX -= 0.707 * game.step / 4;
                game.originShiftY -= 0.707 * game.step / 4;
            }
        } else {
            if (player.movement_buffer[0]) {
                game.originShiftY += 1 * game.step / 4;
            }
            if (player.movement_buffer[1]) {
                game.originShiftY -= 1 * game.step / 4;
            }
            if (player.movement_buffer[2]) {
                game.originShiftX += 1 * game.step / 4;
            }
            if (player.movement_buffer[3]) {
                game.originShiftX -= 1 * game.step / 4;
            }
        }

        player.collide();
    },
    rotate: () => {
        player.degree = Math.atan2(-(game.mx - player.x), (game.my - player.y));
        game.ctx.save();
        game.ctx.translate(player.x, player.y);
        game.ctx.rotate(player.degree);
        player.draw();
        game.ctx.restore();
    },
    draw: () => {
        game.ctx.fillStyle = 'black';
        game.ctx.strokeStyle = '#35354d';
        game.ctx.lineWidth = 5;
        game.ctx.fillStyle = '#543e35';
        game.ctx.fillRect(10, 23, 20, 40);
        game.ctx.strokeRect(10, 23, 20, 40);
        game.ctx.fillStyle = '#7d5d4f';
        game.ctx.beginPath();
        game.ctx.arc(20, 60, 15, 0, 2 * Math.PI);
        game.ctx.fill(); 
        game.ctx.stroke();
        game.ctx.beginPath();
        game.ctx.arc(-17, 40, 15, 0, 2 * Math.PI);
        game.ctx.fill(); 
        game.ctx.stroke();
        game.ctx.beginPath();
        game.ctx.arc(0, 0, 40, 0, 2 * Math.PI);
        game.ctx.fill();
        game.ctx.stroke();
        game.ctx.save();
        game.ctx.scale(1, -1);
        if (gun.auto) {
            game.ctx.drawImage(game.machineGun, -12.5, -118, 25, 80);
        } else {
            game.ctx.drawImage(game.sniper, -12.5, -168, 25, 130);
        }
        game.ctx.restore();
    },
    updatePlayer: () => {
        player.move();
        player.rotate();
    }
};

document.addEventListener('keydown', (e) => {
    switch(e.which) {
        case 87:
            player.movement_buffer[0] = 1;
            break;
        case 83:
            player.movement_buffer[1] = 1;
            break;
        case 65:
            player.movement_buffer[2] = 1;
            break;
        case 68:
            player.movement_buffer[3] = 1;
    }
});
document.addEventListener('keyup', (e) => {
    switch(e.which) {
        case 87:
            player.movement_buffer[0] = 0;
            break;
        case 83:
            player.movement_buffer[1] = 0;
            break;
        case 65:
            player.movement_buffer[2] = 0;
            break;
        case 68:
            player.movement_buffer[3] = 0;
    }
});

document.addEventListener('mousemove', (e) => {
    game.mx = e.clientX;
    game.my = e.clientY;
});