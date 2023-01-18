export default class Observable {
	#subscriptions = [];

	next(value) {
		this.#subscriptions.forEach((o) => o(value));
	}

	subscribe(observer) {
		this.#subscriptions = [...this.#subscriptions, observer];
	}
}
