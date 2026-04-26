let dragItems = document.querySelectorAll(".dragItems")
let imgs = document.querySelectorAll(".img")
let IMG = document.querySelector(".IMG")
let left = document.querySelector(".left")
let right = document.querySelector(".right")
let textRight = document.getElementById("textRight")
let textLeft = document.getElementById("textLeft")
let actionRight = document.getElementById("actionRight")
let actionLeft = document.getElementById("actionLeft")
let sumRight = document.getElementById("sumRight")
let sumLeft = document.getElementById("sumLeft")
let SumLeft = document.getElementById("SumLeft")
let SumRight = document.getElementById("SumRight")
let SUM = document.getElementById("SUM")
let CHOISE = document.querySelector(".CHOISE")
let choises = document.querySelectorAll(".choice")
let whhoDrag = ""
let isDragging = false
let numberLeft = 5
let numberRight = 6
let current = null
let from = null
let isChoise = false
textLeft.textContent = numberLeft
textRight.textContent = numberRight

function random() {
	return Math.ceil(Math.random() * 8 + 1)
}
function insert(parent, bil, child) {
	let countAnak = 0
	let rows = parent.querySelectorAll("div")

	for (let index = 0; index < 4; index++) {
		let col = rows[index].dataset.bilCol
		let bilChild = rows[index].querySelector("div") == null ? 0 : ""
		
		for (let i = bilChild; i < col; i++) {
			if (countAnak == bil) return
				rows[index].appendChild(child.cloneNode(true))
				countAnak++
		}
		
			
	}
}
function asd() {
	let n1, n2
	do {
		n1 = random()
		n2 = random()
	} while (n1 + n2 < 10)
	numberLeft = n1
	numberRight = n2

	let node = document.createElement("div")
	node.classList.add("img")
	node.classList.add("dragItems")

	insert(left, numberLeft, node)
	insert(right, numberRight, node)
	dragItems = document.querySelectorAll(".dragItems")
	textLeft.textContent = numberLeft
	textRight.textContent = numberRight
}
asd()

function sub(valOri, valMinus) {
	if (valMinus > 0) return `${valOri} (+ ${Math.abs(valMinus)})`
	else if (valMinus < 0) return `${valOri} (- ${Math.abs(valMinus)})`
	else return `${valOri}`
}

function jwp(valOri, valMinus) {
	if (valMinus > 0) return `${valOri + Math.abs(valMinus)}`
	else if (valMinus < 0) return `${valOri - Math.abs(valMinus)}`
	else return `${valOri + Math.abs(valMinus)}`
}

function half(valOri, valMinus) {
	// console.log(valOri);
	// console.log(valMinus);

	if (valMinus > 0) return `${valOri} + ${Math.abs(valMinus)}`
	else if (valMinus < 0) return `${valOri} - ${Math.abs(valMinus)}`
	else return `${valOri} + ${Math.abs(valMinus)}`

}

function ctv(val) {
	if (val > 0) {
		return `+${Math.abs(val)}`
	} else if (val < 0) {
		return `-${Math.abs(val)}`
	} else {
		return 0
	}
}

dragItems.forEach(img => {
	img.addEventListener("mousedown", e => {
		isDragging = true
		current = img

		if (!(e.target.classList.contains("choice"))) {
			whhoDrag = "apple"
			from = img.parentElement.classList.contains("left") ? "left" : "right"

			IMG.style.opacity = 1
			IMG.style.left = (e.pageX - IMG.offsetWidth / 2) + "px"
			IMG.style.top = (e.pageY - IMG.offsetHeight / 2) + "px"

		} else {
			whhoDrag = "choise"

			CHOISE.style.opacity = 1
			CHOISE.style.left = (e.pageX - IMG.offsetWidth / 2) + "px"
			CHOISE.style.top = (e.pageY - IMG.offsetHeight / 2) + "px"

			SUM.classList.add("yellow")
		}

	})
})

