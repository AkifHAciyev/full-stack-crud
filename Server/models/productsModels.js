import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

export const products = mongoose.model('Product', productSchema);
