import { Model } from "../model";
import { WeatherState } from "./weather.state";

export class WeatherModel extends Model {
	#NETLIFY_FUNCTIONS_PATH = "/.netlify/functions";

	constructor() {
		super();
		this.weatherState = new WeatherState();
	}

	async getCurrentWeather(lat, lon) {
		try {
			if (!lat || !lon) {
				const position = await this.#getCurrentPosition();
				const { latitude, longitude } = position.coords;
				lat = latitude;
				lon = longitude;
			}
			const data = await this.getData(
				`${this.#NETLIFY_FUNCTIONS_PATH}/current-weather?lat=${lat}&lon=${lon}`
			);
			this.weatherState.setWeatherData(data);
		} catch (error) {
			throw error;
		}
	}

	#getCurrentPosition() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		}).catch(() => {
			throw new Error("Użytkownik ma wyłączoną obsługę geolokalizacji.");
		});
	}
}
