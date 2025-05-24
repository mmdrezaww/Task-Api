export default function Message({ msg, type = "" }: { msg: string; type?: "success" | "error" | "" }) {
    if (!msg) return null;
    const color = type === "success" ? "text-green-600" : type === "error" ? "text-red-600" : "text-gray-600";
    return <p className={`mt-3 text-sm text-center ${color}`}>{msg}</p>;
}
