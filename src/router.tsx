import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { action as updateAvailabilityAction, loader as productsLoader } from "./views/Products";
import EditProduct, { loader as editProductLoader, action as editProductAction } from "./views/EditProduct";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import { action as productDetailAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Products />,
				loader: productsLoader,
				action: updateAvailabilityAction,
			},
			{
				path: "productos/nuevo",
				element: <NewProduct />,
				action: newProductAction,
			},
			{
				path: "productos/:id/editar",
				element: <EditProduct />,
				action: editProductAction,
				loader: editProductLoader,
			},
			{
				path: "productos/:id/eliminar",
				action: productDetailAction,
			},
		],
	},
]);
