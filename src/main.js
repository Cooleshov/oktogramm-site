import "./scss/style.scss"
import "./index.html"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(TextPlugin)

let states = {
	scopes: {
		block1: {
			class: ".scope__image--1",
			button: ".scope__button-1",
			state: false,
		},
		block2: {
			class: ".scope__image--2",
			button: ".scope__button-2",
			state: false,
		},
		block3: {
			class: ".scope__image--3",
			button: ".scope__button-3",
			state: false,
		},
		block4: {
			class: ".scope__image--4",
			button: ".scope__button-4",
			state: false,
		},
		block5: {
			class: ".scope__image--5",
			button: ".scope__button-5",
			state: false,
		},
	},
}

function toggleHide(element, object) {
	let cssClass = object[element].class
	let state = object[element].state

	if (state) {
		gsap.to(cssClass, {
			duration: 0.25,
			autoAlpha: 1,
		})
		object[element].state = false
	} else {
		gsap.to(cssClass, {
			duration: 0.25,
			autoAlpha: 0,
		})
		object[element].state = true
	}
}

function changeButtonText(element, object) {
	let cssClass = object[element].button + " p"
	let state = object[element].state

	if (state) {
		gsap.set(cssClass, { text: "Понятно" })
	} else {
		gsap.set(cssClass, { text: "Подробнее" })
	}
}

function scopeToggle(element, object) {
	toggleHide(element, object)
	changeButtonText(element, object)

	let plus = document.querySelector(
		object[element].button + " .scope__button-image:nth-child(1)"
	)
	let chechmark = document.querySelector(
		object[element].button + " .scope__button-image:nth-child(2)"
	)
	plus.classList.toggle("scope__button--disabled")
	chechmark.classList.toggle("scope__button--disabled")
}

document.querySelector(".scope__button-1").onclick = () =>
	scopeToggle("block1", states.scopes)
document.querySelector(".scope__button-2").onclick = () =>
	scopeToggle("block2", states.scopes)
document.querySelector(".scope__button-3").onclick = () =>
	scopeToggle("block3", states.scopes)
document.querySelector(".scope__button-4").onclick = () =>
	scopeToggle("block4", states.scopes)
document.querySelector(".scope__button-5").onclick = () =>
	scopeToggle("block5", states.scopes)
