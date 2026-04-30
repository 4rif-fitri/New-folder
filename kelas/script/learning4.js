let higlightNumber = 8

let pilihanStep1 = document.querySelectorAll(".q1 .pilihan")
let isPick = false
let step = 1

let step2Container = document.querySelector(".step2")
let delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



let eventStepOne = async (e) => {
	if (isPick) return
	isPick = true

	let choiseNumber = parseInt(e.target.textContent)

	if ((10 - choiseNumber) == higlightNumber) {
		e.target.classList.add("hijau")
		finishStepOne()
		return
	} else {
		e.target.classList.add("merah")
	}
	await delay(500)
	e.target.classList.remove("hijau")
	e.target.classList.remove("merah")


	isPick = false
}

let setupStepOne = () => {
	pilihanStep1.forEach(pilihan => {
		pilihan.addEventListener("click", eventStepOne)
	})
}
let finishStepOne = () => {
	isPick = false
	step++
	document.querySelector(".step1").classList.add("low-opacity")
	pilihanStep1.forEach(pilihan => {
		pilihan.removeEventListener("click", eventStepOne)
	})
	main()
}

let eventStep2 = async e => {
	if (isPick) return
	isPick = true

	let choiseNumber = parseInt(e.target.textContent)

	if (choiseNumber == 10) {
		e.target.classList.add("hijau")
		finishStepTwo()
		return
	} else {
		e.target.classList.add("merah")
	}
	await delay(500)
	e.target.classList.remove("hijau")
	e.target.classList.remove("merah")


	isPick = false
}

let setupStepTwo = () => {
	step2Container.classList.remove("hidden")
	step2Container.querySelector("h4").classList.remove("hidden")
	step2Container.querySelectorAll(".numbers")[0].classList.remove("hidden")
	step2Container.querySelector(".action").classList.remove("hidden")
	step2Container.querySelector(".dialog").classList.remove("hidden")
	step2Container.querySelectorAll(".numbers")[1].classList.remove("hidden")
	step2Container.querySelectorAll(".numbers")[2].classList.remove("hidden")

	step2Container.querySelectorAll(".pilihan").forEach(btn => {
		btn.addEventListener("click", eventStep2)
	})

}
let finishStepTwo = () => {
	isPick = false
	step++
	document.querySelector(".step2").classList.add("low-opacity")
	step2Container.querySelectorAll(".pilihan").forEach(btn => {
		btn.addEventListener("click", eventStep2)
	})
}

let setupStepThree = () => {

}
let finishStepThree = () => {

}
let main = () => {
	if (step == 1) setupStepOne()
	else if (step == 2) setupStepTwo()
	else if (step == 3) setupStepThree()
	else if (step == 4) setupStepFour()
	else if (step == 5) setupStepFive()

}
main()