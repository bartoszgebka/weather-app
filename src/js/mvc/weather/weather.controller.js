import location from "../../../img/location.svg";
import searchWithShadow from "../../../img/search-with-shadow.svg";
import search from "../../../img/search.svg";
import { Controller } from "../controller";
import { WeatherModel } from "./weather.model";
import { WeatherView } from "./weather.view";
import { getCurrentDate } from "../../helpers/helpers";

export class WeatherController extends Controller {
	view = new WeatherView();
	#model = new WeatherModel();

	constructor(applicationService, headerService, footerService, coordinates) {
		super(applicationService, headerService, footerService);
		this.#init(coordinates);
	}

	async #init(coordinates) {
		try {
			this.view.blockScreen();

			await this.#model.getCurrentWeather(coordinates?.lat, coordinates?.lon);

			this.view.render(this.#model.weatherState);

			this.headerService.setData(this.#getTitle());
			this.headerService.setOperations(
				this.#getOperations(["header__operation", "header__operation--icon"], searchWithShadow)
			);
			this.footerService.setOperations(this.#getOperations(["operation-bar__icon"], search));
		} catch (error) {
			console.error(error);
			this.view.showError(error.message);
		} finally {
			this.view.unblockScreen();
		}
	}

	#getTitle() {
		return { title: this.#model.weatherState.city, subtitle: getCurrentDate(), icon: location };
	}

	#getOperations(classList, icon) {
		const anchor = document.createElement("a");
		classList.forEach((cl) => anchor.classList.add(cl));
		anchor.title = "Search";

		const img = document.createElement("img");
		img.src = icon;
		img.alt = "Search";

		anchor.prepend(img);

		anchor.addEventListener("click", () => {
			this.applicationService.changeController({ name: "SearchController" });
		});

		return [anchor];
	}
}
