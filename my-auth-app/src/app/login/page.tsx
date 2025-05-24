"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Message from "@/components/Message";
import { apiPost } from "@/lib/api";
import { saveToken } from "@/lib/auth";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState<"success" | "error" | "">("");
    const router = useRouter();

    const handleLogin = async () => {
        if (!username || !password) {
            setMsg("لطفاً فیلدها را کامل پر کنید");
            setMsgType("error");
            return;
        }

        try {
            const check = await apiPost("/auth/check-exists", { username });
            if (!check.data.exists) {
                setMsg("کاربر یافت نشد، لطفاً ابتدا ثبت‌نام کنید");
                setMsgType("error");
                return;
            }

            const res = await apiPost("/auth/login-via-password", { username, password });
            const token = res.data.token;
            if (token) {
                saveToken(token);
                setMsg("ورود موفق ✅ توکن ذخیره شد");
                setMsgType("success");
            } else {
                setMsg("ورود موفق ولی توکن دریافت نشد");
                setMsgType("error");
            }
        } catch {
            setMsg("رمز عبور اشتباه است یا خطا در ورود");
            setMsgType("error");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div className="max-w-sm mx-auto mt-24 p-6 border rounded shadow bg-white">
            <h1 className="text-xl font-bold text-center mb-4">ورود با رمز عبور</h1>
            <Input placeholder="ایمیل یا شماره" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={handleKeyDown} />
            <Input type="password" placeholder="رمز عبور" className="mt-2" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
            <Button onClick={handleLogin} className="mt-4" disabled={!username || !password}>ورود</Button>
            <Message msg={msg} type={msgType} />
            <p className="text-sm text-center mt-4">
                هنوز ثبت‌نام نکردی؟ <a href="/register" className="text-blue-600 hover:underline">ثبت‌نام</a>
            </p>
            <p className="text-sm text-center mt-1">
                یا <a href="/otp" className="text-blue-600 hover:underline">ورود با کد تایید</a>
            </p>
        </div>
    );
}
