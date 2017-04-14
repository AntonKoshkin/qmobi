import module from './page.module';

function pageController($scope) {
	$scope.qwe = 'qwe';
}

export default module
	.component('page', {
		template  : (require('./page.component.template.pug'))(),
		controller: [
			'$http',
			'$scope',
			pageController
		],
	});
