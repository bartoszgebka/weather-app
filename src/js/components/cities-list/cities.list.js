import { Component } from "../component";

export class CitiesList extends Component {
	// CSS class names
	#CLASS_NAME_LIST = "results";
	#CLASS_NAME_LIST_ITEM = "preview";
	#CLASS_NAME_LIST_ITEM_LINK = "preview__link";
	#CLASS_NAME_LIST_ITEM_TITLE = "preview__title";

	#containerEl;
	#listEl;

	constructor() {
		super("Cities list");
		this.#init();
	}

	#init() {
		this.#containerEl = this.mainEl.querySelector(".container");
		this.#createListEl();
	}

	#createListEl() {
		this.#listEl = document.createElement("ul");
		this.#listEl.classList.add(this.#CLASS_NAME_LIST);
		this.#containerEl.append(this.#listEl);
	}

	addCityClickHandler(handler) {
		this.#listEl.addEventListener("click", (e) => {
			e.preventDefault();
			const city = e.target.closest("a");
			const { lat, lon } = city.dataset;
			handler(lat, lon);
		});
	}

	addCity(data) {
		const { country, local_names: localNames, name, lat, lon } = data;
		const markup = `
      <li class="${this.#CLASS_NAME_LIST_ITEM}">
        <a href="" class="${this.#CLASS_NAME_LIST_ITEM_LINK}" data-lat="${lat}" data-lon="${lon}">
          <h3 class="${this.#CLASS_NAME_LIST_ITEM_TITLE}">
          ${country} ${localNames?.pl || name}
          </h3>
        </a>
      </li>
    `;
		this.#listEl.insertAdjacentHTML("beforeend", markup);
	}

	clear() {
		this.#listEl.innerHTML = null;
	}
}
