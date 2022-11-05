import Accordion from "./accordion";

const accordionEls = document.querySelectorAll(".accordion");
accordionEls.forEach((el) => new Accordion(el));
