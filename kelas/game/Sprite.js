class Sprite {
	constructor(config) {
		//setup img
		this.image = new Image()
		this.image.src = config.src
		this.image.onload = () => {
			this.isLoaded = true
		}

		//shadow
		this.shadow = new Image()
		this.useShadow = config.useShadow || false
		
		if (this.useShadow) {
			this.shadow.src = "./images/characters/shadow.png"
		}
		this.shadow.onload = () => {
			this.isShadowLoeded = true
		}

		//confing animation n init state
		this.animations = config.animations || {
			"idle-down": [[0, 0]],
			"idle-right": [[0, 1]],
			"idle-up": [[0, 2]],
			"idle-left": [[0, 3]],

			"walk-down": [[1, 0], [0, 0], [3, 0], [0, 0]],
			"walk-right": [[1, 1], [0, 1], [3, 1], [0, 1]],
			"walk-up": [[1, 2], [0, 2], [3, 2], [0, 2]],
			"walk-left": [[1, 3], [0, 3], [3, 3], [0, 3]],
		}
		this.currentAnimation = "idle-down" // config.currentAnimation || "idle-down"
		this.currentAnimationFrame = 0

		this.animationFrameLimit = config.animationFrameLimit || 32
		this.animationFrameProgress = this.animationFrameLimit

		//ref game onj
		this.gameObject = config.gameObject
	}

	get frame() {
		return this.animations[this.currentAnimation][this.currentAnimationFrame]
	}

	setAnimation(key) {
		if (this.currentAnimation !== key) {
			this.currentAnimation = key
			this.currentAnimationFrame = 0
			this.animationFrameProgress = this.animationFrameLimit
		}
	}

	updateAnimationProgress() {
		//down take fraem progress

		if (this.animationFrameProgress > 0) {
			this.animationFrameProgress--
			return
		}

		this.animationFrameProgress = this.animationFrameLimit
		this.currentAnimationFrame++

		if (this.frame === undefined) {
			this.currentAnimationFrame = 0
		}
	}

	draw(ctx, cameraPerson) {
		let x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x
		let y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y

		this.isShadowLoeded && ctx.drawImage(
			this.shadow,
			x,
			y,
		)

		let [frameX, frameY] = this.frame

		this.isLoaded && ctx.drawImage(
			this.image,
			frameX * 32, //left cut 
			frameY * 32, //top cut
			32, //width cut
			32, //height cut
			x,
			y,
			32,
			32
		)
		this.updateAnimationProgress()
	}
}