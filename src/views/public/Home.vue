<template>
  <div class="home-page">

    <!-- =========================================================
         HERO
    ========================================================== -->
    <section class="hero-section">
      <div class="hero-banner">
        <Transition name="fade" mode="out-in">
          <img
            :key="currentSlide"
            :src="slides[currentSlide]"
            alt="RBME Engineers Equipment"
            class="hero-banner-image"
          />
        </Transition>
        <div class="hero-banner-overlay"></div>
      </div>

      <div class="container hero-container">
        <div class="hero-content-panel">
          <div class="hero-content">

            <div class="hero-badge">
              <i class="bi bi-gear-wide-connected"></i>
              Bakery Equipment & Solutions
            </div>

            <h1 class="hero-title">
              Complete Bakery
              <span>Equipment Solutions</span>
              For Growing Businesses
            </h1>

            <p class="hero-description">
              RBME Engineers helps bakeries, food businesses and commercial
              kitchens choose, install and maintain the right equipment
              for their production requirements.
            </p>

            <div class="hero-actions">
              <router-link
                to="/companies/1"
                class="btn btn-primary public-button hero-btn"
              >
                Explore Our Brands
                <i class="bi bi-arrow-right"></i>
              </router-link>

              <router-link
                to="/contact#contact-form"
                class="btn public-button hero-btn-outline"
              >
                Discuss Your Requirement
                <i class="bi bi-chat-dots"></i>
              </router-link>
            </div>

            <div class="hero-trust">

              <div class="trust-item">
                <strong>
                  <i class="bi bi-buildings"></i>
                  Multiple
                </strong>
                <span>Equipment Brands</span>
              </div>

              <div class="trust-divider"></div>

              <div class="trust-item">
                <strong>
                  <i class="bi bi-truck"></i>
                  All Major Cities
                </strong>
                <span>Customer Support</span>
              </div>

              <div class="trust-divider"></div>

              <div class="trust-item">
                <strong>
                  <i class="bi bi-diagram-3"></i>
                  End-to-End
                </strong>
                <span>Equipment Solutions</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="hero-scroll">
        <span>Explore</span>
        <i class="bi bi-chevron-down"></i>
      </div>
    </section>


    <!-- =========================================================
         INTRODUCTION
    ========================================================== -->
    <section class="intro-section">
      <div class="container">
        <div class="row align-items-center g-5">

          <div class="col-lg-5">
            <span class="section-label">
              MORE THAN EQUIPMENT
            </span>

            <h2 class="section-title">
              We help you build
              a better production setup.
            </h2>
          </div>

          <div class="col-lg-7">
            <p class="intro-text">
              Choosing bakery equipment is not simply about buying a machine.
              The right equipment has to match your product, production
              capacity, workflow, available space and future expansion plans.
            </p>

            <p class="intro-text">
              RBME Engineers works with businesses at different stages —
              from new bakery setups to established production facilities
              looking to upgrade or expand their capacity.
            </p>

            <div class="intro-highlights">
              <div>
                <i class="bi bi-check-circle-fill"></i>
                <span>Requirement-based equipment selection</span>
              </div>

              <div>
                <i class="bi bi-check-circle-fill"></i>
                <span>Multiple equipment brands</span>
              </div>

              <div>
                <i class="bi bi-check-circle-fill"></i>
                <span>Installation & technical support</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- =========================================================
         EQUIPMENT SOLUTIONS
    ========================================================== -->
    <section class="equipment-section">
      <div class="container">

        <div class="section-heading equipment-heading">
          <span class="section-label">
            EQUIPMENT SOLUTIONS
          </span>

          <h2 class="section-title">
            Professional equipment for
            every stage of bakery production
          </h2>

          <p>
            From dough preparation and sheeting to baking, proofing and
            complete production lines, our equipment portfolio supports
            efficient and reliable bakery operations.
          </p>
        </div>


        <div class="row g-4">

          <!-- 01 MIXER -->
          <div class="col-md-6 col-lg-4">
            <div class="equipment-card">

              <div class="equipment-image">
                <div class="equipment-icon icon-primary">
                  <i class="bi bi-arrow-repeat"></i>
                </div>

                <span class="equipment-tag">
                  PREPARATION
                </span>

                <img
                  src="@/assets/images/mixer.jpg"
                  alt="Industrial Bakery Dough Mixer"
                  loading="lazy"
                />
              </div>

              <div class="equipment-content">
                <div class="equipment-top">
                  <span class="equipment-number">
                    01
                  </span>

                  <i class="bi bi-gear-wide-connected equipment-small-icon icon-primary"></i>
                </div>

                <h3>Dough Mixers</h3>

                <p>
                  Heavy-duty mixing equipment designed for efficient
                  dough preparation, uniform mixing and consistent
                  results across commercial bakery production.
                </p>

                <router-link to="/companies/1" class="equipment-link">
                  Explore mixers
                  <i class="bi bi-arrow-right"></i>
                </router-link>
              </div>

            </div>
          </div>


          <!-- 02 OVEN -->
          <div class="col-md-6 col-lg-4">
            <div class="equipment-card">

              <div class="equipment-image">
                <div class="equipment-icon icon-accent">
                  <i class="bi bi-fire"></i>
                </div>

                <span class="equipment-tag">
                  BAKING
                </span>

                <img
                  src="@/assets/images/baking-oven.jpg"
                  alt="Commercial Bakery Oven"
                  loading="lazy"
                />
              </div>

              <div class="equipment-content">
                <div class="equipment-top">
                  <span class="equipment-number">
                    02
                  </span>

                  <i class="bi bi-fire equipment-small-icon icon-accent"></i>
                </div>

                <h3>Bakery Ovens</h3>

                <p>
                  Commercial baking ovens built for controlled
                  temperature, consistent baking and reliable production
                  across different bakery applications.
                </p>

                <router-link to="/companies/1" class="equipment-link">
                  Explore ovens
                  <i class="bi bi-arrow-right"></i>
                </router-link>
              </div>

            </div>
          </div>


          <!-- 03 SHEETER -->
          <div class="col-md-6 col-lg-4">
            <div class="equipment-card">

              <div class="equipment-image">
                <div class="equipment-icon icon-primary">
                  <i class="bi bi-arrows-expand"></i>
                </div>

                <span class="equipment-tag">
                  PROCESSING
                </span>

                <img
                  src="@/assets/images/sheeter.jpg"
                  alt="Commercial Dough Sheeter"
                  loading="lazy"
                />
              </div>

              <div class="equipment-content">
                <div class="equipment-top">
                  <span class="equipment-number">
                    03
                  </span>

                  <i class="bi bi-arrows-expand equipment-small-icon icon-primary"></i>
                </div>

                <h3>Dough Sheeters</h3>

                <p>
                  Professional dough sheeting equipment designed to
                  roll and prepare dough with consistent thickness,
                  helping improve speed, uniformity and efficiency.
                </p>

                <router-link to="/companies/1" class="equipment-link">
                  Explore sheeters
                  <i class="bi bi-arrow-right"></i>
                </router-link>
              </div>

            </div>
          </div>


          <!-- 04 PROOFER -->
          <div class="col-md-6 col-lg-4">
            <div class="equipment-card">

              <div class="equipment-image">
                <div class="equipment-icon icon-success">
                  <i class="bi bi-thermometer-half"></i>
                </div>

                <span class="equipment-tag">
                  PROOFING
                </span>

                <img
                  src="@/assets/images/proffer.jpg"
                  alt="Bakery Dough Proofer"
                  loading="lazy"
                />
              </div>

              <div class="equipment-content">
                <div class="equipment-top">
                  <span class="equipment-number">
                    04
                  </span>

                  <i class="bi bi-thermometer-half equipment-small-icon icon-success"></i>
                </div>

                <h3>Dough Proofers</h3>

                <p>
                  Controlled proofing chambers designed to provide
                  suitable conditions for dough fermentation, helping
                  achieve consistent volume, texture and baking results.
                </p>

                <router-link to="/companies/1" class="equipment-link">
                  Explore proofers
                  <i class="bi bi-arrow-right"></i>
                </router-link>
              </div>

            </div>
          </div>


          <!-- 05 PRODUCTION LINE -->
          <div class="col-md-6 col-lg-4">
            <div class="equipment-card featured-equipment">

              <div class="equipment-image">
                <div class="equipment-icon icon-success">
                  <i class="bi bi-diagram-3"></i>
                </div>

                <span class="equipment-tag">
                  COMPLETE LINE
                </span>

                <img
                  src="@/assets/images/bakery-line.png"
                  alt="Complete Bakery Production Line"
                  loading="lazy"
                />
              </div>

              <div class="equipment-content">
                <div class="equipment-top">
                  <span class="equipment-number">
                    05
                  </span>

                  <i class="bi bi-diagram-3 equipment-small-icon icon-success"></i>
                </div>

                <h3>Bakery Production Lines</h3>

                <p>
                  Complete bakery equipment solutions combining multiple
                  machines and production stages into an efficient
                  workflow tailored to commercial requirements.
                </p>

                <router-link to="/companies/1" class="equipment-link">
                  Explore production lines
                  <i class="bi bi-arrow-right"></i>
                </router-link>
              </div>

            </div>
          </div>


          <!-- 06 COMPACT MIXER -->
          <div class="col-md-6 col-lg-4">
            <div class="equipment-card">

              <div class="equipment-image">
                <div class="equipment-icon icon-dark">
                  <i class="bi bi-box"></i>
                </div>

                <span class="equipment-tag">
                  COMPACT
                </span>

                <img
                  src="@/assets/images/custom-equipment.png"
                  alt="Compact Bakery Mixer"
                  loading="lazy"
                />
              </div>

              <div class="equipment-content">
                <div class="equipment-top">
                  <span class="equipment-number">
                    06
                  </span>

                  <i class="bi bi-box equipment-small-icon icon-dark"></i>
                </div>

                <h3>Compact Bakery Mixers</h3>

                <p>
                  Compact and practical mixing machines designed for
                  smaller bakeries, restaurants, pastry operations and
                  professional kitchens.
                </p>

                <router-link to="/companies/1" class="equipment-link">
                  Explore mixers
                  <i class="bi bi-arrow-right"></i>
                </router-link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- =========================================================
         WHY RBME
    ========================================================== -->
    <section class="why-section">
      <div class="container">
        <div class="row g-5 align-items-center">

          <div class="col-lg-5">
            <span class="section-label">
              WHY RBME ENGINEERS
            </span>

            <h2 class="section-title">
              One equipment partner.
              Multiple possibilities.
            </h2>

            <p class="section-description">
              Instead of limiting your choices to one manufacturer,
              we work with multiple equipment brands so that the solution
              can be selected around your actual requirement.
            </p>

            <router-link
              to="/about#aboutme"
              class="text-link"
            >
              Learn more about RBME
              <i class="bi bi-arrow-right"></i>
            </router-link>
          </div>


          <div class="col-lg-7">
            <div class="benefit-grid">

              <div class="benefit-item">
                <div class="benefit-icon icon-primary">
                  <i class="bi bi-buildings"></i>
                </div>

                <div>
                  <span class="benefit-number">01</span>

                  <h4>Multiple Brands</h4>

                  <p>
                    Access equipment from different manufacturers
                    through a single experienced supplier.
                  </p>
                </div>
              </div>


              <div class="benefit-item">
                <div class="benefit-icon icon-accent">
                  <i class="bi bi-bullseye"></i>
                </div>

                <div>
                  <span class="benefit-number">02</span>

                  <h4>Requirement-Based Selection</h4>

                  <p>
                    Recommendations are based on production needs
                    rather than simply selling a machine.
                  </p>
                </div>
              </div>


              <div class="benefit-item">
                <div class="benefit-icon icon-success">
                  <i class="bi bi-tools"></i>
                </div>

                <div>
                  <span class="benefit-number">03</span>

                  <h4>Practical Industry Support</h4>

                  <p>
                    We understand that equipment must work reliably
                    in real production environments.
                  </p>
                </div>
              </div>


              <div class="benefit-item">
                <div class="benefit-icon icon-accent">
                  <i class="bi bi-handshake"></i>
                </div>

                <div>
                  <span class="benefit-number">04</span>

                  <h4>Long-Term Relationship</h4>

                  <p>
                    Our relationship continues beyond equipment delivery
                    with service and support when you need it.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

     <!-- =========================================================
          HOW WE HELP
      ========================================================== -->
    <section class="process-section">
      <div class="container">

        <div class="section-heading centered">
          <span class="section-label">
            HOW WE HELP
          </span>

          <h2 class="section-title">
            From choosing the machine to running it
          </h2>

          <p>
            We help you find the right bakery machine for your production,
            install it properly and support you after the sale.
          </p>
        </div>


        <div class="row g-4">

          <!-- 01 -->
          <div class="col-md-6 col-lg-3">
            <div class="process-card">

              <span class="process-number">01</span>

              <div class="process-icon icon-primary">
                <i class="bi bi-chat-square-text"></i>
              </div>

              <h3>Tell Us Your Requirement</h3>

              <p>
                Tell us what you make, how much you produce and what type
                of bakery machine you are looking for.
              </p>

              <router-link to="/contact#contact-form" class="process-link">
                Discuss Requirement
                <i class="bi bi-arrow-right"></i>
              </router-link>

            </div>
          </div>

          <!-- 02 -->
          <div class="col-md-6 col-lg-3">
            <div class="process-card">

              <span class="process-number">02</span>

              <div class="process-icon icon-accent">
                <i class="bi bi-search"></i>
              </div>

              <h3>Choose the Right Machine</h3>

              <p>
                We help you select suitable bakery equipment based on
                capacity, application, space and budget.
              </p>

              <router-link to="/companies/1" class="process-link">
                Find Your Machine
                <i class="bi bi-arrow-right"></i>
              </router-link>

            </div>
          </div>


          <!-- 03 -->
          <div class="col-md-6 col-lg-3">
            <div class="process-card">

              <span class="process-number">03</span>

              <div class="process-icon icon-success">
                <i class="bi bi-gear-wide-connected"></i>
              </div>

              <h3>Installation & Setup</h3>

              <p>
                Our team supports machine installation, commissioning
                and helps you get your equipment ready for production.
              </p>

              <router-link to="/contact" class="process-link">
                Setup & Commissioning
                <i class="bi bi-arrow-right"></i>
              </router-link>

            </div>
          </div>


          <!-- 04 -->
          <div class="col-md-6 col-lg-3">
            <div class="process-card">

              <span class="process-number">04</span>

              <div class="process-icon icon-danger">
                <i class="bi bi-tools"></i>
              </div>

              <h3>Service & Spare Parts</h3>

              <p>
                Get technical assistance, spare parts and service support
                to keep your bakery machines running smoothly.
              </p>

              <router-link to="/contact" class="process-link">
                Get Support
                <i class="bi bi-arrow-right"></i>
              </router-link>

            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- =========================================================
         PAN INDIA
    ========================================================== -->
    <section class="india-section">
      <div class="container">

        <div class="india-box">
          <div class="row align-items-center g-5">

            <div class="col-lg-7">
              <span class="section-label light-label">
                PAN-INDIA SUPPORT
              </span>

              <h2 style="color: white;">
                Supporting customers
                beyond one city.
              </h2>

              <p>
                Our customer base extends across India. Whether you are
                setting up a new bakery, expanding an existing facility
                or replacing equipment, our team can coordinate equipment
                requirements and support from enquiry to after-sales.
              </p>
            </div>


            <div class="col-lg-5">
              <div class="india-stats">

                <div class="india-stat">
                  <div class="india-stat-icon icon-primary">
                    <i class="bi bi-geo-alt"></i>
                  </div>

                  <strong>Pan India</strong>
                  <span>Customer Reach</span>
                </div>


                <div class="india-stat">
                  <div class="india-stat-icon icon-accent">
                    <i class="bi bi-truck"></i>
                  </div>

                  <strong>Delivery</strong>
                  <span>Equipment Coordination</span>
                </div>


                <div class="india-stat">
                  <div class="india-stat-icon icon-success">
                    <i class="bi bi-tools"></i>
                  </div>

                  <strong>Service</strong>
                  <span>Technical Support</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>


    <!-- =========================================================
         CUSTOMER TYPES
    ========================================================== -->
    <section class="customer-section">
      <div class="container">

        <div class="row align-items-end mb-5">

          <div class="col-lg-7">
            <span class="section-label">
              WHO WE SERVE
            </span>

            <h2 class="section-title">
              Solutions for businesses
              at different stages.
            </h2>
          </div>

          <div class="col-lg-5">
            <p class="section-description mb-0">
              Different businesses have different production requirements.
              Our approach is built around the application rather than
              a one-size-fits-all machine list.
            </p>
          </div>

        </div>


        <div class="customer-table">

          <div class="customer-row">
            <div class="customer-icon icon-primary">
              <i class="bi bi-shop"></i>
            </div>

            <div>
              <h3>Retail Bakeries</h3>

              <p>
                Equipment for improving daily production, consistency
                and product quality.
              </p>
            </div>

            <i class="bi bi-arrow-up-right customer-arrow"></i>
          </div>


          <div class="customer-row">
            <div class="customer-icon icon-accent">
              <i class="bi bi-building"></i>
            </div>

            <div>
              <h3>Commercial Bakeries</h3>

              <p>
                Production equipment for businesses handling larger
                and growing order volumes.
              </p>
            </div>

            <i class="bi bi-arrow-up-right customer-arrow"></i>
          </div>


          <div class="customer-row">
            <div class="customer-icon icon-success">
              <i class="bi bi-diagram-3"></i>
            </div>

            <div>
              <h3>Industrial Production</h3>

              <p>
                Equipment solutions for higher-capacity manufacturing
                and structured production workflows.
              </p>
            </div>

            <i class="bi bi-arrow-up-right customer-arrow"></i>
          </div>


          <div class="customer-row">
            <div class="customer-icon icon-danger">
              <i class="bi bi-cup-hot"></i>
            </div>

            <div>
              <h3>Hotels & Food Businesses</h3>

              <p>
                Commercial equipment suitable for professional kitchens,
                bakeries and food production operations.
              </p>
            </div>

            <i class="bi bi-arrow-up-right customer-arrow"></i>
          </div>

        </div>
      </div>
    </section>


    <!-- =========================================================
         BRANDS
    ========================================================== -->
    <section class="brands-section">
      <div class="container">

        <div class="section-heading centered">
          <span class="section-label">
            OUR BRANDS
          </span>

          <h2 class="section-title">
            Equipment from trusted manufacturers
          </h2>

          <p>
            We work with multiple brands so customers can evaluate
            equipment based on their specific production requirements.
          </p>
        </div>


        <div
          v-if="companies.length"
          class="brands-grid"
        >
          <router-link
            v-for="company in companies"
            :key="company.id"
            :to="`/companies/${company.id}`"
            class="brand-card"
          >
            <div class="brand-card-logo">

              <img
                v-if="company.logo"
                :src="getImageUrl(company.logo)"
                :alt="company.name"
              />

              <span v-else>
                {{ company.name }}
              </span>

            </div>

            <div class="brand-card-content">
              <h3>
                {{ company.name }}
              </h3>

              <span>
                View brand
                <i class="bi bi-arrow-up-right"></i>
              </span>
            </div>
          </router-link>
        </div>


        <div
          v-else
          class="brands-empty"
        >
          Our brand portfolio is being updated.
        </div>


        <div class="text-center mt-5">
          <router-link
            to="/companies/1" 
                class="btn public-button btn-outline-primary brands-button"
          >
            View All Brands
            <i class="bi bi-box-seam"></i>
          </router-link>
        </div>

      </div>
    </section>


    <!-- =========================================================
         SERVICE
    ========================================================== -->
    <section class="service-section">
      <div class="container">

        <div class="service-panel">
          <div class="row align-items-center g-5">

            <div class="col-lg-6">
              <span class="section-label">
                AFTER-SALES SUPPORT
              </span>

              <h2>
                Equipment support
                doesn't stop after delivery.
              </h2>

              <p>
                Production downtime can affect your business immediately.
                That's why serviceability, spare parts and technical
                assistance are an important part of the equipment solution.
              </p>

              <router-link
                to="/contact"
                class="service-link"
              >
                Talk to our service team
                <i class="bi bi-arrow-right"></i>
              </router-link>
            </div>


            <div class="col-lg-6">
              <div class="service-features">

                <div>
                  <i class="bi bi-tools icon-success"></i>

                  <div>
                    <h4>Technical Assistance</h4>

                    <p>
                      Support for equipment operation and technical
                      requirements.
                    </p>
                  </div>
                </div>


                <div>
                  <i class="bi bi-box-seam icon-primary"></i>

                  <div>
                    <h4>Spare Parts</h4>

                    <p>
                      Assistance with identifying and sourcing required
                      machine parts.
                    </p>
                  </div>
                </div>


                <div>
                  <i class="bi bi-person-workspace icon-accent"></i>

                  <div>
                    <h4>Installation Support</h4>

                    <p>
                      Equipment commissioning and operational guidance.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>


    <!-- =========================================================
         FINAL CTA
    ========================================================== -->
    <section class="cta-section">
      <div class="container">

        <div class="cta-content">

          <div class="cta-icon icon-primary">
            <i class="bi bi-chat-square-dots"></i>
          </div>

          <span class="section-label">
            HAVE A REQUIREMENT?
          </span>

          <h2>
            Tell us what you are planning.
          </h2>

          <p>
            Whether you are opening a new bakery, expanding production
            or looking for replacement equipment, our team can help
            you explore the right options.
          </p>

          <router-link
            to="/contact"
                class="btn public-button btn-primary cta-button"
          >
            Send Your Enquiry
            <i class="bi bi-arrow-right"></i>
          </router-link>

        </div>

      </div>
    </section>

  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { getAllCompany } from "@/publicApis/company.api";
