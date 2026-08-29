```vue
<template>
  <div class="products-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->

    <section
      class="products-header"
      :style="{
        backgroundImage: companyBanner
          ? `url(${companyBanner})`
          : 'none'
      }"
    >
      <div class="products-header-overlay"></div>

      <div class="container">
        <div class="products-header-content">

          <!-- BREADCRUMB -->
          <div class="breadcrumb">
            <router-link to="/">
              Home
            </router-link>

            <i class="bi bi-chevron-right"></i>

            <router-link to="/#brands">
              Our Brands
            </router-link>

            <i class="bi bi-chevron-right"></i>

            <span>
              {{ companyName }}
            </span>
          </div>

          <!-- COMPANY SELECTOR -->
          <div
            class="product-company-selector"
            @mouseenter="openCompanies = true"
            @mouseleave="openCompanies = false"
          >
            <button
              type="button"
              class="company-selector-trigger"
              @click="openCompanies = !openCompanies"
            >
              <span>Browse Products by Brand</span>
              <i class="bi bi-chevron-down"></i>
            </button>

            <!-- COMPANY MENU -->
            <div
              v-if="openCompanies"
              class="product-company-menu"
            >
              <div class="product-company-menu-title">
                OUR BRANDS
              </div>

              <div
                v-if="companies.length"
                class="product-company-grid"
              >
                <router-link
                  v-for="company in companies"
                  :key="company.id"
                  :to="`/companies/${company.id}`"
                  class="product-company-item"
                  @click="openCompanies = false"
                >
                  <span>{{ company.name }}</span>
                  <i class="bi bi-arrow-up-right"></i>
                </router-link>
              </div>

              <div
                v-else
                class="product-company-empty"
              >
                No brands available.
              </div>
            </div>
          </div>

          <!-- HEADER CONTENT -->
          <div class="header-content">
            <span class="eyebrow">
              OUR PRODUCTS
            </span>

            <h1>
              {{ companyName }}
            </h1>

            <p>
              Explore our complete range of equipment from
              {{ companyName }}.
            </p>
          </div>

        </div>
      </div>
    </section>


    <!-- =====================================================
         LOADING
    ====================================================== -->

    <section
      v-if="loading"
      class="products-content"
    >
      <div class="container">
        <div class="loading-container">
          <div
            class="spinner-border"
            role="status"
          ></div>

          <p>
            Loading products...
          </p>
        </div>
      </div>
    </section>


    <!-- =====================================================
         ERROR
    ====================================================== -->

    <section
      v-else-if="error"
      class="products-content"
    >
      <div class="container">
        <div class="error-container">
          <i class="bi bi-exclamation-circle"></i>

          <h3>
            Unable to load products
          </h3>

          <p>
            {{ error }}
          </p>

          <button
            type="button"
            class="btn btn-primary public-button"
            @click="loadProducts"
          >
            Try Again
          </button>
        </div>
      </div>
    </section>


    <!-- =====================================================
         PRODUCTS
    ====================================================== -->

    <section
      v-else
      class="products-content"
    >
      <div class="container">

        <!-- EMPTY -->
        <div
          v-if="products.length === 0"
          class="empty-container"
        >
          <i class="bi bi-box-seam"></i>

          <h3>
            No Products Available
          </h3>

          <p>
            There are currently no products available
            for {{ companyName }}.
          </p>
        </div>


        <!-- =================================================
             PRODUCT BROWSER
        ================================================== -->

        <div
          v-else
          class="products-browser"
        >

          <!-- =================================================
               PRODUCT FILTER
          ================================================== -->

          <div class="products-filter">

            <!-- FILTER HEADER -->
            <div class="filter-heading">

              <div class="filter-heading-left">
                <span class="filter-icon-large">
                  <i class="bi bi-sliders"></i>
                </span>

                <div>
                  <span class="filter-label">
                    PRODUCT CATALOGUE
                  </span>

                  <strong>
                    Filter by Category
                  </strong>
                </div>
              </div>

              <div class="filter-total">
                <strong>
                  {{ products.length }}
                </strong>

                <span>
                  Products
                </span>
              </div>

            </div>


            <!-- CATEGORY FILTERS -->

            <div class="category-filters">

              <!-- ALL -->
              <button
                type="button"
                class="category-filter"
                :class="{
                  active: selectedCategory === 'all'
                }"
                @click="selectedCategory = 'all'"
              >
                <span class="filter-icon">
                  <i class="bi bi-grid"></i>
                </span>

                <span class="filter-name">
                  All Categories
                </span>

                <small>
                  {{ products.length }}
                </small>
              </button>


              <!-- CATEGORIES -->

              <button
                v-for="category in categories"
                :key="category.id"
                type="button"
                class="category-filter"
                :class="{
                  active:
                    selectedCategory === category.id
                }"
                @click="selectedCategory = category.id"
              >
                <span class="filter-icon">
                  <i class="bi bi-box-seam"></i>
                </span>

                <span class="filter-name">
                  {{ category.name }}
                </span>

                <small>
                  {{ category.products.length }}
                </small>
              </button>

            </div>

          </div>


          <!-- =================================================
               NO FILTER RESULTS
          ================================================== -->

          <div
            v-if="filteredCategories.length === 0"
            class="filter-empty"
          >
            <i class="bi bi-search"></i>

            <h3>
              No Products Found
            </h3>

            <p>
              There are no products available in this category.
            </p>

            <button
              type="button"
              class="reset-filter"
              @click="selectedCategory = 'all'"
            >
              <i class="bi bi-arrow-counterclockwise"></i>
              Show All Products
            </button>
          </div>


          <!-- =================================================
               CATEGORY GROUPS
          ================================================== -->

          <div
            v-else
            class="category-list"
          >

            <section
              v-for="category in filteredCategories"
              :key="category.id"
              class="category-section"
            >

              <!-- CATEGORY HEADER -->

              <div class="category-header">

                <div class="category-title">

                  <span class="category-number">
                    {{ String(category.index).padStart(2, "0") }}
                  </span>

                  <div>
                    <span class="category-label">
                      EQUIPMENT
                    </span>

                    <h2>
                      {{ category.name }}
                    </h2>
                  </div>

                </div>

                <div class="category-count">
                  {{ category.products.length }}

                  <span>
                    {{
                      category.products.length === 1
                        ? "Product"
                        : "Products"
                    }}
                  </span>
                </div>

              </div>


              <!-- PRODUCTS -->

              <div class="products-grid">

                <article
                  v-for="product in category.products"
                  :key="product.id"
                  class="product-card public-card"
                >

                  <!-- IMAGE -->

                  <div class="product-image-wrapper">

                    <img
                      :src="getProductImage(product)"
                      :alt="
                        product.title ||
                        product.modelNo ||
                        'Product'
                      "
                      class="product-image"
                      @error="handleImageError"
                    />

                    

                  </div>


                  <!-- INFORMATION -->

                  <div class="product-info">

                    <span class="product-brand">
                      {{ product.companyName }}
                    </span>

                    <h3>
                      {{ product.modelNo || "Product" }}
                    </h3>

                    <p class="product-title">
                      {{ product.title || "—" }}
                    </p>

                    <div
                      v-if="product.productTypeName"
                      class="product-type"
                    >
                      <i class="bi bi-grid"></i>

                      <span>
                        {{ product.productTypeName }}
                      </span>
                    </div>

                    <p
                      v-if="product.description"
                      class="product-description"
                    >
                      {{ product.description }}
                    </p>

                    <button
                      type="button"
                      class="product-link"
                      @click="openProductModal(product)"
                    >
                      <span>
                        View Details
                      </span>

                      <i class="bi bi-arrow-right"></i>
                    </button>

                  </div>

                </article>

              </div>

            </section>

          </div>

        </div>

      </div>
    </section>


    <!-- =====================================================
         PRODUCT DETAIL MODAL
    ====================================================== -->

    <div
      v-if="showProductModal"
      class="product-modal-backdrop"
      @click.self="closeProductModal"
    >

      <div class="product-modal">

        <!-- CLOSE -->

        <button
          type="button"
          class="product-modal-close"
          @click="closeProductModal"
        >
          <i class="bi bi-x-lg"></i>
        </button>


        <!-- MODAL BODY -->

        <div
          v-if="selectedProduct"
          class="product-modal-body"
        >

          <!-- =================================================
               LEFT - GALLERY
          ================================================== -->

          <div class="product-modal-gallery">

            <div class="product-main-image">
              <img
                :src="
                  getSelectedProductImage(
                    selectedProduct
                  )
                "
                :alt="
                  selectedProduct.title ||
                  selectedProduct.modelNo ||
                  'Product'
                "
                @error="handleImageError"
              />
            </div>


            <!-- THUMBNAILS -->

            <div
              v-if="
                getProductImages(selectedProduct).length
              "
              class="product-thumbnails"
            >

              <button
                v-for="(image, index) in getProductImages(
                  selectedProduct
                )"
                :key="index"
                type="button"
                class="product-thumbnail"
                :class="{
                  active:
                    selectedImageIndex === index
                }"
                @click="
                  selectedImageIndex = index
                "
              >
                <img
                  :src="getImageUrl(image)"
                  :alt="selectedProduct.modelNo"
                  @error="handleImageError"
                />
              </button>

            </div>

          </div>


          <!-- =================================================
               RIGHT - DETAILS
          ================================================== -->

          <div class="product-modal-details">

            <span class="modal-product-brand">
              {{ selectedProduct.companyName }}
            </span>

            <h2 class="modal-product-title">
              {{
                selectedProduct.modelNo ||
                "Product"
              }}
            </h2>

            <p
              v-if="selectedProduct.title"
              class="modal-product-subtitle"
            >
              {{ selectedProduct.title }}
            </p>


            <!-- BASIC INFORMATION -->

            <div class="product-basic-info">

              <div
                v-if="selectedProduct.categoryName"
                class="basic-info-item"
              >
                <span>Category</span>

                <strong>
                  {{ selectedProduct.categoryName }}
                </strong>
              </div>

              <div
                v-if="selectedProduct.productTypeName"
                class="basic-info-item"
              >
                <span>Product Type</span>

                <strong>
                  {{ selectedProduct.productTypeName }}
                </strong>
              </div>

              <div
                v-if="selectedProduct.modelNo"
                class="basic-info-item"
              >
                <span>Model</span>

                <strong>
                  {{ selectedProduct.modelNo }}
                </strong>
              </div>

              <div
                v-if="selectedProduct.hsnCode"
                class="basic-info-item"
              >
                <span>HSN Code</span>

                <strong>
                  {{ selectedProduct.hsnCode }}
                </strong>
              </div>

            </div>


            <!-- DESCRIPTION -->

            <div
              v-if="selectedProduct.description"
              class="modal-detail-section"
            >
              <h3>
                Product Description
              </h3>

              <p>
                {{ selectedProduct.description }}
              </p>
            </div>


            <!-- SPECIFICATIONS -->

            <div
              v-if="
                selectedProduct.specifications &&
                selectedProduct.specifications.length
              "
              class="modal-detail-section"
            >

              <h3>
                Specifications
              </h3>

              <div class="specifications-table">

                <div
                  v-for="(spec, index) in selectedProduct.specifications"
                  :key="spec.id || index"
                  class="specification-row"
                >

                  <div class="specification-name">
                    {{ spec.specificationName }}
                  </div>

                  <div class="specification-value">
                    {{ spec.specificationValue || "—" }}
                  </div>

                </div>

              </div>

            </div>


            <!-- FEATURES -->

            <div
              v-if="
                selectedProduct.features &&
                selectedProduct.features.length
              "
              class="modal-detail-section"
            >

              <h3>
                Features
              </h3>

              <ul class="product-features">

                <li
                  v-for="(feature, index) in selectedProduct.features"
                  :key="index"
                >
                  <i class="bi bi-check2"></i>

                  <span>
                    {{
                      feature.feature ||
                      feature.name ||
                      feature.description ||
                      feature.value
                    }}
                  </span>
                </li>

              </ul>

            </div>


            <!-- DOCUMENTS -->

            <div
              v-if="
                selectedProduct.documents &&
                selectedProduct.documents.length
              "
              class="modal-detail-section"
            >

              <h3>
                Documents
              </h3>

              <div class="product-documents">

                <a
                  v-for="(document, index) in selectedProductDocuments"
                  :key="index"
                  :href="getDocumentUrl(document)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="product-document"
                >

                  <i class="bi bi-file-earmark-pdf"></i>

                  <span>
                    {{
                      document.name ||
                      document.fileName ||
                      "Product Document"
                    }}
                  </span>

                  <i class="bi bi-download"></i>

                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>


<script setup>
import {
  ref,
  computed,
  watch,
  onMounted
} from "vue";

import {
  useRoute
} from "vue-router";

import {
  getPublicProductsByCompany
} from "@/publicApis/product.api";

import {
  getAllCompany
} from "@/publicApis/company.api";


/* =========================================================
   ROUTE
========================================================= */

const route = useRoute();


/* =========================================================
   STATE
========================================================= */

const products = ref([]);
const loading = ref(false);
const error = ref("");

const companyName = ref("");
const companyBanner = ref("");

const companies = ref([]);
const openCompanies = ref(false);

const selectedCategory = ref("all");

const showProductModal = ref(false);
const selectedProduct = ref(null);
const selectedImageIndex = ref(0);

const selectedProductDocuments = computed(() => {
  return (selectedProduct.value?.documents || []).filter((document) => {
    return Boolean(getDocumentUrl(document));
  });
});


/* =========================================================
   LOAD PRODUCTS
========================================================= */

const loadProducts = async () => {
  loading.value = true;
  error.value = "";

  try {
    const companyId = route.params.companyId;

    if (!companyId) {
      throw new Error("Company ID is missing.");
    }

    const response =
      await getPublicProductsByCompany(companyId);

    products.value = response.data || [];

    if (products.value.length > 0) {
      companyName.value =
        products.value[0].companyName ||
        "Our Products";

      companyBanner.value =
        products.value[0].companyBanner
          ? getImageUrl(
              products.value[0].companyBanner
            )
          : "";
    } else {
      companyName.value = "Our Products";
      companyBanner.value = "";
    }

  } catch (err) {
    console.error(
      "Error loading products:",
      err
    );

    error.value =
      err?.response?.data?.message ||
      err?.message ||
      "Unable to load products.";

  } finally {
    loading.value = false;
  }
};


/* =========================================================
   LOAD COMPANIES
========================================================= */

const loadCompanies = async () => {
  try {
    const response =
      await getAllCompany();

    companies.value =
      response.data || [];

  } catch (err) {
    console.error(
      "Error loading companies:",
      err
    );

    companies.value = [];
  }
};


/* =========================================================
   GROUP PRODUCTS BY CATEGORY
========================================================= */

const categories = computed(() => {
  const grouped = new Map();

  products.value.forEach(product => {

    const categoryId =
      product.categoryId ??
      `category-${product.categoryName}`;

    const categoryName =
      product.categoryName ||
      "Other";

    if (!grouped.has(categoryId)) {
      grouped.set(
        categoryId,
        {
          id: categoryId,
          name: categoryName,
          products: []
        }
      );
    }

    grouped
      .get(categoryId)
      .products
      .push(product);
  });

  return Array.from(
    grouped.values()
  ).map(
    (category, index) => ({
      ...category,
      index: index + 1
    })
  );
});


/* =========================================================
   FILTERED CATEGORIES
========================================================= */

const filteredCategories = computed(() => {

  if (selectedCategory.value === "all") {
    return categories.value;
  }

  return categories.value
    .filter(
      category =>
        String(category.id) ===
        String(selectedCategory.value)
    )
    .map((category, index) => ({
      ...category,
      index: index + 1
    }));
});


/* =========================================================
   IMAGE URL
========================================================= */

const getImageUrl = (path) => {

  if (!path) {
    return "/images/product-placeholder.jpg";
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `http://localhost:9292/${path}`;
};


