"use client";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { apiPost } from "@/lib/api";

export default function CheckExistsPage() {
    const [username, setUsername] = useState("");
    const [result, setResult] = useState<"yes" | "no" | "">("");

    const handleCheck = async () => {
        try {
            const res = await apiPost("/auth/check-exists", { username });
            setResult(res.data.exists ? "yes" : "no");
        } catch {
            setResult("no");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="p-6 max-w-sm w-full border rounded shadow bg-white">
                <h1 className="text-xl font-bold text-center mb-4">بررسی وجود کاربر</h1>
                <Input
                    placeholder="شماره موبایل یا ایمیل"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button className="mt-3" onClick={handleCheck} disabled={!username}>
                    بررسی
                </Button>

                {result && (
                    <p className={`text-center mt-4 text-lg font-medium ${result === "yes" ? "text-green-600" : "text-red-600"}`}>
                        {result === "yes" ? "✅ کاربر در سیستم وجود دارد" : "❌ کاربر یافت نشد"}
                    </p>
                )}
            </div>
        </div>
    );
}
