const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const scrollToTopButton = document.getElementById("scrollToTop");

function handleNavLinkClick(e) {
	e.preventDefault();

	navLinks.forEach((link) => link.classList.remove("active"));
	this.classList.add("active");

	document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
}

function handleScroll() {
	let currentSection = null;

	sections.forEach((section) => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.clientHeight;
		if (scrollY >= sectionTop - sectionHeight / 3) {
			currentSection = section;
		}
	});

	if (currentSection) {
		document.body.style.backgroundColor = getComputedStyle(currentSection).backgroundColor;
	}

	scrollToTopButton.classList.toggle("show", window.scrollY > 100);
}

function handleFormSubmit(e) {
	e.preventDefault();
}

function handleScrollToTopButtonClick(e) {
	e.preventDefault();
	window.scrollTo({ top: 0, behavior: "smooth" });
}

navLinks.forEach((link) => link.addEventListener("click", handleNavLinkClick));
window.addEventListener("scroll", handleScroll);
document.querySelector("form").addEventListener("submit", handleFormSubmit);
scrollToTopButton.addEventListener("click", handleScrollToTopButtonClick);
