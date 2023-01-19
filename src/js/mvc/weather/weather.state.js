export class WeatherState {
	coord;
	city;
	weather = {};
	timezone;
	sunrise;
	sunset;

	setWeatherData(weatherData) {
		this.coord = weatherData.coord;
		this.city = weatherData.name;
		this.timezone = weatherData.timezone;
		this.sunrise = weatherData?.sys?.sunrise;
		this.sunset = weatherData?.sys?.sunset;
		this.#setWeather(weatherData);
	}

	#setWeather(weatherData) {
		const { main, description } = weatherData.weather[0];
		this.weather.type = this.#getType(main);
		this.weather.description = description;

		const { temp, temp_min, temp_max } = weatherData.main;
		this.weather.temp = temp;
		this.weather.tempMin = temp_min;
		this.weather.tempMax = temp_max;

		const { wind, rain, clouds, snow } = weatherData;
		this.weather.info = [];
		this.weather.info.push({ title: "Wiatr", icon: "wind", unit: "m/s", value: wind?.speed ?? 0 });
		this.weather.info.push({
			title: "Zachmurzenie",
			icon: "clouds",
			unit: "%",
			value: clouds?.all ?? 0,
		});
		this.weather.info.push({ title: "Deszcz", icon: "rain", unit: "mm", value: rain?.["1h"] ?? 0 });
		this.weather.info.push({ title: "Śnieg", icon: "snow", unit: "mm", value: snow?.["1h"] });
	}

	#getType(type) {
		if (["Rain", "Drizzle"].includes(type)) {
			return "rain";
		}
		if (type === "Mist") {
			return "clouds";
		}
		return type.toLowerCase();
	}
}
