import Accordion from "./components/accordion/accordion";
import { Notification } from "./components/notification/notification";
import { Spinner } from "./components/spinner/spinner";

// test accordions
const accordionEls = document.querySelectorAll(".accordion");
accordionEls.forEach((el) => new Accordion(el));

// test notifications and spinner
const spinner = new Spinner();
setTimeout(() => {
	spinner.block();
}, 1000);

setTimeout(() => {
	spinner.unblock();
}, 3500);

setTimeout(() => {
	new Notification({ message: "Nie udało się wczytać danych.", type: "error" });
}, 3600);
