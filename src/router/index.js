import { createRouter, createWebHistory } from "vue-router";

import PublicLayout from "@/layouts/PublicLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

// =====================================================
// ADMIN AUTH
// =====================================================

const Login = () =>
    import("@/views/admin/auth/Login.vue");

// =====================================================
// ADMIN PAGES
// =====================================================

const Dashboard = () =>
    import("@/views/admin/dashboard/Dashboard.vue");

const Company = () =>
    import("@/views/admin/company/Company.vue");

const Category = () =>
    import("@/views/admin/category/Category.vue");

const ProductType = () =>
    import("@/views/admin/productType/ProductType.vue");

const Product = () =>
    import("@/views/admin/product/Product.vue");

const ProductSpecification = () =>
    import("@/views/admin/product/ProductSpecification.vue");

// =====================================================
// USER / ROLE / PERMISSION / MENU
// =====================================================

const UserManagement = () =>
    import("@/views/admin/UserMenuAccess/UserManagement.vue");

const RoleManagement = () =>
    import("@/views/admin/UserMenuAccess/RoleManagement.vue");

const PermissionManagement = () =>
    import("@/views/admin/UserMenuAccess/PermissionManagement.vue");

const MenuManagement = () =>
    import("@/views/admin/UserMenuAccess/MenuManagement.vue");

const CompanyInfo = () =>
    import("@/views/admin/CompanySettings/CompanyInfo.vue");

const BankDetails = () =>
    import("@/views/admin/CompanySettings/BankDetails.vue");
const TaxInfoDetails = () =>
    import("@/views/admin/CompanySettings/TaxInfoDetails.vue");
const DocumentSettings = () =>
    import("@/views/admin/CompanySettings/DocumentSettings.vue");

// =====================================================
// PUBLIC PAGES
// =====================================================

const Home = () =>
    import("@/views/public/Home.vue");

const Projects = () =>
    import("@/views/public/Project.vue");

const About = () =>
    import("@/views/public/About.vue");

const Contact = () =>
    import("@/views/public/Contacts.vue");

const PProduct = () =>
    import("@/views/public/Products.vue");


// =====================================================
// ROUTES
// =====================================================

