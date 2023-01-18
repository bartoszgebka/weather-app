import applicationService from "./services/application.service";
import headerService from "./services/header.service";
import footerService from "./services/footer.service";
import applicationView from "./application.view";
import { WeatherController } from "./weather/weather.controller";
import { SearchController } from "./search/search.controller";

export default class ApplicationController {
	#currentController;

	constructor() {
		this.#init();
		this.#currentController = new WeatherController(
			applicationService,
			headerService,
			footerService
		);
	}

	#init() {
		applicationService.onChangeController().subscribe((data) => {
			this.#currentController.clear();
			const { name, lat, lon } = data;
			if (name === "SearchController") {
				this.#currentController = new SearchController(
					applicationService,
					headerService,
					footerService
				);
			} else {
				this.#currentController = new WeatherController(
					applicationService,
					headerService,
					footerService,
					{ lat, lon }
				);
			}
		});

		headerService.onDataChange().subscribe((data) => {
			applicationView.renderHeaderData(data);
		});

		headerService.onOperationsChange().subscribe((operations) => {
			applicationView.addHeaderOperations(operations);
		});

		footerService.onOperationsChange().subscribe((operations) => {
			applicationView.addFooterOperations(operations);
		});
	}
}
