class Overworld{
	constructor(config) {
		this.element = config.element
		this.canvas = this.element.querySelector(".game-canvas")
		this.ctx = this.canvas.getContext("2d")
		this.map = null
	}
	startGameLoop() {

		let step = () => {
			//cler frame sebelumnya
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

			//camra person
			let cameraPerson = this.map.gameObject.hero

			this.map.drawLowerImage(this.ctx, cameraPerson)

			//game object
			Object.values(this.map.gameObject).forEach(object => {
				object.update({
					arrow: this.directionInput.direction,
					map: this.map,
				})
				object.sprite.draw(this.ctx, cameraPerson)
			})

			// this.map.drawUpperImage(this.ctx, cameraPerson)

			requestAnimationFrame(() => {
				step()
			})
		}
		step()
	}
	init(){
		this.map = new OverworldMap(window.OverworldMap.DemoRoom)
		this.directionInput = new DirectionInput()
		this.directionInput.init()

		// KITA CAPTURE KOORDINAT SAHAJA (Manual Snapshot)
		this.initialState = {};
		Object.keys(this.map.gameObject).forEach(key => {
			this.initialState[key] = {
				x: this.map.gameObject[key].x,
				y: this.map.gameObject[key].y,
				direction: this.map.gameObject[key].direction
			};
		});
		
		window.overworld = this;
		this.startGameLoop()
	}

	resetLevel() {
		console.log("Resetting...");

		Object.keys(this.initialState).forEach(key => {
			const obj = this.map.gameObject[key];
			const asal = this.initialState[key];

			// if (obj) {
				obj.x = asal.x;
				obj.y = asal.y;
				obj.direction = asal.direction;

				obj.whoPijakMe = null;
			// }
		});

	}
}