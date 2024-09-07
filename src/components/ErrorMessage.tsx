import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
	return <div className="text-center my-4 p-4 text-white uppercase font-bold bg-red-600">{children}</div>;
}
