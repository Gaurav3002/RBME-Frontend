<template>
  <div class="offcanvas offcanvas-start offcanvas-lg" tabindex="-1" id="adminSidebar" aria-labelledby="adminSidebarLabel">
    <div class="offcanvas-header d-lg-none">
      <h5 class="offcanvas-title" id="adminSidebarLabel">Menu</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <div class="offcanvas-body p-0">
      <aside class="sidebar">

        <!-- Logo -->
        <div class="logo">
            <h4 class="mb-0">RBME</h4>
            <small>Admin Panel</small>
        </div>

       <nav class="menu">

            <!-- Dashboard -->
            <router-link to="/admin/dashboard" class="menu-item">
                <i class="bi bi-speedometer2"></i>
                <span>Dashboard</span>
            </router-link>

            <!-- Admin -->
            <router-link to="/admin/admins" class="menu-item">
                <i class="bi bi-person-badge"></i>
                <span>Admin Management</span>
            </router-link>

            <!-- Catalog -->
            <div
                class="menu-item menu-toggle"
                @click="catalogOpen = !catalogOpen"
            >
                <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-folder2-open"></i>
                    <span>Website Management</span>
                </div>

                <i
                    class="bi"
                    :class="catalogOpen ? 'bi-chevron-up' : 'bi-chevron-down'"
                ></i>
            </div>

            <div
                v-show="catalogOpen"
                class="submenu"
            >
                <router-link to="/admin/company" class="submenu-item">
                    <i class="bi bi-building"></i>
                    <span>Companies</span>
                </router-link>

                <router-link to="/admin/category" class="submenu-item">
                    <i class="bi bi-grid"></i>
                    <span>Categories</span>
                </router-link>

                <router-link to="/admin/productType" class="submenu-item">
                    <i class="bi bi-diagram-3"></i>
                    <span>Product Types</span>
                </router-link>

                <router-link to="/admin/product" class="submenu-item">
                    <i class="bi bi-box-seam"></i>
                    <span>Products</span>
                </router-link>
                <router-link to="/admin/product-specification" class="submenu-item" >
                     <i class="bi bi-list-check"></i>
                      <span>Product Specifications</span>
                 </router-link>
            </div>

            <!-- Account -->
            <div class="menu-title">
                Account
            </div>

            <router-link to="/admin/profile" class="menu-item">
                <i class="bi bi-person-circle"></i>
                <span>Profile</span>
            </router-link>

        </nav>

      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const catalogOpen = ref(false);
</script>

<style scoped>

/* Base sidebar used inside offcanvas body */
.sidebar {
    width: 250px;
    height: 100vh;
    background: #1f2937;
    color: #fff;
    overflow-y: auto;
}

/* Make sidebar behave like a fixed column on large screens */
@media (min-width: 992px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  /* Remove default offcanvas padding on large screens */
  .offcanvas-lg .offcanvas-body {
    padding: 0 !important;
  }
}

/* Logo */

.logo {
    text-align: center;
    padding: 25px 15px;
    border-bottom: 1px solid rgba(255,255,255,.08);
}

.logo h4 {
    font-weight: 700;
    color: #fff;
}

.logo small {
    color: #9ca3af;
}

/* Menu */

.menu {
    display: flex;
    flex-direction: column;
    padding: 15px 0;
}
.menu-title{
    padding:18px 20px 8px;
    font-size:12px;
    font-weight:700;
    color:#9ca3af;
    text-transform:uppercase;
    letter-spacing:1px;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    color: #d1d5db;
    text-decoration: none;
    transition: .3s;
    font-size: 15px;
}

.menu-item i {
    font-size: 18px;
    width: 22px;
    text-align: center;
}

.menu-item:hover {
    background: #374151;
    color: #fff;
}

.menu-item.router-link-active {
    background: #0d6efd;
    color: #fff;
    border-left: 4px solid #fff;
}
.menu-toggle{
    justify-content: space-between;
    cursor:pointer;
    user-select:none;
}

.submenu{
    background:#111827;
}

.submenu-item{
    display:flex;
    align-items:center;
    gap:12px;
    padding:12px 20px 12px 50px;
    color:#d1d5db;
    text-decoration:none;
    transition:.25s;
    font-size:14px;
}

.submenu-item:hover{
    background:#374151;
    color:#fff;
}

.submenu-item.router-link-active{
    background:#0d6efd;
    color:#fff;
    border-left:4px solid #fff;
}


/* Scrollbar */

.sidebar::-webkit-scrollbar {
    width: 6px;
}

.sidebar::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 10px;
}

.sidebar::-webkit-scrollbar-track {
    background: transparent;
}

</style>