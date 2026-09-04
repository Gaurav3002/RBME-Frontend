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
                  <span>
                    {{ company.name }}
                  </span>

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
            class="public-button"
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


              <!-- PRODUCTS GRID -->
              <div class="products-grid">

                <article
                  v-for="product in category.products"
                  :key="product.id"
                  class="product-card"
                >

                  <!-- IMAGE -->
                  <div class="product-image-wrapper">

                    <div class="image-top-line"></div>

                    <div class="image-corner image-corner-left"></div>
                    <div class="image-corner image-corner-right"></div>

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
                      {{ product.companyName || companyName }}
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

          <!-- LEFT - GALLERY -->
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
              v-if="getProductImages(selectedProduct).length"
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
                @click="selectedImageIndex = index"
              >

                <img
                  :src="getImageUrl(image)"
                  :alt="
                    selectedProduct.modelNo ||
                    'Product image'
                  "
                  @error="handleImageError"
                />

              </button>

            </div>

          </div>


          <!-- RIGHT - DETAILS -->
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
              v-if="selectedProductDocuments.length"
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


/* =========================================================
   IMAGE BASE URL
========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_IMAGE_URL;


/* =========================================================
   IMAGE URL
========================================================= */

const getImageUrl = (path) => {

  if (!path) {
    return "/images/product-placeholder.jpg";
  }

  const cleanPath = String(path).trim();

  if (!cleanPath) {
    return "/images/product-placeholder.jpg";
  }

  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://")
  ) {
    return cleanPath;
  }

  const baseUrl =
    String(API_BASE_URL || "").replace(/\/+$/, "");

  const normalizedPath =
    cleanPath.replace(/^\/+/, "");

  return `${baseUrl}/${normalizedPath}`;
};


/* =========================================================
   PRODUCT IMAGE
========================================================= */

const getProductImage = (product) => {

  if (
    product?.thumbnail &&
    typeof product.thumbnail === "string" &&
    product.thumbnail.trim()
  ) {
    return getImageUrl(product.thumbnail);
  }

  if (
    Array.isArray(product?.images) &&
    product.images.length > 0
  ) {

    const firstImage =
      product.images[0];

    const imagePath =
      firstImage?.imageUrl ||
      firstImage?.url ||
      firstImage?.path;

    if (imagePath) {
      return getImageUrl(imagePath);
    }
  }

  return "/images/product-placeholder.jpg";
};


/* =========================================================
   IMAGE ERROR
========================================================= */

const handleImageError = (event) => {

  const placeholder =
    "/images/product-placeholder.jpg";

  if (
    event?.target &&
    event.target.src &&
    !event.target.src.includes(
      "product-placeholder.jpg"
    )
  ) {
    event.target.src = placeholder;
  }
};


/* =========================================================
   LOAD PRODUCTS
========================================================= */

const loadProducts = async () => {

  loading.value = true;
  error.value = "";

  try {

    const companyId =
      route.params.companyId;

    if (!companyId) {
      throw new Error(
        "Company ID is missing."
      );
    }

    const response =
      await getPublicProductsByCompany(
        companyId
      );

    const data =
      Array.isArray(response.data)
        ? response.data
        : [];

    products.value = data;

    if (data.length > 0) {

      companyName.value =
        data[0].companyName ||
        "Our Products";

      if (data[0].companyBanner) {

        companyBanner.value =
          getImageUrl(
            data[0].companyBanner
          );

      } else {

        companyBanner.value = "";
      }

    } else {

      companyName.value =
        "Our Products";

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

    companyBanner.value = "";

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
      Array.isArray(response.data)
        ? response.data
        : [];

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

  products.value.forEach((product) => {

    const categoryId =
      product.categoryId ??
      `category-${product.categoryName || "other"}`;

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

  if (
    selectedCategory.value === "all"
  ) {
    return categories.value;
  }

  return categories.value
    .filter(
      (category) =>
        String(category.id) ===
        String(selectedCategory.value)
    )
    .map(
      (category, index) => ({
        ...category,
        index: index + 1
      })
    );
});


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
    typeof product.thumbnail === "string" &&
    product.thumbnail.trim()
  ) {

    images.push(
      product.thumbnail
    );
  }

  if (
    Array.isArray(product.images)
  ) {

    product.images.forEach(
      (image) => {

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
      }
    );
  }

  return images;
};


/* =========================================================
   SELECTED PRODUCT IMAGE
========================================================= */

const getSelectedProductImage = (
  product
) => {

  const images =
    getProductImages(product);

  if (!images.length) {
    return "/images/product-placeholder.jpg";
  }

  return getImageUrl(
    images[
      selectedImageIndex.value
    ] || images[0]
  );
};


/* =========================================================
   DOCUMENT URL
========================================================= */

const getDocumentUrl = (
  document
) => {

  const path =
    document?.fileUrl ||
    document?.documentUrl ||
    document?.url ||
    document?.filePath;

  if (!path) {
    return null;
  }

  const cleanPath =
    String(path).trim();

  if (!cleanPath) {
    return null;
  }

  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://")
  ) {
    return cleanPath;
  }

  const baseUrl =
    String(
      import.meta.env.VITE_IMAGE_URL || ""
    ).replace(/\/+$/, "");

  const normalizedPath =
    cleanPath.replace(/^\/+/, "");

  return `${baseUrl}/${normalizedPath}`;
};


/* =========================================================
   SELECTED PRODUCT DOCUMENTS
========================================================= */

const selectedProductDocuments =
  computed(() => {

    return (
      selectedProduct.value?.documents ||
      []
    ).filter(
      (document) =>
        Boolean(
          getDocumentUrl(document)
        )
    );
  });


/* =========================================================
   OPEN MODAL
========================================================= */

