import Observable from "../../helpers/observable";

class ApplicationService {
	#controllerChange$ = new Observable();

	changeController(data) {
		this.#controllerChange$.next(data);
	}

	onChangeController() {
		return this.#controllerChange$;
	}
}

export default new ApplicationService();
