import { Component } from "../component";

export class Notification extends Component {
	// CSS class names
	#CLASS_NAME_MAIN = "main";
	#CLASS_NAME_NOTIFICATIONS_CONTAINER = "notifications";
	#CLASS_NAME_NOTIFICATION = "notification";
	#CLASS_NAME_NOTIFICATION_SHOW = "notification--show";
	#CLASS_NAME_NOTIFICATION_CLOSE = "notification__close";

	#message;
	#type;

	#mainEl;
	#containerEl;
	#notificationEl;
	#btnCloseEl;

	constructor({ message, type }) {
		super("Notification");
		this.checkRequiredParameters(message, type);

		this.#message = message;
		this.#type = type;

		this.#init();

		this.#btnCloseEl.addEventListener("click", this.#remove.bind(this));
	}

	#init() {
		this.#mainEl = this.getElement(document, `${this.#CLASS_NAME_MAIN}`, "querySelector");
		this.#containerEl = this.#getContainerEl();
		this.#notificationEl = this.#createNotification();
	}

	#getContainerEl() {
		let container = this.#mainEl.querySelector(
			`:scope > .${this.#CLASS_NAME_NOTIFICATIONS_CONTAINER}`
		);
		return container || this.#createContainerEl();
	}

	#createContainerEl() {
		const container = document.createElement("div");
		container.classList.add(this.#CLASS_NAME_NOTIFICATIONS_CONTAINER);
		this.#mainEl.prepend(container);
		return container;
	}

	#createNotification() {
		const markup = `
		<div class="${this.#CLASS_NAME_NOTIFICATION} ${this.#CLASS_NAME_NOTIFICATION}--${this.#type}">
			${this.#message}
			<button type="button" class="${this.#CLASS_NAME_NOTIFICATION_CLOSE}"></button>
		</div>`;

		this.#containerEl.insertAdjacentHTML("afterbegin", markup);
		const notification = this.#containerEl.querySelector(
			`:scope > .${this.#CLASS_NAME_NOTIFICATION}`
		);
		this.#btnCloseEl = notification.querySelector(
			`.${this.#CLASS_NAME_NOTIFICATION_CLOSE}`
		);

		this.reload(notification);
		notification.classList.add(this.#CLASS_NAME_NOTIFICATION_SHOW);

		return notification;
	}

	#remove() {
		this.#notificationEl.classList.remove(this.#CLASS_NAME_NOTIFICATION_SHOW);
		const onCompleteTransition = () => {
			this.#notificationEl.remove();
			if (this.#containerEl.childElementCount === 0) {
				this.#containerEl.remove();
			}
		};
		this.executeCallbackWhenTransitionEnd(this.#notificationEl, onCompleteTransition);
	}
}
