import { products } from '../models/productsModels.js';

export const productsController = {
	getAll: (req, res) => {
		products.find({}, function (err, docs) {
			if (!err) {
				res.json(docs);
			} else {
				res.status(500).json(err);
			}
		});
	},
	add: (req, res) => {
		let newProduct = new products({
			name: req.body.name,
			description: req.body.description,
			date: req.body.date,
		});

		newProduct.save(function (err, doc) {
			if (!err) {
				res.json(doc);
			} else {
				res.status(500).json(err);
			}
		});
	},
	getById: (req, res) => {
		let id = req.params.id;
		products.findById(id, (err, doc) => {
			if (!err) {
				res.json(doc);
			} else {
				res.status(500).json(err);
			}
		});
	},
	delete: (req, res) => {
		let id = req.params.id;
		products.findByIdAndDelete(id, (err, doc) => {
			if (!err) {
				res.json(doc);
			} else {
				res.status(500).json(err);
			}
		});
	},
	update: (req, res) => {
		let id = req.params.id;
		let newProduct = new products({
			_id: id,
			name: req.body?.name,
			description: req.body?.description,
			date: Date.now(),
		});
		products.findByIdAndUpdate(id, newProduct, { runValidators: true }, (err, doc) => {
			if (!err) {
				res.json(newProduct);
			} else {
				res.status(500).json(err);
			}
		});
	},
};
