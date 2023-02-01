import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productsRouter.js';

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
mongoose
	.connect('mongodb+srv://Akif:Akif1995@cluster0.g6v2zjb.mongodb.net/test')
	.then((res) => {
		console.log('Connect!');
	})
	.catch((err) => {
		console.log('err', err);
	});

app.get('/', function (req, res) {
	res.json('Hello world');
});
app.use('/products', productRoutes);

app.listen(port, () => console.log(`Server port is ${port}`));
