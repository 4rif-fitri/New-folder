let items = document.querySelectorAll(".item")
let ITEM = document.querySelector(".ITEM")
let dropZone = document.querySelector(".kosong")
let dropArea = dropZone.getBoundingClientRect()
let isDrag = false
let soalan = document.querySelectorAll(".soalan")
let bulat = document.querySelectorAll(".pecah h4")
let atas = document.querySelector(".top")
let bawah = document.querySelector(".bottom")
let selectNumber

let ans = []
let number1,number2

function shuffleArray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	// console.log(arr);
}

function setup() {
	number1 = Math.floor(Math.random() * 8) + 1;
	number2 = 10 - number1;

	ans[0] = number1 - 1;
	ans[1] = number1;
	ans[2] = number1 + 1;
	ans[3] = number1 + (Math.random() < 0.5 ? 2 : -2);

	shuffleArray(ans);

	// bulat[0].textContent = number1
	bulat[1].textContent = number2

	// soalan[0].textContent = number1
	soalan[1].textContent = number2
	
	// if(Math.random() < 0.5){
	// 	bulat[0].textContent = ""
	// 	soalan[0].textContent = ""

	// }else{
	// 	bulat[1].textContent = ""
	// 	soalan[1].textContent = ""
	// }

	
	for(let i = 0; i < number1; i++){
		let img = document.createElement("img")
		img.src = "./imgs/apple.png"
		atas.appendChild(img)
	}
	for (let i = 0; i < number2; i++) {
		let img = document.createElement("img")
		img.src = "./imgs/apple.png"
		bawah.appendChild(img)
	}
	

	items.forEach((item,index) => {
		item.textContent = ans[index] 
	})
}

setup();

items.forEach(item => {
	item.addEventListener("mousedown", e => {
		selectNumber = parseInt(e.target.textContent)
		ITEM.textContent = e.target.textContent
		ITEM.style.opacity = 1
		ITEM.style.left = (e.pageX - ITEM.offsetWidth / 2) + "px"
		ITEM.style.top = (e.pageY - ITEM.offsetHeight / 2) + "px"
		dropZone.classList.add("higlight")
		isDrag = true
	})
});

document.addEventListener("mousemove", e => {
	if (!isDrag) return
	ITEM.style.left = (e.pageX - ITEM.offsetWidth / 2) + "px"
	ITEM.style.top = (e.pageY - ITEM.offsetHeight / 2) + "px"

	
	let isHereDropZone =
		e.clientX >= dropArea.left &&
		e.clientX <= dropArea.right &&
		e.clientY >= dropArea.top &&
		e.clientY <= dropArea.bottom

	if (isHereDropZone) dropZone.classList.add("oren")
	else dropZone.classList.remove("oren")
		

})
document.addEventListener("mouseup", e => {

	ITEM.style.opacity = 0
	dropZone.classList.remove("higlight")
	dropZone.classList.remove("oren")

	if(
		e.clientX >= dropArea.left &&
		e.clientX <= dropArea.right &&
		e.clientY >= dropArea.top &&
		e.clientY <= dropArea.bottom
	){
		dropZone.classList.remove("higlight")
		dropZone.classList.remove("oren")

		if (selectNumber == number1){
			bulat[0].textContent = selectNumber
			bulat[0].classList.add("betul")
			e.target.textContent = selectNumber
			e.target.classList.add("betul")
		}
	}
	isDrag = false
})