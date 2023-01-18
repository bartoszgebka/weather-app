export class Controller {
	applicationService;
	headerService;
	footerService;
	view;

	constructor(applicationService, headerService, footerService) {
		this.applicationService = applicationService;
		this.headerService = headerService;
		this.footerService = footerService;
	}

	clear() {
		document.querySelector(".main").innerHTML = null;
		document.querySelector("body").className = "";
	}
}
