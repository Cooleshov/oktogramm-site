import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

let offset
function checkWindowWidth() {
	if (window.innerWidth < 850) {
		offset = 125
	} else {
		offset = 87
	}
	return offset
}

checkWindowWidth()

document.querySelector(".heroblock__about").addEventListener("click", () => {
	gsap.to(window, {
		duration: 0.5,
		scrollTo: { y: "#education", offsetY: offset },
	})
})
