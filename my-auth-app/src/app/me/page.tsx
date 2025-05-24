"use client";
import {useEffect, useState} from "react";
import {getToken, clearToken} from "@/lib/auth";
import Button from "@/components/Button";

export default function MePage() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = getToken();
        setLoggedIn(!!token);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-6 border rounded shadow max-w-sm w-full bg-white text-center">
                {loggedIn ? (
                    <>
                        <p className="text-lg font-semibold mb-4 text-green-700">شما وارد شده‌اید ✅</p>
                        <Button
                            onClick={() => {
                                clearToken();
                                setLoggedIn(false);
                            }}
                        >
                            خروج از حساب
                        </Button>
                    </>
                ) : (
                    <p className="text-red-600 text-lg font-semibold">وارد نشده‌اید ❌</p>
                )}
            </div>
        </div>
    );
}
