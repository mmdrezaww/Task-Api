// components/Message.tsx
export default function Message({ msg }: { msg: string }) {
    return msg ? <p className="mt-2 text-sm text-center text-gray-700">{msg}</p> : null;
}
