
import axios from "axios";


// ============================================================
// AXIOS INSTANCE
// ============================================================

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});


// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

api.interceptors.request.use(

    (config) => {

        // ======================================================
        // GET ADMIN JWT TOKEN
        // ======================================================

        const token = sessionStorage.getItem("adminToken");


        // ======================================================
        // ATTACH JWT
        // ======================================================

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }


        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);


// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

api.interceptors.response.use(

    // ========================================================
    // SUCCESS
    // ========================================================

    (response) => {

        return response;
    },


    // ========================================================
    // ERROR
    // ========================================================

    (error) => {

        const status =
            error.response?.status;

        const currentPath =
            window.location.pathname;


        // ====================================================
        // ADMIN AUTHENTICATION ERROR
        // ====================================================

        if (
            status === 401 &&
            currentPath.startsWith("/admin") &&
            currentPath !== "/admin/login"
        ) {

            // -----------------------------------------------
            // Remove invalid session
            // -----------------------------------------------

            sessionStorage.removeItem("adminToken");

            sessionStorage.removeItem("admin");


            // -----------------------------------------------
            // Redirect to login
            // -----------------------------------------------

            window.location.href =
                "/admin/login";
        }


        // ====================================================
        // PUBLIC WEBSITE
        // ====================================================

        // Do NOT redirect public website users
        // when their API request returns 401.


        return Promise.reject(error);
    }
);


// ============================================================
// AUTH APIs
// ============================================================

export const loginAdmin = (payload) => {

    return api.post(
        "/admin/auth/login",
        payload
    );
};


// ============================================================
// LOGOUT
// ============================================================

export const logoutAdmin = () => {

    // There is currently NO logout endpoint
    // in the new Spring Boot AuthController.
    //
    // Logout is handled on frontend by
    // removing the JWT.

    sessionStorage.removeItem("adminToken");

    sessionStorage.removeItem("admin");

    window.location.href =
        "/admin/login";
};


// ============================================================
// EXPORT
// ============================================================

export default api;