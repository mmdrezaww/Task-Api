import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 ${props.className ?? ""}`}
        />
    );
}
