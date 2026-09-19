import api from "../axios";

export const getBankDetails = () => {
    return api.get("/admin/bankdetails");
};

export const getBankDetailsById = (id) => {
    return api.get(`/admin/bankdetails/${id}`);
};

export const createBankDetails = (payload) => {
    return api.post("/admin/bankdetails", payload);
};

export const updateBankDetails = (id, payload) => {
    return api.put(`/admin/bankdetails/${id}`, payload);
};

export const deleteBankDetails = (id) => {
    return api.delete(`/admin/bankdetails/${id}`);
};