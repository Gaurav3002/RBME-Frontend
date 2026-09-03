<template>
  <nav class="public-navbar">

    <!-- =========================
         NAVBAR INNER
    ========================== -->
    <div class="navbar-inner">

      <!-- =========================
           LOGO
      ========================== -->
      <router-link
        to="/"
        class="navbar-brand"
      >
        <img
          src="@/assets/logo/logos.png"
          alt="RBME Engineers"
          class="brand-logo"
        />
      </router-link>


      <!-- =========================
           DESKTOP NAVIGATION
      ========================== -->
      <div class="desktop-navigation">

        <!-- HOME -->
        <router-link
          to="/"
          class="nav-link"
          exact-active-class="active"
        >
          Home
        </router-link>


        <!-- =========================
             OUR BRANDS
        ========================== -->
        <div
          class="brands-wrapper"
          @mouseenter="openBrands = true"
          @mouseleave="openBrands = false"
        >

          <button
            type="button"
            class="nav-link brands-button"
            :class="{ active: openBrands }"
          >
            <span>Our Brands</span>

            <i
              class="bi bi-chevron-down"
              :class="{ rotate: openBrands }"
            ></i>
          </button>


          <!-- BRANDS DROPDOWN -->
          <div
            v-if="openBrands"
            class="brands-dropdown"
          >

            <div class="dropdown-top">

              <span class="dropdown-label">
                OUR BRANDS
              </span>

              <span class="dropdown-description">
                Explore our engineering solutions
              </span>

            </div>


            <div
              v-if="companies.length"
              class="brands-list"
            >

              <router-link
                v-for="company in companies"
                :key="company.id"
                :to="`/companies/${company.id}`"
                class="brand-item"
                @click="openBrands = false"
              >

                <div class="brand-item-icon">
                  <i class="bi bi-buildings"></i>
                </div>

                <div class="brand-item-content">

                  <span>
                    {{ company.name }}
                  </span>

                  <small>
                    View products & solutions
                  </small>

                </div>

                <i class="bi bi-arrow-up-right"></i>

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
          class="nav-link"
          active-class="active"
        >
          Projects / Automation
        </router-link>


        <!-- ABOUT -->
        <router-link
          to="/about"
          class="nav-link"
          active-class="active"
        >
          About
        </router-link>


        <!-- CONTACT -->
        <router-link
          to="/contact#contact-form"
          class="nav-cta"
        >
          <span>
            Discuss Your Requirement
          </span>

          <i class="bi bi-arrow-up-right"></i>
        </router-link>

      </div>


      <!-- =========================
           MOBILE MENU BUTTON
      ========================== -->
      <button
        type="button"
        class="mobile-menu-button"
        @click="openSidebar"
        aria-label="Open menu"
      >
        <span></span>
        <span></span>
      </button>

    </div>


    <!-- =========================
         MOBILE OVERLAY
    ========================== -->
    <transition name="fade">

      <div
        v-if="sidebarOpen"
        class="mobile-overlay"
        @click="closeSidebar"
      ></div>

    </transition>


    <!-- =========================
         MOBILE SIDEBAR
    ========================== -->
    <transition name="sidebar">

      <aside
        v-if="sidebarOpen"
        class="mobile-sidebar"
      >

        <!-- =========================
             SIDEBAR HEADER
        ========================== -->
        <div class="mobile-sidebar-header">

          <!-- ONLY LOGO -->
          <router-link
            to="/"
            class="mobile-brand"
            @click="closeSidebar"
          >
            <img
              src="@/assets/logo/logos.png"
              alt="RBME Engineers"
            />
          </router-link>


          <!-- CLOSE -->
          <button
            type="button"
            class="mobile-close"
            @click="closeSidebar"
            aria-label="Close menu"
          >
            <i class="bi bi-x-lg"></i>
          </button>

        </div>


        <!-- =========================
             SIDEBAR CONTENT
        ========================== -->
        <div class="mobile-sidebar-content">

          <!-- HOME -->
          <router-link
            to="/"
            class="mobile-nav-link"
            exact-active-class="active"
            @click="closeSidebar"
          >

            <span class="mobile-left">

              <span class="mobile-icon">
                <i class="bi bi-house"></i>
              </span>

              <span>
                Home
              </span>

            </span>

            <i class="bi bi-arrow-right"></i>

          </router-link>


          <!-- =========================
               OUR BRANDS
          ========================== -->
          <button
            type="button"
            class="mobile-nav-link"
            @click="mobileBrandsOpen = !mobileBrandsOpen"
          >

            <span class="mobile-left">

              <span class="mobile-icon">
                <i class="bi bi-buildings"></i>
              </span>

              <span>
                Our Brands
              </span>

            </span>

            <i
              class="bi bi-chevron-down"
              :class="{ rotate: mobileBrandsOpen }"
            ></i>

          </button>


          <!-- MOBILE BRANDS -->
          <div
            v-if="mobileBrandsOpen"
            class="mobile-brands"
          >

            <router-link
              v-for="company in companies"
              :key="company.id"
              :to="`/companies/${company.id}`"
              class="mobile-brand-item"
              @click="closeSidebar"
            >

              <i class="bi bi-arrow-up-right"></i>

              <span>
                {{ company.name }}
              </span>

            </router-link>

          </div>


          <!-- PROJECTS -->
          <router-link
            to="/projects"
            class="mobile-nav-link"
            active-class="active"
            @click="closeSidebar"
          >

            <span class="mobile-left">

              <span class="mobile-icon">
                <i class="bi bi-gear"></i>
              </span>

              <span>
                Projects / Automation
              </span>

            </span>

            <i class="bi bi-arrow-right"></i>

          </router-link>


          <!-- ABOUT -->
          <router-link
            to="/about"
            class="mobile-nav-link"
            active-class="active"
            @click="closeSidebar"
          >

            <span class="mobile-left">

              <span class="mobile-icon">
                <i class="bi bi-info-circle"></i>
              </span>

              <span>
                About
              </span>

            </span>

            <i class="bi bi-arrow-right"></i>

          </router-link>


          <!-- CONTACT -->
          <router-link
            to="/contact#contact-form"
            class="mobile-contact"
            @click="closeSidebar"
          >

            <span>
              Discuss Your Requirement
            </span>

            <i class="bi bi-arrow-up-right"></i>

          </router-link>

        </div>

      </aside>

    </transition>

  </nav>
