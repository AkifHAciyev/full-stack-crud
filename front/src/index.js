import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import './index.css';
import ProductsQuery from './Pages/ProductsQuery';
const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<QueryClientProvider client={client}>
		<ProductsQuery />
	</QueryClientProvider>
);
