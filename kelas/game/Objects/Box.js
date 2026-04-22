class Box extends Subject {
	constructor(config){
		super(config)
		this.isBox = true
		this.data = config.data 
	}
}