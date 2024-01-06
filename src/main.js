// Web Component imports
import "./wc-navbar.js";
import "./wc-home.js";
import "./wc-documentation.js";
import "./wc-footer.js";

// ----- Navbar Web Component Creation -----
const pageTitle = document.querySelector("title").innerHTML.split(" ");
const page = pageTitle[4];

const navbar = document.createElement("wc-navbar");
navbar.dataset.page = page ?? "Home";

const body = document.querySelector("body");
const newBody = document.createElement("body");
newBody.appendChild(navbar);
body.innerHTML = newBody.innerHTML + body.innerHTML;