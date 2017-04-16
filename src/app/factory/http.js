import angular from 'angular';

export default angular
	.module('app.http', [])
	.factory('http', [
		'$http',
		function($http) {
			return {
				findBooks(params, cb, err) {
					const q = params.query || null;
					const start = params.start || null;
					const items = params.items || null;

					return $http
						.get(`https://www.googleapis.com/books/v1/volumes?q=${q}${start ? '&startIndex=' + start : ''}${items ? '&maxResults=' + items : ''}`)
						.then(cb)
						.then(null, err);
				},
				findBook(id, cb, err) {
					return $http
						.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
						.then(cb)
						.then(null, err);
				},
			};
		}
	]);
