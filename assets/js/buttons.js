// ┌┐ ┬ ┬┌┬┐┌┬┐┌─┐┌┐┌┌─┐
// ├┴┐│ │ │  │ │ ││││└─┐
// └─┘└─┘ ┴  ┴ └─┘┘└┘└─┘
// Function to print Button Cards.

const generateFirstButtonsContainer = (darkTheme = false) => {
	let iconPath = darkTheme ? 'White' : 'Dark';
	for (const button of CONFIG.firstButtonsContainer) {
		let item = `
        <a
          href="${button.link}"
          target="${CONFIG.openInNewTab ? '_blank' : ''}"
          class="card button button__${button.id}"
        >
		<img src="assets/icons/${iconPath}/${button.icon}.svg" style="height: 6vh;width: 6vh"/>	
        </a>
    `;

		const position = 'beforeend';

		buttons_1.insertAdjacentHTML(position, item);
	}
};

const generateSecondButtonsContainer = (darkTheme) => {
	let iconPath = darkTheme ? 'White' : 'Dark';
	for (const button of CONFIG.secondButtonsContainer) {
		let item = `
        <a
          href="${button.link}"
          target="${CONFIG.openInNewTab ? '_blank' : ''}"
          class="card button button__${button.id}"
        >
		<img src="assets/icons/${iconPath}/${button.icon}.svg" style="height: 6vh;width: 6vh"/>	
        </a>
    `;

		const position = 'beforeend';

		buttons_2.insertAdjacentHTML(position, item);
	}
};

const generateButtons = (darkTheme = false) => {
	switch (CONFIG.bentoLayout) {
		case 'bento':
			generateFirstButtonsContainer(darkTheme);
			break;
		case 'buttons':
			generateFirstButtonsContainer(darkTheme);
			generateSecondButtonsContainer(darkTheme);
			break;
		default:
			break;
	}
};

generateButtons(sessionStorage.getItem("darkTheme") === "enabled");
setInterval(function() {
	generateButtons(sessionStorage.getItem("darkTheme") === "enabled");		
}, 500)

