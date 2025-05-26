"use client";
import {useRouter} from "next/navigation";
import Button from "@/components/Button";

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                به اپلیکیشن احراز هویت خوش آمدید ✨
            </h1>
            <div className="w-full max-w-xs space-y-3">
                <Button onClick={() => router.push("/register")}>📝 ثبت‌نام</Button>
                <Button onClick={() => router.push("/login")}>👤 ورود با رمز عبور</Button>
                <Button onClick={() => router.push("/otp")}>🔐 ورود با کد تایید</Button>
                <Button onClick={() => router.push("/exist")}>🔎 بررسی وضعیت کاربر</Button>
                <Button onClick={() => router.push("/me")}>👁 وضعیت ورود / خروج</Button>
            </div>
        </div>
    );
}
