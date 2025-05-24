import Cookies from "js-cookie";

export const saveToken = (token: string) => {
    Cookies.set("access_token", token, {expires: 7}); // کوکی برای ۷ روز
};

export const getToken = () => {
    return Cookies.get("access_token");
};

export const clearToken = () => {
    Cookies.remove("access_token");
};
