"use client";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Message from "@/components/Message";
import { apiPost } from "@/lib/api";

export default function OTPLoginPage() {
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState<"send" | "verify">("send");
    const [msg, setMsg] = useState("");

    const handleSendCode = async () => {
        try {
            await apiPost("/auth/login-via-otp", { username });
            setMsg("کد ارسال شد");
            setStep("verify");
        } catch {
            setMsg("خطا در ارسال کد");
        }
    };

    const handleVerifyCode = async () => {
        if (!username || !code) {
            setMsg("شماره و کد را وارد کنید");
            return;
        }
        try {
            const res = await apiPost("/auth/login-via-otp", { username, code });
            setMsg("ورود موفق، توکن: " + res.data.token);
        } catch (e) {
            setMsg("کد اشتباه یا خطا در ورود");
        }
    };


    return (
        <div className="max-w-sm mx-auto mt-24 p-6 border rounded shadow">
            <h1 className="text-xl font-bold text-center mb-4">ورود با کد تایید</h1>
            <Input placeholder="ایمیل یا شماره" value={username} onChange={e => setUsername(e.target.value)} />
            {step === "verify" && (
                <Input className="mt-2" placeholder="کد تایید (123456)" value={code} onChange={e => setCode(e.target.value)} />
            )}
            <Button onClick={step === "send" ? handleSendCode : handleVerifyCode} className="mt-4">
                {step === "send" ? "ارسال کد" : "ورود"}
            </Button>
            <Message msg={msg} />
        </div>
    );
}
