import axios from 'axios';
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';

const ProductsQuery = () => {
	const [newProduct, setNewProduct] = useState({
		name: '',
		description: '',
	});

	const { data, isLoading } = useQuery('products', () => {
		return axios.get('http://localhost:4000/products/').then((res) => res.data);
	});

	const addProduct = (product) => {
		return axios.post('http://localhost:4000/products/', product);
	};

	const useAddProductData = () => {
		return useMutation(addProduct);
	};

	const handleChange = (e) => {
		const name = e.target?.name;
		const value = e.target?.value;

		setNewProduct({
			...newProduct,
			[name]: value,
		});
	};

	if (isLoading) return <h1>loading ...</h1>;

	return (
		<>
			<form onSubmit={(e) => e.preventDefault()}>
				<input value={newProduct.name} onChange={handleChange} name="name" placeholder="Name" />
				<input value={newProduct.description} onChange={handleChange} name="description" placeholder="Description" />
				<button>Add product</button>
			</form>
			<table className="w3-table-all">
				<thead className="w3-light-grey">
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((product) => (
						<tr key={product._id}>
							<td>{product?.name}</td>
							<td>{product?.description}</td>
							<td>{product?.date}</td>
							<td>
								<button>Update</button>
							</td>
							<td>
								<button>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ProductsQuery;
