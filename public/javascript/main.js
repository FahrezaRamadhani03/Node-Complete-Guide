if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('sw.js')
		.then(swRegistration => console.log('sw Registrated', swRegistration))
		.catch(console.error);
}
