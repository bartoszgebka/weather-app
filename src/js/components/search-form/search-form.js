import { Component } from "../component";
export class SearchForm extends Component {
	// CSS class names
	#CLASS_NAME_FORM = "search-form";
	#CLASS_NAME_INPUT_TEXT = "form-input-text";

	#containerEl;
	#inputEl;
	typingTimer;

	constructor() {
		super("Search form");
		this.#init();
	}

	#init() {
		this.#containerEl = this.mainEl.querySelector(".container");
		this.#createFormEl();
	}

	#createFormEl() {
		const markup = `
        <form class="${this.#CLASS_NAME_FORM}">
					<input type="text" class="${this.#CLASS_NAME_INPUT_TEXT}" placeholder="Wpisz nazwę miasta" />
				</form>`;

		this.#containerEl.insertAdjacentHTML("afterbegin", markup);
		this.#inputEl = this.#containerEl.querySelector(
			`:scope > .${this.#CLASS_NAME_FORM} > .${this.#CLASS_NAME_INPUT_TEXT}`
		);
	}

	onChangeInput(handler) {
		this.#inputEl.addEventListener("input", () => {
			clearTimeout(this.typingTimer);
			this.typingTimer = setTimeout(() => handler(this.#inputEl.value), 300);
		});
	}
}