import Slide1 from "@/assets/images/Slider1.png";
import Slide2 from "@/assets/images/Slider2.png";
import Slide3 from "@/assets/images/Slider3.png";
import Slide4 from "@/assets/images/Slider4.png";

const slides = [Slide1, Slide2, Slide3, Slide4];
const currentSlide = ref(0);
let sliderInterval;


const companies = ref([]);

const loadCompanies = async () => {
  try {
    const response = await getAllCompany();
    companies.value = response.data;
  } catch (error) {
    console.error("Error loading companies:", error);
    companies.value = [];
  }
};
const API_BASE_URL = import.meta.env.VITE_IMAGE_URL;

const getImageUrl = (path) => {
  if (!path) {
    return "";
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  const cleanPath = path.replace(/^\/+/, "");

  const imageUrl = `${API_BASE_URL}/${cleanPath}`;

  console.log("Company Logo:", path);
  console.log("Image URL:", imageUrl);

  return imageUrl;
};

onMounted(() => {
  sliderInterval = setInterval(() => {
    currentSlide.value =
      (currentSlide.value + 1) % slides.length;
  }, 5000);
  loadCompanies();
});

onUnmounted(() => {
  clearInterval(sliderInterval);
});
</script>


<style scoped>

/* =========================================================
   GLOBAL
========================================================= */

.home-page {
  background: #ffffff;
  color: var(--icon-dark);
  overflow: hidden;
}

.container {
  max-width: 1200px;
}


/* =========================================================
   ICON COLOR SYSTEM
========================================================= */

.icon-primary {
  color: var(--icon-primary) !important;
}

.icon-accent {
  color: var(--icon-accent) !important;
}

.icon-success {
  color: var(--icon-success) !important;
}

.icon-danger {
  color: var(--icon-danger) !important;
}

.icon-dark {
  color: var(--icon-dark) !important;
}

.icon-muted {
  color: var(--icon-muted) !important;
}


/* =========================================================
   HERO
========================================================= */

.hero-section {
  position: relative;
  min-height: 680px;
  overflow: hidden;
  background: #101820;
}

.hero-banner {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-banner-image {
  width: 100%;
  height: 100%;
  display: block;

  object-fit: cover;
  object-position: center;

  /* Keep image sharp */
  image-rendering: auto;

  /* Optional subtle enhancement */
  filter: brightness(1.05) contrast(1.05);
}

.hero-banner-overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(
    90deg,
    rgba(7, 15, 24, 0.78) 0%,
    rgba(7, 15, 24, 0.62) 35%,
    rgba(7, 15, 24, 0.28) 65%,
    rgba(7, 15, 24, 0.08) 100%
  );

  pointer-events: none;
}

.hero-container {
  position: relative;
  z-index: 2;
  min-height: 680px;
  display: flex;
  align-items: center;
}

.hero-content-panel {
  width: 100%;
}

.hero-content {
  max-width: 720px;
}


/* =========================================================
   HERO BADGE
========================================================= */

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 9px 15px;
  margin-bottom: 23px;
  border: 1px solid rgba(255,255,255,0.20);
  border-radius: 30px;
  background: rgba(255,255,255,0.07);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  backdrop-filter: blur(10px);
}

