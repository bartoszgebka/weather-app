import View from "../view";
import { SearchForm } from "../../components/search-form/search-form";
import { CitiesList } from "../../components/cities-list/cities.list";

export class SearchView extends View {
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
		const container = document.createElement("div");
		container.classList.add("container");
		this.mainElement.append(container);
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

	renderCities(datas) {
		this.#citiesList.clear();
		datas?.forEach((data) => this.#citiesList.addCity(data));
	}
}
