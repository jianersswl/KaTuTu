let playState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playState = e.target.value;
})

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrame = 5;

const spriteAnimations = [];
const animationStates=[
    {
        name:"idle",
        frames:7
    },
    {
        name:"jump",
        frames:7
    },
    {
        name:"fall",
        frames:7
    },
    {
        name:"run",
        frames:9
    },
    {
        name:"dizzy",
        frames:11
    },
    {
        name:"sit",
        frames:5
    },
    {
        name:"roll",
        frames:7
    },
    {
        name:"bite",
        frames:7
    },
    {
        name:"ko",
        frames:12
    },
    {
        name:"getHit",
        frames:4
    },

]

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }

    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
})

function animate(){
    console.log(playState);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
    let position = Math.floor(gameFrame/staggerFrame) % spriteAnimations[playState].loc.length;
    let frameX = spriteAnimations[playState].loc[position].x;
    let frameY = spriteAnimations[playState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame = (gameFrame+1)%10000;
    requestAnimationFrame(animate);
}

animate();
