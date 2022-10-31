/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
let gameFrame= 0;

let enemyNumber = 100;
let enemyArray = [];

const enemy1 = new Image();
enemy1.src = 'enemy1.png';
const enemy2 = new Image();
enemy2.src = 'enemy2.png';
const enemy3 = new Image();
enemy3.src = 'enemy3.png';
const enemy4 = new Image();
enemy4.src = 'enemy4.png';

class Enemy {
    constructor(image){
        this.image = image;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = Math.floor(this.spriteWidth / 2);
        this.height = Math.floor(this.spriteHeight / 2);
        this.frameSpeed = Math.floor(Math.random() * 4);

        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.dir = Math.random() * 2 - 1;
        this.speed = (Math.random()+1) * 2; 
    }
    update(){
        this.x += ((Math.random()+1) * 2) * (Math.random() * 2 - 1);
        this.y += ((Math.random()+1) * 2) * (Math.random() * 2 - 1);
        // 变换精灵动作的帧数 且控制变换的速度
        this.frameX = Math.floor((gameFrame)/this.frameSpeed) % 6
    }
    draw(){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

}

for (let i = 0; i < enemyNumber; i++) {
    enemyArray.push(new Enemy(enemy1));
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemyArray.forEach(enemy => {
        enemy.draw();
        enemy.update();
    })
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();
