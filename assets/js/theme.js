//  ┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  │ ├─┤├┤ │││├┤
//  ┴ ┴ ┴└─┘┴ ┴└─┘
// Set theme based on Configurations and Preferences
let darkTheme = sessionStorage.getItem('darkTheme');
const themeToggle = document.querySelector('#themeButton');

const enableDark = () => {
	document.body.classList.add('darktheme');
	sessionStorage.setItem('darkTheme', 'enabled');
	themeToggle.innerHTML = `<img src="assets/icons/White/dark_mode.svg" height="40px" width="40px"/>`;

	for (const list of CONFIG.firstlistsContainer) {
		let element = document.querySelector("#" + list.icon + "-icon");
		console.log(list, element)
		if (element) {
			element.innerHTML = `<img src="assets/icons/White/${list.icon}.svg"/>`;
		}
	}
};

const disableDark = () => {
	document.body.classList.remove('darktheme');
	sessionStorage.setItem('darkTheme', null);
	themeToggle.innerHTML = `<img src="assets/icons/Dark/light_mode.svg" height="40px" width="40px"/>`;
	for (const list of CONFIG.firstlistsContainer) {
		let element = document.querySelector("#" + list.icon + "-icon");
		if (element) {
			element.innerHTML = `<img src="assets/icons/Dark/${list.icon}.svg"/>`;
		}
	}
};

if (darkTheme === 'enabled') {
	document.body.classList.add('notransition');
	enableDark();
	document.body.classList.remove('notransition');
} else {
	disableDark();
}

themeToggle.addEventListener('click', () => {
	darkTheme = sessionStorage.getItem('darkTheme');
	if (darkTheme !== 'enabled') {
		enableDark();
	} else {
		disableDark();
	}
});

if (CONFIG.imageBackground) {
	document.body.classList.add('withImageBackground');
}

if (CONFIG.changeThemeByOS && CONFIG.autoChangeTheme) {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		enableDark();
	} else {
		disableDark();
	}
}

if (CONFIG.changeThemeByHour && CONFIG.autoChangeTheme && !CONFIG.changeThemeByOS) {
	const date = new Date();
	const hours = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
	const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
	const currentTime = hours + ':' + minutes;
	if (currentTime >= CONFIG.hourDarkThemeActive) {
		enableDark();
	} else if (currentTime >= CONFIG.hourDarkThemeInactive) {
		disableDark();
	}
}