</template>


<script setup>

import {
  ref,
  onMounted,
  onBeforeUnmount
} from "vue";

import {
  getAllCompany
} from "@/publicApis/company.api";


// =========================
// STATE
// =========================

const companies = ref([]);

const openBrands = ref(false);

const sidebarOpen = ref(false);

const mobileBrandsOpen = ref(false);


// =========================
// LOAD COMPANIES
// =========================

const loadCompanies = async () => {

  try {

    const response = await getAllCompany();

    companies.value = response.data || [];

  } catch (error) {

    console.error(
      "Error loading companies:",
      error
    );

    companies.value = [];

  }

};


// =========================
// OPEN SIDEBAR
// =========================

const openSidebar = () => {

  sidebarOpen.value = true;

  document.body.classList.add(
    "menu-open"
  );

};


// =========================
// CLOSE SIDEBAR
// =========================

const closeSidebar = () => {

  sidebarOpen.value = false;

  mobileBrandsOpen.value = false;

  document.body.classList.remove(
    "menu-open"
  );

};


// =========================
// ESCAPE KEY
// =========================

const handleEscape = (event) => {

  if (
    event.key === "Escape" &&
    sidebarOpen.value
  ) {

    closeSidebar();

  }

};


// =========================
// LIFECYCLE
// =========================

