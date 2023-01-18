import Observable from "../../helpers/observable";

class HeaderService {
	#dataChange$ = new Observable();
	#operationsChange$ = new Observable();

	setData(data) {
		this.#dataChange$.next(data);
	}

	onDataChange() {
		return this.#dataChange$;
	}

	setOperations(operations) {
		this.#operationsChange$.next(operations);
	}

	onOperationsChange() {
		return this.#operationsChange$;
	}
}

export default new HeaderService();
