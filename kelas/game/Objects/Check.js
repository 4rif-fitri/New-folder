class Check extends GameObject {
	constructor(config) {
		super(config);
		this.isCheck = true;
		this.whoPijakMe = null
	}

	update() {
		// Kekal kosong
	}
	pijak(state, orang) {
		console.log("pijak");
		this.whoPijakMe = orang 
		const triggerAtPos = state.map.checkAllTrigger();
		triggerAtPos.forEach(element => {
			if (element.whoPijakMe instanceof Box) {
				let dataTrap = element.data
				let dataBox = element.whoPijakMe.data
				if (dataTrap == dataBox){
					console.log("same");
				}else{
					console.log("xsame");
				}
			}
				
		});
	}
}