/* =========================================================
   PRODUCT IMAGE
========================================================= */

const getProductImage = (product) => {

  if (
    product.thumbnail &&
    product.thumbnail.trim() !== ""
  ) {
    return getImageUrl(
      product.thumbnail
    );
  }

  if (
    product.images &&
    product.images.length > 0
  ) {
    const firstImage =
      product.images[0];

    if (firstImage?.imageUrl) {
      return getImageUrl(
        firstImage.imageUrl
      );
    }
  }

  return "/images/product-placeholder.jpg";
};


/* =========================================================
   IMAGE ERROR
========================================================= */

const handleImageError = (event) => {
  event.target.src =
    "/images/product-placeholder.jpg";
};


/* =========================================================
   OPEN MODAL
========================================================= */

const openProductModal = (product) => {

  selectedProduct.value =
    product;

  selectedImageIndex.value =
    0;

  showProductModal.value =
    true;

  document.body.style.overflow =
    "hidden";
};


/* =========================================================
   CLOSE MODAL
========================================================= */

const closeProductModal = () => {

  showProductModal.value =
    false;

  selectedProduct.value =
    null;

  selectedImageIndex.value =
    0;

  document.body.style.overflow =
    "";
};


/* =========================================================
   PRODUCT IMAGES
========================================================= */

