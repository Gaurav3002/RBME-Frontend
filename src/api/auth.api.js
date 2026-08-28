import api from "./axios";

export const loginAdmin = (payload) => {
    return api.post("/admin/auth/login", payload);
};

export const logoutAdmin = () => {
    return api.post("/admin/logout");
};