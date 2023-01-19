import { Component } from "../component";
import { getWeatherAddIcon, getWeatherIcon } from "../../helpers/helpers";
import Accordion from "../accordion/accordion";

export class WeatherInfo extends Component {
	// CSS class names
	#CLASS_NAME_WEATHER = "weather";
	#CLASS_NAME_TEMPERATURE = "weather__temperature";
	#CLASS_NAME_DESCRIPTION = "weather__description";
	#CLASS_NAME_MIN = "min__value";
	#CLASS_NAME_MAX = "max__value";

	#weatherEl;

	constructor() {
		super("Weather info");
		this.#init();
	}

	#init() {
		this.#createWeatherInfoElement();
	}

	#createWeatherInfoElement() {
		const markup = `
    <section class="${this.#CLASS_NAME_WEATHER}">
      <h2 class="${this.#CLASS_NAME_TEMPERATURE}">-</h2>
      <p class="${this.#CLASS_NAME_DESCRIPTION}">-</p>
      <div class="weather__min-max">
        <div>Min.: <span class="${this.#CLASS_NAME_MIN}">-</span></div>
        <div>Max.: <span class="${this.#CLASS_NAME_MAX}">-</span></div>
      </div>
    </section>`;

		this.mainEl.insertAdjacentHTML("afterbegin", markup);
		this.#weatherEl = this.mainEl.querySelector(`:scope > .${this.#CLASS_NAME_WEATHER}`);
	}

	setData(weatherState) {
		const { weather: mainInfo } = weatherState;
		this.#createIcon(weatherState);
		this.#setTemperature(mainInfo.temp);
		this.#setDescription(mainInfo.description);
		this.#setMinMax(mainInfo.tempMin, mainInfo.tempMax);
		this.#renderAccordionAdditionalInformation(mainInfo.info);
	}

	#createIcon(weatherState) {
		const { type } = weatherState.weather;
		const markup = `
          <img src="${getWeatherIcon(weatherState)}" alt="${type}" class="weather__icon" />
    `;
		this.#weatherEl.insertAdjacentHTML("afterbegin", markup);
	}

	#setTemperature(temp) {
		const tempEl = this.getElement(this.#weatherEl, this.#CLASS_NAME_TEMPERATURE, "querySelector");
		tempEl.innerHTML = `${Math.ceil(temp)} °C`;
	}

	#setDescription(desc) {
		const descEl = this.getElement(this.#weatherEl, this.#CLASS_NAME_DESCRIPTION, "querySelector");
		descEl.innerHTML = desc.at(0).toUpperCase() + desc.slice(1);
	}

	#setMinMax(minTemp, maxTemp) {
		const minEl = this.getElement(this.#weatherEl, this.#CLASS_NAME_MIN, "querySelector");
		minEl.innerHTML = `${Math.ceil(minTemp)} °C`;

		const maxEl = this.getElement(this.#weatherEl, this.#CLASS_NAME_MAX, "querySelector");
		maxEl.innerHTML = `${Math.ceil(maxTemp)} °C`;
	}

	#renderAccordionAdditionalInformation(additionalInfo) {
		const informationEl = this.#createDiv("information");

		const items = additionalInfo
			.filter((info) => info.value != null)
			.map((info) => {
				return {
					title: info.title,
					image: getWeatherAddIcon(info.icon),
					unit: info.unit,
					value: info.value,
				};
			});

		const config = { title: "Dodatkowe informacje", isFlatten: true, items };
		new Accordion(informationEl, config);

		const containerEl = this.#createDiv("container");
		containerEl.append(informationEl);

		this.mainEl.append(containerEl);
	}

	#createDiv(cssClass) {
		const div = document.createElement("div");
		div.classList.add(cssClass);
		return div;
	}
}
