import iconsDay from "../../img/day/*.svg";
import iconsNight from "../../img/night/*.svg";
import addIcons from "../../img/add-info/*.svg";

export const getCurrentDate = () => {
	const dateFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
	return new Date().toLocaleDateString("pl-PL", dateFormatOptions);
};

export const getTimeOfDay = () => {
	const currentHour = new Date().getHours();
	return currentHour > 5 && currentHour < 20 ? "day" : "night";
};

export const getWeatherIcon = (type) => {
	const timeOfDay = getTimeOfDay();
	const icons = timeOfDay === "day" ? iconsDay : iconsNight;
	return `${icons[type]}`;
};

export const getWeatherAddIcon = (type) => {
	return `${addIcons[type]}`;
};
