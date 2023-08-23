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

let sections = [
	"#heroblock",
	"#education",
	"#mentor",
	"#networking",
	"#levels-system",
	"#request",
]

let selectors = {
	header: ".header__desktop-links a",
	headerMobile: ".header__mobile-links a",
	footer: ".footer__links a",
}

let links = {}

/** Преобразование селекторов в рабочие элементы */
for (const key in selectors) {
	links[key] = document.querySelectorAll(selectors[key])
}

for (const key in links) {
	for (let i = 0; i < links[key].length; i++) {
		let button = links[key][i]
		button.addEventListener("click", () => {
			gsap.to(window, {
				duration: 1,
				scrollTo: { y: sections[i], offsetY: offset },
			})
		})
	}
}
