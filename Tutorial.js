
function startGame1() {

function myFunction() {
    var element = document.getElementById("meny");
    element.classList.remove("minmeny");
}
    document.body.style.overflow = 'hidden';
    document.querySelector('Div').classList.remove('minmeny')
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const gravity = 1.5

    class BackgroundSprite {
        constructor({position, imageSrc, width, height, scale}) {
            this.position = position
            this.width = width
            this.height = height
            this.scale = scale
            this.image = new Image()
            this.image.src = imageSrc
            this.image.onload = () => {
            this.loaded = true;
            }
        }
        draw() {
            if (!this.loaded) return;
            c.drawImage(this.image, this.position.x, this.position.y)
        }
        update() {
            this.draw()
        }
    }

    const background = new BackgroundSprite({
        position: { x: 0, y: 0 },
        imageSrc: 'Images/Bakgrunn.png',
        width: innerWidth,
        height: innerHeight,
        scale: 2
    })

    class ObjektSprite {
        constructor({position, imageSrc, scale = 1}) {
            this.position = position
            this.scale = scale
            this.image = new Image()
            this.image.src = imageSrc
            this.image.onload = () => {
                this.loaded = true;
            }
        }
        draw() {
            if (!this.loaded) return;
            c.drawImage(this.image, this.position.x, this.position.y)
        }
        update() {
            this.draw()
        }
    }

    const Rørtopp = new ObjektSprite({
        position: { x: 100, y:0},
        imageSrc: './Images/Rørtopp.png',
        scale: 2
    })

    const Rørbunn = new ObjektSprite({
        position: {x: 100, y:300},
        imageSrc: './Images/Rørtbunn.png',
        scale:2
    })

    class NpcSprite {
        constructor({position, imageSrc}) {
            this.position = position
            this.image = new Image()
            this.image.src = imageSrc
            this.image.onload = () => {
                this.loaded = true;
            }
        }
        draw() {
            if (!this.loaded) return;
            c.drawImage(this.image, this.position.x, this.position.y)
        }
        update() {
            this.draw()
        }
    }

    const Npc = new NpcSprite({
        position: { x: 600, y: 0 },
        imageSrc: 'Images/Shalom.png',
    })

    class DørSprite {
        constructor({position, imageSrc}) {
            this.position = position
            this.image = new Image()
            this.image.src = imageSrc
            this.image.onload = () => {
                this.loaded = true;
            }
        }
        draw() {
            if (!this.loaded) return;
            c.drawImage(this.image, this.position.x, this.position.y)
        }
        update() {
            this.draw()
        }
    }

    const Dør = new DørSprite({
        position: { x: 1200, y: 470 },
        imageSrc: 'Images/Utennavn.png',
    })
    
    class Sprite {
        constructor({position, velocity, imageSrc}) {
            this.position = position
            this.velocity = velocity
            this.height = 140
            this.image = new Image()
            this.image.src = imageSrc
            this.image.onload = () => {
                this.loaded = true;
            }
        }
        draw() {
            if (!this.loaded) {
                c.fillStyle = 'red'
                c.fillRect(this.position.x, this.position.y, 50, this.height)
            } else {
                c.drawImage(this.image, this.position.x, this.position.y, 150, 150)
            }
        }
        update() {
            this.draw()
 
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
 
            if (this.position.y + this.height + this.velocity.y >= canvas.height) {
                this.velocity.y = 0
            } else this.velocity.y += gravity
        }
    }
    
    const player = new Sprite({
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
      imageSrc: './Images/Karakter.png',
      framesMax: 2,
    })
    const keys = {
        a: { pressed: false },
        d: { pressed: false },
        w: { pressed: false },
        ArrowRight: { pressed: false },
        ArrowLeft: { pressed: false },
        ArrowUp: { pressed: false },
    }

    function detectCollision(rect1, rect2) {
        return rect1.position.x < rect2.position.x + 200 &&
               rect1.position.x + 100> rect2.position.x &&
               rect1.position.y < rect2.position.y + 1000 &&
               rect1.position.y + rect1.height > rect2.position.y;
    }

    function animate() {
        window.requestAnimationFrame(animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)

        c.save()
        background.update()
        c.restore()

        Rørbunn.update()
        
        Dør.update()

        Npc.update()

        player.update()

        Rørtopp.update()

        player.velocity.x = 0
 
        if (keys.a.pressed && player.lastKey === 'a') {
            player.velocity.x = -10
        } else if (keys.d.pressed && player.lastKey === 'd') {
            player.velocity.x = 10  
        }
    }

    animate()

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                break
            case 'w':
                player.velocity.y = -20
                break
        }
    })

    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'd':
                keys.d.pressed = false
                break
            case 'a':
                keys.a.pressed = false
                break
            case 'w':
                keys.w.pressed = false
                break
        }
    })

    window.addEventListener('keydown', (event) => {
        if (event.key === 'e') {
            if (detectCollision(player, Npc)) {
                alert('VIPPS MEG PENGER!!');
                alert('Oja... det er deg.');
                alert(' Gå inn døren til høyre for meg for å komme deg inn i spillet!');
            }
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'e') {
            if (detectCollision(player, Dør)) {
                alert('Gratulerer, du er ferdig med tutorialen!! Nå er du klar for å prøve 1v1 spillet.')
                alert('En ny karakter,(spiller2) er låst opp. Bruk piltastene på pcen for å styre den rundt og "spacebar" for å slå. ')
                window.location.href = 'Map.html';
            }
        }
    });
    
    alert("Hei, velkommen til tutorialen. Dette spillet er en lokal 1v1 platformfighter der hvor 2 kan spille på 1 pc.");
    alert("For å komme deg til spillet må du først lære deg å gå:). (W for å hoppe, D og A for å gå og f for å slå ");
    
    myFunction();
}