import Accordion from "./components/accordion/accordion";
import { Notification } from "./components/notification/notification";

// test accordions
const accordionEls = document.querySelectorAll(".accordion");
accordionEls.forEach((el) => new Accordion(el));

// test notifications
new Notification({ message: "Test 1", type: "error" });
setTimeout(() => {
	new Notification({ message: "Test 2", type: "success" });
}, 2000);
