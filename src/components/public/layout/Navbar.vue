<template>

  <nav class="navbar navbar-expand-lg public-navbar">

    <div class="container">

      <!-- =================================================
           BRAND
      ================================================== -->

      <router-link
      class="navbar-brand"
      to="/"
    >
      <div class="brand-wrapper">

        <!-- Logo -->
        <img
          src="@/assets/logo/logos.png"
          alt="RBME Engineers"
          class="brand-logo"
        />

        <!-- Company Name -->
        <div class="brand-text">
          <span class="brand-name">
            Ram Bakery Machines
          </span>

          <span class="brand-subtitle">
            &amp; Engineers
          </span>
        </div>

      </div>
      </router-link>


      <!-- =================================================
           MOBILE TOGGLER
      ================================================== -->

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#publicNavbar"
        aria-controls="publicNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>


      <!-- =================================================
           NAVIGATION
      ================================================== -->

      <div
        class="collapse navbar-collapse"
        id="publicNavbar"
      >

        <ul class="navbar-nav ms-auto align-items-lg-center">

          <!-- HOME -->

          <li class="nav-item">

            <router-link
              class="nav-link"
              to="/"
              exact-active-class="active"
            >
              Home
            </router-link>

          </li>


          <!-- =================================================
               OUR BRANDS
          ================================================== -->

          <li
            class="nav-item brands-menu-item"
            @mouseenter="openBrands = true"
            @mouseleave="openBrands = false"
          >

            <a
              href="#"
              class="nav-link brands-trigger"
              :class="{ active: openBrands }"
              @click.prevent="toggleBrands"
            >

              Our Brands

              <i class="bi bi-chevron-down brands-arrow"></i>

            </a>


            <!-- MEGA MENU -->

            <div
              v-if="openBrands"
              class="brands-mega-menu"
            >

              <div class="brands-mega-container">

                <div class="brands-title">
                  OUR BRANDS
                </div>


                <div class="brands-grid">

                  <router-link
                    v-for="company in companies"
                    :key="company.id"
                    :to="`/companies/${company.id}`"
                    class="brand-name-item"
                    @click="openBrands = false"
                  >

                    {{ company.name }}

                  </router-link>

                </div>

              </div>

            </div>

          </li>


          <!-- PROJECTS -->

          <li class="nav-item">

            <router-link
              class="nav-link"
              to="/projects"
              active-class="active"
            >
              Projects / Automation
            </router-link>

          </li>


          <!-- ABOUT -->

          <li class="nav-item">

            <router-link
              class="nav-link"
              to="/about"
              active-class="active"
            >
              About
            </router-link>

          </li>


          <!-- CONTACT -->

          <li class="nav-item contact-nav-item">

            <router-link
              class="nav-link contact-button"
              to="/contact"
            >

              <span>
                Contact / Enquiry
              </span>

              <i class="bi bi-arrow-right"></i>

            </router-link>

          </li>

        </ul>

      </div>

    </div>

  </nav>

</template>


<script setup>

import { ref, onMounted } from "vue";

import { getAllCompany } from "@/publicApis/company.api";

const companies = ref([]);

const openBrands = ref(false);


const loadCompanies = async () => {

  try {

    const response = await getAllCompany();

    companies.value = response.data;

  } catch (error) {

    console.error(
      "Error loading companies:",
      error
    );

    companies.value = [];

  }

};


const toggleBrands = () => {

  openBrands.value = !openBrands.value;

};


onMounted(() => {

  loadCompanies();

});

</script>


<style scoped>

/* =====================================================
   NAVBAR
===================================================== */

.public-navbar {

  position: sticky;

  top: 0;

  z-index: 1030;

  min-height: 82px;

  background: #ffffff;

  border-bottom: 1px solid #edf0f3;

  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.05);

}


/* =====================================================
   NAVBAR CONTAINER
===================================================== */

.public-navbar .container {

  position: relative;

}


/* =====================================================
   BRAND
===================================================== */

.navbar-brand {
  display: flex;
  align-items: center;

  padding: 0 !important;
  margin: 0 45px 0 0;

  text-decoration: none;
}


.brand-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;

}

/* =====================================================
   ACTUAL LOGO
===================================================== */
.brand-logo {
  width: 52px;
  height: 52px;

  display: block;

  object-fit: contain;
  object-position: center;

  border: none !important;
  border-radius: 0 !important;

  background: transparent !important;
  box-shadow: none !important;

  padding: 0;
  margin: 0;
}
.brand-text {
  display: flex;
  flex-direction: column;

  justify-content: center;

  line-height: 1;
}
.brand-name {
  display: block;

  color: #101820;

  font-size: 1.15rem;
  font-weight: 800;

  letter-spacing: -0.2px;

  white-space: nowrap;
}
.brand-subtitle {
  display: block;

  margin-top: 5px;

  color: #68737d;

  font-size: 0.78rem;
  font-weight: 700;

  letter-spacing: 2px;

  white-space: nowrap;
}


/* =====================================================
   NAVIGATION
===================================================== */

.navbar-nav {

  gap: 5px;

}


.nav-link {

  position: relative;

  display: flex;

  align-items: center;

  padding: 29px 16px !important;

  color: #4c5660 !important;

  font-size: 0.9rem;

  font-weight: 600;

  white-space: nowrap;

  text-decoration: none;

  transition: all 0.25s ease;

}


