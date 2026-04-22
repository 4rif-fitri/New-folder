class Subject extends GameObject {
	constructor(config) {
		super(config)
		this.movingProgressRemaining = 0
		this.isPlayerControlled = config.isPlayerControlled || false

		this.directionUpdate = {
			"up": ["y", -1],
			"down": ["y", 1],
			"left": ["x", -1],
			"right": ["x", 1],
		}
	}

	update(state) {
		if (this.movingProgressRemaining > 0) {
			this.updatePosition();

			// SEMAK TRIGGER HANYA APABILA PERGERAKAN SELESAI
			if (this.movingProgressRemaining === 0) {
				const triggerAtPos = state.map.checkForTrigger(this.x, this.y);

				if (triggerAtPos) {
					// Jika objek ini (Box) berhenti di atas trap, panggil fungsi pijak
					triggerAtPos.pijak(state, this);
				}
			}
		} else {
			// Logic input player (sama seperti sebelum ini)
			if (this.isPlayerControlled && state.arrow) {
				this.startBehavior(state, {
					type: "walk",
					direction: state.arrow
				});
			}
			this.updateSprite(state);
		}
	}

	startBehavior(state, behavior) {
		this.direction = behavior.direction;
		if (behavior.type === "walk") {

			// Simpan hasil semakan ruang ke dalam variable targetSpace
			const targetSpace = state.map.isSpaceTaken(this.x, this.y, this.direction);

			if (targetSpace) {

				// Jika MC melanggar Item/Person, suruh objek itu 'walk' ke arah yang sama
				if (this.isPlayerControlled && targetSpace instanceof Box) {
					targetSpace.startBehavior(state, {
						type: "walk",
						direction: this.direction
					});
				}
				return; // MC berhenti supaya tidak bertindih
			}


			this.movingProgressRemaining = 16;
		}
	}

	updatePosition() {
		let [property, change] = this.directionUpdate[this.direction]
		this[property] += change
		this.movingProgressRemaining -= 1
	}

	updateSprite() {
		if (this.movingProgressRemaining > 0) {
			this.sprite.setAnimation("walk-" + this.direction)
			return
		}
		this.sprite.setAnimation("idle-" + this.direction)
	}
}