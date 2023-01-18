import { Spinner } from "../components/spinner/spinner";
import { Notification } from "../components/notification/notification";

export default class View {
	#screenBlock = new Spinner();
	bodyElement = document.querySelector("body");
	mainElement = document.querySelector(".main");

	blockScreen() {
		this.#screenBlock.block();
	}

	unblockScreen() {
		this.#screenBlock.unblock();
	}

	showError(message) {
		new Notification({ message, type: "error" });
	}

	showSuccess(message) {
		new Notification({ message, type: "success" });
	}
}
