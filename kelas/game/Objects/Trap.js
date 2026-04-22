class Trap extends GameObject {
	constructor(config) {
		super(config);
		this.data = config.data
		this.isTrap = true;
		this.whoPijakMe = null
	}
	update(state) {
		if (this.whoPijakMe) {
			// Jika objek di atas trap mula bergerak ATAU koordinat sudah berubah
			if (this.whoPijakMe.movingProgressRemaining > 0 ||
				this.whoPijakMe.x !== this.x ||
				this.whoPijakMe.y !== this.y) {

				this.whoPijakMe = null;
				console.log("Trap kini kosong (Box telah keluar)");
			}
		}
	}
	pijak(state, object) {
		// Only register Boxes, ignore the Hero (Person)
		if (object instanceof Box) {
			this.whoPijakMe = object;
			console.log("Box landed on trap:", this.data);
		}
	}
}