const openProductModal = (
  product
) => {

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
```css
<style scoped>

/* =========================================================
   RBME PRODUCTS PAGE
   Premium Responsive Design
========================================================= */

.products-page {

  --primary: #1b5e8c;
  --primary-dark: #154b70;
  --primary-light: #edf5fc;

  --gold: #efaf42;
  --gold-light: #fff7e8;

  --dark: #162536;
  --text: #4e5d69;
  --muted: #687786;
  --light-text: #7b8794;

  --white: #ffffff;

  --page-bg: #f7f9fb;

  --border: #e1e7ed;
  --border-light: #e8edf2;

  width: 100%;
  max-width: 100%;
  min-width: 0;

  overflow-x: hidden;

  background: var(--white);
  color: var(--dark);

  font-family: inherit;
}


/* =========================================================
   GLOBAL BOX SIZING
========================================================= */

.products-page *,
.products-page *::before,
.products-page *::after {

  box-sizing: border-box;

}


/* =========================================================
   HEADER / HERO
========================================================= */

.products-header {

  position: relative;

  min-height: 500px;

  display: flex;
  align-items: flex-end;

  overflow: visible;

  background-color: var(--dark);

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

}


.products-header-overlay {

  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(15, 30, 44, 0.92) 0%,
      rgba(15, 30, 44, 0.76) 38%,
      rgba(15, 30, 44, 0.48) 70%,
      rgba(15, 30, 44, 0.20) 100%
    );

}


.products-header .container {

  position: relative;

  z-index: 2;

  width: 100%;

}


.products-header-content {

  position: relative;

  padding: 50px 0 65px;

}


/* =========================================================
   BREADCRUMB
========================================================= */

.products-page .breadcrumb {

  display: flex;

  align-items: center;

  flex-wrap: wrap;

  gap: 9px;

  margin: 0 0 28px;

  color: rgba(255, 255, 255, 0.60);

  font-size: 0.68rem;

  font-weight: 500;

  line-height: 1.5;

}


.products-page .breadcrumb a {

  color: rgba(255, 255, 255, 0.75);

  text-decoration: none;

  transition: color 0.2s ease;

}


.products-page .breadcrumb a:hover {

  color: #ffffff;

}


.products-page .breadcrumb i {

  color: rgba(255, 255, 255, 0.38);

  font-size: 0.52rem;

}


.products-page .breadcrumb span {

  color: #ffffff;

  font-weight: 700;

}


/* =========================================================
   COMPANY SELECTOR
========================================================= */

.product-company-selector {

  position: relative;

  display: inline-block;

  margin-bottom: 40px;

}


.company-selector-trigger {

  min-height: 43px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 11px;

  padding: 0 16px;

  border: 1px solid rgba(255, 255, 255, 0.24);

  border-radius: 7px;

  background: rgba(255, 255, 255, 0.08);

  color: #ffffff;

  font-family: inherit;

  font-size: 0.68rem;

  font-weight: 700;

  letter-spacing: 0.35px;

  cursor: pointer;

  backdrop-filter: blur(10px);

  -webkit-backdrop-filter: blur(10px);

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

}


.company-selector-trigger:hover {

  background: rgba(255, 255, 255, 0.14);

  border-color: rgba(255, 255, 255, 0.38);

  transform: translateY(-1px);

}


.company-selector-trigger i {

  font-size: 0.65rem;

}


/* =========================================================
   COMPANY DROPDOWN
========================================================= */

.product-company-menu {

  position: absolute;

  top: calc(100% + 10px);

  left: 0;

  z-index: 100;

  width: 350px;

  max-width: calc(100vw - 30px);

  padding: 18px;

  border: 1px solid var(--border);

  border-radius: 9px;

  background: #ffffff;

  box-shadow:
    0 15px 40px rgba(15, 23, 42, 0.14);

}


.product-company-menu-title {

  margin: 0 0 11px;

  color: var(--dark);

  font-size: 0.60rem;

  font-weight: 800;

  letter-spacing: 1.5px;

  text-transform: uppercase;

}


.product-company-grid {

  display: grid;

  grid-template-columns: 1fr;

  gap: 4px;

}


.product-company-item {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  min-width: 0;

  padding: 11px 12px;

  border-radius: 6px;

  color: var(--text);

  font-size: 0.73rem;

  font-weight: 600;

  text-decoration: none;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    padding 0.2s ease;

}


.product-company-item:hover {

  padding-left: 15px;

  background: var(--primary-light);

  color: var(--primary);

}


.product-company-item i {

  color: var(--primary);

  font-size: 0.7rem;

}


.product-company-empty {

  color: var(--light-text);

  font-size: 0.72rem;

}


/* =========================================================
   HERO CONTENT
========================================================= */

.header-content {

  max-width: 720px;

}


.eyebrow {

  display: block;

  margin-bottom: 11px;

  color: var(--gold);

  font-size: 0.62rem;

  font-weight: 800;

  letter-spacing: 2.3px;

  text-transform: uppercase;

}


.header-content h1 {

  max-width: 750px;

  margin: 0;

  color: #ffffff;

  font-size: clamp(
    2.7rem,
    5vw,
    4.5rem
  );

  font-weight: 800;

  line-height: 1.04;

  letter-spacing: -2px;

}


.header-content p {

  max-width: 610px;

  margin: 18px 0 0;

  color: rgba(255, 255, 255, 0.72);

  font-size: 0.94rem;

  line-height: 1.8;

}


/* =========================================================
   PRODUCTS CONTENT
========================================================= */

.products-content {

  width: 100%;

  padding: 90px 0 110px;

  background: var(--page-bg);

  overflow-x: hidden;

}


.products-browser {

  width: 100%;

  max-width: 100%;

  min-width: 0;

}


/* =========================================================
   FILTER PANEL
========================================================= */

.products-filter {

  width: 100%;

  margin-bottom: 65px;

  padding: 27px;

  border: 1px solid var(--border);

  border-radius: 10px;

  background: #ffffff;

  box-shadow:
    0 3px 15px rgba(15, 23, 42, 0.06);

}


.filter-heading {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  margin-bottom: 23px;

}


.filter-heading-left {

  display: flex;

  align-items: center;

  gap: 14px;

  min-width: 0;

}


.filter-icon-large {

  width: 45px;

  height: 45px;

  flex: 0 0 45px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 8px;

  background: var(--primary-light);

  color: var(--primary);

  font-size: 1rem;

}


.filter-heading strong {

  display: block;

  color: var(--dark);

  font-size: 0.95rem;

  font-weight: 700;

}


.filter-label {

  display: block;

  margin-bottom: 3px;

  color: var(--primary);

  font-size: 0.58rem;

  font-weight: 800;

  letter-spacing: 1.4px;

  text-transform: uppercase;

}


.filter-total {

  flex: 0 0 auto;

  color: var(--primary);

  font-size: 0.72rem;

  font-weight: 700;

}


/* =========================================================
   CATEGORY FILTERS
========================================================= */

.category-filters {

  display: flex;

  align-items: center;

  flex-wrap: wrap;

  gap: 8px;

  width: 100%;

}


.category-filter {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  min-height: 38px;

  padding: 8px 14px;

  border: 1px solid var(--border);

  border-radius: 7px;

  background: #ffffff;

  color: var(--text);

  font-family: inherit;

  font-size: 0.68rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

}


.category-filter:hover {

  border-color: #bdd2e3;

  background: var(--primary-light);

  color: var(--primary);

  transform: translateY(-1px);

}


.category-filter.active {

  border-color: var(--primary);

  background: var(--primary);

  color: #ffffff;

}


.category-filter i {

  font-size: 0.7rem;

}


.category-filter small {

  opacity: 0.75;

  font-size: 0.58rem;

}


/* =========================================================
   RESET FILTER
========================================================= */

.reset-filter {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  min-height: 38px;

  padding: 8px 14px;

  border: 1px solid var(--border);

  border-radius: 7px;

  background: #ffffff;

  color: var(--primary);

  font-family: inherit;

  font-size: 0.68rem;

  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

}


.reset-filter:hover {

  border-color: #bdd2e3;

  background: var(--primary-light);

  transform: translateY(-1px);

}


/* =========================================================
   CATEGORY SECTION
========================================================= */

.category-section {

  width: 100%;

  margin-bottom: 75px;

}


.category-section:last-child {

  margin-bottom: 0;

}


.category-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 25px;

  margin-bottom: 28px;

  padding-bottom: 17px;

  border-bottom: 1px solid var(--border);

}


.category-title {

  display: flex;

  align-items: center;

  gap: 15px;

  min-width: 0;

}


.category-number {

  flex: 0 0 auto;

  color: #d8e0e6;

  font-size: 2rem;

  font-weight: 800;

  line-height: 1;

}


.category-label {

  display: block;

  margin-bottom: 4px;

  color: var(--primary);

  font-size: 0.57rem;

  font-weight: 800;

  letter-spacing: 1.6px;

  text-transform: uppercase;

}


.category-title h2 {

  margin: 0;

  color: var(--dark);

  font-size: 1.45rem;

  font-weight: 800;

  line-height: 1.25;

}


.category-count {

  flex: 0 0 auto;

  color: var(--primary);

  font-size: 1.25rem;

  font-weight: 800;

}


.category-count span {

  margin-left: 4px;

  color: var(--light-text);

  font-size: 0.62rem;

  font-weight: 500;

}


/* =========================================================
   PRODUCT GRID

   DESKTOP  = 3
   TABLET   = 2
   MOBILE   = 1
========================================================= */

.products-grid {

  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 24px;

  width: 100%;

  max-width: 100%;

  min-width: 0;

  align-items: stretch;

}


/* =========================================================
   PRODUCT CARD
========================================================= */

.product-card {

  position: relative;

  display: flex;

  flex-direction: column;

  width: 100%;

  max-width: 100%;

  min-width: 0;

  height: 100%;

  overflow: hidden;

  border: 1px solid #dce3ea;

  border-radius: 9px;

  background: #ffffff;

  box-shadow:
    0 3px 15px rgba(15, 23, 42, 0.045);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;

}


.product-card:hover {

  transform: translateY(-5px);

  border-color: #c8d6e2;

  box-shadow:
    0 15px 35px rgba(15, 23, 42, 0.10);

}


/* =========================================================
   CARD TOP ACCENT
========================================================= */

.product-card::before {

  content: "";

  position: absolute;

  top: 0;

  left: 0;

  z-index: 5;

  width: 0;

  height: 3px;

  background: var(--gold);

  transition: width 0.3s ease;

}


.product-card:hover::before {

  width: 100%;

}


/* =========================================================
   PRODUCT IMAGE
========================================================= */

.product-image-wrapper {

  position: relative;

  display: flex;

  align-items: center;

  justify-content: center;

  width: 100%;

  height: 260px;

  flex: 0 0 260px;

  overflow: hidden;

  background:
    radial-gradient(
      circle at center,
      #ffffff 0%,
      #f8fafc 65%,
      #edf2f6 100%
    );

}


.product-image {

  width: 100%;

  height: 100%;

  display: block;

  padding: 20px 25px;

  object-fit: contain;

  transition:
    transform 0.3s ease;

}


.product-card:hover .product-image {

  transform: scale(1.035);

}


/* =========================================================
   IMAGE CORNERS
========================================================= */

.image-corner {

  position: absolute;

  z-index: 2;

  width: 25px;

  height: 25px;

  pointer-events: none;

}


.image-corner-left {

  top: 15px;

  left: 15px;

  border-top: 1px solid #b7c9d9;

  border-left: 1px solid #b7c9d9;

}


.image-corner-right {

  top: 15px;

  right: 15px;

  border-top: 1px solid #b7c9d9;

  border-right: 1px solid #b7c9d9;

}


/* =========================================================
   PRODUCT INFORMATION
========================================================= */

.product-info {

  display: flex;

  flex-direction: column;

  flex: 1 1 auto;

  min-width: 0;

  min-height: 215px;

  padding: 22px;

  background: var(--primary);

  color: #ffffff;

}


.product-brand {

  display: block;

  margin-bottom: 7px;

  overflow: hidden;

  color: var(--gold);

  font-size: 0.58rem;

  font-weight: 800;

  line-height: 1.4;

  letter-spacing: 1.25px;

  text-transform: uppercase;

  text-overflow: ellipsis;

  white-space: nowrap;

}


.product-info h3 {

  margin: 0;

  color: #ffffff;

  font-size: 1.12rem;

  font-weight: 800;

  line-height: 1.3;

  letter-spacing: -0.2px;

  overflow-wrap: anywhere;

}


.product-title {

  margin: 6px 0 0;

  color: rgba(255, 255, 255, 0.78);

  font-size: 0.76rem;

  font-weight: 500;

  line-height: 1.55;

}


/* =========================================================
   PRODUCT TYPE
========================================================= */

.product-type {

  display: inline-flex;

  align-items: center;

  align-self: flex-start;

  gap: 7px;

  max-width: 100%;

  margin-top: 13px;

  padding: 6px 9px;

  border: 1px solid rgba(255, 255, 255, 0.25);

  border-radius: 5px;

  background: rgba(255, 255, 255, 0.10);

  color: rgba(255, 255, 255, 0.90);

  font-size: 0.58rem;

  font-weight: 700;

  line-height: 1.2;

}


.product-type span {

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

}


.product-type i {

  flex: 0 0 auto;

  color: var(--gold);

  font-size: 0.65rem;

}


/* =========================================================
   DESCRIPTION
========================================================= */

.product-description {

  margin: 13px 0 0;

  color: rgba(255, 255, 255, 0.70);

  font-size: 0.72rem;

  line-height: 1.65;

  display: -webkit-box;

  -webkit-line-clamp: 3;

  -webkit-box-orient: vertical;

  overflow: hidden;

}


/* =========================================================
   VIEW DETAILS
========================================================= */

.product-link {

  display: inline-flex;

  align-items: center;

  align-self: flex-start;

  gap: 8px;

  margin-top: auto;

  padding: 17px 0 0;

  border: 0;

  outline: none;

  background: transparent;

  color: #ffffff;

  font-family: inherit;

  font-size: 0.68rem;

  font-weight: 750;

  cursor: pointer;

  transition:
    color 0.2s ease,
    gap 0.2s ease;

}


.product-link i {

  font-size: 0.75rem;

  transition:
    transform 0.2s ease;

}


.product-link:hover {

  gap: 12px;

  color: #ffffff;

}


.product-link:hover i {

  transform: translateX(4px);

}


/* =========================================================
   LOADING / EMPTY / ERROR
========================================================= */

.loading-container,
.empty-container,
.error-container,
.filter-empty {

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  min-height: 320px;

  padding: 50px;

  text-align: center;

}


.loading-container .spinner-border {

  width: 35px;

  height: 35px;

  margin-bottom: 15px;

  color: var(--primary);

}


.loading-container p,
.empty-container p,
.error-container p,
.filter-empty p {

  max-width: 500px;

  margin: 9px 0 0;

  color: var(--muted);

  font-size: 0.78rem;

  line-height: 1.75;

}


.empty-container i,
.error-container > i,
.filter-empty > i {

  margin-bottom: 17px;

  color: var(--primary);

  font-size: 2.5rem;

}


.empty-container h3,
.error-container h3,
.filter-empty h3 {

  margin: 0;

  color: var(--dark);

  font-size: 1.25rem;

  font-weight: 750;

}


/* =========================================================
   BUTTON
========================================================= */

.public-button {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  margin-top: 21px;

  min-height: 42px;

  padding: 10px 17px;

  border: 1px solid var(--primary);

  border-radius: 7px;

  background: var(--primary);

  color: #ffffff;

  font-family: inherit;

  font-size: 0.68rem;

  font-weight: 750;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    border-color 0.2s ease;

}


.public-button:hover {

  background: var(--primary-dark);

  border-color: var(--primary-dark);

  transform: translateY(-2px);

}


/* =========================================================
   PRODUCT MODAL BACKDROP
========================================================= */

.product-modal-backdrop {

  position: fixed;

  inset: 0;

  z-index: 9999;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 30px;

  background:
    radial-gradient(
      circle at 50% 20%,
      rgba(27, 94, 140, 0.16),
      transparent 42%
    ),
    rgba(8, 20, 32, 0.82);

  backdrop-filter: blur(12px);

  -webkit-backdrop-filter: blur(12px);

  animation:
    modalBackdropIn 0.25s ease-out;

}


/* =========================================================
   MODAL
========================================================= */

.product-modal {

  position: relative;

  width: min(
    1120px,
    calc(100vw - 60px)
  );

  max-height:
    calc(100vh - 60px);

  overflow: hidden;

  border: 1px solid rgba(255, 255, 255, 0.35);

  border-radius: 14px;

  background: #ffffff;

  box-shadow:
    0 35px 90px rgba(0, 0, 0, 0.30),
    0 10px 35px rgba(15, 23, 42, 0.15);

  animation:
    modalPremiumIn
    0.3s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    );

}


.product-modal::before {

  content: "";

  position: absolute;

  top: 0;

  left: 0;

  z-index: 30;

  width: 100%;

  height: 3px;

  background:
    linear-gradient(
      90deg,
      #1b5e8c 0%,
      #efaf42 50%,
      #1b5e8c 100%
    );

}


/* =========================================================
   MODAL CLOSE
========================================================= */

.product-modal-close {

  position: absolute;

  top: 18px;

  right: 18px;

  z-index: 50;

  width: 40px;

  height: 40px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: 1px solid #dce3ea;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.96);

  color: #526273;

  font-size: 0.8rem;

  cursor: pointer;

  box-shadow:
    0 5px 18px rgba(15, 23, 42, 0.10);

  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.25s ease;

}


.product-modal-close:hover {

  background: #1b5e8c;

  border-color: #1b5e8c;

  color: #ffffff;

  transform: rotate(90deg);

}


/* =========================================================
   MODAL BODY
========================================================= */

.product-modal-body {

  display: grid;

  grid-template-columns:
    minmax(390px, 0.92fr)
    minmax(430px, 1.08fr);

  width: 100%;

  height:
    min(
      720px,
      calc(100vh - 60px)
    );

  max-height:
    calc(100vh - 60px);

  overflow: hidden;

  min-height: 0;

}


/* =========================================================
   MODAL GALLERY
========================================================= */

.product-modal-gallery {

  position: relative;

  min-width: 0;

  min-height: 0;

  padding: 34px;

  background:
    radial-gradient(
      circle at 50% 35%,
      #ffffff 0%,
      #f8fafc 55%,
      #edf3f7 100%
    );

  border-right: 1px solid #e1e7ed;

  overflow-y: auto;

  overflow-x: hidden;

  scrollbar-width: thin;

  scrollbar-color:
    #cbd5dc
    #f5f7f9;

}


.product-modal-gallery::before {

  content: "";

  position: absolute;

  inset: 0;

  pointer-events: none;

  opacity: 0.5;

  background-image:
    linear-gradient(
      rgba(27, 94, 140, 0.035) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(27, 94, 140, 0.035) 1px,
      transparent 1px
    );

  background-size: 45px 45px;

}


.product-modal-gallery::after {

  content: "PRODUCT VIEW";

  position: absolute;

  top: 22px;

  left: 27px;

  z-index: 2;

  color: #9aa6af;

  font-size: 0.50rem;

  font-weight: 800;

  letter-spacing: 1.8px;

}


/* =========================================================
   MAIN IMAGE
========================================================= */

.product-main-image {

  position: relative;

  z-index: 2;

  width: 100%;

  height: 370px;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;

  border: 1px solid #dce5eb;

  border-radius: 11px;

  background:
    radial-gradient(
      circle at center,
      #ffffff 0%,
      #fbfcfd 62%,
      #f1f5f8 100%
    );

  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.8),
    0 12px 30px rgba(15, 23, 42, 0.06);

}


.product-main-image::before,
.product-main-image::after {

  content: "";

  position: absolute;

  width: 32px;

  height: 32px;

  pointer-events: none;

}


.product-main-image::before {

  top: 16px;

  left: 16px;

  border-top:
    1px solid
    rgba(27, 94, 140, 0.35);

  border-left:
    1px solid
    rgba(27, 94, 140, 0.35);

}


.product-main-image::after {

  right: 16px;

  bottom: 16px;

  border-right:
    1px solid
    rgba(27, 94, 140, 0.35);

  border-bottom:
    1px solid
    rgba(27, 94, 140, 0.35);

}


.product-main-image img {

  position: relative;

  z-index: 3;

  width: 100%;

  height: 100%;

  padding: 28px;

  object-fit: contain;

  filter:
    drop-shadow(
      0 22px 25px
      rgba(15, 23, 42, 0.15)
    );

  transition:
    transform
    0.45s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    );

}


.product-main-image:hover img {

  transform: scale(1.045);

}


/* =========================================================
   THUMBNAILS
========================================================= */

.product-thumbnails {

  position: relative;

  z-index: 5;

  display: flex;

  flex-wrap: wrap;

  gap: 9px;

  margin-top: 16px;

  padding: 2px;

}


.product-thumbnail {

  position: relative;

  width: 64px;

  height: 64px;

  flex: 0 0 64px;

  padding: 4px;

  overflow: hidden;

  border: 1px solid #dce3ea;

  border-radius: 8px;

  background: #ffffff;

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

}


.product-thumbnail:hover {

  border-color: #a8bfd1;

  transform: translateY(-3px);

  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.10);

}


.product-thumbnail.active {

  border: 2px solid #1b5e8c;

  box-shadow:
    0 6px 18px
    rgba(27, 94, 140, 0.18);

}


.product-thumbnail img {

  width: 100%;

  height: 100%;

  object-fit: contain;

}


/* =========================================================
   MODAL DETAILS
========================================================= */

.product-modal-details {

  position: relative;

  min-width: 0;

  min-height: 0;

  height: 100%;

  padding: 40px 42px 55px;

  background: #ffffff;

  overflow-y: auto;

  overflow-x: hidden;

  overscroll-behavior: contain;

  scroll-behavior: smooth;

  scrollbar-width: thin;

  scrollbar-color:
    #cbd5dc
    #f5f7f9;

}


/* =========================================================
   SCROLLBAR
========================================================= */

.product-modal-details::-webkit-scrollbar,
.product-modal-gallery::-webkit-scrollbar {

  width: 6px;

}


.product-modal-details::-webkit-scrollbar-track,
.product-modal-gallery::-webkit-scrollbar-track {

  background: #f5f7f9;

}


.product-modal-details::-webkit-scrollbar-thumb,
.product-modal-gallery::-webkit-scrollbar-thumb {

  border-radius: 10px;

  background: #cbd5dc;

}


.product-modal-details::-webkit-scrollbar-thumb:hover,
.product-modal-gallery::-webkit-scrollbar-thumb:hover {

  background: #aebbc5;

}


/* =========================================================
   MODAL BRAND
========================================================= */

.modal-product-brand {

  display: inline-flex;

  align-items: center;

  gap: 8px;

  margin-bottom: 10px;

  color: #1b5e8c;

  font-size: 0.59rem;

  font-weight: 800;

  letter-spacing: 1.7px;

  text-transform: uppercase;

}


.modal-product-brand::before {

  content: "";

  width: 23px;

  height: 2px;

  background: #efaf42;

}


/* =========================================================
   MODAL TITLE
========================================================= */

.modal-product-title {

  max-width: 620px;

  margin: 0;

  color: #162536;

  font-size:
    clamp(
      1.65rem,
      2.5vw,
      2.25rem
    );

  font-weight: 800;

  line-height: 1.18;

  letter-spacing: -0.8px;

}


.modal-product-subtitle {

  max-width: 610px;

  margin: 10px 0 0;

  color: #687786;

  font-size: 0.82rem;

  line-height: 1.75;

}


.modal-product-title::after {

  content: "";

  display: block;

  width: 48px;

  height: 3px;

  margin-top: 18px;

  border-radius: 4px;

  background: #efaf42;

}


/* =========================================================
   BASIC INFORMATION
========================================================= */

.product-basic-info {

  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 10px;

  margin-top: 28px;

}


.basic-info-item {

  position: relative;

  min-width: 0;

  padding: 13px 14px;

  overflow: hidden;

  border: 1px solid #e1e7ed;

  border-radius: 8px;

  background:
    linear-gradient(
      135deg,
      #ffffff,
      #f8fafc
    );

  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

}


.basic-info-item:hover {

  border-color: #c8d9e6;

  transform: translateY(-2px);

  box-shadow:
    0 7px 20px
    rgba(15, 23, 42, 0.06);

}


.basic-info-item::before {

  content: "";

  position: absolute;

  left: 0;

  top: 0;

  width: 3px;

  height: 100%;

  background: #1b5e8c;

}


.basic-info-item span {

  display: block;

  margin-bottom: 5px;

  color: #8a969f;

  font-size: 0.52rem;

  font-weight: 800;

  letter-spacing: 0.9px;

  text-transform: uppercase;

}


.basic-info-item strong {

  display: block;

  color: #162536;

  font-size: 0.71rem;

  font-weight: 700;

  line-height: 1.4;

  overflow-wrap: anywhere;

}


/* =========================================================
   MODAL SECTIONS
========================================================= */

.modal-detail-section {

  position: relative;

  margin-top: 30px;

  padding-top: 22px;

  border-top: 1px solid #e8edf2;

}


.modal-detail-section h3 {

  display: flex;

  align-items: center;

  gap: 10px;

  margin: 0 0 14px;

  color: #162536;

  font-size: 0.90rem;

  font-weight: 800;

}


.modal-detail-section h3::before {

  content: "";

  width: 4px;

  height: 18px;

  border-radius: 3px;

  background: #1b5e8c;

}


.modal-detail-section > p {

  margin: 0;

  color: #687786;

  font-size: 0.75rem;

  line-height: 1.85;

}


/* =========================================================
   SPECIFICATIONS
========================================================= */

.specifications-table {

  overflow: hidden;

  border: 1px solid #e1e7ed;

  border-radius: 8px;

  background: #ffffff;

}


.specification-row {

  display: grid;

  grid-template-columns:
    minmax(140px, 0.75fr)
    minmax(0, 1.25fr);

  border-bottom: 1px solid #e8edf2;

  transition:
    background 0.2s ease;

}


.specification-row:last-child {

  border-bottom: 0;

}


.specification-row:hover {

  background: #f8fbfd;

}


.specification-name,
.specification-value {

  min-width: 0;

  padding: 11px 13px;

  font-size: 0.66rem;

  line-height: 1.55;

}


.specification-name {

  background: #f7f9fb;

  color: #526273;

  font-weight: 750;

}


.specification-value {

  color: #162536;

  font-weight: 550;

  overflow-wrap: anywhere;

}


/* =========================================================
   FEATURES
========================================================= */

.product-features {

  display: flex;

  flex-direction: column;

  gap: 10px;

  margin: 0;

  padding: 0;

  list-style: none;

}


.product-features li {

  display: flex;

  align-items: flex-start;

  gap: 10px;

  color: #526273;

  font-size: 0.70rem;

  line-height: 1.65;

}


.product-features li i {

  flex: 0 0 auto;

  width: 20px;

  height: 20px;

  display: flex;

  align-items: center;

  justify-content: center;

  margin-top: 1px;

  border-radius: 50%;

  background: #edf5fc;

  color: #1b5e8c;

  font-size: 0.55rem;

}


/* =========================================================
   DOCUMENTS
========================================================= */

.product-documents {

  display: flex;

  flex-direction: column;

  gap: 8px;

}


.product-document {

  display: flex;

  align-items: center;

  gap: 11px;

  min-width: 0;

  padding: 12px 14px;

  border: 1px solid #e1e7ed;

  border-radius: 8px;

  background: #fafbfc;

  color: #526273;

  text-decoration: none;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

}


.product-document:hover {

  border-color: #c6d8e6;

  background: #edf5fc;

  color: #1b5e8c;

  transform: translateX(4px);

  box-shadow:
    0 5px 15px
    rgba(27, 94, 140, 0.07);

}


.product-document > i:first-child {

  flex: 0 0 auto;

  color: #d9534f;

  font-size: 1rem;

}


.product-document span {

  min-width: 0;

  flex: 1;

  overflow: hidden;

  color: inherit;

  font-size: 0.67rem;

  font-weight: 650;

  text-overflow: ellipsis;

  white-space: nowrap;

}


.product-document > i:last-child {

  flex: 0 0 auto;

  color: #9aa6af;

  font-size: 0.65rem;

}


/* =========================================================
   ANIMATIONS
========================================================= */

@keyframes modalBackdropIn {

  from {

    opacity: 0;

  }

  to {

    opacity: 1;

  }

}


@keyframes modalPremiumIn {

  from {

    opacity: 0;

    transform:
      translateY(25px)
      scale(0.97);

  }

  to {

    opacity: 1;

    transform:
      translateY(0)
      scale(1);

  }

}


/* =========================================================
   FOCUS
========================================================= */

.product-link:focus-visible,
.category-filter:focus-visible,
.company-selector-trigger:focus-visible,
.product-modal-close:focus-visible,
.product-thumbnail:focus-visible,
.public-button:focus-visible,
.reset-filter:focus-visible {

  outline: 2px solid var(--primary);

  outline-offset: 3px;

}


/* =========================================================
   LARGE TABLET
   1050px
========================================================= */

@media (max-width: 1050px) {

  .products-content {

    padding-left: 20px;
    padding-right: 20px;

  }


  .products-grid {

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 20px;

  }


  .product-image-wrapper {

    height: 250px;

    flex-basis: 250px;

  }


  .product-modal-backdrop {

    padding: 24px;

  }


  .product-modal {

    width:
      min(
        980px,
        calc(100vw - 48px)
      );

    max-height:
      calc(100vh - 48px);

  }


  .product-modal-body {

    grid-template-columns:
      minmax(330px, 0.9fr)
      minmax(390px, 1.1fr);

    height:
      min(
        680px,
        calc(100vh - 48px)
      );

    max-height:
      calc(100vh - 48px);

  }


  .product-modal-gallery {

    padding: 28px;

  }


  .product-modal-details {

    padding: 34px 32px 50px;

  }


  .product-main-image {

    height: 330px;

  }


  .modal-product-title {

    font-size: 2rem;

  }

}


/* =========================================================
   TABLET
   900px
========================================================= */

@media (max-width: 900px) {

  .products-content {

    padding:
      60px
      16px
      75px;

  }


  .products-filter {

    margin-bottom: 45px;

  }


  .products-grid {

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 18px;

  }


  .product-image-wrapper {

    height: 235px;

    flex-basis: 235px;

  }


  .product-info {

    min-height: 200px;

    padding: 20px;

  }


  .product-modal-backdrop {

    padding: 20px;

  }


  .product-modal {

    width:
      min(
        860px,
        calc(100vw - 40px)
      );

    max-height:
      calc(100vh - 40px);

  }


  .product-modal-body {

    grid-template-columns:
      minmax(300px, 0.9fr)
      minmax(350px, 1.1fr);

    height:
      min(
        650px,
        calc(100vh - 40px)
      );

    max-height:
      calc(100vh - 40px);

  }


  .product-modal-gallery {

    padding: 25px;

  }


  .product-modal-details {

    padding: 32px 28px 45px;

  }


  .product-main-image {

    height: 300px;

  }


  .product-thumbnail {

    width: 58px;

    height: 58px;

    flex-basis: 58px;

  }

}


/* =========================================================
   MOBILE
   <= 767px

   IMPORTANT:
   ONE PRODUCT PER ROW
========================================================= */

@media (max-width: 767px) {

  .products-page {

    width: 100%;

    max-width: 100%;

    overflow-x: hidden;

  }


  .products-header {

    min-height: 440px;

  }


  .products-header-content {

    padding:
      32px
      0
      45px;

  }


  .products-page .breadcrumb {

    margin-bottom: 20px;

    gap: 6px;

    font-size: 0.58rem;

  }


  .product-company-selector {

    width: 100%;

    margin-bottom: 28px;

  }


  .company-selector-trigger {

    width: 100%;

    max-width: 100%;

    padding: 0 13px;

    font-size: 0.62rem;

  }


  .product-company-menu {

    width: 310px;

    max-width:
      calc(100vw - 20px);

  }


  .header-content {

    width: 100%;

    max-width: 100%;

  }


  .header-content h1 {

    max-width: 100%;

    font-size:
      clamp(
        2.1rem,
        9vw,
        2.8rem
      );

    letter-spacing: -1px;

    overflow-wrap: anywhere;

  }


  .header-content p {

    max-width: 100%;

    font-size: 0.76rem;

    line-height: 1.7;

  }


  /* =====================================================
     PRODUCT CONTENT
  ====================================================== */

  .products-content {

    width: 100%;

    max-width: 100%;

    padding:
      38px
      8px
      55px;

    overflow-x: hidden;

  }


  .products-browser {

    width: 100%;

    max-width: 100%;

  }


  /* =====================================================
     FILTER
  ====================================================== */

  .products-filter {

    width: 100%;

    max-width: 100%;

    padding: 16px;

    margin-bottom: 32px;

  }


  .filter-heading {

    flex-direction: column;

    align-items: flex-start;

    gap: 12px;

    margin-bottom: 18px;

  }


  .filter-heading-left {

    width: 100%;

  }


  .filter-total {

    padding-left: 0;

  }


  .category-filters {

    width: 100%;

    flex-direction: column;

    align-items: stretch;

    gap: 7px;

  }


  .category-filter {

    width: 100%;

    min-width: 0;

    justify-content: flex-start;

  }


  /* =====================================================
     CATEGORY
  ====================================================== */

  .category-section {

    width: 100%;

    margin-bottom: 48px;

  }


  .category-header {

    width: 100%;

    align-items: flex-start;

    gap: 10px;

    margin-bottom: 18px;

    padding-bottom: 13px;

  }


  .category-title {

    min-width: 0;

    flex: 1;

    gap: 9px;

  }


  .category-number {

    font-size: 1.35rem;

  }


  .category-title h2 {

    font-size: 1.05rem;

    line-height: 1.3;

    overflow-wrap: anywhere;

  }


  .category-label {

    margin-bottom: 3px;

    font-size: 0.50rem;

  }


  .category-count {

    font-size: 0.9rem;

  }


  .category-count span {

    display: none;

  }


  /* =====================================================
     PRODUCT GRID

     ONE CARD ONLY
  ====================================================== */

  .products-grid {

    display: grid;

    grid-template-columns:
      minmax(0, 1fr);

    width: 100%;

    max-width: 100%;

    gap: 14px;

    margin: 0;

    padding: 0;

  }


  /* =====================================================
     PRODUCT CARD
  ====================================================== */

  .product-card {

    width: 100%;

    max-width: 100%;

    min-width: 0;

    margin: 0;

    border-radius: 8px;

  }


  .product-card:hover {

    transform: none;

  }


  /* =====================================================
     PRODUCT IMAGE
  ====================================================== */

  .product-image-wrapper {

    width: 100%;

    height: 230px;

    flex-basis: 230px;

  }


  .product-image {

    width: 100%;

    height: 100%;

    padding:
      12px
      20px;

  }


  .image-corner {

    width: 20px;

    height: 20px;

  }


  .image-corner-left {

    top: 12px;

    left: 12px;

  }


  .image-corner-right {

    top: 12px;

    right: 12px;

  }


  /* =====================================================
     PRODUCT INFO
  ====================================================== */

  .product-info {

    width: 100%;

    min-width: 0;

    min-height: auto;

    padding: 17px;

  }


  .product-brand {

    font-size: 0.54rem;

    margin-bottom: 6px;

  }


  .product-info h3 {

    font-size: 1rem;

    line-height: 1.35;

  }


  .product-title {

    font-size: 0.72rem;

    line-height: 1.5;

  }


  .product-type {

    margin-top: 10px;

  }


  .product-description {

    margin-top: 10px;

    font-size: 0.68rem;

    line-height: 1.6;

  }


  .product-link {

    padding-top: 14px;

    font-size: 0.65rem;

  }


  /* =====================================================
     MODAL
  ====================================================== */

  .product-modal-backdrop {

    padding: 10px;

    align-items: center;

    justify-content: center;

  }


  .product-modal {

    width:
      calc(100vw - 20px);

    max-width: 680px;

    max-height:
      calc(100vh - 20px);

    border-radius: 10px;

  }


  .product-modal-body {

    display: block;

    width: 100%;

    height: auto;

    max-height:
      calc(100vh - 20px);

    overflow-y: auto;

    overflow-x: hidden;

    -webkit-overflow-scrolling: touch;

  }


  .product-modal-gallery {

    width: 100%;

    padding:
      20px
      16px
      18px;

    border-right: 0;

    border-bottom:
      1px solid
      #e1e7ed;

    overflow: visible;

  }


  .product-modal-gallery::after {

    top: 14px;

    left: 18px;

  }


  .product-main-image {

    width: 100%;

    height: 245px;

  }


  .product-main-image img {

    padding: 18px;

  }


  .product-thumbnails {

    gap: 7px;

  }


  .product-thumbnail {

    width: 56px;

    height: 56px;

    flex-basis: 56px;

  }


  .product-modal-details {

    width: 100%;

    height: auto;

    min-height: 0;

    padding:
      25px
      17px
      60px;

    overflow: visible;

  }


  .product-modal-close {

    top: 10px;

    right: 10px;

    width: 36px;

    height: 36px;

  }


  .modal-product-title {

    font-size: 1.50rem;

    padding-right: 35px;

  }


  .modal-product-subtitle {

    font-size: 0.72rem;

  }


  .product-basic-info {

    grid-template-columns: 1fr;

    gap: 8px;

  }


  .modal-detail-section {

    margin-top: 25px;

  }


  .specification-row {

    grid-template-columns: 1fr;

  }


  .specification-name {

    padding-bottom: 6px;

    border-bottom:
      1px solid
      var(--border-light);

  }


  .specification-value {

    padding-top: 7px;

  }

}


/* =========================================================
   SMALL MOBILE
   <= 575px
========================================================= */

@media (max-width: 575px) {

  .products-header {

    min-height: 410px;

  }


  .products-header-content {

    padding:
      25px
      0
      38px;

  }


  .products-page .breadcrumb {

    margin-bottom: 17px;

    font-size: 0.54rem;

  }


  .product-company-selector {

    margin-bottom: 22px;

  }


  .company-selector-trigger {

    min-height: 40px;

    font-size: 0.59rem;

  }


  .product-company-menu {

    width: 290px;

    max-width:
      calc(100vw - 16px);

    padding: 14px;

  }


  .header-content h1 {

    font-size: 2.25rem;

  }


  .header-content p {

    font-size: 0.72rem;

  }


  .products-content {

    padding:
      30px
      6px
      48px;

  }


  .products-filter {

    padding: 13px;

    margin-bottom: 28px;

    border-radius: 8px;

  }


  .filter-icon-large {

    width: 40px;

    height: 40px;

    flex-basis: 40px;

  }


  .category-section {

    margin-bottom: 42px;

  }


  .category-header {

    margin-bottom: 15px;

  }


  .category-number {

    font-size: 1.2rem;

  }


  .category-title h2 {

    font-size: 0.98rem;

  }


  .products-grid {

    gap: 12px;

  }


  .product-image-wrapper {

    height: 210px;

    flex-basis: 210px;

  }


  .product-image {

    padding:
      10px
      15px;

  }


  .product-info {

    padding: 15px;

  }


  .product-info h3 {

    font-size: 0.94rem;

  }


  .product-title {

    font-size: 0.69rem;

  }


  .product-description {

    font-size: 0.65rem;

  }


  .product-type {

    font-size: 0.54rem;

    padding:
      5px
      8px;

  }


  /* =====================================================
     SMALL MODAL
  ====================================================== */

  .product-modal-backdrop {

    padding: 8px;

  }


  .product-modal {

    width:
      calc(100vw - 16px);

    max-height:
      calc(100vh - 16px);

    border-radius: 9px;

  }


  .product-modal-body {

    max-height:
      calc(100vh - 16px);

  }


  .product-modal-gallery {

    padding:
      18px
      14px
      16px;

  }


  .product-main-image {

    height: 225px;

  }


  .product-main-image img {

    padding: 15px;

  }


  .product-thumbnail {

    width: 52px;

    height: 52px;

    flex-basis: 52px;

  }


  .product-modal-details {

    padding:
      23px
      14px
      60px;

  }


  .modal-product-title {

    font-size: 1.38rem;

  }


  .modal-product-subtitle {

    font-size: 0.68rem;

  }


  .basic-info-item {

    padding: 11px;

  }


  .specification-name,
  .specification-value {

    padding:
      8px
      10px;

    font-size: 0.61rem;

  }

}


/* =========================================================
   VERY SMALL MOBILE
   <= 400px
========================================================= */

@media (max-width: 400px) {

  .products-header {

    min-height: 390px;

  }


  .products-header-content {

    padding:
      22px
      0
      32px;

  }


  .header-content h1 {

    font-size: 2rem;

  }


  .products-content {

    padding:
      26px
      5px
      42px;

  }


  .products-filter {

    padding: 11px;

    margin-bottom: 24px;

  }


  .filter-heading-left {

    gap: 10px;

  }


  .filter-icon-large {

    width: 37px;

    height: 37px;

    flex-basis: 37px;

    font-size: 0.85rem;

  }


  .category-section {

    margin-bottom: 35px;

  }


  .category-header {

    gap: 7px;

  }


  .category-number {

    font-size: 1.08rem;

  }


  .category-title {

    gap: 7px;

  }


  .category-title h2 {

    font-size: 0.92rem;

  }


  .category-count {

    font-size: 0.78rem;

  }


  .products-grid {

    gap: 10px;

  }


  .product-image-wrapper {

    height: 195px;

    flex-basis: 195px;

  }


  .product-image {

    padding:
      8px
      12px;

  }


  .product-info {

    padding: 13px;

  }


  .product-info h3 {

    font-size: 0.88rem;

  }


  .product-title {

    font-size: 0.66rem;

  }


  .product-description {

    font-size: 0.62rem;

    line-height: 1.55;

  }


  .product-link {

    padding-top: 12px;

    font-size: 0.62rem;

  }


  /* =====================================================
     VERY SMALL MODAL
  ====================================================== */

  .product-modal-backdrop {

    padding: 6px;

  }


  .product-modal {

    width:
      calc(100vw - 12px);

    max-height:
      calc(100vh - 12px);

    border-radius: 8px;

  }


  .product-modal-body {

    max-height:
      calc(100vh - 12px);

  }


  .product-modal-gallery {

    padding: 15px 12px 14px;

  }


  .product-main-image {

    height: 205px;

  }


  .product-main-image img {

    padding: 12px;

  }


  .product-modal-details {

    padding:
      20px
      12px
      55px;

  }


  .modal-product-title {

    font-size: 1.25rem;

  }


  .modal-product-subtitle {

    font-size: 0.65rem;

  }


  .product-thumbnail {

    width: 48px;

    height: 48px;

    flex-basis: 48px;

  }


  .basic-info-item {

    padding: 10px;

  }


  .basic-info-item span {

    font-size: 0.48rem;

  }


  .basic-info-item strong {

    font-size: 0.66rem;

  }


  .specification-name,
  .specification-value {

    padding:
      8px
      9px;

    font-size: 0.59rem;

  }

}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media (prefers-reduced-motion: reduce) {

  .product-modal-backdrop,
  .product-modal,
  .product-main-image img,
  .product-thumbnail,
  .product-modal-close,
  .basic-info-item,
  .product-document,
  .product-card {

    animation: none;

    transition: none;

  }


  .product-modal-details {

    scroll-behavior: auto;

  }


  .product-main-image:hover img {

    transform: none;

  }

}

</style>
```