const getProductImages = (product) => {

  if (!product) {
    return [];
  }

  const images = [];

  if (
    product.thumbnail &&
    product.thumbnail.trim() !== ""
  ) {
    images.push(
      product.thumbnail
    );
  }

  if (
    product.images &&
    product.images.length
  ) {
    product.images.forEach(image => {

      const imageUrl =
        image?.imageUrl ||
        image?.url ||
        image?.path;

      if (
        imageUrl &&
        !images.includes(imageUrl)
      ) {
        images.push(
          imageUrl
        );
      }
    });
  }

  return images;
};


/* =========================================================
   SELECTED PRODUCT IMAGE
========================================================= */

const getSelectedProductImage = (product) => {

  const images =
    getProductImages(product);

  if (!images.length) {
    return "/images/product-placeholder.jpg";
  }

  return getImageUrl(
    images[selectedImageIndex.value]
  );
};


/* =========================================================
   DOCUMENT URL
========================================================= */

const getDocumentUrl = (document) => {

  const path =
    document?.fileUrl ||
    document?.documentUrl ||
    document?.url ||
    document?.filePath;

  if (!path) {
    return null;
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `http://localhost:9292/${path}`;
};


/* =========================================================
   WATCH COMPANY
========================================================= */

watch(
  () => route.params.companyId,
  () => {

    closeProductModal();

    selectedCategory.value =
      "all";

    loadProducts();
  },
  {
    immediate: true
  }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

onMounted(() => {
  loadCompanies();
});
</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.products-page {
  min-height: 100vh;
  background: #ffffff;
  overflow: hidden;
}


/* =========================================================
   HEADER
========================================================= */

.products-header {
  position: relative;
  min-height: 390px;

  display: flex;
  align-items: center;

  padding: 90px 0 80px;

  background-color: #0b1726;
  background-size: cover;
  background-position: center;

  overflow: hidden;
}

.products-header-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(7, 15, 24, 0.97) 0%,
      rgba(7, 15, 24, 0.90) 48%,
      rgba(7, 15, 24, 0.58) 100%
    );
}

