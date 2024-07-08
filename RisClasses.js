class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1}) {
        this.position = position
        this.width = 50*xZoom
        this.height = 150*yZoom
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 50
    }
    draw() {
        if (!this.image) return
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()
    }
}

class Fighter extends Sprite {
    constructor({position, velocity, color = 'red', offset, imageSrc, scale = 1, framesMax = 1, sprites}) {
        super({position, imageSrc, scale, framesMax})
        this.velocity = velocity
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x*xZoom,
                y: this.position.y*yZoom
            },
            offset,
            width: 100*xZoom,
            height: 50*yZoom
        }
        this.color = color
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 50
        this.sprites = sprites

        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image()
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc
        }
    }

    update() {
        this.draw()
        this.animateFrames()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 145) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

    takeHit() {
        this.health -= 10

        if (this.health <= 0) {
            this.switchSprite('death')
        } else {
            this.switchSprite('takeHit')
        }
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
                case 'fall':
                    if (this.image !== this.sprites.fall.image) {
                        this.image = this.sprites.fall.image
                        this.framesMax = this.sprites.fall.framesMax
                        this.framesCurrent = 0
                    }
                    break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}