import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());

	let error = "";
	if (Object.values(data).includes("")) {
		error = "Todos los cambios son obligatorios";
	}
	if (error.length) {
		return error;
	}
	if (params.id) {
		await updateProduct(data, +params.id);
		return redirect("/");
	}
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
	if (params.id) {
		const product = await getProductById(+params.id);
		if (!product) {
			return redirect("/");
		}
		return product;
	}
}

export default function EditProduct() {
	const error = useActionData() as string;
	const product = useLoaderData() as Product;

	const availabilityOptions = [
		{ name: "Disponible", value: true },
		{ name: "No Disponible", value: false },
	];

	return (
		<>
			<div className="flex justify-between">
				<h2 className="text-4xl font-black text-slate-500">Editar producto</h2>
				<Link to="/" className="rounded-md shadow-sm p-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-900">
					Volver a productos
				</Link>
			</div>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form className="mt-10" method="POST">
				<ProductForm product={product} />
				<div className="mb-4">
					<label className="text-gray-800" htmlFor="availability">
						Disponibilidad:
					</label>
					<select id="availability" className="mt-2 block w-full p-3 bg-gray-50" name="availability" defaultValue={product?.availability.toString()}>
						{availabilityOptions.map((option) => (
							<option key={option.name} value={option.value.toString()}>
								{option.name}
							</option>
						))}
					</select>
				</div>
				<input type="submit" className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded" value="Guardar Producto" />
			</Form>
		</>
	);
}