.products-header .container {
  position: relative;
  z-index: 2;
}


/* =========================================================
   BREADCRUMB
========================================================= */

.products-header .breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 9px;

  margin-bottom: 28px;

  color: rgba(255,255,255,0.55);

  font-size: 0.72rem;
  font-weight: 600;
}

.products-header .breadcrumb a {
  color: rgba(255,255,255,0.68);
  text-decoration: none;

  transition: color 0.25s ease;
}

.products-header .breadcrumb a:hover {
  color: #ffffff;
}

.products-header .breadcrumb i {
  color: var(--icon-accent, #c58a24);
  font-size: 9px;
}

.products-header .breadcrumb span {
  color: #ffffff;
  font-weight: 700;
}


/* =========================================================
   COMPANY SELECTOR
========================================================= */

.product-company-selector {
  position: relative;

  display: inline-block;

  margin-bottom: 30px;

  z-index: 20;
}

.company-selector-trigger {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 11px 16px;

  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 6px;

  background: rgba(255,255,255,0.08);

  color: #ffffff;

  font-family: inherit;
  font-size: 0.72rem;
  font-weight: 700;

  cursor: pointer;

  backdrop-filter: blur(8px);

  transition:
    background 0.25s ease,
    border-color 0.25s ease;
}

.company-selector-trigger:hover {
  background: rgba(255,255,255,0.14);
  border-color: rgba(255,255,255,0.30);
}

.company-selector-trigger i {
  font-size: 0.65rem;
}


/* =========================================================
   COMPANY MENU
========================================================= */

.product-company-menu {
  position: absolute;

  top: calc(100% + 10px);
  left: 0;

  width: 370px;
  max-width: calc(100vw - 30px);

  padding: 18px;

  border: 1px solid #dfe5eb;
  border-radius: 9px;

  background: #ffffff;

  box-shadow:
    0 18px 45px rgba(0,0,0,0.18);
}

.product-company-menu-title {
  margin-bottom: 12px;
  padding-bottom: 10px;

  border-bottom: 1px solid #e5e9ed;

  color: #71808d;

  font-size: 0.65rem;
  font-weight: 800;

  letter-spacing: 1.4px;
}

.product-company-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0,1fr));

  gap: 5px;
}

.product-company-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 8px;

  min-width: 0;

  padding: 10px 11px;

  border-radius: 5px;

  color: #162536;

  font-size: 0.75rem;
  font-weight: 650;

  text-decoration: none;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.product-company-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-company-item:hover {
  background: #f1f6fa;
  color: #1b5e8c;
  transform: translateX(2px);
}

.product-company-item i {
  flex: 0 0 auto;
  color: #1b5e8c;
  font-size: 0.65rem;
}

.product-company-empty {
  padding: 12px 4px;
  color: #71808d;
  font-size: 0.75rem;
}


/* =========================================================
   HEADER CONTENT
========================================================= */

.header-content {
  max-width: 760px;
}

.eyebrow {
  display: inline-block;

  margin-bottom: 13px;

  color: #c58a24;

  font-size: 0.65rem;
  font-weight: 800;

  letter-spacing: 2px;
}

.header-content h1 {
  margin: 0 0 18px;

  color: #ffffff;

  font-size:
    clamp(2.6rem,5vw,4.5rem);

  font-weight: 800;

  line-height: 1.04;

  letter-spacing: -2px;
}

.header-content p {
  max-width: 650px;

  margin: 0;

  color: rgba(255,255,255,0.70);

  font-size: 0.95rem;
  line-height: 1.85;
}


/* =========================================================
   HEADER DECORATION
========================================================= */

.products-header::after {
  content: "";

  position: absolute;

  right: -120px;
  bottom: -180px;

  width: 430px;
  height: 430px;

  border:
    1px solid rgba(255,255,255,0.08);

  border-radius: 50%;
}

