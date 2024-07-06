
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
 
document.body.style.overflow = 'hidden';
 
canvas.width = innerWidth
canvas.height = innerHeight
 
c.fillStyle = 'black'
c.fillRect(0, 0, canvas.width, canvas.height)
 
// Gravity
const gravity = 0.98
 
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './images/background.png'
})
 
const shop = new Sprite({
    position: {
        x: 520,
        y: 50
    },
    imageSrc: './images/Arturo shop.png',
    scale: 2.75,
    framesMax: 6
})
 
 
 
const player = new Fighter({
    position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: './images/Vegard Idle.png',
  framesMax: 2,
  scale: 2.5,
  sprites: {
    idle: {
        imageSrc: './images/Vegard Idle.png',
        framesMax: 2
    },
    run: {
        imageSrc: './images/Vegard run.png',
        framesMax: 2,
    },
    jump: {
        imageSrc: './images/Vegard jump.png',
        framesMax: 4,
    },
    fall: {
        imageSrc: './images/Vegard jump.png'
    },
    attack1: {
    imageSrc: './images/Vegard attack1.png',
    framesMax: 2,
    },
    takeHit: {
        imageSrc: './images/Vegard takehit.png',
        framesMax: 2,
    },
    death: {
        imageSrc: './images/Vegard death.png',
        framesMax: 2
    }
   
  }
})
 
 
const enemy = new Fighter({
    position: {
    x: 1150,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: './images/Ola idle.png',
  framesMax: 2,
  scale: 2.5,
  sprites: {
    idle: {
        imageSrc: './images/Ola idle.png',
        framesMax: 2
    },
    run: {
        imageSrc: './images/Ola run.png',
        framesMax: 2,
    },
    attack1: {
    imageSrc: './images/Ola attack1.png',
    framesMax: 2,
    },
    takeHit: {
        imageSrc: './images/Ola takehit.png',
        framesMax: 2
    },
    death: {
        imageSrc: './images/Ola death.png',
        framesMax: 2
    }
  }
})
 


 
///
///const rektor = new Sprite({
    //position: {
    //    x: 500,
     //   y: 270,
   // },
   // imageSrc: './images/Homselomse.png',
  //  scale: 2.75,
    //framesMax: 7
//})

const keys = {
    a: {
        pressed: false
        },
        d: {
            pressed: false
        },
        w: {
            pressed : false
        },
        ArrowRight: {
            pressed: false
        },
        ArrowLeft: {
            pressed: false
        },
        ArrowUp: {
            pressed: false
       }
    }
 
    const SPEED = 3
    const ROTATIONAL_SPEED = 0.05
    const FRICTION = 0.97
 
    const projectiles = []
 
 
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    enemy.update()
//    for  (let i = projectiles.length - 1; i >= 0; i --) {
//        const projectiles = projectiles[i]
//        projectile.update()
//    }
 
    enemy.velocity.x = 0
    player.velocity.x = 0
 
    // player movement
    player.switchSprite('idle')
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -6
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 6  
        player.switchSprite('run')
    }
            // jumping player
            if (player.velocity.y < 0) {
              //  player.switchSprite('jump')
            } else if(player.velocity.y > 0) {
              //  player.switchSprite('jump')
            }
 
        // enemy movement
        if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            enemy.velocity.x = -6
            enemy.switchSprite('run')
        } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            enemy.velocity.x = 6  
            enemy.switchSprite('run')
        } else {
            enemy.switchSprite('idle')
        }
            // jumping enemy
            if (enemy.velocity.y < 0) {
            //    enemy.switchSprite('jump')
            } else if(enemy.velocity.y > 0) {
              //  enemy.switchSprite('jump')
            }
 
        // detect for collision and hit animation
        if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking
        ) {
            enemy.takeHit()
            enemy.velocity.y = -13
            player.isAttacking = false
            document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        }
 
        if (
            rectangularCollision({
                rectangle1: enemy,
                rectangle2: player
            }) &&
            enemy.isAttacking
            ) {
                player.takeHit()
                player.velocity.y = -13
                player.velocity.x =
                enemy.isAttacking = false
                document.querySelector('#playerHealth').style.width = player.health + '%'
            }
 
            //end game based on health
            if (enemy.health <= 0 || player.health <= 0) {
                determineWinner({player, enemy, timerId})
            }
}
 
 
animate()
// Kontrollere
window.addEventListener('keydown', (event) => {
    if (!player.dead) {
    console.log(event.key)
    switch (event.key) {
        // Player controls
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
            case 'D':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
             break
             case 'A':
                keys.a.pressed = true
                player.lastKey = 'a'
                break
             case 'w':
             player.velocity.y = -20
              break
              case 'W':
                player.velocity.y = -20
                 break
            case 'f':
        player.attack()
            break
            case 'F':
                player.attack()
                    break
        }
    }
   
 
    if (!enemy.dead){
    switch (event.key) {
                    // Enemy controls
                    case 'ArrowRight':
                        keys.ArrowRight.pressed = true
                        enemy.lastKey = 'ArrowRight'
                        break
                    case 'ArrowLeft':
                        keys.ArrowLeft.pressed = true
                        enemy.lastKey = 'ArrowLeft'
                         break
                         case 'ArrowUp':
                        enemy.velocity.y = -20
                       
                          break
                          case ' ':
                            enemy.attack()
                            break
                        }
            }
})
 
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
        keys.d.pressed = false
        break
        case 'D':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
            case 'A':
                keys.a.pressed = false
                break
            case 'w':
                keys.w.pressed = false
                break
                case 'W':
                    keys.w.pressed = false
                    break
                    case 'r':
                        player.shootPressed = false;
                        break
                        case 'R':
                            player.shootPressed = false;
                            break
    }
        // enemy keys
        switch (event.key) {
         case 'ArrowRight' :
            keys.ArrowRight.pressed = false
            break
            case 'ArrowLeft' :
                keys.ArrowLeft.pressed = false
                break
                case 'ArrowUp' :
                    keys.ArrowRight.pressed = false
                    break
                   }
})