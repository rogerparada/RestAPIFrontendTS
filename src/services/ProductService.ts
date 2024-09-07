import { safeParse, pipe, parse, transform, string } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import { toBoolean } from "../utils";

type ProductData = {
	[k: string]: FormDataEntryValue;
};

const URL = import.meta.env.VITE_API_URL;

export async function addProduct(data: ProductData) {
	try {
		const result = safeParse(DraftProductSchema, { ...data, price: +data.price });
		if (result.success) {
			const url = `${URL}/api/products`;
			const headers = {
				method: "POST",
				body: JSON.stringify({ name: result.output.name, price: result.output.price }),
				headers: { "Content-type": "application/json;charset=UTF-8" },
			};
			await fetch(url, headers);
		} else {
			throw new Error("Datos no validos");
		}
	} catch (error) {
		console.log(error);
	}
}

export async function getProducts() {
	try {
		const url = `${URL}/api/products`;
		const response = await fetch(url);
		const json = await response.json();

		const result = safeParse(ProductsSchema, json.data);
		if (result.success) {
			return result.output;
		} else {
			throw new Error("Datos no validos");
		}
	} catch (error) {
		console.log(error);
	}
}
export async function getProductById(id: Product["id"]) {
	try {
		const url = `${URL}/api/products/${id}`;
		const response = await fetch(url);
		const json = await response.json();

		const result = safeParse(ProductSchema, json.data);
		if (result.success) {
			return result.output;
		} else {
			throw new Error("Datos no validos");
		}
	} catch (error) {
		console.log(error);
	}
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
	try {
		const NumberSchema = pipe(string(), transform(Number));

		const result = safeParse(ProductSchema, {
			id,
			name: data.name,
			price: parse(NumberSchema, data.price),
			availability: toBoolean(data.availability.toString()),
		});
		if (result.success) {
			const url = `${URL}/api/products/${id}`;
			const headers = {
				method: "PUT",
				body: JSON.stringify(result.output),
				headers: { "Content-type": "application/json;charset=UTF-8" },
			};
			await fetch(url, headers);
		} else {
			throw new Error("Datos no validos");
		}
	} catch (error) {
		console.log(error);
	}
}

export async function deleteProduct(id: Product["id"]) {
	try {
		const url = `${URL}/api/products/${id}`;
		const headers = {
			method: "DELETE",
			headers: { "Content-type": "application/json;charset=UTF-8" },
		};
		await fetch(url, headers);
	} catch (error) {
		console.log(error);
	}
}
export async function updateAvailability(id: Product["id"]) {
	try {
		const url = `${URL}/api/products/${id}`;
		const headers = {
			method: "PATCH",
			headers: { "Content-type": "application/json;charset=UTF-8" },
		};
		await fetch(url, headers);
	} catch (error) {
		console.log(error);
	}
}
