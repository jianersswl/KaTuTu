/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);
const explosions = [];

class Explosion {
    constructor(x, y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.speed = 8;
        this.frameX = 0;
    }

    update(){
        this.frame++;
        this.frameX = Math.floor(this.frame / this.speed);
    }
    draw(){
        ctx.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

let explosion1 = new Explosion(10,10);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    explosions.forEach(object => {
        object.draw();
        object.update();
        if(object.frameX > 5){
            explosions.pop(object);
        }
    })
    requestAnimationFrame(animate);
}

function createAnimation(e){
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
    console.log(explosions);
}

window.addEventListener('click', function(e){
    createAnimation(e);
})

// window.addEventListener('mousemove', function(e){
    // createAnimation(e);
// })

animate();