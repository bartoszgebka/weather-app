export class Component {
	#componentName;

	constructor(name) {
		this.#componentName = name;
	}

	checkRequiredParameters(...parameters) {
		if (parameters.some((p) => p == null)) {
			throw new Error(`${this.#componentName}: missing required parameters.`);
		}
	}

	getElement(parentElement, elementClassName, operation) {
		const element =
			operation === "nextElementSibling"
				? parentElement[operation]
				: parentElement[operation](`.${elementClassName}`);

		if (!element || !element.classList.contains(elementClassName)) {
			throw new Error(
				`${this.#componentName}: no element with the class name  '${elementClassName}'`
			);
		}
		return element;
	}

	// https://gist.github.com/paulirish/5d52fb081b3570c81e3a
	reload(el) {
		el.offsetHeight;
	}

	executeCallbackWhenTransitionEnd(element, callback) {
		const handler = () => {
			element.removeEventListener("transitionend", handler);
			callback();
		};

		element.addEventListener("transitionend", handler);

		setTimeout(() => {
			element.dispatchEvent(new Event("transitionend"));
		}, this.#computeTransitionDurationToMs(element));
	}

	#computeTransitionDurationToMs(element) {
		let { transitionDuration: transitionDurationStyle } = window.getComputedStyle(element);
		let transitionDuration;
		if (transitionDurationStyle.includes(".")) {
			transitionDuration = Number.parseFloat(transitionDurationStyle.split(".")[1]);
		} else {
			transitionDuration = Number.parseInt(transitionDurationStyle);
		}

		return transitionDuration * 1000;
	}
}
