import { Component } from "../component";

export default class Footer extends Component {
	// CSS class names
	#CLASS_NAME_FOOTER = "operation-bar";

	#bodyEl;
	#footerEl;

	constructor() {
		super("Footer");
		this.#init();
	}

	#init() {
		this.#bodyEl = document.querySelector("body");
		this.#createFooterElement();
	}

	#createFooterElement() {
		const markup = `<footer class="${this.#CLASS_NAME_FOOTER}"></footer>`;

		this.#bodyEl.insertAdjacentHTML("beforeend", markup);
		this.#footerEl = this.#bodyEl.querySelector(`:scope > .${this.#CLASS_NAME_FOOTER}`);
	}

	setOperations(operations) {
		this.clear(this.#footerEl);
		operations.forEach((operation) => this.#footerEl.prepend(operation));
	}
}
