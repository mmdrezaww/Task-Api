"use client";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Message from "@/components/Message";
import { apiPost } from "@/lib/api";

export default function RegisterPage() {
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState<"send" | "verify" | "register">("send");
    const [msg, setMsg] = useState("");

    const sendOtp = async () => {
        try {
            await apiPost("/auth/send-otp", { username: phone });
            setMsg("کد ارسال شد");
            setStep("verify");
        } catch {
            setMsg("خطا در ارسال کد");
        }
    };

    const verifyOtp = async () => {
        try {
            const res = await apiPost("/auth/verify-otp", { username: phone, code });
            if (res.data === true) {
                setMsg("کد تایید شد");
                setStep("register");
            } else {
                setMsg("کد اشتباه است");
            }
        } catch {
            setMsg("خطا در تایید کد");
        }
    };

    const register = async () => {
        try {
            const res = await apiPost("/auth/register", {
                phone,
                password,
                password_confirmation: password,
            });
            setMsg("ثبت‌نام موفق، توکن: " + res.data.token);
        } catch {
            setMsg("خطا در ثبت‌نام");
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-24 p-6 border rounded shadow">
            <h1 className="text-xl font-bold text-center mb-4">ثبت‌نام</h1>
            <Input placeholder="شماره موبایل" value={phone} onChange={e => setPhone(e.target.value)} />
            {step !== "send" && (
                <Input className="mt-2" placeholder="کد تایید" value={code} onChange={e => setCode(e.target.value)} />
            )}
            {step === "register" && (
                <Input className="mt-2" type="password" placeholder="رمز عبور" value={password} onChange={e => setPassword(e.target.value)} />
            )}
            <Button
                onClick={step === "send" ? sendOtp : step === "verify" ? verifyOtp : register}
                className="mt-4"
            >
                {step === "send" ? "ارسال کد" : step === "verify" ? "تایید کد" : "ثبت‌نام"}
            </Button>
            <Message msg={msg} />
        </div>
    );
}
