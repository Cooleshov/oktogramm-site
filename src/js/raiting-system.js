import { gsap } from "gsap"
import buttonBefore from "../assets/images/levels-system/before.svg"
import buttonBeforeBlack from "../assets/images/levels-system/before-black.svg"
import buttonBeforeDisabled from "../assets/images/levels-system/before-disabled.svg"
import buttonNext from "../assets/images/levels-system/next-black.svg"
import buttonNextBlackDisabled from "../assets/images/levels-system/next-black-disabled.svg"

// Система уровней

let activePage = 0
let step = 0
let mainSelector = ".rating-system__container"

let selectors = {
	levelPage: mainSelector + " .rating-system__main-text",
	dash: mainSelector + " .rating-system__bar",
	button: mainSelector + " .rating-system__button",
	counter: mainSelector + " .rating-system__state",

	headerText: ".rating-system__header-text",
	blackButton: ".rating-system__black-button",
	divider: ".rating-system__divider",
	background: ".rating-system",
}

let levels = {}

// - Преобразование селекторов в рабочие элементы
for (const key in selectors) {
	levels[key] = document.querySelectorAll(selectors[key])
}

// - Ограничения на прокрутку страниц
function canTogglePage(reverse) {
	let result = true

	if (reverse && activePage === 0) {
		result = false
	} else if (!reverse && activePage === 5) {
		result = false
	}

	return result
}

// - Переключение индикаторов текущей страницы
function toggleDash(reverse) {
	if (!reverse) {
		gsap.to(levels.dash[activePage + 1], {
			duration: 0.3,
			backgroundColor: "#f63",
		})
	} else {
		gsap.to(levels.dash[activePage], {
			duration: 0.3,
			backgroundColor: "#dddddf",
		})
	}
}

// - Плавное изменение иконок у кнопок
async function changeButtonImage(buttonImage, image, duration) {
	let timeline = gsap
		.timeline({ paused: true })
		.to(buttonImage, { duration: duration, opacity: 0.5 })
		.set(buttonImage, { attr: { src: image } })
		.to(buttonImage, { duration: duration, opacity: 1 })
	timeline.play()
}

// - Переключение кнопки назад
function toggleButton(reverse) {
	let buttonImageBefore = levels.button[0].querySelector("img")
	let buttonImageNext = levels.button[1].querySelector("img")

	if (activePage === 1 && !reverse) {
		changeButtonImage(buttonImageBefore, buttonBefore)
		return
	} else if (activePage === 0 && reverse) {
		changeButtonImage(buttonImageBefore, buttonBeforeDisabled)
		return
	}

	if (activePage === 5 && !reverse) {
		changeButtonImage(buttonImageNext, buttonNext, 0.4)
		changeButtonImage(buttonImageBefore, buttonBeforeBlack, 0.4)
		return
	} else if ((activePage === 0 || activePage === 4) && reverse) {
		changeButtonImage(buttonImageNext, buttonNextBlackDisabled, 0.4)
		changeButtonImage(buttonImageBefore, buttonBefore, 0.4)
		return
	}
}

// - Анимация для переключения на чёный сектор
const levelsBlack = gsap
	.timeline({ paused: true })
	.to(levels.background, { duration: 0.125, background: "#080808" }, "<")
	.to(levels.headerText, { duration: 0.125, color: "#FFF" }, "<")
	.to(levels.divider, { duration: 0.125, background: "#373737" }, "<")
	.to(levels.button[0], { duration: 0.125, background: "#262626" }, "<")
	.to(levels.button[1], { duration: 0.125, background: "#262626" }, "<")
	.to(levels.counter, { duration: 0.125, color: "#FFF" }, "<")
	.to(levels.blackButton, { duration: 0.125, right: 0, autoAlpha: 1 }, "+0.15")

// - Функция переключения на чёрный сектор
function toggleBlack(reverse, changePage) {
	if (!reverse) {
		levelsBlack.play()
	} else {
		levelsBlack.reverse()
	}
}

// - Перелистывание страничек
function togglePage(reverse = false) {
	let durationTime
	if (!canTogglePage(reverse)) {
		return
	}

	if ((!reverse && activePage === 4) || (reverse && activePage === 5)) {
		durationTime = 0.4
	} else {
		durationTime = 0.125
	}

	step = reverse ? -1 : 1

	const changePage = gsap
		.timeline({ paused: true })
		.to(levels.levelPage[activePage], { duration: durationTime, autoAlpha: 0 })
		.to(levels.levelPage[activePage + step], {
			duration: durationTime,
			autoAlpha: 1,
		})

	changePage.play()
	if (!reverse && activePage === 4) {
		toggleBlack(false, changePage)
	} else if (reverse && activePage === 5) {
		toggleBlack(true, changePage)
	}

	toggleDash(reverse)

	activePage += step

	toggleButton(reverse)
	levels.counter[0].innerText = activePage + 1 + "/6"
}

// - Слушатели событий по нажатию кнопки
document
	.querySelector(".rating-system__button-next")
	.addEventListener("click", () => {
		togglePage()
	})

document
	.querySelector(".rating-system__button-before")
	.addEventListener("click", () => {
		togglePage(true)
	})
