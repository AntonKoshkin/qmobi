import module from './page.module';

const pageCtrl = function($scope) {
	const ctrl = this;
	console.log(ctrl)
	ctrl.books = [
		{
			name: 'qwe',
			page: 'asd',
			sub : 'zxc',
		}, {
			name: 'qwe2',
			page: 'asd2',
			sub : 'zxc2',
		}, {
			name: 'qwe3',
			page: 'asd3',
			sub : 'zxc3',
		}
	];
	$scope.books = 'qwe';
};

export default module.controller('pageCtrl', ['$scope', pageCtrl]);
