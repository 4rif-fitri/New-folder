class Reset extends GameObject {
	constructor(config) {
		super(config);
		this.isReset = true;
	}

	update() {
		// Kekal kosong
	}
	pijak(state, orang) {
		window.overworld.resetLevel();
	}
}