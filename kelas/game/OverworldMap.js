class OverworldMap{
	constructor(config) {
		this.gameObject = config.gameObject
		this.walls = config.walls || {}
		this.lowerImage = new Image()
		this.lowerImage.src = config.lowerSrc

		// this.upperImage = new Image()
		// this.upperImage.src = config.upperSrc
	}

	drawLowerImage(ctx, cameraPerson) {
		ctx.drawImage(this.lowerImage,
			utils.withGrid(10.5) - cameraPerson.x,
			utils.withGrid(6) - cameraPerson.y
		)
	}
	// drawUpperImage(ctx, cameraPerson) {
	// 	ctx.drawImage(
	// 		this.upperImage,
	// 		utils.withGrid(10.5) - cameraPerson.x,
	// 		utils.withGrid(6) - cameraPerson.y
	// 	)
	// };

	isSpaceTaken(currentX, currentY, direction) {
		let { x, y } = utils.nextPosition(currentX, currentY, direction);

		const depanMc = Object.values(this.gameObject).find(obj => {
			return obj.x === x && obj.y === y;
		});
		// console.log(depanMc);
		
		//depan mc dan idalah box
		if (depanMc && depanMc.isBox) {
			return depanMc;
		}

		// 2. Semak dinding statik map
		return this.walls[`${x},${y}`] || false;
	}
	checkForTrigger(x, y) {
		return Object.values(this.gameObject).find(obj => {
			// Cari apa-apa objek di x,y yang ada fungsi pijak
			return obj.x === x && obj.y === y && (obj.isCheck || obj.isTrap || obj.isReset);
		});
	}

	checkAllTrigger() {
		return Object.values(this.gameObject).filter(obj => obj.isTrap)
	}
	checkResetButton() {
		return Object.values(this.gameObject).filter(obj => obj.isReset)
	}
	checkWinCondition() {
		const allTraps = this.checkAllTrigger(); // Gets all traps

		// Check if every trap has a box AND the data matches
		const isWin = allTraps.every(trap => {
			return trap.whoPijakMe instanceof Box && trap.whoPijakMe.data === trap.data;
		});

		if (isWin) {
			console.log("LEVEL COMPLETE!");
			// Trigger your win UI or next level here
		} else {
			console.log("Not all boxes are in the right place yet.");
		}
	}
}
window.OverworldMap = {
	DemoRoom: {
		// lowerSrc: "./images/maps/DemoLower.png",
		lowerSrc: "./images/maps/b.png",
		// upperSrc: "./images/maps/DemoUpper.png",
		gameObject: {
			trap1: new Trap({
				x: utils.withGrid(4),
				y: utils.withGrid(5),
				data: 5,
				useShadow: false,
				src: "./images/characters/asd.png",
				animations: {
					"idle-down": [[4, 2]],
					"idle-right": [[4, 2]],
					"idle-up": [[4, 2]],
					"idle-left": [[4, 2]],
				},
			}),
			trap2: new Trap({
				x: utils.withGrid(3),
				y: utils.withGrid(5),
				data: 10,
				useShadow: false,
				src: "./images/characters/asd.png",
				animations: {
					"idle-down": [[4, 3]],
					"idle-right": [[4, 3]],
					"idle-up": [[4, 3]],
					"idle-left": [[4, 3]],
				},
			}),
			trap3: new Trap({
				x: utils.withGrid(2),
				y: utils.withGrid(5),
				data: 15,
				useShadow: false,
				src: "./images/characters/asd.png",
				animations: {
					"idle-down": [[4,4]],
					"idle-right": [[4,4]],
					"idle-up": [[4,4]],
					"idle-left": [[4,4]],
				},
			}),
			trap4: new Trap({
				x: utils.withGrid(1),
				y: utils.withGrid(5),
				data: 15,
				useShadow: false,
				src: "./images/characters/asd.png",
				animations: {
					"idle-down": [[4, 3]],
					"idle-right": [[4, 3]],
					"idle-up": [[4, 3]],
					"idle-left": [[4, 3]],
				},
			}),
			trap5: new Trap({
				x: utils.withGrid(5),
				y: utils.withGrid(5),
				data: 15,
				useShadow: false,
				src: "./images/characters/asd.png",
				animations: {
					"idle-down": [[4, 4]],
					"idle-right": [[4, 4]],
					"idle-up": [[4, 4]],
					"idle-left": [[4, 4]],
				},
			}),
			box1: new Box({
				x: utils.withGrid(4),
				y: utils.withGrid(6),
				data: 5,
				useShadow: false,
				src: "./images/characters/asd.png",
				animations: {
					"idle-down": [[0, 3]],
					"idle-right": [[0, 3]],
					"idle-up": [[0, 3]],
					"idle-left": [[0, 3]],

				},
			}),
			box2: new Box({
				x: utils.withGrid(3),
				y: utils.withGrid(6),
				data: 10,
				useShadow: false,
				src: "./images/characters/asd.png",
				animations: {
					"idle-down": [[1, 0]],
					"idle-right": [[1, 0]],
					"idle-up": [[1, 0]],
					"idle-left": [[1, 0]],

				},
			}),
			box3: new Box({
				x: utils.withGrid(2),
				y: utils.withGrid(6),
				data: 15,
				useShadow: false,
				src: "./images/characters/asd.png",
				animations: {
					"idle-down": [[0, 4]],
					"idle-right": [[0, 4]],
					"idle-up": [[0, 4]],
					"idle-left": [[0, 4]],

				},
			}),
			box4: new Box({
				x: utils.withGrid(1),
				y: utils.withGrid(6),
				data: 15,
				useShadow: false,
				src: "./images/characters/asd.png",
				animations: {
					"idle-down": [[1, 0]],
					"idle-right": [[1, 0]],
					"idle-up": [[1, 0]],
					"idle-left": [[1, 0]],

				},
			}),
			box5: new Box({
				x: utils.withGrid(5),
				y: utils.withGrid(6),
				data: 15,
				useShadow: false,
				src: "./images/characters/asd.png",
				animations: {
					"idle-down": [[0, 1]],
					"idle-right": [[0, 1]],
					"idle-up": [[0, 1]],
					"idle-left": [[0, 1]],
				},
			}),
			check: new Check({
				x: utils.withGrid(7),
				y: utils.withGrid(4),
				useShadow: false,
				src: "./images/characters/people/npc5.png"
			}),
			reset: new Reset({
				x: utils.withGrid(6),
				y: utils.withGrid(4),
				useShadow: false,
				src: "./images/characters/asd.png",
				animations: {
					"idle-down": [[4, 3]],
				}
			}),
			hero: new Person({
				isPlayerControlled: true,
				useShadow: true,
				x: utils.withGrid(7),
				y: utils.withGrid(6),
			}),
		},
		walls: {


			//wall kiri
			[utils.asGridCoords(-1, 0)]: true,
			[utils.asGridCoords(-1, 1)]: true,
			[utils.asGridCoords(-1, 2)]: true,
			[utils.asGridCoords(-1, 3)]: true,
			[utils.asGridCoords(-1, 4)]: true,
			[utils.asGridCoords(-1, 5)]: true,
			[utils.asGridCoords(-1, 6)]: true,
			[utils.asGridCoords(-1, 7)]: true,
			[utils.asGridCoords(-1, 8)]: true,
			[utils.asGridCoords(-1, 9)]: true,
			[utils.asGridCoords(-1, 10)]: true,
			[utils.asGridCoords(-1, 11)]: true,
			[utils.asGridCoords(-1, 12)]: true,
			[utils.asGridCoords(-1, 13)]: true,
			[utils.asGridCoords(-1, 14)]: true,
			[utils.asGridCoords(-1, 15)]: true,
			[utils.asGridCoords(-1, 16)]: true,
			[utils.asGridCoords(-1, 17)]: true,
			[utils.asGridCoords(-1, 18)]: true,
			[utils.asGridCoords(-1, 19)]: true,


		}
	},
}
