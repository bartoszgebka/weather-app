import View from "../view";
import { SearchForm } from "../../components/search-form/search-form";
import { CitiesList } from "../../components/cities-list/cities.list";

export class SearchView extends View {
	#CLASS_NAME_RESULTS_NOT_FOUND = "results-not-found";

	#containerEl;
	#searchForm;
	#citiesList;

	constructor() {
		super();
		this.#setBackgrund();
		this.#createContainer();
		this.#searchForm = new SearchForm();
		this.#citiesList = new CitiesList();
	}

	#createContainer() {
		this.#containerEl = document.createElement("div");
		this.#containerEl.classList.add("container");
		this.mainElement.append(this.#containerEl);
	}

	#setBackgrund() {
		this.bodyElement.classList.add("bg-gray--800");
	}

	addInputHandler(handler) {
		this.#searchForm.onChangeInput(handler);
	}

	addClickCityHandler(handler) {
		this.#citiesList.addCityClickHandler(handler);
	}

	renderCities(dataset) {
		this.#citiesList.clear();

		this.#removeNotFoundMessageIfExists();

		dataset.forEach((d) => this.#citiesList.addCity(d));
	}

	#removeNotFoundMessageIfExists() {
		const notFoundEl = this.#containerEl.querySelector(`.${this.#CLASS_NAME_RESULTS_NOT_FOUND}`);
		notFoundEl?.remove();
	}

	citiesNotFound() {
		this.#citiesList.clear();
		this.#removeNotFoundMessageIfExists();

		const notFoundParagraph = document.createElement("p");
		notFoundParagraph.classList.add(this.#CLASS_NAME_RESULTS_NOT_FOUND);
		notFoundParagraph.innerText = "Nie znaleziono wyników";

		this.#containerEl.append(notFoundParagraph);
	}
}
