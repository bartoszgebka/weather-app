import { Component } from "../component";
export class SearchForm extends Component {
	// CSS class names
	#CLASS_NAME_FORM = "search-form";
	#CLASS_NAME_INPUT_TEXT = "form-input-text";

	#containerEl;
	#formEl;
	#inputEl;
	#typingTimer;

	constructor() {
		super("Search form");
		this.#init();
	}

	#init() {
		this.#containerEl = this.mainEl.querySelector(".container");
		this.#createFormEl();
		this.#preventEnterSubmit();
	}

	#createFormEl() {
		const markup = `
        <form class="${this.#CLASS_NAME_FORM}">
					<input type="text" class="${this.#CLASS_NAME_INPUT_TEXT}" placeholder="Wpisz nazwę miasta" />
					<input type="submit" hidden />
				</form>`;

		this.#containerEl.insertAdjacentHTML("afterbegin", markup);
		this.#formEl = this.#containerEl.querySelector(`:scope > .${this.#CLASS_NAME_FORM}`);
		this.#inputEl = this.#formEl.querySelector(`:scope > .${this.#CLASS_NAME_INPUT_TEXT}`);
	}

	#preventEnterSubmit() {
		this.#formEl.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
			}
		});
	}

	onChangeInput(handler) {
		this.#inputEl.addEventListener("input", () => {
			clearTimeout(this.#typingTimer);
			this.#typingTimer = setTimeout(() => {
				this.#inputEl.blur(); // lose focus
				handler(this.#inputEl.value);
			}, 300);
		});
	}
}