.products-header::before {
  content: "";

  position: absolute;

  right: 40px;
  bottom: -260px;

  width: 470px;
  height: 470px;

  border:
    1px solid rgba(255,255,255,0.05);

  border-radius: 50%;
}


/* =========================================================
   CONTENT
========================================================= */

.products-content {
  padding: 80px 0 110px;
  background: #ffffff;
}


/* =========================================================
   PRODUCTS BROWSER
========================================================= */

.products-browser {
  width: 100%;
}


/* =========================================================
   PRODUCT FILTER
   NEW IMPROVED DESIGN
========================================================= */

.products-filter {
  position: relative;

  margin-bottom: 58px;

  padding: 24px;

  border: 1px solid #d6e0e8;
  border-radius: 12px;

  /*
    Main filter background
  */
  background:
    linear-gradient(
      135deg,
      #f1f6fa 0%,
      #f8fafc 55%,
      #eef4f8 100%
    );

  box-shadow:
    0 8px 25px rgba(16,24,32,0.055);

  overflow: hidden;
}


/* subtle top accent */

.products-filter::before {
  content: "";

  position: absolute;

  top: 0;
  left: 0;
  right: 0;

  height: 3px;

  background:
    linear-gradient(
      90deg,
      #1b5e8c,
      #3d86b2,
      #c58a24
    );
}


/* subtle pattern */

.products-filter::after {
  content: "";

  position: absolute;

  right: -80px;
  top: -100px;

  width: 240px;
  height: 240px;

  border:
    1px solid rgba(27,94,140,0.07);

  border-radius: 50%;

  pointer-events: none;
}


/* =========================================================
   FILTER HEADING
========================================================= */

.filter-heading {
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 20px;
}


/* left */

.filter-heading-left {
  display: flex;
  align-items: center;
  gap: 13px;
}

.filter-icon-large {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border: 1px solid #d2e0ea;
  border-radius: 8px;

  background: #ffffff;

  color: #1b5e8c;

  font-size: 0.9rem;

  box-shadow:
    0 3px 10px rgba(27,94,140,0.08);
}

.filter-heading-left > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.filter-label {
  color: #1b5e8c;

  font-size: 0.60rem;
  font-weight: 800;

  letter-spacing: 1.6px;

  text-transform: uppercase;
}

.filter-heading strong {
  color: #162536;

  font-size: 0.95rem;
  font-weight: 800;
}


/* total */

.filter-total {
  display: flex;
  align-items: baseline;
  gap: 5px;

  padding: 8px 12px;

  border: 1px solid #d7e1e8;
  border-radius: 6px;

  background: rgba(255,255,255,0.75);

  white-space: nowrap;
}

.filter-total strong {
  color: #1b5e8c;
  font-size: 0.88rem;
  font-weight: 800;
}

.filter-total span {
  color: #71808d;
  font-size: 0.65rem;
  font-weight: 700;
}


/* =========================================================
   CATEGORY FILTERS
========================================================= */

.category-filters {
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 9px;
}


/* =========================================================
   FILTER BUTTON
========================================================= */

.category-filter {
  display: inline-flex;
  align-items: center;

  gap: 9px;

  min-height: 43px;

  padding: 6px 11px 6px 7px;

  border: 1px solid #d4dfe7;
  border-radius: 7px;

  /*
    Individual filter button background
  */
  background: #ffffff;

  color: #536270;

  font-family: inherit;

  font-size: 0.73rem;
  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 2px 5px rgba(16,24,32,0.025);

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.category-filter:hover {
  border-color: #a9c4d7;

  background: #fafdff;

  color: #1b5e8c;

  transform: translateY(-1px);

  box-shadow:
    0 5px 12px rgba(27,94,140,0.08);
}


/* =========================================================
   FILTER ICON
========================================================= */

.filter-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 29px;
  height: 29px;

  flex-shrink: 0;

  border: 1px solid #dce7ee;
  border-radius: 5px;

  background: #edf4f9;

  color: #1b5e8c;

  font-size: 0.70rem;
}


/* =========================================================
   FILTER NAME
========================================================= */

.filter-name {
  white-space: nowrap;
}


/* =========================================================
   FILTER COUNT
========================================================= */

.category-filter small {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 23px;
  height: 22px;

  padding: 0 5px;

  border-radius: 4px;

  background: #eef2f5;

  color: #71808d;

  font-size: 0.60rem;
  font-weight: 800;
}


/* =========================================================
   ACTIVE FILTER
========================================================= */

.category-filter.active {
  border-color: #1b5e8c;

  background:
    linear-gradient(
      135deg,
      #1b5e8c,
      #174f77
    );

  color: #ffffff;

  box-shadow:
    0 7px 18px rgba(27,94,140,0.22);

  transform: translateY(-1px);
}

.category-filter.active:hover {
  background:
    linear-gradient(
      135deg,
      #1b5e8c,
      #174f77
    );

  color: #ffffff;

  transform: translateY(-1px);
}

.category-filter.active .filter-icon {
  border-color:
    rgba(255,255,255,0.20);

  background:
    rgba(255,255,255,0.14);

  color: #ffffff;
}

.category-filter.active small {
  background:
    rgba(255,255,255,0.15);

  color: #ffffff;
}


/* =========================================================
   FILTER EMPTY
========================================================= */

.filter-empty {
  padding: 65px 30px;

  margin-bottom: 60px;

  text-align: center;

  border: 1px solid #e1e6eb;
  border-radius: 10px;

  background: #ffffff;
}

.filter-empty > i {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 55px;
  height: 55px;

  margin: 0 auto 18px;

  border-radius: 50%;

  background: #edf4fa;

  color: #1b5e8c;

  font-size: 1.4rem;
}

.filter-empty h3 {
  margin: 0 0 8px;

  color: #162536;

  font-size: 1.2rem;
  font-weight: 800;
}

