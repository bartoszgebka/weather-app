import { Component } from "../component";

export default class Accordion extends Component {
	// CSS class names
	#CLASS_NAME_HEADER = "accordion__header";
	#CLASS_NAME_TITLE = "accordion__title";
	#CLASS_NAME_TITLE_COLLAPSED = "accordion__title--collapsed";
	#CLASS_NAME_LIST_TRANSITION = "accordion__list--transition";
	#CLASS_NAME_LIST = "accordion__list";
	#CLASS_NAME_LIST_SHOW = "accordion__list--show";

	#isTransitioning = false;

	constructor(element) {
		super("Accordion");
		this.checkRequiredParameters(element);
		element.addEventListener("click", this.#clickHandler.bind(this));
	}

	#clickHandler(e) {
		const isClickedHeader = e.target.closest(`.${this.#CLASS_NAME_HEADER}`);

		if (isClickedHeader && !this.#isTransitioning) {
			const headerElement = this.getElement(e.target, this.#CLASS_NAME_HEADER, "closest");
			const titleElement = this.getElement(headerElement, this.#CLASS_NAME_TITLE, "querySelector");
			const listElement = this.getElement(
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
		this.reload(listElement);

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
		this.executeCallbackWhenTransitionEnd(listElement, onCompleteTransition);
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
		this.executeCallbackWhenTransitionEnd(listElement, onCompleteTransition);
	}

	// helper methods
	#isHidden(listElement) {
		return listElement.classList.contains(this.#CLASS_NAME_LIST_SHOW);
	}
}
