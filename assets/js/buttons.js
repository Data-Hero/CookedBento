// ┌┐ ┬ ┬┌┬┐┌┬┐┌─┐┌┐┌┌─┐
// ├┴┐│ │ │  │ │ ││││└─┐
// └─┘└─┘ ┴  ┴ └─┘┘└┘└─┘
// Function to print Button Cards.
let theme = sessionStorage.getItem('darkTheme');

const generateFirstButtonsContainer = () => {
	let iconPath = theme === "enabled" ? 'White' : 'Dark';
	document.querySelectorAll(".updated-card").forEach((card) => { card.remove() });
	for (const button of CONFIG.firstButtonsContainer) {
		let item = `
        <a
          href="${button.link}"
          target="${CONFIG.openInNewTab ? '_blank' : ''}"
          class="card button updated-card button__${button.id}"
        >
		<img src="assets/icons/${iconPath}/${button.icon}.svg" style="height: 6vh;width: 6vh"/>	
        </a>
    `;

		const position = 'beforeend';

		buttons_1.insertAdjacentHTML(position, item);
	}
};

const generateSecondButtonsContainer = () => {
	let iconPath = theme === "enabled" ? 'White' : 'Dark';
	document.querySelectorAll(".updated-card").forEach((card) => { card.remove() });
	for (const button of CONFIG.secondButtonsContainer) {
		let item = `
        <a
          href="${button.link}"
          target="${CONFIG.openInNewTab ? '_blank' : ''}"
          class="card button updated-card button__${button.id}"
        >
		<img src="assets/icons/${iconPath}/${button.icon}.svg" style="height: 6vh;width: 6vh"/>	
        </a>
    `;

		const position = 'beforeend';

		buttons_2.insertAdjacentHTML(position, item);
	}
};

const generateButtons = () => {
	switch (CONFIG.bentoLayout) {
		case 'bento':
			generateFirstButtonsContainer();
			break;
		case 'buttons':
			generateFirstButtonsContainer();
			generateSecondButtonsContainer();
			break;
		default:
			break;
	}
};

generateButtons();
sessionStorage.setItem('oldDarkTheme', theme);
setInterval(function() {
	theme = sessionStorage.getItem('darkTheme');
	if (sessionStorage.getItem('oldDarkTheme') !== theme) {
		console.log('theme changed');
		sessionStorage.setItem('oldDarkTheme', theme);
		generateButtons();		
	}
}, 500)