.filter-empty p {
  margin: 0 0 20px;

  color: #71808d;

  font-size: 0.82rem;
}

.reset-filter {
  display: inline-flex;
  align-items: center;

  gap: 8px;

  padding: 10px 15px;

  border: 1px solid #dce3e9;
  border-radius: 6px;

  background: #ffffff;

  color: #1b5e8c;

  font-family: inherit;

  font-size: 0.72rem;
  font-weight: 750;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.reset-filter:hover {
  border-color: #1b5e8c;
  background: #f5f9fc;
}


/* =========================================================
   CATEGORY SECTION
========================================================= */

.category-section {
  margin-bottom: 85px;
}

.category-section:last-child {
  margin-bottom: 0;
}


/* =========================================================
   CATEGORY HEADER
========================================================= */

.category-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 30px;

  margin-bottom: 30px;
  padding-bottom: 20px;

  border-bottom: 1px solid #e5e9ed;
}

.category-title {
  display: flex;
  align-items: center;

  gap: 17px;
}

.category-number {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 45px;
  height: 45px;

  border-radius: 8px;

  background: #f1f6ff;

  color: #1b5e8c;

  font-size: 0.78rem;
  font-weight: 800;
}

.category-label {
  display: block;

  margin-bottom: 4px;

  color: #71808d;

  font-size: 0.60rem;
  font-weight: 800;

  letter-spacing: 1.4px;
}

.category-header h2 {
  margin: 0;

  color: #162536;

  font-size: 1.75rem;
  font-weight: 800;

  line-height: 1.2;
}

.category-count {
  padding-bottom: 3px;

  color: #162536;

  font-size: 0.78rem;
  font-weight: 750;
}

.category-count span {
  color: #71808d;
  font-weight: 500;
}


/* =========================================================
   PRODUCT GRID
========================================================= */

.products-grid {
  display: grid;

  grid-template-columns:
    repeat(3,minmax(0,1fr));

  gap: 24px;
}


/* =========================================================
   PRODUCT CARD
========================================================= */

.product-card {
  position: relative;

  display: flex;
  flex-direction: column;

  min-width: 0;

  overflow: hidden;

  background: #ffffff;

  border: 1px solid #e1e6eb;
  border-radius: 10px;

  box-shadow:
    0 3px 10px rgba(16,24,32,0.025);

  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.product-card:hover {
  transform: translateY(-7px);

  border-color: #d1d9e1;

  box-shadow:
    0 18px 42px rgba(16,24,32,0.11);
}


/* =========================================================
   PRODUCT IMAGE
========================================================= */

.product-image-wrapper {
  position: relative;

  height: 235px;

  overflow: hidden;

  background:
    linear-gradient(
      145deg,
      #f9fafb 0%,
      #f1f4f7 100%
    );
}

.product-image-wrapper::after {
  content: "";

  position: absolute;
  inset: 0;

  pointer-events: none;

  background:
    linear-gradient(
      to bottom,
      transparent 60%,
      rgba(16,24,32,0.06)
    );
}

.product-image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: contain;

  transition:
    transform 0.55s
    cubic-bezier(.2,.7,.2,1);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}



/* =========================================================
   VIEW PRODUCT
========================================================= */

