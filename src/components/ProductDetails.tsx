import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
	product: Product;
};

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }: ActionFunctionArgs) {
	if (params.id) {
		await deleteProduct(+params.id);
		return redirect("/");
	}
}

export default function ProductDetails({ product }: ProductDetailsProps) {
	const isAvailable = product.availability;
	const fetcher = useFetcher();
	const navigate = useNavigate();

	return (
		<tr className="border-b ">
			<td className="p-3 text-lg text-gray-800">{product.name}</td>
			<td className="p-3 text-lg text-gray-800 text-right">{formatCurrency(product.price)}</td>
			<td className="p-3 text-lg text-gray-800">
				<fetcher.Form method="POST">
					<button
						type="submit"
						name="id"
						value={product.id}
						className={`${
							isAvailable ? "text-black" : "text-red-500"
						} text-center w-full p-2 uppercase text-xs font-bold border border-black-100 rounded-lg cursor-pointer`}
					>
						{isAvailable ? "Disponible" : "No Disponible"}
					</button>
				</fetcher.Form>
			</td>
			<td className="p-3 text-lg text-gray-800 ">
				<div className="flex gap-2">
					<button
						onClick={() => navigate(`/productos/${product.id}/editar`)}
						className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
					>
						Editar
					</button>
					<Form
						className="w-full"
						method="POST"
						action={`productos/${product.id}/eliminar`}
						onSubmit={(e) => {
							if (!confirm("Seguro que quiere eliminar el producto?")) {
								e.preventDefault();
							}
						}}
					>
						<input type="submit" className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center" value="Eliminar" />
					</Form>
				</div>
			</td>
		</tr>
	);
}
