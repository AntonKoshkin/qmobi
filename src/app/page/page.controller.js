import module from '../app/app.module';
import moment from 'moment';

const pageCtrl = function(http) {
	const ctrl = this;

	this.search = {
		query: 'перумов',

		itemsPerPage: 10,

		find() {
			ctrl.table.list.length = 0;
			if (this.query) {
				http.findBooks(
					{
						query: this.query,
						start: 0,
						items: this.itemsPerPage,
					},
					res => {
						ctrl.table.list = res.data.items;
						ctrl.table.setTotalPages();
					},
					err => {
						console.log(err);
					}
				);
			}
		},
	};

	this.table = {
		list    : [],
		orderBy : null,
		orderRev: false,

		totalPages: 0,

		arrayToString(arr) {
			if (!arr || !arr.length) {
				return '-';
			}
			let authorsString = '';

			arr.forEach((author, index) => {
				authorsString += author;
				if (index !== arr.length - 1) {
					authorsString += ', ';
				}
			});
			return authorsString;
		},

		formatDate(date) {
			return moment(date, 'YYYY-MM-DD').format('YYYY');
		},

		setTotalPages() {
			let total = 0;
			this.list.forEach(item => {
				total += item.volumeInfo.pageCount || 0;
			});
			this.totalPages = total;
		},

		sort(field) {
			if (this.orderBy === field) {
				this.orderRev = !this.orderRev;
			} else {
				this.orderBy = field;
				this.orderRev = false;
			}
		},
	};

	this.select = {
		selected: 'categories',
		options : [
			'categories'
		],
	};

	this.charts = {
		data: {
			type  : 'pie',
			series: [
				{
					values: [1],
					text  : 'qwe1',
				}, {
					values: [2],
					text  : 'qwe2',
				}, {
					values: [3],
					text  : 'qwe3',
				}
			],
		},

		makeData() {
		},
	};
};

export default module.controller('pageCtrl', ['http', pageCtrl]);
