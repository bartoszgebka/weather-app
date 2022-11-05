import Accordion from "./accordion/accordion";

const accordionEls = document.querySelectorAll(".accordion");
accordionEls.forEach((el) => new Accordion(el));
