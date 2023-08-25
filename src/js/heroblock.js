import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
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

const video = document.querySelector(".heroblock__video")
ScrollTrigger.create({
	start: "top center",
	end: "bottom bottom",
	trigger: ".education",
	onEnter: () => video.play(),
	onLeave: () => video.pause(),
	onEnterBack: () => video.play(),
})