const routes = [

    // =================================================
    // PUBLIC WEBSITE
    // =================================================

    {
        path: "/",
        component: PublicLayout,

        children: [

            {
                path: "",
                name: "Home",
                component: Home,
            },

            {
                path: "projects",
                name: "Projects",
                component: Projects,
            },

            {
                path: "about",
                name: "About",
                component: About,
            },

            {
                path: "contact",
                name: "Contact",
                component: Contact,
            },

            {
                path: "companies/:companyId",
                name: "CompanyProducts",
                component: PProduct,
            },

        ],
    },


    // =================================================
    // ADMIN AUTH
    // =================================================

    {
        path: "/admin",
        component: AuthLayout,

        children: [

            {
                path: "",
                redirect: "/admin/login",
            },

            {
                path: "login",
                name: "AdminLogin",
                component: Login,
            },

        ],
    },


    // =================================================
    // ADMIN PANEL
    // =================================================

    {
        path: "/admin",

        component: AdminLayout,

        meta: {
            requiresAuth: true,
        },

        children: [

            // =========================================
            // DASHBOARD
            // =========================================

            {
                path: "dashboard",

                name: "AdminDashboard",

                component: Dashboard,

                meta: {
                    permission: "DASHBOARD_VIEW",
                },
            },


            // =========================================
            // WEBSITE MANAGEMENT
            // =========================================

            {
                path: "company",

                name: "Company",

                component: Company,

                meta: {
                    permission: "COMPANY_VIEW",
                },
            },


            {
                path: "category",

                name: "Category",

                component: Category,

                meta: {
                    permission: "CATEGORY_VIEW",
                },
            },
            {
                path: "productType",

                name: "ProductType",

                component: ProductType,

                meta: {
                    permission: "PRODUCT_TYPE_VIEW",
                },
            },
            {
                path: "product",

                name: "Product",

                component: Product,

                meta: {
                    permission: "PRODUCT_VIEW",
                },
            },
            {
                path: "product-specification",

                name: "ProductSpecification",

                component: ProductSpecification,

                meta: {
                    permission: "PRODUCT_SPECIFICATION_VIEW",
                },
            },
            // =========================================
            // USER MANAGEMENT
            // =========================================
            {
                path: "users",

                name: "UserManagement",

                component: UserManagement,

                meta: {
                    permission: "USER_VIEW",
                },
            },
            // =========================================
            // ROLE MANAGEMENT
            // =========================================

            {
                path: "roles",

                name: "RoleManagement",

                component: RoleManagement,

                meta: {
                    permission: "ROLE_VIEW",
                },
            },


            // =========================================
            // PERMISSION MANAGEMENT
            // =========================================

            {
                path: "permissions",

                name: "PermissionManagement",

                component: PermissionManagement,

                meta: {
                    permission: "PERMISSION_VIEW",
                },
            },


            // =========================================
            // MENU MANAGEMENT
            // =========================================

            {
                path: "menus",

                name: "MenuManagement",

                component: MenuManagement,

                meta: {
                    permission: "MENU_VIEW",
                },
            },
            {
                path: "companyinfo",

                name: "CompanyInfo",

                component: CompanyInfo,

                meta: {
                    permission: "VIEW_COMPANYINFO",
                },
            },
            {
                path: "bankDetails",

                name: "BankDetails",

                component: BankDetails,

                meta: {
                    permission: "VIEW_BANKDETAILS",
                },
            },
            {
                path: "taxinfoDetails",

                name: "TaxInfoDetails",

                component: TaxInfoDetails,

                meta: {
                    permission: "TAX_GST_VIEW",
                },
            },
            {
                path: "document-settings",

                name: "DocumentSettings",

                component: DocumentSettings,

                meta: {
                    permission: "DOCUMENT_SETTING_VIEW",
                },
            },

        ],
    },


    // =================================================
    // 404
    // =================================================

    {
        path: "/:pathMatch(.*)*",

        redirect: "/",
    },

];


// =====================================================
// CREATE ROUTER
// =====================================================

const router = createRouter({

    history: createWebHistory(),

    routes,

    scrollBehavior(to, from, savedPosition) {

        // Hash navigation
        if (to.hash) {

            return {
                el: to.hash,
                behavior: "smooth",
            };

        }

        // Browser back/forward
        if (savedPosition) {

            return savedPosition;

        }

        // Default
        return {
            top: 0,
        };

    },

});


// =====================================================
// ROUTER GUARD
// =====================================================

router.beforeEach((to) => {

    const token = sessionStorage.getItem("adminToken");


    // =================================================
    // 1. AUTHENTICATION CHECK
    // =================================================

    if (to.meta.requiresAuth && !token) {

        return "/admin/login";

    }


    // =================================================
    // 2. IF ALREADY LOGGED IN
    // =================================================

    if (to.path === "/admin/login" && token) {

        return "/admin/dashboard";

    }


    // =================================================
    // 3. PERMISSION CHECK
    // =================================================

    const requiredPermission = to.meta.permission;

    if (requiredPermission && token) {

        let admin = {};

        try {

            admin = JSON.parse(
                sessionStorage.getItem("admin") || "{}"
            );

        } catch (error) {

            console.error(
                "Unable to read admin session:",
                error
            );

            sessionStorage.removeItem("adminToken");
            sessionStorage.removeItem("admin");

            return "/admin/login";

        }


        const permissions =
            admin.permissions || [];


        // ---------------------------------------------
        // Check permission
        // ---------------------------------------------

        if (!permissions.includes(requiredPermission)) {

            return "/admin/dashboard";

        }

    }


    // =================================================
    // 4. ALLOW ROUTE
    // =================================================

    return true;

});


export default router;

