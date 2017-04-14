import module from './app.module';

const router = function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode({
		enabled    : true,
		requireBase: false,
	});

	$routeProvider
		.when('/', {
			template    : (require('../page/page.template.pug'))(),
			controller  : 'pageCtrl',
			controllerAs: '$ctrl',
		})
		.otherwise('/');
};

export default module
	.config([
		'$locationProvider',
		'$routeProvider',
		router
	]);
