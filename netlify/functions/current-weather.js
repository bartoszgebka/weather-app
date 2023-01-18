import fetch from "node-fetch";

exports.handler = async function (event, _) {
	const API_SECRET = process.env.API_SECRET;
	const { lat, lon } = event.queryStringParameters;

	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_SECRET}&lang=pl&units=metric`;

	try {
		const response = await fetch(url);
		const json = await response.json();
		if (!response.ok) await Promise.reject(json);
		return {
			statusCode: 200,
			body: JSON.stringify(json),
		};
	} catch (error) {
		const { cod, message } = error;
		return {
			statusCode: cod,
			body: JSON.stringify({ message }),
		};
	}
};
