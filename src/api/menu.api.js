import api from "./axios";

export const getMenuTree = () => {
    return api.get("/admin/menus/tree");
};
export const createMenu = (payload) => {
    return api.post("/admin/menus", payload);
}       
export const getAllMenu = () => {
    return api.get("/admin/menus");
}
export const getMenuById = (id) => {
    return api.get(`/admin/menus/${id}`);
}
export const deleteMenu = (id) => {
    return api.delete(`/admin/menus/${id}`);
}