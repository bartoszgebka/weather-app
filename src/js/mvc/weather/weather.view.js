import View from "../view";
import { WeatherInfo } from "../../components/weather-info/weather-info";
import { getTimeOfDay } from "../../helpers/helpers";

export class WeatherView extends View {
	#weatherInfo;

	constructor() {
		super();
		this.#weatherInfo = new WeatherInfo();
	}

	render(weatherState) {
		this.#setBackgrund(weatherState.weather.type);
		this.#setWeatherInfo(weatherState.weather);
	}

	#setBackgrund(main) {
		const timeOfDay = getTimeOfDay();
		const bgClass = `bg-${timeOfDay}--${main}`;
		this.bodyElement.classList.add(bgClass);
	}

	#setWeatherInfo(weather) {
		this.#weatherInfo.setData(weather);
	}
}