onMounted(() => {

  loadCompanies();

  document.addEventListener(
    "keydown",
    handleEscape
  );

});


onBeforeUnmount(() => {

  document.removeEventListener(
    "keydown",
    handleEscape
  );

  document.body.classList.remove(
    "menu-open"
  );

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
  height: 80px;

  background: rgba(255, 255, 255, 0.98);

  border-bottom: 1px solid #e5e9ee;

  box-shadow:
    0 4px 25px rgba(11, 23, 38, 0.06);

  backdrop-filter: blur(14px);
}


/* =====================================================
   NAVBAR INNER
===================================================== */

.navbar-inner {
  width: min(
    1380px,
    calc(100% - 64px)
  );

  height: 100%;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
}


/* =====================================================
   LOGO
===================================================== */

.navbar-brand {
  display: flex;
  align-items: center;

  flex-shrink: 0;

  height: 100%;

  text-decoration: none;
}


.brand-logo {
  width: 125px;
  height: 76px;

  object-fit: contain;

  display: block;
}


/* =====================================================
   DESKTOP NAVIGATION
===================================================== */

.desktop-navigation {
  height: 100%;

  display: flex;
  align-items: center;

  gap: 4px;
}


/* =====================================================
   NAV LINKS
===================================================== */

.nav-link {
  position: relative;

  height: 100%;

  display: flex;
  align-items: center;

  padding: 0 17px;

  border: 0;

  background: transparent;

  color: #4d5b69;

  font-family: inherit;

  font-size: 13.5px;
  font-weight: 650;

  text-decoration: none;

  white-space: nowrap;

  cursor: pointer;

  transition:
    color 0.25s ease;
}


.nav-link::after {
  content: "";

  position: absolute;

  left: 17px;
  right: 17px;

  bottom: 0;

  height: 2px;

  background: #c58a24;

  transform: scaleX(0);

  transform-origin: center;

  transition:
    transform 0.25s ease;
}


.nav-link:hover,
.nav-link.active {
  color: #0b1726;
}


.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}


/* =====================================================
   BRANDS
===================================================== */

.brands-wrapper {
  position: relative;

  height: 100%;

  display: flex;
  align-items: center;
}


.brands-button {
  gap: 8px;
}


.brands-button i {
  font-size: 9px;

  transition:
    transform 0.25s ease;
}


.rotate {
  transform: rotate(180deg);
}


/* =====================================================
   BRANDS DROPDOWN
===================================================== */

.brands-dropdown {
  position: absolute;

  top: calc(100% + 1px);

  left: 50%;

  width: 390px;

  transform: translateX(-50%);

  background: #ffffff;

  border: 1px solid #e3e8ed;

  box-shadow:
    0 22px 55px rgba(11, 23, 38, 0.15);

  overflow: hidden;

  animation:
    dropdown-enter 0.2s ease;
}


@keyframes dropdown-enter {

  from {
    opacity: 0;

    transform:
      translate(-50%, -8px);
  }

  to {
    opacity: 1;

    transform:
      translate(-50%, 0);
  }

}


/* =====================================================
   DROPDOWN HEADER
===================================================== */

.dropdown-top {
  padding: 22px;

  background: #f8fafc;

  border-bottom: 1px solid #e6ebef;
}


.dropdown-label {
  display: block;

  color: #1b5e8c;

  font-size: 10px;
  font-weight: 800;

  letter-spacing: 1.8px;
}


.dropdown-description {
  display: block;

  margin-top: 5px;

  color: #788594;

  font-size: 12px;
}


/* =====================================================
   BRAND LIST
===================================================== */

.brands-list {
  max-height: 360px;

  overflow-y: auto;
}


.brand-item {
  display: flex;
  align-items: center;

  gap: 13px;

  padding: 15px 18px;

  color: #243444;

  text-decoration: none;

  border-bottom: 1px solid #edf0f3;

  transition:
    background 0.2s ease,
    padding-left 0.2s ease;
}


