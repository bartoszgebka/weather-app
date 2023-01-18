import Observable from "../../helpers/observable";

class FooterService {
	#operationsChange$ = new Observable();

	setOperations(operations) {
		this.#operationsChange$.next(operations);
	}

	onOperationsChange() {
		return this.#operationsChange$;
	}
}

export default new FooterService();
