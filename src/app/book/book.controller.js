import module from '../app/app.module';

const bookCtrl = function(
	http,
	$route
) {
	this.searching = false;
	this.data = {};

	this.find = id => {
		if (!this.searching) {
			this.searching = true;
			http.findBook(
				id,
				res => {
					this.data = res.data;
					this.searching = false;
				},
				err => console.log(err)
			);
		}
	};

	this.find($route.current.params.id);
};

export default module
	.controller('bookCtrl', ['http', '$route', bookCtrl]);
