function Bullet(x, y, degree, ox, oy, autoBullet) {
    this.x = x;
    this.y = y;
    this.degree = degree;
    this.ox = ox;
    this.oy = oy;
    this.autoBullet = autoBullet;
}

let gun = {
    bulletArray: [],
    auto: true,
    cooldown: 1,
    mouseDown: false,
    mouseButton: 1,
    updateBullets: () => {
        if (player.alive) {
            gun.cooldown -= 1 * game.step / 3;
            if (gun.cooldown < 0 && gun.mouseDown && gun.mouseButton == 0) {
                if (gun.auto) {
                    gun.cooldown = 30;
                    gun.bulletArray.push(new Bullet(-game.originShiftX + Math.sin(player.degree) * -120, -game.originShiftY - Math.cos(player.degree) * -120, Math.random() * ((player.degree + 0.08 )- (player.degree - 0.08)) + player.degree - 0.08, -game.originShiftX, -game.originShiftY, true));
                } else {
                    gun.cooldown = 350;
                    gun.bulletArray.push(new Bullet(-game.originShiftX + Math.sin(player.degree) * -160, -game.originShiftY - Math.cos(player.degree) * -160, player.degree, -game.originShiftX, -game.originShiftY, false));
                }
            }
        }
        for (let i = 0; i < gun.bulletArray.length; i++) {
            gun.bulletArray[i].x += -Math.sin(gun.bulletArray[i].degree) * 4  * game.step / 3;
            gun.bulletArray[i].y += Math.cos(gun.bulletArray[i].degree) * 4 * game.step / 3;
            gun.bulletArray[i].count += 2;
            game.ctx.save();
            game.ctx.translate(gun.bulletArray[i].x, gun.bulletArray[i].y);
            game.ctx.rotate(gun.bulletArray[i].degree);
            game.ctx.fillStyle = "#818a00";
            game.ctx.strokeStyle = '#35354d';
            game.ctx.beginPath();
            game.ctx.arc(0, 15, 4, 0, 2 * Math.PI);
            game.ctx.fill(); 
            game.ctx.stroke();
            game.ctx.fillRect(-4, 0, 8, 13);
            game.ctx.strokeRect(-4, 0, 8, 13);
            game.ctx.restore();
            if (gun.bulletArray[i].count > 500) {
                gun.bulletArray.splice(i, 1);
            }
        }
    }
}

document.addEventListener('mousedown', (e) => {
    gun.mouseDown = true;
    gun.mouseButton = e.button;
});

document.addEventListener('mouseup', () => {
    gun.mouseDown = false;
    gun.mouseButton = 1;
});

document.addEventListener('keydown', (e) => {
    if (e.which == 50 && player.alive && gun.auto) {
        gun.auto = false;
        if (gun.auto) {
            gun.cooldown = 30;
        } else {
            gun.cooldown = 350;
        }
    } else if (e.which == 49 && player.alive && !gun.auto) {
        gun.auto = true;
        if (gun.auto) {
            gun.cooldown = 30;
        } else {
            gun.cooldown = 350;
        }
    }
});