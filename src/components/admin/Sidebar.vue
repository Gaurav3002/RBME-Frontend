```vue
<template>
  <aside class="sidebar">

    <!-- =========================
         LOGO
    ========================== -->
    <div class="logo">

      <button
        type="button"
        class="sidebar-close"
        aria-label="Close sidebar"
        @click="$emit('close-sidebar')"
      >
        <i class="bi bi-x-lg"></i>
      </button>

      <h4 class="mb-0">
        RBME
      </h4>

      <small>
        Admin Panel
      </small>

    </div>


    <!-- =========================
         NAVIGATION
    ========================== -->
    <nav class="menu">

      <!-- Dashboard -->
      <router-link
        to="/admin/dashboard"
        class="menu-item"
      >
        <i class="bi bi-speedometer2"></i>

        <span>
          Dashboard
        </span>
      </router-link>


      <!-- =========================
           WEBSITE MANAGEMENT
      ========================== -->

      <div
        class="menu-item menu-toggle"
        @click="catalogOpen = !catalogOpen"
      >

        <div class="menu-toggle-left">

          <i class="bi bi-folder2-open"></i>

          <span>
            Website Management
          </span>

        </div>

        <i
          class="bi toggle-icon"
          :class="
            catalogOpen
              ? 'bi-chevron-up'
              : 'bi-chevron-down'
          "
        ></i>

      </div>


      <!-- =========================
           WEBSITE SUBMENU
      ========================== -->

      <div
        v-show="catalogOpen"
        class="submenu"
      >

        <!-- Companies -->
        <router-link
          to="/admin/company"
          class="submenu-item"
        >
          <i class="bi bi-building"></i>

          <span>
            Companies
          </span>
        </router-link>


        <!-- Categories -->
        <router-link
          to="/admin/category"
          class="submenu-item"
        >
          <i class="bi bi-grid"></i>

          <span>
            Categories
          </span>
        </router-link>


        <!-- Product Types -->
        <router-link
          to="/admin/productType"
          class="submenu-item"
        >
          <i class="bi bi-diagram-3"></i>

          <span>
            Product Types
          </span>
        </router-link>


        <!-- Products -->
        <router-link
          to="/admin/product"
          class="submenu-item"
        >
          <i class="bi bi-box-seam"></i>

          <span>
            Products
          </span>
        </router-link>


        <!-- Product Specifications -->
        <router-link
          to="/admin/product-specification"
          class="submenu-item"
        >
          <i class="bi bi-list-check"></i>

          <span>
            Product Specifications
          </span>
        </router-link>

      </div>


      <!-- =========================
           STATIC MANAGEMENT ITEMS
      ========================== -->

      <div class="menu-item static-menu-item">

        <i class="bi bi-boxes"></i>

        <span>
          Stock Management
        </span>

        <span class="coming-soon">
          Soon
        </span>

      </div>


      <div class="menu-item static-menu-item">

        <i class="bi bi-tools"></i>

        <span>
          Accessories Management
        </span>

        <span class="coming-soon">
          Soon
        </span>

      </div>


      <!-- =========================
           ACCOUNT
      ========================== -->

      <div class="menu-title">
        Account
      </div>

    </nav>

  </aside>
</template>


<script setup>

import { ref } from "vue";

const catalogOpen = ref(true);

</script>


<style scoped>

/* =========================================
   SIDEBAR
========================================= */

.sidebar {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1050;

  overflow-y: auto;
  overflow-x: hidden;

  background:
    linear-gradient(
      180deg,
      #0b1726 0%,
      #111f30 50%,
      #162536 100%
    );

  color: #ffffff;

  box-shadow:
    4px 0 20px rgba(0, 0, 0, 0.12);
}


/* =========================================
   LOGO
========================================= */

.logo {
  position: relative;

  padding: 28px 20px 24px;

  text-align: center;

  border-bottom:
    1px solid rgba(255, 255, 255, 0.08);

  background:
    rgba(255, 255, 255, 0.02);
}


.sidebar-close {
  display: none;
}


:global(.desktop-sidebar.collapsed) .logo {
  padding-right: 8px;
  padding-left: 8px;
}


:global(.desktop-sidebar.collapsed) .logo small,
:global(.desktop-sidebar.collapsed) .menu-item span,
:global(.desktop-sidebar.collapsed) .menu-title,
:global(.desktop-sidebar.collapsed) .menu-toggle-left span,
:global(.desktop-sidebar.collapsed) .toggle-icon {
  display: none;
}


:global(.desktop-sidebar.collapsed) .menu-item,
:global(.desktop-sidebar.collapsed) .menu-toggle {
  justify-content: center;
  padding-right: 10px;
  padding-left: 10px;
}


:global(.desktop-sidebar.collapsed) .submenu {
  display: none !important;
}


.logo h4 {
  margin: 0;

  font-size: 26px;
  font-weight: 800;
  letter-spacing: 1.5px;

  color: #ffffff;
}


.logo small {
  display: block;

  margin-top: 6px;

  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1.2px;
  text-transform: uppercase;

  color: #8fa1b3;
}


/* =========================================
   MENU
========================================= */

.menu {
  display: flex;
  flex-direction: column;

  padding: 16px 0 30px;
}


/* =========================================
   MENU TITLE
========================================= */

.menu-title {
  padding: 28px 22px 10px;

  font-size: 10px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 1.5px;

  color: #718096;
}


/* =========================================
   MAIN MENU ITEM
========================================= */

.menu-item {
  position: relative;

  display: flex;
  align-items: center;

  gap: 13px;

  min-height: 50px;

  padding: 13px 20px;

  color: #b9c4cf;

  text-decoration: none;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  border-left:
    3px solid transparent;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;
}


.menu-item i {
  width: 22px;

  flex-shrink: 0;

  font-size: 18px;

  text-align: center;
}


/* =========================================
   HOVER
========================================= */

.menu-item:hover {
  background:
    rgba(255, 255, 255, 0.06);

  color: #ffffff;
}


/* =========================================
   ACTIVE ROUTE
========================================= */

.menu-item.router-link-active {
  background:
    linear-gradient(
      90deg,
      rgba(27, 94, 140, 0.95),
      rgba(27, 94, 140, 0.45)
    );

  border-left-color:
    #c58a24;

  color: #ffffff;
}


.menu-item.router-link-active::after {
  content: "";

  position: absolute;

  right: 14px;

  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: #c58a24;

  box-shadow:
    0 0 10px rgba(197, 138, 36, 0.8);
}


/* =========================================
   STATIC MENU ITEMS
========================================= */

.static-menu-item {
  cursor: default;
}


.static-menu-item:hover {
  background:
    rgba(255, 255, 255, 0.04);

  color: #d5dde5;
}


/* =========================================
   COMING SOON BADGE
========================================= */

.coming-soon {
  margin-left: auto;

  padding: 3px 7px;

  border:
    1px solid rgba(197, 138, 36, 0.25);

  border-radius: 4px;

  background:
    rgba(197, 138, 36, 0.10);

  color: #c58a24;

  font-size: 9px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 0.5px;
}


/* =========================================
   TOGGLE
========================================= */

.menu-toggle {
  justify-content: space-between;

  user-select: none;
}


.menu-toggle-left {
  display: flex;
  align-items: center;

  gap: 13px;
}


.toggle-icon {
  width: auto !important;

  font-size: 13px !important;

  opacity: 0.7;
}


/* =========================================
   SUBMENU
========================================= */

.submenu {
  margin: 4px 0 6px;

  padding: 5px 0;

  background:
    rgba(0, 0, 0, 0.16);

  border-top:
    1px solid rgba(255, 255, 255, 0.03);

  border-bottom:
    1px solid rgba(255, 255, 255, 0.03);
}


/* =========================================
   SUBMENU ITEM
========================================= */

.submenu-item {
  position: relative;

  display: flex;
  align-items: center;

  gap: 12px;

  min-height: 44px;

  padding:
    11px
    20px
    11px
    52px;

  color: #8fa1b3;

  text-decoration: none;

  font-size: 13px;
  font-weight: 500;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}


.submenu-item i {
  width: 18px;

  font-size: 15px;

  text-align: center;
}


/* =========================================
   SUBMENU HOVER
========================================= */

.submenu-item:hover {
  background:
    rgba(255, 255, 255, 0.05);

  color: #ffffff;
}


/* =========================================
   SUBMENU ACTIVE
========================================= */

.submenu-item.router-link-active {
  color: #ffffff;

  background:
    rgba(197, 138, 36, 0.12);
}


.submenu-item.router-link-active::before {
  content: "";

  position: absolute;

  left: 28px;

  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: #c58a24;
}


/* =========================================
   SCROLLBAR
========================================= */

.sidebar::-webkit-scrollbar {
  width: 5px;
}


.sidebar::-webkit-scrollbar-thumb {
  background:
    rgba(255, 255, 255, 0.18);

  border-radius: 20px;
}


.sidebar::-webkit-scrollbar-thumb:hover {
  background:
    rgba(255, 255, 255, 0.3);
}


.sidebar::-webkit-scrollbar-track {
  background: transparent;
}


/* =========================================
   TABLET / MOBILE
========================================= */

@media (max-width: 991px) {

  .sidebar {
    width: 250px;
  }


  .sidebar-close {
    position: absolute;

    top: 12px;
    right: 12px;

    display: flex;

    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;

    border: 0;
    border-radius: 6px;

    background:
      rgba(255, 255, 255, 0.1);

    color: #ffffff;

    cursor: pointer;
  }


  .coming-soon {
    font-size: 8px;
  }

}


/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 480px) {

  .coming-soon {
    display: none;
  }

}

</style>
```
