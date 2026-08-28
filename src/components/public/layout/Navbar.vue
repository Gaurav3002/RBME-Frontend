```vue
<template>
  <nav class="public-navbar">

    <div class="container navbar-container">

      <!-- BRAND -->
      <router-link to="/" class="navbar-brand">
        <div class="brand-wrapper">
          <img
            src="@/assets/logo/logos.png"
            alt="Ram Bakery Machines & Engineers"
            class="brand-logo"
          />

          <div class="brand-text">
            <span class="brand-name">
              Ram Bakery Machines
            </span>

            <span class="brand-subtitle">
              & Engineers
            </span>
          </div>
        </div>
      </router-link>


      <!-- DESKTOP MENU -->
      <div class="desktop-menu">

        <router-link
          to="/"
          class="desktop-link"
          exact-active-class="active"
        >
          Home
        </router-link>


        <!-- OUR BRANDS -->
        <div
          class="desktop-brands"
          @mouseenter="openBrands = true"
          @mouseleave="openBrands = false"
        >

          <button
            type="button"
            class="desktop-link brands-button"
            :class="{ active: openBrands }"
          >
            Our Brands

            <i
              class="bi bi-chevron-down"
              :class="{ rotate: openBrands }"
            ></i>
          </button>


          <!-- DROPDOWN -->
          <div
            v-if="openBrands"
            class="brands-dropdown"
          >

            <div class="brands-dropdown-header">
              OUR BRANDS
            </div>


            <div
              v-if="companies.length"
              class="brands-list"
            >

              <router-link
                v-for="company in companies"
                :key="company.id"
                :to="`/companies/${company.id}`"
                class="brand-link"
                @click="openBrands = false"
              >

                <div class="brand-icon">
                  <i class="bi bi-building"></i>
                </div>

                <span>
                  {{ company.name }}
                </span>

                <i class="bi bi-arrow-right-short"></i>

              </router-link>

            </div>


            <div
              v-else
              class="no-brands"
            >
              No brands available
            </div>

          </div>

        </div>


        <!-- PROJECTS -->
        <router-link
          to="/projects"
          class="desktop-link"
          active-class="active"
        >
          Projects / Automation
        </router-link>


        <!-- ABOUT -->
        <router-link
          to="/about"
          class="desktop-link"
          active-class="active"
        >
          About
        </router-link>


        <!-- CONTACT -->
        <router-link
          to="/contact"
          class="desktop-contact"
        >
          Contact / Enquiry
          <i class="bi bi-arrow-right"></i>
        </router-link>

      </div>


      <!-- MOBILE MENU BUTTON -->
      <button
        type="button"
        class="mobile-menu-button"
        @click="openSidebar"
        aria-label="Open menu"
      >
        <i class="bi bi-list"></i>
      </button>

    </div>


    <!-- MOBILE OVERLAY -->
    <transition name="fade">

      <div
        v-if="sidebarOpen"
        class="mobile-overlay"
        @click="closeSidebar"
      ></div>

    </transition>


    <!-- MOBILE SIDEBAR -->
    <transition name="sidebar">

      <aside
        v-if="sidebarOpen"
        class="mobile-sidebar"
      >

        <!-- HEADER -->
        <div class="mobile-sidebar-header">

          <div class="mobile-brand">

            <img
              src="@/assets/logo/logos.png"
              alt="RBME"
            />

            <div>
              <strong>
                Ram Bakery Machines
              </strong>

              <small>
                & Engineers
              </small>
            </div>

          </div>


          <button
            type="button"
            class="close-button"
            @click="closeSidebar"
            aria-label="Close menu"
          >
            <i class="bi bi-x-lg"></i>
          </button>

        </div>


        <!-- BODY -->
        <div class="mobile-sidebar-body">

          <!-- HOME -->
          <router-link
            to="/"
            class="mobile-link"
            exact-active-class="active"
            @click="closeSidebar"
          >
            <i class="bi bi-house"></i>
            <span>Home</span>
          </router-link>


          <!-- BRANDS -->
          <button
            type="button"
            class="mobile-link mobile-dropdown-button"
            @click="mobileBrandsOpen = !mobileBrandsOpen"
          >

            <span>
              <i class="bi bi-buildings"></i>
              Our Brands
            </span>

            <i
              class="bi bi-chevron-down"
              :class="{ rotate: mobileBrandsOpen }"
            ></i>

          </button>


          <!-- BRAND LIST -->
          <div
            v-if="mobileBrandsOpen"
            class="mobile-brands-list"
          >

            <router-link
              v-for="company in companies"
              :key="company.id"
              :to="`/companies/${company.id}`"
              class="mobile-brand-link"
              @click="closeSidebar"
            >

              <i class="bi bi-building"></i>

              <span>
                {{ company.name }}
              </span>

            </router-link>

          </div>


          <!-- PROJECTS -->
          <router-link
            to="/projects"
            class="mobile-link"
            active-class="active"
            @click="closeSidebar"
          >

            <i class="bi bi-gear"></i>

            <span>
              Projects / Automation
            </span>

          </router-link>


          <!-- ABOUT -->
          <router-link
            to="/about"
            class="mobile-link"
            active-class="active"
            @click="closeSidebar"
          >

            <i class="bi bi-info-circle"></i>

            <span>
              About
            </span>

          </router-link>


          <!-- CONTACT -->
          <router-link
            to="/contact"
            class="mobile-contact"
            @click="closeSidebar"
          >

            <span>
              Contact / Enquiry
            </span>

            <i class="bi bi-arrow-right"></i>

          </router-link>

        </div>

      </aside>

    </transition>

  </nav>
</template>


<script setup>

import { ref, onMounted, onBeforeUnmount } from "vue";
import { getAllCompany } from "@/publicApis/company.api";


/* =====================================================
   STATE
===================================================== */

const companies = ref([]);

const openBrands = ref(false);

const sidebarOpen = ref(false);

const mobileBrandsOpen = ref(false);


/* =====================================================
   LOAD COMPANIES
===================================================== */

const loadCompanies = async () => {

  try {

    const response = await getAllCompany();

    companies.value = response.data || [];

  } catch (error) {

    console.error("Error loading companies:", error);

    companies.value = [];

  }

};


/* =====================================================
   OPEN SIDEBAR
===================================================== */

const openSidebar = () => {

  sidebarOpen.value = true;

  document.body.classList.add("menu-open");

};


/* =====================================================
   CLOSE SIDEBAR
===================================================== */

const closeSidebar = () => {

  sidebarOpen.value = false;

  mobileBrandsOpen.value = false;

  document.body.classList.remove("menu-open");

};


/* =====================================================
   ESC KEY
===================================================== */

const handleEscape = (event) => {

  if (event.key === "Escape" && sidebarOpen.value) {

    closeSidebar();

  }

};


/* =====================================================
   LIFECYCLE
===================================================== */

onMounted(() => {

  loadCompanies();

  document.addEventListener("keydown", handleEscape);

});


onBeforeUnmount(() => {

  document.removeEventListener("keydown", handleEscape);

  document.body.classList.remove("menu-open");

});

</script>


<style scoped>

/* =====================================================
   NAVBAR
===================================================== */

.public-navbar {

  position: sticky;

  top: 0;

  z-index: 1000;

  width: 100%;

  height: 82px;

  background: #ffffff;

  border-bottom: 1px solid #e5eaf0;

  box-shadow: 0 3px 15px rgba(15, 23, 42, 0.06);

}


.navbar-container {

  height: 100%;

  display: flex;

  align-items: center;

  justify-content: space-between;

}


/* =====================================================
   BRAND
===================================================== */

.navbar-brand {

  text-decoration: none;

}


.brand-wrapper {

  display: flex;

  align-items: center;

  gap: 11px;

}


.brand-logo {

  width: 55px;

  height: 55px;

  object-fit: contain;

}


.brand-text {

  display: flex;

  flex-direction: column;

}


.brand-name {

  color: #101820;

  font-size: 18px;

  font-weight: 800;

  line-height: 1.2;

  white-space: nowrap;

}


.brand-subtitle {

  margin-top: 4px;

  color: #75808b;

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 2px;

}


/* =====================================================
   DESKTOP MENU
===================================================== */

.desktop-menu {

  display: flex;

  align-items: center;

  gap: 3px;

}


.desktop-link {

  position: relative;

  display: flex;

  align-items: center;

  gap: 7px;

  padding: 30px 14px;

  border: 0;

  background: transparent;

  color: #4b5965;

  font-size: 14px;

  font-weight: 600;

  text-decoration: none;

  cursor: pointer;

  white-space: nowrap;

  transition: color 0.2s ease;

}


.desktop-link:hover,

.desktop-link.active {

  color: #1b5e8c;

}


.desktop-link::after {

  content: "";

  position: absolute;

  left: 14px;

  right: 14px;

  bottom: 17px;

  height: 2px;

  background: #1b5e8c;

  transform: scaleX(0);

  transition: transform 0.2s ease;

}


.desktop-link:hover::after,

.desktop-link.active::after {

  transform: scaleX(1);

}


/* =====================================================
   BRANDS
===================================================== */

.desktop-brands {

  position: relative;

}


.brands-button i {

  font-size: 10px;

  transition: transform 0.2s ease;

}


.rotate {

  transform: rotate(180deg);

}


/* =====================================================
   DROPDOWN
===================================================== */

.brands-dropdown {

  position: absolute;

  top: calc(100% - 1px);

  right: 0;

  width: 360px;

  background: #ffffff;

  border: 1px solid #e1e7ed;

  border-radius: 8px;

  overflow: hidden;

  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.14);

  animation: dropdownShow 0.18s ease;

}


@keyframes dropdownShow {

  from {

    opacity: 0;

    transform: translateY(-6px);

  }

  to {

    opacity: 1;

    transform: translateY(0);

  }

}


.brands-dropdown-header {

  padding: 15px 18px;

  background: #f7f9fb;

  border-bottom: 1px solid #e7ecf1;

  color: #162536;

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 1.5px;

}


.brands-list {

  max-height: 350px;

  overflow-y: auto;

}


.brand-link {

  display: flex;

  align-items: center;

  gap: 11px;

  padding: 13px 17px;

  color: #526273;

  text-decoration: none;

  font-size: 14px;

  font-weight: 600;

  transition: background 0.2s ease, color 0.2s ease;

}


.brand-link:hover {

  background: #f5f9fc;

  color: #1b5e8c;

}


.brand-icon {

  width: 34px;

  height: 34px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  border-radius: 7px;

  background: #edf5fc;

  color: #1b5e8c;

}


.brand-link > i {

  margin-left: auto;

  font-size: 18px;

}


.no-brands {

  padding: 25px;

  text-align: center;

  color: #7b8794;

}


/* =====================================================
   CONTACT
===================================================== */

.desktop-contact {

  display: flex;

  align-items: center;

  gap: 9px;

  margin-left: 10px;

  padding: 12px 19px;

  border-radius: 7px;

  background: #1b5e8c;

  color: #ffffff;

  font-size: 13px;

  font-weight: 700;

  text-decoration: none;

  transition: transform 0.2s ease, box-shadow 0.2s ease;

}


.desktop-contact:hover {

  color: #ffffff;

  transform: translateY(-2px);

  box-shadow: 0 7px 20px rgba(27, 94, 140, 0.25);

}


/* =====================================================
   MOBILE BUTTON
===================================================== */

.mobile-menu-button {

  display: none;

  align-items: center;

  justify-content: center;

  width: 44px;

  height: 42px;

  padding: 0;

  border: 1px solid #dce3ea;

  border-radius: 7px;

  background: #ffffff;

  color: #162536;

  font-size: 23px;

  cursor: pointer;

}


/* =====================================================
   MOBILE OVERLAY
===================================================== */

.mobile-overlay {

  position: fixed;

  inset: 0;

  z-index: 1090;

  background: rgba(15, 23, 42, 0.35);

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

.mobile-sidebar {

  position: fixed;

  top: 0;

  right: 0;

  z-index: 1100;

  width: 320px;

  height: 100vh;

  height: 100dvh;

  display: flex;

  flex-direction: column;

  background: #ffffff;

  box-shadow: -10px 0 35px rgba(15, 23, 42, 0.15);

  overflow-y: auto;

}


/* =====================================================
   SIDEBAR HEADER
===================================================== */

.mobile-sidebar-header {

  min-height: 82px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 16px 18px;

  border-bottom: 1px solid #e8edf2;

  background: #ffffff;

}


.mobile-brand {

  display: flex;

  align-items: center;

  gap: 10px;

  min-width: 0;

}


.mobile-brand img {

  width: 46px;

  height: 46px;

  object-fit: contain;

}


.mobile-brand div {

  display: flex;

  flex-direction: column;

  min-width: 0;

}


.mobile-brand strong {

  color: #162536;

  font-size: 13px;

  font-weight: 800;

  white-space: nowrap;

}


.mobile-brand small {

  margin-top: 3px;

  color: #7b8794;

  font-size: 9px;

  font-weight: 700;

  letter-spacing: 1.2px;

}


.close-button {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 36px;

  height: 36px;

  flex-shrink: 0;

  border: 0;

  border-radius: 7px;

  background: #f3f6f9;

  color: #162536;

  cursor: pointer;

}


.close-button:hover {

  background: #e9eef3;

}


/* =====================================================
   SIDEBAR BODY
===================================================== */

.mobile-sidebar-body {

  padding: 15px;

}


/* =====================================================
   MOBILE LINKS
===================================================== */

.mobile-link {

  width: 100%;

  display: flex;

  align-items: center;

  gap: 13px;

  min-height: 50px;

  margin-bottom: 4px;

  padding: 13px 14px;

  border: 0;

  border-radius: 7px;

  background: transparent;

  color: #4e5d69;

  font-family: inherit;

  font-size: 14px;

  font-weight: 600;

  text-decoration: none;

  text-align: left;

  cursor: pointer;

  transition: background 0.2s ease, color 0.2s ease;

}


.mobile-link i {

  width: 21px;

  flex-shrink: 0;

  font-size: 17px;

}


.mobile-link:hover {

  background: #f4f8fc;

  color: #1b5e8c;

}


.mobile-link.active {

  background: #edf5ff;

  color: #1b5e8c;

}


/* =====================================================
   MOBILE BRANDS
===================================================== */

.mobile-dropdown-button {

  justify-content: space-between;

}


.mobile-dropdown-button span {

  display: flex;

  align-items: center;

  gap: 13px;

}


.mobile-dropdown-button > i {

  width: auto;

  font-size: 11px;

}


.mobile-brands-list {

  margin: 0 0 8px 10px;

  padding: 5px 0 5px 15px;

  border-left: 2px solid #e3eaf0;

}


.mobile-brand-link {

  display: flex;

  align-items: center;

  gap: 10px;

  padding: 11px 12px;

  border-radius: 6px;

  color: #687786;

  font-size: 13px;

  font-weight: 600;

  text-decoration: none;

}


.mobile-brand-link:hover {

  background: #f5f9fc;

  color: #1b5e8c;

}


.mobile-brand-link i {

  font-size: 14px;

}


/* =====================================================
   MOBILE CONTACT
===================================================== */

.mobile-contact {

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  margin-top: 20px;

  padding: 14px;

  border-radius: 7px;

  background: #1b5e8c;

  color: #ffffff;

  font-size: 14px;

  font-weight: 700;

  text-decoration: none;

}


.mobile-contact:hover {

  color: #ffffff;

}


/* =====================================================
   SIDEBAR ANIMATION
===================================================== */

.sidebar-enter-active,

.sidebar-leave-active {

  transition: transform 0.25s ease;

}


.sidebar-enter-from,

.sidebar-leave-to {

  transform: translateX(100%);

}


.sidebar-enter-to,

.sidebar-leave-from {

  transform: translateX(0);

}


/* =====================================================
   OVERLAY ANIMATION
===================================================== */

.fade-enter-active,

.fade-leave-active {

  transition: opacity 0.2s ease;

}


.fade-enter-from,

.fade-leave-to {

  opacity: 0;

}


.fade-enter-to,

.fade-leave-from {

  opacity: 1;

}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 991.98px) {

  .public-navbar {

    height: 72px;

  }


  .desktop-menu {

    display: none;

  }


  .mobile-menu-button {

    display: flex;

  }

}

@media (min-width: 992px) and (max-width: 1199.98px) {

  .desktop-menu {
    gap: 0;
  }

  .desktop-link {
    padding-right: 8px;
    padding-left: 8px;
    font-size: 12px;
  }

  .desktop-link::after {
    right: 8px;
    left: 8px;
  }

  .desktop-contact {
    margin-left: 4px;
    padding-right: 11px;
    padding-left: 11px;
    font-size: 11px;
  }

}


@media (max-width: 575.98px) {

  .public-navbar {

    height: 66px;

  }


  .brand-logo {

    width: 45px;

    height: 45px;

  }


  .brand-name {

    font-size: 14px;

  }


  .brand-subtitle {

    font-size: 9px;

    letter-spacing: 1.4px;

  }


  .mobile-sidebar {

    width: min(300px, 88vw);

  }

}


@media (min-width: 992px) {

  .mobile-overlay,

  .mobile-sidebar {

    display: none !important;

  }

}

</style>
```
