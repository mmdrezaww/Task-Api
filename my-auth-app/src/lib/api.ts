const BASE_URL = "https://nixfile.vanguard-store.ir/v2";

export async function apiPost(path: string, data: any) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("API Error");
    return res.json();
}
