export default class Accordion {
	// CSS class names
	#CLASS_NAME_HEADER = "accordion__header";
	#CLASS_NAME_TITLE = "accordion__title";
	#CLASS_NAME_TITLE_COLLAPSED = "accordion__title--collapsed";
	#CLASS_NAME_LIST_TRANSITION = "accordion__list--transition";
	#CLASS_NAME_LIST = "accordion__list";
	#CLASS_NAME_LIST_SHOW = "accordion__list--show";

	#ELEMENT_NOT_FOUND =
		"Accordion does not have an element with the class name {className}";

	#isTransitioning = false;

	constructor(element) {
		element.addEventListener("click", this.#clickHandler.bind(this));
	}

	#clickHandler(e) {
		const isClickedHeader = e.target.closest(`.${this.#CLASS_NAME_HEADER}`);

		if (isClickedHeader && !this.#isTransitioning) {
			const headerElement = this.#getElement(
				e.target,
				this.#CLASS_NAME_HEADER,
				"closest"
			);
			const titleElement = this.#getElement(
				headerElement,
				this.#CLASS_NAME_TITLE,
				"querySelector"
			);
			const listElement = this.#getElement(
				headerElement,
				this.#CLASS_NAME_LIST,
				"nextElementSibling"
			);

			titleElement.classList.toggle(this.#CLASS_NAME_TITLE_COLLAPSED);
			if (this.#isHidden(listElement)) {
				this.#hide(listElement);
			} else {
				this.#show(listElement);
			}
		}
	}

	#hide(listElement) {
		listElement.style.height = `${listElement.scrollHeight}px`;
		// https://gist.github.com/paulirish/5d52fb081b3570c81e3a
		listElement.offsetLeft;

		listElement.classList.add(this.#CLASS_NAME_LIST_TRANSITION);
		listElement.classList.remove(this.#CLASS_NAME_LIST);
		listElement.classList.remove(this.#CLASS_NAME_LIST_SHOW);
		listElement.style.height = "";
		this.#isTransitioning = true;

		const onCompleteTransition = () => {
			this.#isTransitioning = false;
			listElement.classList.remove(this.#CLASS_NAME_LIST_TRANSITION);
			listElement.classList.add(this.#CLASS_NAME_LIST);
		};
		this.executeCallback(listElement, onCompleteTransition);
	}

	#show(listElement) {
		listElement.classList.add(this.#CLASS_NAME_LIST_TRANSITION);
		listElement.classList.remove(this.#CLASS_NAME_LIST);
		listElement.style.height = listElement.scrollHeight + "px";
		this.#isTransitioning = true;

		const onCompleteTransition = () => {
			this.#isTransitioning = false;
			listElement.style.height = "";
			listElement.classList.remove(this.#CLASS_NAME_LIST_TRANSITION);
			listElement.classList.add(this.#CLASS_NAME_LIST);
			listElement.classList.add(this.#CLASS_NAME_LIST_SHOW);
		};
		this.executeCallback(listElement, onCompleteTransition);
	}

	executeCallback(listElement, callback) {
		const handler = () => {
			listElement.removeEventListener("transitionend", handler);
			callback();
		};

		listElement.addEventListener("transitionend", handler);

		setTimeout(() => {
			listElement.dispatchEvent(new Event("transitionend"));
		}, this.#computeTransitionDurationToMs(listElement));
	}

	// helper methods
	#getElement(parentElement, elementClassName, operation) {
		const element =
			operation === "nextElementSibling"
				? parentElement[operation]
				: parentElement[operation](`.${elementClassName}`);

		if (!element || !element.classList.contains(elementClassName)) {
			throw new Error(
				this.#ELEMENT_NOT_FOUND.replace("{className}", elementClassName)
			);
		}
		return element;
	}

	#computeTransitionDurationToMs(element) {
		let { transitionDuration: transitionDurationStyle } =
			window.getComputedStyle(element);
		let transitionDuration;
		if (transitionDurationStyle.includes(".")) {
			transitionDuration = Number.parseFloat(
				transitionDurationStyle.split(".")[1]
			);
		} else {
			transitionDuration = Number.parseInt(transitionDurationStyle);
		}

		return transitionDuration * 1000;
	}

	#isHidden(listElement) {
		return listElement.classList.contains(this.#CLASS_NAME_LIST_SHOW);
	}
}
