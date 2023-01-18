export class Model {
	async getData(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();

			if (!response.ok) throw new Error(`${response.status} ${data.message}`);

			return data;
		} catch (error) {
			throw error;
		}
	}
}
