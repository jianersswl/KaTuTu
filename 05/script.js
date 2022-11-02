const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let lastTime = 0;
let timeToNextRaven = 0;
let ravenInterval = 500;

let score = 0;
let gameOver = false;
ctx.font = '50px Impact';

let ravens = [];
let explosions = [];

class Explosion{
    constructor(x, y, sizeModifier){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        
        this.sizeModifier = sizeModifier;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'boom.png';
        
        this.frameX = 0;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;

        this.sound = new Audio();
        this.sound.src = 'ice attack 2.wav';
        this.deletion = false;
    }
    update(timestamp){
        if(this.frameX === 0){
            this.sound.play();
        }
        if(this.timeSinceLastFrame > this.frameInterval){
            this.frameX++;
            this.timeSinceLastFrame = 0;
            if(this.frameX === 5){
                this.deletion = true;
            }
        }
        this.timeSinceLastFrame += timestamp;

        
    }
    draw(){
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class Raven {
    constructor(){
        this.image = new Image();
        this.image.src = 'raven.png';
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;

        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.deletion = false;

        this.frameX = 0;
        // 可以保证不同机器的延时下flap的速度保持一致
        this.timeSinceFlap = 0;
        this.flapInterval = 500 / this.directionX - 50;

        this.randomColors = [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }

    update(timestamp) {
        this.x -= this.directionX;
        this.y += this.directionY;
        if(this.y<0 || this.y>(canvas.height - this.height)){
            this.directionY = -this.directionY;
        }
        if(this.x < 0 - this.width) {
            this.deletion = true;
        }
        if(this.timeSinceFlap > this.flapInterval){
            this.frameX++;
            this.frameX = this.frameX % 5;
            this.timeSinceFlap = 0;
        }else{
            this.timeSinceFlap += timestamp;
        }
        if(this.x < 0 - this.width) {
            gameOver = true;
        }
    }
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 55, 80);
}
function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 2, canvas.height / 2);
}

window.addEventListener('click', function(e){
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1).data;
    ravens.forEach(object => {
        if(object.randomColors[0]===detectPixelColor[0] && object.randomColors[1]===detectPixelColor[1] && object.randomColors[2]===detectPixelColor[2]){
            object.deletion = true;
            score++;
            explosions.push(new Explosion(object.x, object.y, object.sizeModifier));
        }
    })
})

function animate(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;

    if(timeToNextRaven > ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function(a, b){
            return a.width - b.width;
        })
    }
    drawScore();
    [...ravens, ...explosions].forEach(object => object.update(deltaTime));
    [...ravens, ...explosions].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.deletion);
    explosions = explosions.filter(object => !object.deletion);
    if(!gameOver) requestAnimationFrame(animate);
    else drawGameOver();
}

animate(0);