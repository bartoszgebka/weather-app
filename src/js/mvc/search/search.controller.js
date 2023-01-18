import { Controller } from "../controller";
import home from "../../../img/home.svg";
import { SearchView } from "./search.view";
import { SearchModel } from "./search.model";

export class SearchController extends Controller {
	view = new SearchView();
	#model = new SearchModel();

	constructor(applicationService, headerService, footerService) {
		super(applicationService, headerService, footerService);

		this.headerService.setData(this.#getTitle());
		this.headerService.setOperations(
			this.#getOperations(["header__operation", "header__operation--icon"])
		);
		this.footerService.setOperations(this.#getOperations(["operation-bar__icon"]));
		this.view.addInputHandler(this.#inputHandler.bind(this));
		this.view.addClickCityHandler(this.#cityClickHandler.bind(this));
	}

	#getTitle() {
		return { title: "Pogoda" };
	}

	#getOperations(classList) {
		const anchor = document.createElement("a");
		classList.forEach((cl) => anchor.classList.add(cl));
		anchor.title = "Home";

		const img = document.createElement("img");
		img.src = home;
		img.alt = "Home";

		anchor.prepend(img);

		anchor.addEventListener("click", () => {
			this.applicationService.changeController({ name: "WeatherController" });
		});

		return [anchor];
	}

	async #inputHandler(text) {
		try {
			this.view.blockScreen();

			await this.#model.getCities(text);

			const {cities} = this.#model;
			if(cities?.length > 0) {
				this.view.renderCities(this.#model.cities);
			} else {
				this.view.citiesNotFound();
			}
		} catch (error) {
			console.error(error);
			this.view.showError(error.message);
		} finally {
			this.view.unblockScreen();
		}
	}

	#cityClickHandler(lat, lon) {
		this.applicationService.changeController({ name: "WeatherController", lat, lon });
	}
}
