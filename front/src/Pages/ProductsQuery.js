import axios from 'axios';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';

const ProductsQuery = () => {
	let ref = useRef(null);
	const [clicked, setClicked] = useState(false);
	const [updated, setUpdated] = useState({ name: '', description: '' });
	const [newProduct, setNewProduct] = useState({
		name: '',
		description: '',
	});

	const { data, isLoading } = useQuery(
		'products',
		() => {
			return axios.get('http://localhost:4000/products/').then((res) => res.data);
		},
		{
			refetchInterval: 5000,
		}
	);

	const handleDelete = (item) => {
		axios.delete('http://localhost:4000/products/' + item._id);
	};
	const handleClick = () => {
		axios.post('http://localhost:4000/products/', newProduct);

		setNewProduct({
			name: '',
			description: '',
		});
	};
	const handleUpdate = () => {
		axios
			.put('http://localhost:4000/products/' + updated._id, {
				productName: updated.productName,
				description: updated.description,
			})
			.then((res) => setClicked(false));
	};

	if (isLoading) return <h1>loading ...</h1>;

	return (
		<>
			<form>
				<input
					value={newProduct.name}
					onChange={(e) =>
						setNewProduct((prevState) => {
							return {
								...prevState,
								name: e.target.value,
							};
						})
					}
					placeholder="name"
				/>
				<input
					value={newProduct.description}
					onChange={(e) =>
						setNewProduct((prevState) => {
							return {
								...prevState,
								description: e.target.value,
							};
						})
					}
					placeholder="description"
				/>
				<button onClick={() => handleClick()}>Add product</button>
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
								<button onClick={() => handleDelete(product)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{clicked ? (
				<form ref={ref} className="updateContainer">
					<input
						value={updated.productName}
						type="text"
						onChange={(e) =>
							setUpdated((prevState) => {
								return {
									...prevState,
									productName: e.target.value,
								};
							})
						}
						placeholder="enter new name"
					/>
					<input
						value={updated.description}
						onChange={(e) =>
							setUpdated((prevState) => {
								return {
									...prevState,
									description: e.target.value,
								};
							})
						}
						type="text"
						placeholder="enter new description"
					/>
					<button className="add" onClick={() => handleUpdate()}>
						Send
					</button>
				</form>
			) : (
				<></>
			)}
		</>
	);
};

export default ProductsQuery;
