import module from '../app/app.module';
import moment from 'moment';
import zingchart from 'zingchart';

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
						ctrl.select.makeCategories();
						ctrl.charts.setCharts();
						ctrl.select.makeFormats();
						ctrl.select.makeReadModes();
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
		selected  : 'categories',
		categories: [],
		formats   : [],
		readModes : [],
		options   : [
			'categories',
			'formats',
			'read modes'
		],

		makeCategories() {
			let categories = [];
			ctrl.table.list.forEach(book => {
				book.volumeInfo.categories.forEach(cat => {
					if (categories.length) {
						const hasIt = categories.every(item => {
							if (item.text === cat) {
								item.values[0]++;
								return false;
							}
							return true;
						});

						if (hasIt) {
							categories.push({
								text  : cat,
								values: [1],
							});
						}
					} else {
						categories.push({
							text  : cat,
							values: [1],
						});
					}
				});
			});
			this.categories = categories;
		},

		makeFormats() {
			let formats = [
				{
					text  : 'pdf only',
					values: [0],
				}, {
					text  : 'epub only',
					values: [0],
				}, {
					text  : 'both',
					values: [0],
				}, {
					text  : 'none',
					values: [0],
				}
			];
			ctrl.table.list.forEach(book => {
				if (book.accessInfo.pdf.isAvailable && book.accessInfo.epub.isAvailable) {
					for (let format of formats) {
						if (format.text === 'both') {
							format.values[0]++;
						}
					}
				} else if (book.accessInfo.pdf.isAvailable) {
					for (let format of formats) {
						if (format.text === 'pdf only') {
							format.values[0]++;
						}
					}
				} else if (book.accessInfo.epub.isAvailable) {
					for (let format of formats) {
						if (format.text === 'epub only') {
							format.values[0]++;
						}
					}
				} else {
					for (let format of formats) {
						if (format.text === 'none') {
							format.values[0]++;
						}
					}
				}
				this.formats = formats;
			});
		},

		makeReadModes() {
			let mods = [
				{
					text  : 'text only',
					values: [0],
				}, {
					text  : 'image only',
					values: [0],
				}, {
					text  : 'both',
					values: [0],
				}, {
					text  : 'none',
					values: [0],
				}
			];

			ctrl.table.list.forEach(book => {
				if (book.volumeInfo.readingModes.text && book.volumeInfo.readingModes.image) {
					for (let mode of mods) {
						if (mode.text === 'both') {
							mode.values[0]++;
						}
					}
				} else if (book.volumeInfo.readingModes.text) {
					for (let mode of mods) {
						if (mode.text === 'text only') {
							mode.values[0]++;
						}
					}
				} else if (book.volumeInfo.readingModes.image) {
					for (let mode of mods) {
						if (mode.text === 'image only') {
							mode.values[0]++;
						}
					}
				} else {
					for (let mode of mods) {
						if (mode.text === 'none') {
							mode.values[0]++;
						}
					}
				}
			});
			this.readModes = mods;
		},
	};

	this.charts = {
		data: {
			type  : 'pie',
			legend: {
				'toggle-action': 'remove',

				x: '80%',
				y: '25%',
			},
			tooltip: {
				text: '%t',
			},
			series: [],
		},
		setCharts() {
			switch (ctrl.select.selected) {
				case ('formats'):
					this.data.series = ctrl.select.formats;
					break;

				case ('read modes'):
					this.data.series = ctrl.select.readModes;
					break;

				default:
					this.data.series = ctrl.select.categories;
					break;
			}
			zingchart.render({
				id  : 'chart',
				data: ctrl.charts.data,
			});
			console.log(this.data.series);
		},
	};
};

export default module.controller('pageCtrl', ['http', pageCtrl]);
