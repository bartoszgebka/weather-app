import { Model } from "../model";

export class SearchModel extends Model {
	#NETLIFY_FUNCTIONS_PATH = "/.netlify/functions";
	cities;

	async getCities(text) {
		try {
			if (text) {
				const data = await this.getData(`${this.#NETLIFY_FUNCTIONS_PATH}/find-city?text=${text}`);
				this.cities = [...data];
			} else {
				this.cities = [];
			}
		} catch (error) {
			throw error;
		}
	}
}
