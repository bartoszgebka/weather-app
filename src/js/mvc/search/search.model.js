import { Model } from "../model";

export class SearchModel extends Model {
	#NETLIFY_FUNCTIONS_PATH = "/.netlify/functions";
	cities;

	async getCities(text) {
		try {
			if (text) {
				const data = await this.getData(`${this.#NETLIFY_FUNCTIONS_PATH}/find-city?text=${text}`);
				this.cities = [...this.#unique(data, ["name.local_names.pl", "country"])];
			} else {
				this.cities = [];
			}
		} catch (error) {
			throw error;
		}
	}

	#unique(arr, keyProps) {
		return Object.values(
			arr.reduce((uniqueMap, entry) => {
				const key = keyProps.map((k) => entry[k]).join("|");
				if (!(key in uniqueMap)) uniqueMap[key] = entry;
				return uniqueMap;
			}, {})
		);
	}
}
