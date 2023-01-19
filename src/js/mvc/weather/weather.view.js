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
		this.#setBackgrund(weatherState);
		this.#setWeatherInfo(weatherState);
	}

	#setBackgrund(weatherState) {
		const { type } = weatherState.weather;
		const timeOfDay = getTimeOfDay(weatherState);
		const bgClass = `bg-${timeOfDay}--${type}`;
		this.bodyElement.classList.add(bgClass);
	}

	#setWeatherInfo(weatherState) {
		this.#weatherInfo.setData(weatherState);
	}
}
