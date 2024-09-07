export function formatCurrency(value: number) {
	return Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

export function toBoolean(str: string) {
	return str.toLowerCase() === "true";
}
