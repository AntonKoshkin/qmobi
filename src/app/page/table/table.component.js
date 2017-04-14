import module from '../page.module';

function tableController() {
	this.$onInit = () => {
		this.books = this.books.books;
	};
}

export default module
	.component('pageTable', {
		bindings: {
			books: '=',
		},
		template  : (require('./table.template.pug'))(),
		controller: [
			tableController
		],
		controllerAs: '$table',
	});
