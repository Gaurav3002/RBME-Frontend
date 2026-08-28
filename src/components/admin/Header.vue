<template>
    <header class="header">

        <!-- Left -->
        <div class="header-left">
            <button class="btn btn-light d-lg-none me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#adminSidebar" aria-controls="adminSidebar">
                <i class="bi bi-list"></i>
            </button>
            <h5 class="page-title">RBME Admin Dashboard</h5>
        </div>

        <!-- Right -->
        <div class="header-right">

            <div class="admin-info">

                <div class="admin-avatar">
                    <i class="bi bi-person-circle"></i>
                </div>

                <div class="admin-details">
                    <h6>{{ admin.name }}</h6>
                    <small>{{ admin.role }}</small>
                </div>

            </div>

            <button
                class="btn btn-danger btn-sm ms-3"
                @click="logout"
            >
                <i class="bi bi-box-arrow-right me-1"></i>
                Logout
            </button>

        </div>

    </header>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const admin = computed(() => {
    return JSON.parse(sessionStorage.getItem("admin")) || {
        name: "Administrator",
        role: "Admin",
    };
});

const logout = () => {

    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("admin");

    router.push("/admin/login");

};
</script>

<style scoped>

.header{
    height:70px;
    background:#ffffff;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 25px;
    border-bottom:1px solid #e5e7eb;
    box-shadow:0 2px 8px rgba(0,0,0,.05);
}

.header-left{
    display:flex;
    align-items:center;
}

.page-title{
    margin:0;
    font-weight:600;
    color:#1f2937;
}

.header-right{
    display:flex;
    align-items:center;
}

.admin-info{
    display:flex;
    align-items:center;
}

.admin-avatar{
    font-size:38px;
    color:#0d6efd;
    margin-right:10px;
}

.admin-details h6{
    margin:0;
    font-size:15px;
    font-weight:600;
}

.admin-details small{
    color:#6b7280;
}

</style>