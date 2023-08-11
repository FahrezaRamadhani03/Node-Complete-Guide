const CACHE_NAME = 'V3';
const CACHE_URLS = ['/', '/javascripts/main.js', '/stylesheets/style.css'];

self.addEventListener('install', event => {
	console.log('sw installed', CACHE_NAME);
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_URLS))
	);
});

self.addEventListener('activate', event => {
	console.log('sw activated ', CACHE_NAME);

	event.waitUntil(
		caches
			.keys()
			.then(keys =>
				keys.filter(key => key.indexOf('V') === 0 && key !== CACHE_NAME)
			)
			.then(keys =>
				Promise.all(
					keys.map(key => {
						console.log(`Deleting cache ${key}`);
						return caches.delete(key);
					})
				)
			)
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(cache => {
			if (cache) console.log('Cache request on ' + event.request.url);

			return (
				cache ||
				fetch(event.request).then(res => {
					console.log('Fetch request on ' + event.request.url);
					return res;
				})
			);
		})
	);
});