.brand-item:last-child {
  border-bottom: 0;
}


.brand-item:hover {
  background: #f7fafc;

  padding-left: 22px;
}


.brand-item-icon {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  background: #eef5f9;

  color: #1b5e8c;

  border: 1px solid #dce8ef;
}


.brand-item-icon i {
  font-size: 17px;
}


.brand-item-content {
  flex: 1;

  min-width: 0;

  display: flex;
  flex-direction: column;
}


.brand-item-content span {
  color: #1c2c3b;

  font-size: 13px;
  font-weight: 700;
}


.brand-item-content small {
  margin-top: 3px;

  color: #84909c;

  font-size: 10px;
}


.brand-item > i {
  color: #8a96a2;

  font-size: 15px;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}


.brand-item:hover > i {
  color: #1b5e8c;

  transform:
    translate(2px, -2px);
}


/* =====================================================
   NO BRANDS
===================================================== */

.no-brands {
  padding: 30px;

  text-align: center;

  color: #7d8995;

  font-size: 13px;
}


/* =====================================================
   CONTACT CTA
===================================================== */

.nav-cta {
  display: flex;
  align-items: center;

  gap: 10px;

  margin-left: 14px;

  padding: 13px 19px;

  background: #0b1726;

  color: #ffffff;

  text-decoration: none;

  font-size: 12px;
  font-weight: 750;

  white-space: nowrap;

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}


.nav-cta i {
  font-size: 13px;

  transition:
    transform 0.25s ease;
}


.nav-cta:hover {
  background: #1b5e8c;

  color: #ffffff;

  transform: translateY(-1px);

  box-shadow:
    0 9px 25px rgba(11, 23, 38, 0.18);
}


.nav-cta:hover i {
  transform:
    translate(2px, -2px);
}


/* =====================================================
   MOBILE MENU BUTTON
===================================================== */

.mobile-menu-button {
  display: none;

  width: 46px;
  height: 42px;

  padding: 0;

  border: 1px solid #dce3e9;

  background: #ffffff;

  cursor: pointer;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 6px;
}


.mobile-menu-button span {
  display: block;

  width: 20px;
  height: 1.5px;

  background: #0b1726;
}


/* =====================================================
   MOBILE OVERLAY
===================================================== */

.mobile-overlay {
  position: fixed;

  inset: 0;

  z-index: 1090;

  background:
    rgba(11, 23, 38, 0.45);

  backdrop-filter: blur(3px);
}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

.mobile-sidebar {
  position: fixed;

  top: 0;
  right: 0;

  z-index: 1100;

  width: min(
    390px,
    90vw
  );

  height: 100vh;
  height: 100dvh;

  display: flex;
  flex-direction: column;

  background: #ffffff;

  box-shadow:
    -20px 0 60px rgba(11, 23, 38, 0.2);

  overflow-y: auto;
}


/* =====================================================
   MOBILE HEADER
===================================================== */

.mobile-sidebar-header {
  min-height: 82px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 20px;

  border-bottom: 1px solid #e6ebef;
}


/* =====================================================
   MOBILE LOGO
===================================================== */

.mobile-brand {
  display: flex;
  align-items: center;

  height: 100%;

  text-decoration: none;
}


.mobile-brand img {
  width: 78px;
  height: 62px;

  object-fit: contain;

  display: block;
}


/* =====================================================
   CLOSE BUTTON
===================================================== */

.mobile-close {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #e1e6eb;

  background: #f8fafb;

  color: #0b1726;

  cursor: pointer;

  transition:
    background 0.2s ease;
}


.mobile-close:hover {
  background: #eef2f5;
}


/* =====================================================
   MOBILE CONTENT
===================================================== */

.mobile-sidebar-content {
  padding: 20px;
}


/* =====================================================
   MOBILE NAV LINKS
===================================================== */