.hero-badge i {
  color: var(--icon-accent);
  font-size: 0.95rem;
}


/* =========================================================
   HERO TITLE
========================================================= */

.hero-title {
  max-width: 760px;
  margin: 0 0 25px;
  color: #ffffff;
  font-size: clamp(2.6rem, 5vw, 4.6rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -2.5px;
}

.hero-title span {
  display: block;
  color: var(--icon-primary);
}


/* =========================================================
   HERO DESCRIPTION
========================================================= */

.hero-description {
  max-width: 660px;
  margin: 0 0 31px;
  color: rgba(255,255,255,0.76);
  font-size: 1rem;
  line-height: 1.85;
}


/* =========================================================
   HERO BUTTONS
========================================================= */

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-btn,
.hero-btn-outline {
  min-height: 48px;
  padding: 12px 20px;
  border-radius: 7px;
  font-size: 0.86rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}

.hero-btn-outline {
  border: 1px solid rgba(255,255,255,0.55);
  color: #ffffff;
  background: rgba(255,255,255,0.04);
}

.hero-btn-outline:hover {
  background: #ffffff;
  color: var(--icon-dark);
}


/* =========================================================
   HERO TRUST
========================================================= */

.hero-trust {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 42px;
}

.trust-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.trust-item strong {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #ffffff;
  font-size: 0.85rem;
}

.trust-item strong i:nth-child(1) {
  color: var(--icon-accent);
}

.trust-item span {
  color: rgba(255,255,255,0.55);
  font-size: 0.7rem;
}

.trust-divider {
  width: 1px;
  height: 35px;
  background: rgba(255,255,255,0.22);
}


/* =========================================================
   HERO SCROLL
========================================================= */

.hero-scroll {
  position: absolute;
  right: 40px;
  bottom: 30px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 9px;
  color: rgba(255,255,255,0.55);
  font-size: 0.65rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.hero-scroll i {
  color: var(--icon-accent);
}


/* =========================================================
   COMMON SECTIONS
========================================================= */

.section-description {
  color: #717c86;
  line-height: 1.85;
}


/* =========================================================
   INTRO
========================================================= */

.intro-section {
  padding: 100px 0;
}

.intro-text {
  margin: 0 0 18px;
  color: #68737d;
  font-size: 0.98rem;
  line-height: 1.9;
}

.intro-highlights {
  display: grid;
  gap: 11px;
  margin-top: 25px;
}

.intro-highlights div {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4f5b66;
  font-size: 0.82rem;
  font-weight: 600;
}

.intro-highlights i {
  color: var(--icon-success);
}


/* =========================================================
   SECTION HEADING
========================================================= */

.section-heading {
  max-width: 760px;
  margin-bottom: 50px;
}

.section-heading.centered {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.section-heading p {
  margin-top: 18px;
  color: #737e88;
  font-size: 0.93rem;
  line-height: 1.8;
}


/* =========================================================
   EQUIPMENT
========================================================= */

.equipment-section {
  padding: 95px 0 105px;
  background: #f7f9fb;
}

.equipment-heading {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.equipment-heading p {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}


/* =========================================================
   EQUIPMENT CARD
========================================================= */

.equipment-card {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e2e7ec;
  border-radius: 13px;
  background: #ffffff;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.equipment-card:hover {
  transform: translateY(-6px);
  border-color: #cfd9e4;
  box-shadow:
    0 18px 45px rgba(17, 30, 43, 0.10);
}


/* =========================================================
   EQUIPMENT IMAGE
========================================================= */

.equipment-image {
  position: relative;
  width: 100%;
  height: 185px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  background:
    radial-gradient(
      circle at center,
      #ffffff 0%,
      #f5f7fa 70%,
      #eef2f6 100%
    );

  border-bottom: 1px solid #e8edf1;
}

.equipment-image img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
  padding: 14px 28px;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.equipment-card:hover .equipment-image img {
  transform: scale(1.04);
}


/* =========================================================
   EQUIPMENT ICON
========================================================= */

.equipment-icon {
  position: absolute;
  top: 13px;
  left: 14px;
  z-index: 3;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255,255,255,0.94);
  box-shadow: 0 5px 18px rgba(0,0,0,0.08);
  font-size: 0.9rem;
}


/* =========================================================
   EQUIPMENT TAG
========================================================= */

.equipment-tag {
  position: absolute;
  top: 17px;
  right: 14px;
  z-index: 3;
  padding: 5px 8px;
  border-radius: 4px;
  background: rgba(16,24,32,0.78);
  color: #ffffff;
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 1px;
}


/* =========================================================
   EQUIPMENT CONTENT
========================================================= */

.equipment-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 22px 23px;
}

.equipment-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.equipment-number {
  color: var(--icon-primary);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.equipment-small-icon {
  font-size: 1rem;
}

.equipment-content h3 {
  margin: 0 0 9px;
  color: var(--icon-dark);
  font-size: 1.12rem;
  font-weight: 750;
  line-height: 1.3;
}

.equipment-content p {
  margin: 0 0 18px;
  color: #737d87;
  font-size: 0.82rem;
  line-height: 1.7;
}

.equipment-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  color: var(--icon-primary);
  font-size: 0.75rem;
  font-weight: 750;
  cursor: pointer;
}

.equipment-link i {
  transition: transform 0.25s ease;
}

.equipment-card:hover .equipment-link i {
  transform: translateX(5px);
}

.equipment-card:hover .equipment-link {
  color: #084fb8;
}


/* =========================================================
   WHY RBME
========================================================= */

.why-section {
  padding: 105px 0;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  color: var(--icon-primary);
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
}

.text-link i {
  transition: transform 0.25s ease;
}

.text-link:hover i {
  transform: translateX(5px);
}

.benefit-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.benefit-item {
  display: flex;
  gap: 15px;
}

.benefit-icon {
  flex: 0 0 43px;
  width: 43px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: #edf4ff;
  font-size: 1rem;
}

.benefit-number {
  display: block;
  margin-bottom: 4px;
  color: var(--icon-primary);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.benefit-item h4 {
  margin: 0 0 7px;
  color: var(--icon-dark);
  font-size: 0.98rem;
  font-weight: 750;
}

.benefit-item p {
  margin: 0;
  color: #77818a;
  font-size: 0.8rem;
  line-height: 1.7;
}

/* =========================================================
   HOW WE HELP / PROCESS
========================================================= */

.process-section {
  padding: 100px 0;
  background: #f7f9fb;
}


/* =========================================================
   PROCESS CARD
========================================================= */

.process-card {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 30px 27px 27px;

  border: 1px solid #e2e7ec;
  border-radius: 12px;

  background: #ffffff;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}


/* =========================================================
   CARD HOVER
========================================================= */

.process-card:hover {
  transform: translateY(-6px);

  border-color: var(--icon-primary);

  box-shadow:
    0 16px 35px rgba(17, 30, 43, 0.09);
}


/* =========================================================
   NUMBER
========================================================= */

.process-number {
  position: absolute;
  top: 20px;
  right: 22px;

  color: #e1e7ed;

  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
}


/* =========================================================
   ICON
========================================================= */

.process-icon {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 22px;

  border-radius: 10px;

  font-size: 1.15rem;

  transition:
    transform 0.3s ease,
    background 0.3s ease;
}


/* =========================================================
   ICON COLORS
========================================================= */

.process-icon.icon-primary {
  background: rgba(13, 110, 253, 0.10);
  color: var(--icon-primary);
}

.process-icon.icon-accent {
  background: rgba(229, 161, 0, 0.12);
  color: var(--icon-accent);
}

.process-icon.icon-success {
  background: rgba(25, 135, 84, 0.10);
  color: var(--icon-success);
}

.process-icon.icon-danger {
  background: rgba(220, 53, 69, 0.10);
  color: var(--icon-danger);
}


/* =========================================================
   ICON HOVER
========================================================= */

.process-card:hover .process-icon {
  transform: scale(1.08);
}


/* =========================================================
   TITLE
========================================================= */

.process-card h3 {
  margin: 0 0 10px;

  color: var(--icon-dark);

  font-size: 1.05rem;
  font-weight: 750;

  line-height: 1.35;
}


/* =========================================================
   DESCRIPTION
========================================================= */

.process-card p {
  margin: 0;

  color: #75808a;

  font-size: 0.82rem;
  line-height: 1.7;
}


/* =========================================================
   CARD LINK
========================================================= */

.process-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  margin-top: auto;
  padding-top: 20px;

  color: var(--icon-primary);

  font-size: 0.72rem;
  font-weight: 750;

  transition:
    color 0.25s ease,
    gap 0.25s ease;
}

.process-link i {
  font-size: 0.75rem;
}

.process-card:hover .process-link {
  gap: 11px;
  color: #084fb8;
}


/* =========================================================
   DIFFERENT HOVER BORDER COLORS
   ========================================================= */

.process-card:nth-child(1):hover {
  border-color: var(--icon-primary);
}

.process-card:nth-child(2):hover {
  border-color: var(--icon-accent);
}

.process-card:nth-child(3):hover {
  border-color: var(--icon-success);
}

.process-card:nth-child(4):hover {
  border-color: var(--icon-danger);
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 767.98px) {

  .process-section {
    padding: 75px 0;
  }

  .process-card {
    padding: 27px 23px 24px;
  }

  .process-icon {
    width: 47px;
    height: 47px;
    margin-bottom: 19px;
  }

  .process-card h3 {
    font-size: 1rem;
  }

  .process-card p {
    font-size: 0.81rem;
  }
}

/* =========================================================
   INDIA
========================================================= */

.india-section {
  padding: 100px 0;
}

.india-box {
  padding: 55px;
  border-radius: 15px;

  background:
    linear-gradient(
      135deg,
      #101820 0%,
      #162431 100%
    );

  color: #ffffff;

  box-shadow:
    0 20px 50px rgba(16,24,32,0.12);
}

.light-label {
  color: #6fa9ff;
}

.india-box h2 {
  max-width: 600px;
  margin: 14px 0 18px;
  font-size: 2.45rem;
  font-weight: 800;
  line-height: 1.2;
}

.india-box p {
  max-width: 650px;
  margin: 0;
  color: #b9c2ca;
  line-height: 1.8;
}

.india-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.india-stat {
  padding: 22px 10px;
  border: 1px solid rgba(255,255,255,0.11);
  border-radius: 9px;
  text-align: center;
  background: rgba(255,255,255,0.025);
}

.india-stat-icon {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.india-stat strong {
  display: block;
  color: #ffffff;
  font-size: 0.82rem;
}

.india-stat span {
  display: block;
  margin-top: 5px;
  color: #8997a4;
  font-size: 0.61rem;
}


/* =========================================================
   CUSTOMERS
========================================================= */

.customer-section {
  padding: 100px 0;
  background: #f7f9fb;
}

.customer-table {
  border-top: 1px solid #dfe4e8;
}

.customer-row {
  display: grid;
  grid-template-columns: 55px 1fr 30px;
  align-items: center;
  gap: 18px;
  padding: 25px 8px;
  border-bottom: 1px solid #dfe4e8;
  transition:
    background 0.25s ease,
    padding 0.25s ease;
}

.customer-row:hover {
  padding-left: 18px;
  padding-right: 18px;
  background: #ffffff;
}

.customer-icon {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #eaf2ff;
}

.customer-row h3 {
  margin: 0 0 5px;
  color: var(--icon-dark);
  font-size: 0.98rem;
  font-weight: 750;
}

.customer-row p {
  margin: 0;
  color: #77818b;
  font-size: 0.8rem;
}

.customer-arrow {
  color: var(--icon-muted);
  transition:
    color 0.25s ease,
    transform 0.25s ease;
}

.customer-row:hover .customer-arrow {
  color: var(--icon-primary);
  transform: translate(3px, -3px);
}


/* =========================================================
   BRANDS
========================================================= */

.brands-section {
  padding: 100px 0;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 17px;
}

.brand-card {
  display: block;
  overflow: hidden;
  border: 1px solid #e3e8ed;
  border-radius: 10px;
  background: #ffffff;
  text-decoration: none;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.brand-card:hover {
  transform: translateY(-4px);
  border-color: #bdd3f2;
  box-shadow:
    0 15px 35px rgba(16,24,32,0.07);
}
/* =========================================================
   BRAND CARD IMAGE
========================================================= */

.brand-card-logo {
  position: relative;

  height: 220px;

  width: 100%;

  overflow: hidden;

  background: #f4f6f8;

  display: flex;
  align-items: center;
  justify-content: center;
}


/* FULL IMAGE */

.brand-card-logo img {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  object-position: center;

  transition: transform 0.5s ease;
}


/* HOVER ZOOM */  

.brand-card:hover .brand-card-logo img {
  transform: scale(1.06);
}


/* FALLBACK TEXT */

.brand-card-logo span {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 25px;

  color: var(--color-heading);

  font-size: 1rem;
  font-weight: 700;

  text-align: center;

  background: linear-gradient(
    135deg,
    #f8fafc,
    #eef2f6
  );
}

.brand-card-content {
  padding: 16px 17px;
}

.brand-card-content h3 {
  margin: 0 0 7px;
  color: var(--icon-dark);
  font-size: 0.88rem;
  font-weight: 750;
}

.brand-card-content span {
  color: var(--icon-primary);
  font-size: 0.7rem;
  font-weight: 700;
}

.brands-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--icon-primary);
}

.brands-empty {
  padding: 45px;
  border: 1px dashed #ccd5de;
  color: #7a858f;
  text-align: center;
}


/* =========================================================
   SERVICE
========================================================= */

.service-section {
  padding: 100px 0;
  background: #f7f9fb;
}

.service-panel {
  padding: 55px;
  border: 1px solid #e0e6eb;
  border-radius: 14px;
  background: #ffffff;
}

.service-panel h2 {
  max-width: 600px;
  margin: 15px 0 20px;
  color: #101820;
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1.2;
}

.service-panel > .row > .col-lg-6 > p {
  max-width: 600px;
  color: #737e88;
  line-height: 1.8;
}

.service-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 10px;
  color: var(--icon-primary);
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
}

.service-features {
  display: grid;
  gap: 20px;
}

.service-features > div {
  display: flex;
  gap: 17px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e7ebee;
}

.service-features > div:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.service-features > div > i {
  font-size: 1.3rem;
}

.service-features h4 {
  margin: 0 0 5px;
  color: var(--icon-dark);
  font-size: 0.92rem;
}

.service-features p {
  margin: 0;
  color: #737e88;
  font-size: 0.78rem;
  line-height: 1.6;
}


/* =========================================================
   CTA
========================================================= */

.cta-section {
  padding: 105px 0;
  text-align: center;
}

.cta-content {
  max-width: 750px;
  margin: auto;
}

.cta-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: #edf4ff;
  font-size: 1.2rem;
}

.cta-content h2 {
  margin: 15px 0;
  color: #101820;
  font-size: clamp(2rem, 4vw, 3.1rem);
  font-weight: 800;
}

.cta-content p {
  max-width: 650px;
  margin: 0 auto 30px;
  color: #737e88;
  line-height: 1.8;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 24px;
  font-weight: 700;
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 991.98px) {

  .hero-section,
  .hero-container {
    min-height: 620px;
  }

  .hero-title {
    font-size: clamp(2.5rem, 7vw, 4rem);
  }

  .equipment-image {
    height: 180px;
  }

  .brands-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .india-stats {
    margin-top: 15px;
  }
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 767.98px) {

   .hero-section {
    min-height: 600px;
  }

  .hero-container {
    min-height: 600px;
    padding-top: 75px;
    padding-bottom: 75px;
  }

  .hero-banner-image {
    object-fit: cover;
    object-position: center;
  }

  .hero-banner-overlay {
    background: linear-gradient(
      180deg,
      rgba(7, 15, 24, 0.72) 0%,
      rgba(7, 15, 24, 0.50) 55%,
      rgba(7, 15, 24, 0.78) 100%
    );
  }

  .hero-title {
    font-size: clamp(2.25rem, 10vw, 3.2rem);
    letter-spacing: -1.3px;
  }

  .hero-description {
    font-size: 0.94rem;
    line-height: 1.75;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-btn,
  .hero-btn-outline {
    width: 100%;
  }

  .hero-trust {
    flex-wrap: wrap;
    gap: 15px;
  }

  .trust-divider {
    display: none;
  }

  .hero-scroll {
    display: none;
  }

  .intro-section,
  .why-section,
  .brands-section,
  .service-section {
    padding: 75px 0;
  }

  .equipment-section,
  .process-section,
  .customer-section {
    padding: 75px 0;
  }

  .equipment-heading {
    text-align: left;
  }

  .equipment-heading p {
    margin-left: 0;
  }

  .equipment-image {
    height: 175px;
  }

  .equipment-image img {
    padding: 12px 24px;
  }

  .equipment-content {
    padding: 19px 20px 21px;
  }

  .equipment-content h3 {
    font-size: 1.08rem;
  }

  .equipment-content p {
    font-size: 0.81rem;
  }

  .benefit-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .india-box,
  .service-panel {
    padding: 32px 25px;
  }

  .india-box h2,
  .service-panel h2 {
    font-size: 2rem;
  }

  .india-stats {
    grid-template-columns: 1fr;
  }

  .customer-row {
    grid-template-columns: 48px 1fr 20px;
  }

  .brands-grid {
    grid-template-columns: 1fr 1fr;
  }
}


/* =========================================================
   SMALL MOBILE
========================================================= */
@media (max-width: 575.98px) {

  /* =========================================================
     HERO
  ========================================================= */

  .hero-section {
    min-height: 540px;
  }

  .hero-container {
    min-height: 540px;
    padding-top: 55px;
    padding-bottom: 55px;
  }

  .hero-banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    /* Adjust this depending on where the important
       part of your image is */
    object-position: center;
  }

  /* Lighter overlay so image remains visible */
  .hero-banner-overlay {
    background: linear-gradient(
      180deg,
      rgba(7, 15, 24, 0.76) 0%,
      rgba(7, 15, 24, 0.48) 48%,
      rgba(7, 15, 24, 0.80) 100%
    );
  }


  /* =========================================================
     HERO CONTENT
  ========================================================= */

  .hero-badge {
    font-size: 0.68rem;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .hero-trust {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }


  /* =========================================================
     EQUIPMENT
  ========================================================= */

  .equipment-image {
    height: 165px;
  }

  .equipment-image img {
    padding: 10px 22px;
  }

  .equipment-icon {
    width: 31px;
    height: 31px;
    top: 10px;
    left: 11px;
  }

  .equipment-tag {
    top: 12px;
    right: 11px;
    font-size: 0.5rem;
  }

  .equipment-content {
    padding: 18px;
  }

  .equipment-content p {
    font-size: 0.8rem;
  }


  /* =========================================================
     BRANDS
  ========================================================= */

  .brands-grid {
    grid-template-columns: 1fr;
  }


  /* =========================================================
     CUSTOMERS
  ========================================================= */

  .customer-row {
    grid-template-columns: 45px 1fr;
  }

  .customer-arrow {
    display: none;
  }

  .customer-icon {
    width: 42px;
    height: 42px;
  }

}
</style>