/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

let enemyNumber = 100;
let enemyArray = [];

class Enemy {
    constructor(){
        this.x = Math.random() * CANVAS_WIDTH;
        this.y = Math.random() * CANVAS_HEIGHT;
        this.width = 100;
        this.height = 100;
        this.dir = Math.random() * 2 - 1;
        this.speed = Math.random() * 2; 
    }
    update(){
        this.x += this.speed * this.dir;
        this.y += this.speed * this.dir;
    }
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}

for (let i = 0; i < enemyNumber; i++) {
    enemyArray.push(new Enemy());
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemyArray.forEach(enemy => {
        enemy.draw();
        enemy.update();
    })
    requestAnimationFrame(animate);
}

animate();