.view-product {
  display: inline-flex;
  align-items: center;

  gap: 8px;

  padding: 10px 15px;

  border: 0;
  border-radius: 5px;

  background: #1b5e8c;

  color: #ffffff;

  font-family: inherit;

  font-size: 0.70rem;
  font-weight: 750;

  cursor: pointer;

  box-shadow:
    0 5px 15px rgba(13,110,253,0.25);

  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.view-product:hover {
  background: #174f77;
  transform: translateY(-2px);
}


/* =========================================================
   PRODUCT INFO
========================================================= */

.product-info {
  display: flex;
  flex-direction: column;

  flex: 1;

  padding: 22px 21px 20px;
}

.product-brand {
  display: block;

  margin-bottom: 7px;

  color: #1b5e8c;

  font-size: 0.62rem;
  font-weight: 800;

  letter-spacing: 1.5px;

  text-transform: uppercase;
}

.product-info h3 {
  margin: 0 0 6px;

  color: #162536;

  font-size: 1.18rem;
  font-weight: 800;

  line-height: 1.3;
}

.product-title {
  margin: 0 0 13px;

  color: #4f5b65;

  font-size: 0.86rem;
  font-weight: 650;

  line-height: 1.5;
}


/* =========================================================
   PRODUCT TYPE
========================================================= */

.product-type {
  display: inline-flex;
  align-items: center;

  align-self: flex-start;

  gap: 7px;

  margin-bottom: 13px;

  padding: 6px 10px;

  border:
    1px solid rgba(27,94,140,0.14);

  border-radius: 5px;

  background:
    rgba(27,94,140,0.055);

  color: #1b5e8c;

  font-size: 0.66rem;
  font-weight: 700;
}

.product-type i {
  font-size: 0.72rem;
}


/* =========================================================
   DESCRIPTION
========================================================= */

.product-description {
  display: -webkit-box;

  margin: 0;

  overflow: hidden;

  color: #75808a;

  font-size: 0.77rem;

  line-height: 1.75;

  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}


/* =========================================================
   PRODUCT LINK
========================================================= */

.product-link {
  display: inline-flex;
  align-items: center;

  align-self: flex-start;

  gap: 7px;

  margin-top: auto;

  padding: 18px 0 0;

  border: 0;

  background: transparent;

  color: #1b5e8c;

  font-family: inherit;

  font-size: 0.70rem;
  font-weight: 800;

  cursor: pointer;

  transition:
    color 0.25s ease,
    gap 0.25s ease;
}

.product-link:hover {
  gap: 11px;
  color: #174f77;
}


/* =========================================================
   LOADING
========================================================= */

.loading-container {
  padding: 80px 20px;
  text-align: center;
}

.loading-container .spinner-border {
  color: #1b5e8c;
}

.loading-container p {
  margin-top: 15px;
  color: #71808d;
}


/* =========================================================
   ERROR / EMPTY
========================================================= */

.error-container,
.empty-container {
  max-width: 650px;

  margin: 0 auto;

  padding: 65px 30px;

  text-align: center;

  border: 1px solid #e1e6eb;
  border-radius: 10px;

  background: #ffffff;
}

.error-container > i,
.empty-container > i {
  display: block;

  margin-bottom: 15px;

  color: #1b5e8c;

  font-size: 2.2rem;
}

.error-container h3,
.empty-container h3 {
  margin-bottom: 8px;

  color: #162536;

  font-size: 1.25rem;
  font-weight: 800;
}

.error-container p,
.empty-container p {
  margin: 0;

  color: #71808d;

  font-size: 0.85rem;
}


/* =========================================================
   MODAL BACKDROP
========================================================= */

.product-modal-backdrop {
  position: fixed;
  inset: 0;

  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 25px;

  background:
    rgba(7,15,24,0.78);

  backdrop-filter: blur(7px);
}


/* =========================================================
   MODAL
========================================================= */

.product-modal {
  position: relative;

  width: min(1180px,100%);

  max-height: 92vh;

  overflow: hidden;

  border-radius: 12px;

  background: #ffffff;

  box-shadow:
    0 30px 80px rgba(0,0,0,0.28);

  animation:
    productModalIn
    0.3s ease-out;
}

@keyframes productModalIn {

  from {
    opacity: 0;
    transform:
      translateY(20px)
      scale(0.98);
  }

  to {
    opacity: 1;
    transform:
      translateY(0)
      scale(1);
  }

}


/* =========================================================
   MODAL CLOSE
========================================================= */

.product-modal-close {
  position: absolute;

  top: 17px;
  right: 17px;

  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 39px;
  height: 39px;

  border: 1px solid #dfe5ea;
  border-radius: 50%;

  background: rgba(255,255,255,0.95);

  color: #46515b;

  cursor: pointer;

  box-shadow:
    0 4px 12px rgba(16,24,32,0.08);

  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}

.product-modal-close:hover {
  background: #101820;
  color: #ffffff;
  transform: rotate(90deg);
}


/* =========================================================
   MODAL BODY
========================================================= */

.product-modal-body {
  display: grid;

  grid-template-columns:
    minmax(0,0.95fr)
    minmax(0,1.05fr);

  max-height: 92vh;

  overflow-y: auto;
}


/* =========================================================
   MODAL GALLERY
========================================================= */

.product-modal-gallery {
  padding: 35px;

  background: #f7f9fb;

  border-right:
    1px solid #e2e7ec;
}

.product-main-image {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 420px;

  overflow: hidden;

  border: 1px solid #e1e6eb;
  border-radius: 9px;

  background: #ffffff;
}

.product-main-image img {
  width: 100%;
  height: 100%;

  object-fit: contain;

  transition:
    transform 0.4s ease;
}

.product-main-image:hover img {
  transform: scale(1.025);
}


/* =========================================================
   THUMBNAILS
========================================================= */

.product-thumbnails {
  display: flex;

  gap: 9px;

  margin-top: 14px;

  overflow-x: auto;

  padding-bottom: 4px;
}

.product-thumbnail {
  flex: 0 0 68px;

  width: 68px;
  height: 62px;

  padding: 4px;

  overflow: hidden;

  border: 1px solid #dce3e9;
  border-radius: 6px;

  background: #ffffff;

  cursor: pointer;

  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.product-thumbnail img {
  width: 100%;
  height: 100%;

  object-fit: contain;
}

.product-thumbnail:hover {
  border-color: #1b5e8c;
}

.product-thumbnail.active {
  border: 2px solid #1b5e8c;

  box-shadow:
    0 0 0 2px rgba(27,94,140,0.10);
}


/* =========================================================
   MODAL DETAILS
========================================================= */

.product-modal-details {
  padding: 42px 45px;

  background: #ffffff;
}

.modal-product-brand {
  display: inline-block;

  margin-bottom: 9px;

  color: #1b5e8c;

  font-size: 0.65rem;
  font-weight: 800;

  letter-spacing: 1.7px;

  text-transform: uppercase;
}

.modal-product-title {
  margin: 0;

  color: #162536;

  font-size: 2.25rem;
  font-weight: 800;

  line-height: 1.12;
}

.modal-product-subtitle {
  margin: 9px 0 25px;

  color: #697580;

  font-size: 0.9rem;
  font-weight: 600;

  line-height: 1.6;
}


/* =========================================================
   BASIC INFO
========================================================= */

.product-basic-info {
  display: grid;

  grid-template-columns:
    repeat(2,minmax(0,1fr));

  gap: 10px;

  margin-bottom: 28px;

  padding: 14px;

  border: 1px solid #e2e7ec;
  border-radius: 8px;

  background: #f8fafc;
}

.basic-info-item {
  display: flex;
  flex-direction: column;

  gap: 4px;

  padding: 9px 11px;

  border-left:
    2px solid #1b5e8c;
}

.basic-info-item span {
  color: #71808d;

  font-size: 0.61rem;
  font-weight: 750;

  letter-spacing: 1px;

  text-transform: uppercase;
}

.basic-info-item strong {
  color: #162536;

  font-size: 0.80rem;
  font-weight: 750;
}


/* =========================================================
   DETAIL SECTIONS
========================================================= */

.modal-detail-section {
  margin-top: 28px;

  padding-top: 23px;

  border-top:
    1px solid #e4e8ec;
}

.modal-detail-section h3 {
  position: relative;

  margin: 0 0 14px;

  padding-left: 13px;

  color: #162536;

  font-size: 0.98rem;
  font-weight: 800;
}

.modal-detail-section h3::before {
  content: "";

  position: absolute;

  left: 0;
  top: 2px;

  width: 3px;
  height: 17px;

  border-radius: 2px;

  background: #1b5e8c;
}

.modal-detail-section > p {
  margin: 0;

  color: #6f7b86;

  font-size: 0.82rem;

  line-height: 1.85;
}


/* =========================================================
   SPECIFICATIONS
========================================================= */

.specifications-table {
  overflow: hidden;

  border: 1px solid #e1e6eb;
  border-radius: 7px;
}

.specification-row {
  display: grid;

  grid-template-columns:
    minmax(130px,0.8fr)
    minmax(0,1.2fr);

  border-bottom:
    1px solid #e5e9ed;
}

.specification-row:last-child {
  border-bottom: 0;
}

.specification-name {
  padding: 11px 14px;

  background: #f7f9fb;

  color: #68747e;

  font-size: 0.72rem;
  font-weight: 750;
}

.specification-value {
  padding: 11px 14px;

  color: #162536;

  font-size: 0.75rem;
  font-weight: 650;
}


/* =========================================================
   FEATURES
========================================================= */

.product-features {
  display: grid;

  gap: 9px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.product-features li {
  display: flex;
  align-items: flex-start;

  gap: 10px;

  color: #697580;

  font-size: 0.78rem;

  line-height: 1.65;
}

.product-features li i {
  flex: 0 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  margin-top: 1px;

  border-radius: 50%;

  background:
    rgba(25,135,84,0.10);

  color: #198754;

  font-size: 0.68rem;
}


/* =========================================================
   DOCUMENTS
========================================================= */

.product-documents {
  display: grid;
  gap: 8px;
}

.product-document {
  display: flex;
  align-items: center;

  gap: 10px;

  padding: 11px 13px;

  border: 1px solid #e1e6eb;
  border-radius: 7px;

  background: #ffffff;

  color: #162536;

  text-decoration: none;

  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    transform 0.25s ease;
}

.product-document:hover {
  transform: translateX(3px);

  border-color:
    rgba(27,94,140,0.30);

  background: #f8fbff;
}

.product-document > i:first-child {
  color: #dc3545;
  font-size: 1.1rem;
}

.product-document span {
  flex: 1;

  color: #596671;

  font-size: 0.74rem;
  font-weight: 650;
}

.product-document > i:last-child {
  color: #1b5e8c;
  font-size: 0.78rem;
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 991.98px) {

  .products-header {
    min-height: 350px;
    padding: 80px 0 70px;
  }

  .products-content {
    padding: 70px 0 85px;
  }

  .products-grid {
    grid-template-columns:
      repeat(2,minmax(0,1fr));
  }

  .product-modal-body {
    grid-template-columns: 1fr;
  }

  .product-modal-gallery {
    border-right: 0;

    border-bottom:
      1px solid #e2e7ec;
  }

  .product-main-image {
    height: 330px;
  }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 767.98px) {

  .products-filter {
    margin-bottom: 40px;
    padding: 18px;
  }

  .filter-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .filter-total {
    align-self: flex-start;
  }

  .category-filters {
    display: grid;

    grid-template-columns:
      repeat(2,minmax(0,1fr));

    gap: 7px;
  }

  .category-filter {
    width: 100%;

    justify-content: flex-start;
  }

  .products-header {
    min-height: 320px;

    padding: 70px 0 60px;
  }

  .products-header .breadcrumb {
    margin-bottom: 24px;
  }

  .product-company-selector {
    margin-bottom: 25px;
  }

  .product-company-menu {
    width: 330px;
  }

  .header-content h1 {
    font-size:
      clamp(2.3rem,10vw,3.2rem);

    letter-spacing: -1.3px;
  }

  .header-content p {
    font-size: 0.85rem;
  }

  .products-content {
    padding: 55px 0 70px;
  }

  .category-section {
    margin-bottom: 65px;
  }

  .category-header {
    align-items: flex-start;

    flex-direction: column;

    gap: 12px;
  }

  .category-header h2 {
    font-size: 1.55rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .product-image-wrapper {
    height: 220px;
  }

  .product-modal-backdrop {
    padding: 10px;
  }

  .product-modal {
    max-height: 96vh;
    border-radius: 9px;
  }

  .product-modal-gallery {
    padding: 18px;
  }

  .product-modal-details {
    padding: 30px 20px;
  }

  .product-main-image {
    height: 280px;
  }

  .modal-product-title {
    font-size: 1.85rem;
  }

  .product-basic-info {
    grid-template-columns: 1fr;
  }

  .specification-row {
    grid-template-columns: 1fr;
  }

  .specification-name {
    border-bottom:
      1px solid #e5e9ed;
  }

}


/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 480px) {

  .category-filters {
    grid-template-columns: 1fr;
  }

  .category-filter {
    min-height: 45px;
  }

  .products-header {
    padding: 60px 0 55px;
  }

  .products-header .breadcrumb {
    font-size: 0.65rem;
  }

  .company-selector-trigger {
    width: 100%;
    justify-content: space-between;
  }

  .product-company-selector {
    width: 100%;
  }

  .product-company-menu {
    width: 100%;
    max-width: 100%;
  }

  .product-company-grid {
    grid-template-columns: 1fr;
  }

  .category-title {
    gap: 12px;
  }

  .category-number {
    width: 40px;
    height: 40px;
  }

  .category-header h2 {
    font-size: 1.4rem;
  }

  .product-info {
    padding: 19px 17px;
  }

  .product-image-wrapper {
    height: 205px;
  }

  .product-info h3 {
    font-size: 1.12rem;
  }

  .product-title {
    font-size: 0.82rem;
  }

  .product-modal-close {
    top: 10px;
    right: 10px;

    width: 35px;
    height: 35px;
  }

}

</style>
```
