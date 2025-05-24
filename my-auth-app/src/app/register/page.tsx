"use client";
import {useState} from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Message from "@/components/Message";
import {apiPost} from "@/lib/api";
import {saveToken} from "@/lib/auth";

export default function RegisterPage() {
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState<"send" | "verify" | "register">("send");
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState<"success" | "error" | "">("");

    const sendOtp = async () => {
        try {
            const check = await apiPost("/auth/check-exists", {username: phone});
            if (check.data.exists) {
                setMsg("این شماره قبلاً ثبت‌نام شده است");
                setMsgType("error");
                return;
            }

            await apiPost("/auth/send-otp", {username: phone});
            setMsg("کد ارسال شد");
            setMsgType("success");
            setStep("verify");
        } catch {
            setMsg("خطا در ارسال کد");
            setMsgType("error");
        }
    };

    const verifyOtp = async () => {
        try {
            const res = await apiPost("/auth/verify-otp", {username: phone, code});
            if (res.data === true) {
                setMsg("کد تایید شد");
                setMsgType("success");
                setStep("register");
            } else {
                setMsg("کد نادرست است");
                setMsgType("error");
            }
        } catch {
            setMsg("خطا در تایید کد");
            setMsgType("error");
        }
    };

    const register = async () => {
        try {
            const res = await apiPost("/auth/register", {
                phone,
                password,
                password_confirmation: password,
            });

            console.log("ثبت‌نام response:", res);
            const token = res?.data;

            if (token) {
                saveToken(token);
                setMsg("ثبت‌نام موفق ✅ توکن ذخیره شد");
                setMsgType("success");
            } else {
                setMsg("ثبت‌نام موفق ولی توکن دریافت نشد");
                setMsgType("error");
            }
        } catch {
            setMsg("خطا در ثبت‌نام");
            setMsgType("error");
        }
    };


    return (
        <div className="max-w-sm mx-auto mt-24 p-6 border rounded shadow bg-white">
            <h1 className="text-xl font-bold text-center mb-4">ثبت‌نام</h1>
            <Input placeholder="شماره موبایل" value={phone} onChange={e => setPhone(e.target.value)}/>
            {step !== "send" && (
                <Input className="mt-2" placeholder="کد تایید" value={code} onChange={e => setCode(e.target.value)}/>
            )}
            {step === "register" && (
                <Input className="mt-2" type="password" placeholder="رمز عبور" value={password}
                       onChange={e => setPassword(e.target.value)}/>
            )}
            <Button
                onClick={step === "send" ? sendOtp : step === "verify" ? verifyOtp : register}
                className="mt-4"
            >
                {step === "send" ? "ارسال کد" : step === "verify" ? "تایید کد" : "ثبت‌نام"}
            </Button>
            <Message msg={msg} type={msgType}/>
            <p className="text-sm text-center mt-4">
                حساب داری؟ <a href="/login" className="text-blue-600 hover:underline">ورود با رمز</a>
            </p>
        </div>
    );
}
