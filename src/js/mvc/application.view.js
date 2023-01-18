import Header from "../components/header/header";
import Footer from "../components/footer/footer";

class ApplicationView {
	#header;
	#footer;

	constructor() {
		this.#header = new Header();
		this.#footer = new Footer();
	}

	renderHeaderData(headerTitle) {
		this.#header.setTitle(headerTitle);
	}

	addHeaderOperations(operations) {
		this.#header.setOperations(operations);
	}

	addFooterOperations(operations) {
		this.#footer.setOperations(operations);
	}
}

export default new ApplicationView();