document.addEventListener("mouseup", e => {
	isDragging = false

	if (whhoDrag == "apple") {

		IMG.style.opacity = 0

		left.classList.remove("highlight")
		right.classList.remove("highlight")

		let rectRight = right.getBoundingClientRect()
		let rectLeft = left.getBoundingClientRect()

		let inRight =
			e.clientX >= rectRight.left &&
			e.clientX <= rectRight.right &&
			e.clientY >= rectRight.top &&
			e.clientY <= rectRight.bottom

		let inLeft =
			e.clientX >= rectLeft.left &&
			e.clientX <= rectLeft.right &&
			e.clientY >= rectLeft.top &&
			e.clientY <= rectLeft.bottom

		let valRight = parseInt(actionRight.textContent)
		let valLeft = parseInt(actionLeft.textContent)
		if (current) {
			// LEFT → RIGHT
			if (inRight && from === "right") {
				let childs = document.querySelectorAll(".right > div > div")
				if (childs.length > 9) return
				// right.appendChild(current)
				valRight += 1
				valLeft -= 1
				// numberRight += 1
				// numberLeft -= 1
				let rows = document.querySelectorAll(".right > div")
				let isAdded = false

				rows.forEach(row => {
					if (isAdded) return
					let childs = row.querySelectorAll(".dragItems")
					if (row.dataset.bilCol != childs.length) {
						row.appendChild(current)
						isAdded = true
						return
					}
				})
			}

			// RIGHT → LEFT
			else if (inLeft && from === "right") {
				let rows = document.querySelectorAll(".left > div")
				let childs = document.querySelectorAll(".left > div > div")
				if (childs.length > 9) return
				
				
				let isAdded = false

				rows.forEach(row => {
					if (isAdded) return
					let childs = row.querySelectorAll(".dragItems")
					if (row.dataset.bilCol != childs.length) {
						row.appendChild(current)
						isAdded = true
						return
					}
				})
				valRight -= 1
				valLeft += 1
				// numberRight -= 1
				// numberLeft += 1

			}

			textRight.textContent = numberRight
			textLeft.textContent = numberLeft
			actionLeft.textContent = ctv(valLeft)
			actionRight.textContent = ctv(valRight)
			sumLeft.textContent = half(numberLeft, valLeft)
			sumRight.textContent = half(numberRight, valRight)

			SumLeft.textContent = jwp(numberLeft, valLeft)
			SumRight.textContent = jwp(numberRight, valRight)

			// textLeft.textContent = sub(numberLeft, valLeft)
			// textRight.textContent = sub(numberRight, valRight)

			SUM.textContent = (numberLeft + numberRight)
		}

		current = null

	} else {
		CHOISE.style.opacity = 0
		SUM.classList.remove("yellow")

	}
})

document.addEventListener("mousemove", e => {
	if (!isDragging) return

	if (whhoDrag == "apple") {

		left.classList.remove("highlight")
		right.classList.remove("highlight")

		IMG.style.left = (e.pageX - IMG.offsetWidth / 2) + "px"
		IMG.style.top = (e.pageY - IMG.offsetHeight / 2) + "px"

		// HIGHLIGHT LOGIC
		let rectRight = right.getBoundingClientRect()
		let rectLeft = left.getBoundingClientRect()

		// Check if hovering over Right
		if (e.clientX >= rectRight.left && e.clientX <= rectRight.right &&
			e.clientY >= rectRight.top && e.clientY <= rectRight.bottom) {
			right.classList.add("highlight")
		} else {
			right.classList.remove("highlight")
		}

		// Check if hovering over Left
		if (e.clientX >= rectLeft.left && e.clientX <= rectLeft.right &&
			e.clientY >= rectLeft.top && e.clientY <= rectLeft.bottom) {
			left.classList.add("highlight")
		} else {
			left.classList.remove("highlight")
		}
	} else {
		CHOISE.style.left = (e.pageX - IMG.offsetWidth / 2) + "px"
		CHOISE.style.top = (e.pageY - IMG.offsetHeight / 2) + "px"
	}
})