.mobile-nav-link {
  width: 100%;

  min-height: 58px;

  display: flex;
  align-items: center;

  justify-content: space-between;

  gap: 12px;

  padding: 12px 8px;

  border: 0;

  border-bottom: 1px solid #edf0f3;

  background: transparent;

  color: #3e4d5b;

  font-family: inherit;

  font-size: 14px;
  font-weight: 650;

  text-decoration: none;

  text-align: left;

  cursor: pointer;

  transition:
    color 0.2s ease,
    padding-left 0.2s ease;
}


.mobile-nav-link:hover,
.mobile-nav-link.active {
  color: #1b5e8c;

  padding-left: 12px;
}


.mobile-nav-link > i {
  color: #9aa5af;

  font-size: 13px;
}


.mobile-left {
  display: flex;
  align-items: center;

  gap: 13px;
}


/* =====================================================
   MOBILE ICON
===================================================== */

.mobile-icon {
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  background: #f2f6f9;

  color: #1b5e8c;
}


.mobile-icon i {
  font-size: 16px;
}


/* =====================================================
   MOBILE BRANDS
===================================================== */

.mobile-brands {
  margin: 4px 0 8px 18px;

  padding-left: 15px;

  border-left: 1px solid #dce3e9;
}


.mobile-brand-item {
  display: flex;
  align-items: center;

  gap: 10px;

  padding: 12px 8px;

  color: #657482;

  font-size: 13px;
  font-weight: 600;

  text-decoration: none;
}


.mobile-brand-item:hover {
  color: #1b5e8c;
}


.mobile-brand-item i {
  font-size: 11px;
}


/* =====================================================
   MOBILE CONTACT
===================================================== */

.mobile-contact {
  margin-top: 28px;

  padding: 18px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 15px;

  background: #0b1726;

  color: #ffffff;

  text-decoration: none;

  font-size: 13px;
  font-weight: 700;

  transition:
    background 0.25s ease;
}


.mobile-contact:hover {
  background: #1b5e8c;

  color: #ffffff;
}


.mobile-contact > i {
  font-size: 18px;
}


/* =====================================================
   SIDEBAR ANIMATION
===================================================== */

.sidebar-enter-active,
.sidebar-leave-active {
  transition:
    transform 0.3s ease;
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
  transition:
    opacity 0.25s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 1200px) {

  .navbar-inner {
    width: min(
      100% - 40px,
      1100px
    );
  }


  .brand-logo {
    width: 115px;
    height: 72px;
  }


  .nav-link {
    padding-left: 10px;
    padding-right: 10px;

    font-size: 12px;
  }


  .nav-link::after {
    left: 10px;
    right: 10px;
  }


  .nav-cta {
    margin-left: 5px;

    padding-left: 12px;
    padding-right: 12px;

    font-size: 11px;
  }

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 991.98px) {

  .public-navbar {
    height: 72px;
  }


  .navbar-inner {
    width: calc(100% - 32px);
  }


  .desktop-navigation {
    display: none;
  }


  .mobile-menu-button {
    display: flex;
  }


  .brand-logo {
    width: 100px;
    height: 66px;
  }

}


/* =====================================================
   SMALL MOBILE
===================================================== */

@media (max-width: 575.98px) {

  .public-navbar {
    height: 68px;
  }


  .navbar-inner {
    width: calc(100% - 24px);
  }


  .brand-logo {
    width: 88px;
    height: 62px;
  }


  .mobile-menu-button {
    width: 42px;
    height: 40px;
  }


  .mobile-sidebar {
    width: min(
      350px,
      92vw
    );
  }


  .mobile-brand img {
    width: 70px;
    height: 58px;
  }

}


/* =====================================================
   DESKTOP ONLY
===================================================== */

@media (min-width: 992px) {

  .mobile-overlay,
  .mobile-sidebar {
    display: none !important;
  }

}


/* =====================================================
   BODY LOCK
===================================================== */

:global(body.menu-open) {
  overflow: hidden;
}

</style>