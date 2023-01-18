import { Component } from "../component";

export default class Header extends Component {
	// CSS class names
	#CLASS_NAME_HEADER = "header";
	#CLASS_NAME_HEADER_TITLE = "header__title";
	#CLASS_NAME_HEADER_SUBTITLE = "header__subtitle";
	#CLASS_NAME_HEADER_OPERATIONS = "header__operations";

	#bodyEl;
	#headerEl;
	#titleEl;
	#subtitleEl;
	#operationsEl;

	constructor() {
		super("Header");
		this.#init();
	}

	#init() {
		this.#bodyEl = document.querySelector("body");
		this.#createHeaderElement();
	}

	#createHeaderElement() {
		const markup = `
				<header class="${this.#CLASS_NAME_HEADER}">
			<div class="container">
				<div class="header__wrapper">
					<h1 class="${this.#CLASS_NAME_HEADER_TITLE}">
						-
					</h1>
				</div>
				<div class="header__operations">
	
				</div>
			</div>
		</header>`;

		this.#bodyEl.insertAdjacentHTML("afterbegin", markup);
		this.#headerEl = this.#bodyEl.querySelector(`:scope > .${this.#CLASS_NAME_HEADER}`);
		this.#titleEl = this.#headerEl.querySelector(`.${this.#CLASS_NAME_HEADER_TITLE}`);
		this.#subtitleEl = this.#headerEl.querySelector(`.${this.#CLASS_NAME_HEADER_SUBTITLE}`);
		this.#operationsEl = this.#headerEl.querySelector(`.${this.#CLASS_NAME_HEADER_OPERATIONS}`);
	}

	setTitle(headerTitle) {
		this.clear(this.#titleEl);

		const { title, subtitle, icon } = headerTitle;
		const markups = [];
		if (icon) {
			markups.push(`<img src="${icon}" class="header__icon" alt="location" />`);
		}
		markups.push(title);
		this.#titleEl.insertAdjacentHTML("afterbegin", markups.join(""));

		this.#removeSubTitleIfExists();
		if (subtitle) {
			this.#createSubTitle(subtitle);
		}
	}

	#removeSubTitleIfExists() {
		const childTitle = this.#titleEl.nextElementSibling;
		if (childTitle) {
			childTitle.remove();
		}
	}

	#createSubTitle(subtitle) {
		const markup = `<p class="${this.#CLASS_NAME_HEADER_SUBTITLE}">${subtitle}</p>`;
		this.#titleEl.insertAdjacentHTML("afterend", markup);
	}

	setOperations(operations) {
		this.clear(this.#operationsEl);
		operations.forEach((operation) => this.#operationsEl.prepend(operation));
	}
}
