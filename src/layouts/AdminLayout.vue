<template>
  <div class="admin-layout">

    <!-- Desktop Sidebar -->
    <aside
      id="adminSidebar"
      class="desktop-sidebar"
      :class="{ open: sidebarOpen, collapsed: sidebarCollapsed }"
      tabindex="-1"
    >
      <Sidebar @close-sidebar="sidebarOpen = false" />
    </aside>

    <button
      v-if="sidebarOpen"
      type="button"
      class="sidebar-backdrop"
      aria-label="Close sidebar"
      @click="sidebarOpen = false"
    ></button>

    <!-- Main Area -->
    <div
      class="main-wrapper"
      :class="{ 'sidebar-collapsed': sidebarCollapsed }"
    >

      <Header @toggle-sidebar="toggleSidebar" />

      <main class="content">
        <router-view />
      </main>

      <Footer />

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "@/components/admin/Sidebar.vue";
import Header from "@/components/admin/Header.vue";
import Footer from "@/components/admin/Footer.vue";

const sidebarOpen = ref(false);
const sidebarCollapsed = ref(false);

const toggleSidebar = () => {
  if (window.matchMedia("(max-width: 991.98px)").matches) {
    sidebarOpen.value = !sidebarOpen.value;
    return;
  }

  sidebarCollapsed.value = !sidebarCollapsed.value;
};
</script>

<style scoped>

.admin-layout {
  min-height: 100vh;
  background: #f5f7fb;
}

/* ===============================
   DESKTOP SIDEBAR
================================ */

.desktop-sidebar {
  position: fixed;
  top: 0;
  left: 0;

  width: 250px;
  height: 100vh;

  z-index: 1100;
  transition: width 0.25s ease, transform 0.25s ease;
}

.desktop-sidebar.collapsed {
  width: 250px;
  transform: translateX(-100%);
  visibility: hidden;
}

.main-wrapper {
  transition: margin-left 0.25s ease, width 0.25s ease;
}

.main-wrapper.sidebar-collapsed {
  margin-left: 0;
  width: 100%;
}

.sidebar-backdrop {
  display: none;
}

/* ===============================
   MAIN CONTENT
================================ */

.main-wrapper {
  min-height: 100vh;

  margin-left: 250px;

  display: flex;
  flex-direction: column;

  width: calc(100% - 250px);
}

.content {
  flex: 1;
  padding: 24px;
}

/* ===============================
   MOBILE
================================ */

@media (max-width: 991.98px) {

  .desktop-sidebar {
    display: block;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    background: transparent;
    visibility: visible;
  }

  .desktop-sidebar.show {
    transform: translateX(0);
  }

  .main-wrapper {
    margin-left: 0;
    width: 100%;
  }

  .desktop-sidebar.collapsed {
    width: 250px;
  }

  .main-wrapper.sidebar-collapsed {
    margin-left: 0;
    width: 100%;
  }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1090;
    border: 0;
    background: rgba(15, 23, 42, 0.35);
  }

  .content {
    padding: 15px;
  }

}

@media (min-width: 992px) {
  .desktop-sidebar {
    visibility: visible !important;
    transform: none !important;
  }

  .desktop-sidebar.collapsed {
    visibility: hidden !important;
    transform: translateX(-100%) !important;
  }

  .sidebar-backdrop {
    display: none !important;
  }
}

</style>