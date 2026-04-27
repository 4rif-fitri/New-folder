let items = document.querySelectorAll(".item")
let ITEM = document.querySelector(".ITEM")
let dropZone = document.querySelector(".kosong")
let dropArea = dropZone.getBoundingClientRect()
let isDrag = false

items.forEach(item => {
	item.addEventListener("mousedown", e => {
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
	isDrag = false
	dropZone.classList.remove("oren")



	if(
		e.clientX >= dropArea.left &&
		e.clientX <= dropArea.right &&
		e.clientY >= dropArea.top &&
		e.clientY <= dropArea.bottom
	){
		console.log("drop");
		
	}

})