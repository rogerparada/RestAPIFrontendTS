/* eslint-disable react-refresh/only-export-components */
import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { getProducts, updateAvailability } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
	return await getProducts();
}

export async function action({ request }: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());
	if (data.id) {
		await updateAvailability(+data.id);
	}
	return {};
}

export default function Products() {
	const products = useLoaderData() as Product[];

	return (
		<>
			<div className="flex justify-between">
				<h2 className="text-4xl font-black text-slate-500">Productos</h2>
				<Link to="productos/nuevo" className="rounded-md shadow-sm p-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-900">
					Agregar Producto
				</Link>
			</div>
			<div className="flex justify-center flex-col gap-3"></div>

			<div className="p-2">
				<table className="w-full mt-5 table-auto">
					<thead className="bg-slate-800 text-white">
						<tr>
							<th className="p-2">Producto</th>
							<th className="p-2">Precio</th>
							<th className="p-2">Disponibilidad</th>
							<th className="p-2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{products.map((item) => (
							<ProductDetails key={item.id} product={item} />
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