/* =====================================================
   NAV LINK HOVER
===================================================== */

.nav-link:hover {

  color: #0d6efd !important;

}


/* =====================================================
   NAV LINK ACTIVE
===================================================== */

.nav-link.active {

  color: #0d6efd !important;

}


/* =====================================================
   ACTIVE UNDERLINE
===================================================== */

.nav-link:not(.contact-button)::after {

  content: "";

  position: absolute;

  left: 16px;

  right: 16px;

  bottom: 17px;

  height: 2px;

  background: #0d6efd;

  transform: scaleX(0);

  transform-origin: center;

  transition: transform 0.25s ease;

}


.nav-link:not(.contact-button):hover::after,

.nav-link:not(.contact-button).active::after {

  transform: scaleX(1);

}


/* =====================================================
   OUR BRANDS
===================================================== */

.brands-menu-item {

  position: static;

}


.brands-trigger {

  display: flex;

  align-items: center;

  gap: 7px;

}


.brands-arrow {

  font-size: 0.65rem;

  transition: transform 0.25s ease;

}


.brands-trigger:hover .brands-arrow {

  transform: rotate(180deg);

}


/* =====================================================
   BRANDS MEGA MENU
===================================================== */

.brands-mega-menu {

  position: absolute;

  top: 100%;

  left: 0;

  width: 100%;

  background: #ffffff;

  border-top: 1px solid #edf0f3;

  border-bottom: 1px solid #e5e9ed;

  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.08);

  animation: brandsMenuShow 0.2s ease;

}


@keyframes brandsMenuShow {

  from {

    opacity: 0;

    transform: translateY(-6px);

  }

  to {

    opacity: 1;

    transform: translateY(0);

  }

}


/* =====================================================
   MEGA MENU CONTAINER
===================================================== */

.brands-mega-container {

  max-width: 1140px;

  margin: 0 auto;

  padding: 28px 15px 32px;

}


/* =====================================================
   MEGA MENU TITLE
===================================================== */

.brands-title {

  margin-bottom: 20px;

  color: #101820;

  font-size: 0.72rem;

  font-weight: 800;

  letter-spacing: 2px;

}


/* =====================================================
   COMPANY GRID
===================================================== */

.brands-grid {

  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  column-gap: 50px;

  row-gap: 4px;

}


/* =====================================================
   COMPANY NAME
===================================================== */

.brand-name-item {

  display: flex;

  align-items: center;

  min-height: 48px;

  padding: 10px 5px;

  color: #4c5660;

  font-size: 0.9rem;

  font-weight: 600;

  text-decoration: none;

  border-bottom: 1px solid #f0f2f4;

  transition:
    color 0.2s ease,
    padding-left 0.2s ease,
    background 0.2s ease;

}


.brand-name-item:hover {

  color: #0d6efd;

  padding-left: 12px;

  background: #f8faff;

}


.brand-name-item.router-link-active {

  color: #0d6efd;

}


/* =====================================================
   CONTACT
===================================================== */

.contact-nav-item {

  margin-left: 12px;

}


.contact-button {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  padding: 11px 19px !important;

  border-radius: 6px;

  background: #0d6efd;

  color: #ffffff !important;

  font-size: 0.85rem;

  box-shadow:
    0 5px 15px rgba(13, 110, 253, 0.18);

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;

}


.contact-button:hover {

  background: #0b5ed7;

  color: #ffffff !important;

  transform: translateY(-1px);

  box-shadow:
    0 8px 20px rgba(13, 110, 253, 0.25);

}


.contact-button i {

  font-size: 0.8rem;

  transition: transform 0.2s ease;

}


.contact-button:hover i {

  transform: translateX(3px);

}


/* =====================================================
   MOBILE TOGGLER
===================================================== */

.navbar-toggler {

  padding: 8px 10px;

  border: 1px solid #dee2e6;

  border-radius: 6px;

}


.navbar-toggler:focus {

  box-shadow:
    0 0 0 3px rgba(13, 110, 253, 0.12);

}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 1199.98px) {

  .brands-mega-container {

    max-width: 960px;

  }

}


/* =====================================================
   TABLET / MOBILE
===================================================== */
@media (max-width: 991.98px) {

  .public-navbar {
    min-height: 70px;
  }

  .navbar-brand {
    margin-right: 0;
  }

  .brand-logo {
    width: 48px;
    height: 48px;
  }

  .brand-name {
    font-size: 1rem;
  }

  .brand-subtitle {
    font-size: 0.68rem;
    letter-spacing: 1.5px;
  }

  .navbar-collapse {
    margin-top: 15px;
    padding: 10px 0 20px;
    border-top: 1px solid #edf0f3;
  }

}


/* =====================================================
   MOBILE
===================================================== */
@media (max-width: 575.98px) {

  .public-navbar {
    min-height: 65px;
  }

  .brand-logo {
    width: 42px;
    height: 42px;
  }

  .brand-name {
    font-size: 0.9rem;
  }

  .brand-subtitle {
    margin-top: 4px;
    font-size: 0.6rem;
    letter-spacing: 1.2px;
  }

  .brand-wrapper {
    gap: 8px;
  }

}

</style>