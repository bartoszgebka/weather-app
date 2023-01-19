import iconsDay from "../../img/day/*.svg";
import iconsNight from "../../img/night/*.svg";
import addIcons from "../../img/add-info/*.svg";

export const getCurrentDate = () => {
	const dateFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
	return new Date().toLocaleDateString("pl-PL", dateFormatOptions);
};

export const getTimeOfDay = (weather) => {
	const { timezone, sunrise, sunset } = weather;

	const date = getDateFromTimezone(timezone);
	const dateSunrise = getDateFromTimezone(timezone, sunrise);
	const dateSunset = getDateFromTimezone(timezone, sunset);

	return date >= dateSunrise && date < dateSunset ? "day" : "night";
};

const getDateFromTimezone = (timezone, timestamp) => {
	const localDate = timestamp ? new Date(timestamp * 1000) : new Date();
	const localTime = localDate.getTime();
	const localOffset = localDate.getTimezoneOffset() * 60000;
	const utc = localTime + localOffset;
	return new Date(utc + 1000 * timezone);
};

export const getWeatherIcon = (weatherState) => {
	const { type } = weatherState.weather;
	const timeOfDay = getTimeOfDay(weatherState);
	const icons = timeOfDay === "day" ? iconsDay : iconsNight;
	return `${icons[type]}`;
};

export const getWeatherAddIcon = (type) => {
	return `${addIcons[type]}`;
};
