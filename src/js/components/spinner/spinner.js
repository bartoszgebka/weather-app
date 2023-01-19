import { Component } from "../component";

export class Spinner extends Component {
	// CSS class names
	#CLASS_NAME_BLOCK_SCREEN = "block-screen";
	#CLASS_NAME_SHOW = "block-screen--show";
	#CLASS_NAME_SPINNER = "spinner";

	#blockScreenEl;

	constructor() {
		super("Spinner");
	}

	block() {
		this.#blockScreenEl = this.#createBlockScreen();
		this.reload(this.#blockScreenEl);
		this.#blockScreenEl.clasList.add(this.#CLASS_NAME_SHOW);
	}

	#createBlockScreen() {
		const markup = `
			<div class="${this.#CLASS_NAME_BLOCK_SCREEN}">
				<div class="${this.#CLASS_NAME_SPINNER}">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>`;

		this.mainEl.insertAdjacentHTML("afterbegin", markup);
		return this.mainEl.querySelector(`:scope > .${this.#CLASS_NAME_BLOCK_SCREEN}`);
	}

	unblock() {
		if (!this.#blockScreenEl) {
			throw new Error(`Spinner not found.`);
		}
		this.#blockScreenEl.classList.remove(this.#CLASS_NAME_SHOW);
		const onCompleteTransition = () => {
			this.#blockScreenEl.remove();
		};
		this.executeCallbackWhenTransitionEnd(this.#blockScreenEl, onCompleteTransition);
	}
}
