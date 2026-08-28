import api from "../api/axios";

export const getAllCompany = () => {
    return api.get("/companies");
}

export const getCompanyById =(id) => {
 return api.get(`/companies/${id}`);
}

export const createProjectEnquiry = (data) => {
  return api.post("/project-enquiries", data);
};