const TOKEN = "adminToken";
const ADMIN = "admin";

export const saveToken = (token) => {
    sessionStorage.setItem(TOKEN, token);
};

export const getToken = () => {
    return sessionStorage.getItem(TOKEN);
};

export const removeToken = () => {
    sessionStorage.removeItem(TOKEN);
};

export const saveAdmin = (admin) => {
    sessionStorage.setItem(ADMIN, JSON.stringify(admin));
};

export const getAdmin = () => {
    const admin = sessionStorage.getItem(ADMIN);
    return admin ? JSON.parse(admin) : null;
};

export const removeAdmin = () => {
    sessionStorage.removeItem(ADMIN);
};

export const clearSession = () => {
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(ADMIN);
};