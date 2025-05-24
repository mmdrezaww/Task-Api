"use client";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Message from "@/components/Message";
import { apiPost } from "@/lib/api";
import { saveToken } from "@/lib/auth";

export default function OTPLoginPage() {
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState<"send" | "verify">("send");
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState<"success" | "error" | "">("");

    const handleSendCode = async () => {
        if (!username) {
            setMsg("لطفاً شماره یا ایمیل را وارد کنید");
            setMsgType("error");
            return;
        }

        try {
            const check = await apiPost("/auth/check-exists", { username });
            if (!check.data.exists) {
                setMsg("این شماره هنوز ثبت‌نام نکرده است");
                setMsgType("error");
                return;
            }

            await apiPost("/auth/login-via-otp", { username });
            setMsg("کد ارسال شد");
            setMsgType("success");
            setStep("verify");
        } catch {
            setMsg("خطا در ارسال کد");
            setMsgType("error");
        }
    };

    const handleVerifyCode = async () => {
        if (!username || !code) {
            setMsg("شماره و کد را وارد کنید");
            setMsgType("error");
            return;
        }

        try {
            const res = await apiPost("/auth/login-via-otp", { username, code });
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
            setMsg("کد اشتباه یا خطا در ورود");
            setMsgType("error");
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-24 p-6 border rounded shadow bg-white">
            <h1 className="text-xl font-bold text-center mb-4">ورود با کد تایید</h1>
            <Input placeholder="ایمیل یا شماره" value={username} onChange={e => setUsername(e.target.value)} />
            {step === "verify" && (
                <Input className="mt-2" placeholder="کد تایید (123456)" value={code} onChange={e => setCode(e.target.value)} />
            )}
            <Button onClick={step === "send" ? handleSendCode : handleVerifyCode} className="mt-4">
                {step === "send" ? "ارسال کد" : "ورود"}
            </Button>
            <Message msg={msg} type={msgType} />
            <p className="text-sm text-center mt-4">
                اشتباهی اومدی؟ <a href="/login" className="text-blue-600 hover:underline">ورود با رمز</a>
            </p>
            <p className="text-sm text-center mt-1">
                حساب نداری؟ <a href="/register" className="text-blue-600 hover:underline">ثبت‌نام</a>
            </p>
        </div>
    );
}
