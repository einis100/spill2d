
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
            rectangle2.position.x &&
        rectangle1.attackBox.position.x <=
            rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
            rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
 }
 
 function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health ===  enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Draw'
       } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Spiller 1 Vant'
       } else if (enemy.health > player.health) {
        document.querySelector('#displayText').innerHTML = 'Spiller 2 Vant'
       }
 }
 
 let timer = 60
 let timerId
 function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer === 0) {
        determineWinner({player, enemy, timerId})
    }
 }

function loadBackgroundImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

 function drawBackground(c, image, xZoom, yZoom) {
    if (!image) return
    c.drawImage(
        image,
        0,
        0,
        window.innerWidth,
        window.innerHeight + 145*yZoom // There is a gap at the bottom of the image we don't want to show
    )
}

// Game was originally made for resolution 1366 x 768 which will use a zoom of 1
const ORIGINAL_WIDTH = 1366;
const ORIGINAL_HEIGHT = 768;

let xZoom = 1;
let yZoom = 1;

function setZoom() {
    xZoom = window.innerWidth / ORIGINAL_WIDTH;
    yZoom = window.innerHeight / ORIGINAL_HEIGHT;
}
window.addEventListener('resize', () => {
    setZoom();
    animate()
});

window.addEventListener('load', () => {
    setZoom();
});
