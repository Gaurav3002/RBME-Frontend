```vue
<template>
    <div class="container-fluid">

        <!-- =====================================================
             HEADER
        ====================================================== -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h3 class="mb-1">
                    Product Management
                </h3>
                <p class="text-muted mb-0">
                    Manage all products.
                </p>
            </div>

            <button
                type="button"
                class="btn btn-primary"
                @click="openCreateModal"
            >
                <i class="bi bi-plus-circle me-1"></i>
                Add Product
            </button>
        </div>

        <!-- =====================================================
             SEARCH
        ====================================================== -->
        <div class="card admin-card shadow-sm mb-3">
            <div class="card-body">
                <input
                    type="text"
                    class="form-control admin-form-control"
                    placeholder="Search product..."
                    v-model="search"
                />
            </div>
        </div>

        <!-- =====================================================
             PRODUCT TABLE
        ====================================================== -->
        <div class="card admin-card shadow-sm">
            <div class="card-body table-responsive">

                <table class="table admin-table table-hover align-middle">

                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Company</th>
                            <th>Category</th>
                            <th>Product Type</th>
                            <th>Model No</th>
                            <th>Title</th>
                            <th>Featured</th>
                            <th>Status</th>
                            <th width="170">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        <!-- PRODUCTS -->
                        <tr
                            v-for="product in filteredProducts"
                            :key="product.id"
                        >

                            <!-- IMAGE -->
                            <td>
                                <img
                                    v-if="getProductImage(product)"
                                    :src="getImageUrl(getProductImage(product))"
                                    class="product-table-image"
                                    alt="Product"
                                    @error="handleImageError"
                                />

                                <div
                                    v-else
                                    class="no-product-image"
                                >
                                    <i class="bi bi-image"></i>
                                </div>
                            </td>

                            <!-- COMPANY -->
                            <td>
                                {{ product.companyName || "-" }}
                            </td>

                            <!-- CATEGORY -->
                            <td>
                                {{ product.categoryName || "-" }}
                            </td>

                            <!-- PRODUCT TYPE -->
                            <td>
                                {{ product.productTypeName || "-" }}
                            </td>

                            <!-- MODEL -->
                            <td>
                                {{ product.modelNo || "-" }}
                            </td>

                            <!-- TITLE -->
                            <td>
                                {{ product.title || "-" }}
                            </td>

                            <!-- FEATURED -->
                            <td>
                                <span
                                    class="badge"
                                    :class="
                                        product.featured
                                            ? 'bg-success'
                                            : 'bg-secondary'
                                    "
                                >
                                    {{ product.featured ? "Yes" : "No" }}
                                </span>
                            </td>

                            <!-- STATUS -->
                            <td>
                                <span
                                    class="badge"
                                    :class="
                                        product.active
                                            ? 'bg-success'
                                            : 'bg-danger'
                                    "
                                >
                                    {{ product.active ? "Active" : "Inactive" }}
                                </span>
                            </td>

                            <!-- ACTIONS -->
                            <td>
                                <button
                                    type="button"
                                    class="btn admin-action-button btn-warning me-2"
                                    @click="editProduct(product)"
                                    title="Edit Product"
                                >
                                    <i class="bi bi-pencil"></i>
                                </button>

                                <button
                                    type="button"
                                    class="btn admin-action-button btn-danger"
                                    @click="deleteProductById(product.id)"
                                    title="Delete Product"
                                >
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>

                        </tr>

                        <!-- EMPTY -->
                        <tr v-if="filteredProducts.length === 0">
                            <td
                                colspan="9"
                                class="text-center text-muted py-4"
                            >
                                <i class="bi bi-box-seam fs-3 d-block mb-2"></i>
                                No Product Found
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>
        </div>

        <!-- =====================================================
             PRODUCT MODAL
        ====================================================== -->
        <BaseModal
            ref="modalRef"
            id="productModal"
            :title="editMode ? 'Edit Product' : 'Add Product'"
            size="lg"
            :draggable="true"
        >

            <div class="row">

                <!-- COMPANY -->
                <div class="col-md-4 mb-3">
                    <label class="form-label">
                        Company
                        <span class="text-danger">*</span>
                    </label>

                    <select
                        class="form-select"
                        v-model="form.companyId"
                        @change="onCompanyChange"
                    >
                        <option :value="null">
                            Select Company
                        </option>

                        <option
                            v-for="company in companies"
                            :key="company.id"
                            :value="company.id"
                        >
                            {{ company.name }}
                        </option>
                    </select>
                </div>

                <!-- CATEGORY -->
                <div class="col-md-4 mb-3">
                    <label class="form-label">
                        Category
                        <span class="text-danger">*</span>
                    </label>

                    <select
                        class="form-select"
                        v-model="form.categoryId"
                        @change="onCategoryChange"
                    >
                        <option :value="null">
                            Select Category
                        </option>

                        <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                        >
                            {{ category.name }}
                        </option>
                    </select>
                </div>

                <!-- PRODUCT TYPE -->
                <div class="col-md-4 mb-3">
                    <label class="form-label">
                        Product Type
                        <span class="text-danger">*</span>
                    </label>

                    <select
                        class="form-select"
                        v-model="form.productTypeId"
                    >
                        <option :value="null">
                            Select Product Type
                        </option>

                        <option
                            v-for="productType in productTypes"
                            :key="productType.id"
                            :value="productType.id"
                        >
                            {{ productType.productTypeName }}
                        </option>
                    </select>
                </div>

                <!-- MODEL NUMBER -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">
                        Model No
                        <span class="text-danger">*</span>
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Model No"
                        v-model="form.modelNo"
                    />
                </div>

                <!-- PRODUCT TITLE -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">
                        Product Title
                        <span class="text-danger">*</span>
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Product Title"
                        v-model="form.title"
                    />
                </div>

                <!-- DESCRIPTION -->
                <div class="col-12 mb-3">
                    <label class="form-label">
                        Description
                    </label>

                    <textarea
                        class="form-control"
                        rows="4"
                        placeholder="Enter Product Description"
                        v-model="form.description"
                    ></textarea>
                </div>

                <!-- THUMBNAIL -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">
                        Thumbnail URL
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Thumbnail URL"
                        v-model="form.thumbnail"
                    />
                </div>

                <!-- YOUTUBE -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">
                        YouTube URL
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter YouTube URL"
                        v-model="form.youtubeUrl"
                    />
                </div>

                <!-- =================================================
                     EXISTING IMAGES
                ================================================== -->
                <div
                    v-if="editMode && existingImages.length > 0"
                    class="col-12 mb-3"
                >

                    <label class="form-label">
                        Existing Product Images
                    </label>

                    <div class="row">

                        <div
                            v-for="image in existingImages"
                            :key="image.id"
                            class="col-md-3 col-sm-4 col-6 mb-3"
                        >

                            <div class="existing-image-card">

                                <img
                                    :src="getImageUrl(image.imageUrl)"
                                    class="existing-product-image"
                                    alt="Product Image"
                                    @error="handleImageError"
                                />

                                <div class="existing-image-order">
                                    Image
                                    {{ (image.sortOrder ?? 0) + 1 }}
                                </div>

                            </div>

                        </div>

                    </div>

                    <small class="text-muted">
                        Existing images will remain unchanged if you
                        don't select new images.
                    </small>

                </div>

                <!-- =================================================
                     PRODUCT IMAGES
                ================================================== -->
                <div class="col-12 mb-3">

                    <label class="form-label">
                        Product Images
                    </label>

                    <input
                        ref="imageInputRef"
                        type="file"
                        class="form-control"
                        multiple
                        accept="image/*"
                        @change="handleImageChange"
                    />

                    <small class="text-muted">
                        You can select multiple product images.

                        <span v-if="editMode">
                            Selecting new images will replace the
                            existing product images.
                        </span>
                    </small>

                    <!-- IMAGE PREVIEWS -->
                    <div
                        v-if="imagePreviews.length > 0"
                        class="row mt-3"
                    >

                        <div
                            v-for="(image, index) in imagePreviews"
                            :key="index"
                            class="col-md-3 col-sm-4 col-6 mb-3"
                        >

                            <div class="image-preview-card">

                                <img
                                    :src="image.url"
                                    class="product-preview-image"
                                    alt="Product Image"
                                />

                                <button
                                    type="button"
                                    class="btn admin-action-button btn-danger remove-image-btn"
                                    @click="removeSelectedImage(index)"
                                    title="Remove Image"
                                >
                                    <i class="bi bi-x"></i>
                                </button>

                                <div class="preview-image-name">
                                    {{ image.file.name }}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <!-- FEATURED -->
                <div class="col-md-6 d-flex align-items-center mb-3">

                    <div class="form-check">

                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="featured"
                            v-model="form.featured"
                        />

                        <label
                            class="form-check-label"
                            for="featured"
                        >
                            Featured
                        </label>

                    </div>

                </div>

                <!-- ACTIVE -->
                <div class="col-md-6 d-flex align-items-center mb-3">

                    <div class="form-check">

                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="active"
                            v-model="form.active"
                        />

                        <label
                            class="form-check-label"
                            for="active"
                        >
                            Active
                        </label>

                    </div>

                </div>

            </div>

            <!-- =====================================================
                 MODAL FOOTER
            ====================================================== -->
            <template #footer>

                <button
                    type="button"
                    class="btn btn-secondary"
                    @click="closeModal"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="btn btn-primary"
                    :disabled="saving"
                    @click="saveProduct"
                >

                    <span
                        v-if="saving"
                        class="spinner-border spinner-border-sm me-1"
                    ></span>

                    <i
                        v-else
                        class="bi bi-check-circle me-1"
                    ></i>

                    {{
                        saving
                            ? "Saving..."
                            : editMode
                                ? "Update Product"
                                : "Save Product"
                    }}

                </button>

            </template>

        </BaseModal>

    </div>
</template>


<script setup>

import {
    ref,
    computed,
    onMounted
} from "vue";

import BaseModal from "@/components/admin/common/BaseModal.vue";

import {
    createProduct,
    updateProduct,
    getProducts,
    deleteProduct
} from "@/api/product.api";

import {
    getCompanies
} from "@/api/company.api";

import {
    getCategoriesByCompany
} from "@/api/category.api";

import {
    getProductTypesByCategory
} from "@/api/productType.api";


// ============================================================
// STATE
// ============================================================

const companies = ref([]);
const categories = ref([]);
const productTypes = ref([]);
const products = ref([]);

const search = ref("");

const editMode = ref(false);
const saving = ref(false);

const modalRef = ref(null);
const imageInputRef = ref(null);

const imagePreviews = ref([]);
const existingImages = ref([]);


// ============================================================
// IMAGE BASE URL
// ============================================================

const API_BASE_URL = (
    import.meta.env.VITE_IMAGE_URL ||
    ""
).replace(/\/+$/, "");


// ============================================================
// FORM
// ============================================================

const form = ref(getEmptyForm());


// ============================================================
// FILTER PRODUCTS
// ============================================================

const filteredProducts = computed(() => {

    const keyword = search.value
        .toLowerCase()
        .trim();

    if (!keyword) {
        return products.value;
    }

    return products.value.filter(product => {

        return (
            (product.title || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (product.modelNo || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (product.companyName || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (product.categoryName || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (product.productTypeName || "")
                .toLowerCase()
                .includes(keyword)
        );

    });

});


// ============================================================
// LOAD COMPANIES
// ============================================================

async function loadCompanies() {

    try {

        const response = await getCompanies();

        companies.value = response.data || [];

    } catch (error) {

        console.error(
            "LOAD COMPANIES ERROR:",
            error
        );

    }

}


// ============================================================
// LOAD PRODUCTS
// ============================================================

async function loadProducts() {

    try {

        const response = await getProducts();

        products.value = response.data || [];

    } catch (error) {

        console.error(
            "LOAD PRODUCTS ERROR:",
            error
        );

    }

}


// ============================================================
// COMPANY CHANGE
// ============================================================

async function onCompanyChange() {

    form.value.categoryId = null;
    form.value.productTypeId = null;

    categories.value = [];
    productTypes.value = [];

    if (!form.value.companyId) {
        return;
    }

    try {

        const response =
            await getCategoriesByCompany(
                form.value.companyId
            );

        categories.value =
            response.data || [];

    } catch (error) {

        console.error(
            "LOAD CATEGORIES ERROR:",
            error
        );

    }

}


// ============================================================
// CATEGORY CHANGE
// ============================================================

async function onCategoryChange() {

    form.value.productTypeId = null;

    productTypes.value = [];

    if (!form.value.categoryId) {
        return;
    }

    try {

        const response =
            await getProductTypesByCategory(
                form.value.categoryId
            );

        productTypes.value =
            response.data || [];

    } catch (error) {

        console.error(
            "LOAD PRODUCT TYPES ERROR:",
            error
        );

    }

}


// ============================================================
// EMPTY FORM
// ============================================================

function getEmptyForm() {

    return {

        id: null,

        companyId: null,

        categoryId: null,

        productTypeId: null,

        modelNo: "",

        title: "",

        description: "",

        thumbnail: "",

        youtubeUrl: "",

        featured: false,

        active: true,

        images: []

    };

}


// ============================================================
// OPEN CREATE MODAL
// ============================================================

function openCreateModal() {

    clearPreviewUrls();

    editMode.value = false;

    existingImages.value = [];

    categories.value = [];
    productTypes.value = [];

    form.value = getEmptyForm();

    if (imageInputRef.value) {
        imageInputRef.value.value = "";
    }

    modalRef.value?.show();

}


// ============================================================
// EDIT PRODUCT
// ============================================================

async function editProduct(product) {

    try {

        clearPreviewUrls();

        editMode.value = true;

        imagePreviews.value = [];

        existingImages.value =
            product.images
                ? [...product.images].sort(
                    (a, b) =>
                        (a.sortOrder ?? 0) -
                        (b.sortOrder ?? 0)
                )
                : [];

        form.value = {

            id: product.id,

            companyId: product.companyId,

            categoryId: null,

            productTypeId: null,

            modelNo: product.modelNo || "",

            title: product.title || "",

            description: product.description || "",

            thumbnail: product.thumbnail || "",

            youtubeUrl: product.youtubeUrl || "",

            featured: product.featured ?? false,

            active: product.active ?? true,

            images: []

        };


        // --------------------------------------------------------
        // LOAD CATEGORIES
        // --------------------------------------------------------

        const categoryResponse =
            await getCategoriesByCompany(
                product.companyId
            );

        categories.value =
            categoryResponse.data || [];

        form.value.categoryId =
            product.categoryId;


        // --------------------------------------------------------
        // LOAD PRODUCT TYPES
        // --------------------------------------------------------

        if (product.categoryId) {

            const typeResponse =
                await getProductTypesByCategory(
                    product.categoryId
                );

            productTypes.value =
                typeResponse.data || [];

        }

        form.value.productTypeId =
            product.productTypeId;


        // --------------------------------------------------------
        // CLEAR FILE INPUT
        // --------------------------------------------------------

        if (imageInputRef.value) {
            imageInputRef.value.value = "";
        }


        // --------------------------------------------------------
        // OPEN MODAL
        // --------------------------------------------------------

        modalRef.value?.show();

    } catch (error) {

        console.error(
            "EDIT PRODUCT ERROR:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Failed to load product."
        );

    }

}


// ============================================================
// IMAGE CHANGE
// ============================================================

function handleImageChange(event) {

    const files =
        Array.from(
            event.target.files || []
        );

    clearPreviewUrls();

    form.value.images = files;

    imagePreviews.value =
        files.map(file => ({

            file: file,

            url: URL.createObjectURL(file)

        }));

}


// ============================================================
// REMOVE SELECTED IMAGE
// ============================================================

function removeSelectedImage(index) {

    const image =
        imagePreviews.value[index];

    if (image?.url) {

        URL.revokeObjectURL(
            image.url
        );

    }

    form.value.images.splice(
        index,
        1
    );

    imagePreviews.value.splice(
        index,
        1
    );


    // --------------------------------------------------------
    // REBUILD FILE INPUT
    // --------------------------------------------------------

    if (imageInputRef.value) {

        const dataTransfer =
            new DataTransfer();

        form.value.images.forEach(file => {

            dataTransfer.items.add(file);

        });

        imageInputRef.value.files =
            dataTransfer.files;

    }

}


// ============================================================
// CLEAR PREVIEW URLS
// ============================================================

function clearPreviewUrls() {

    imagePreviews.value.forEach(image => {

        if (image?.url) {

            URL.revokeObjectURL(
                image.url
            );

        }

    });

    imagePreviews.value = [];

}


// ============================================================
// GET PRODUCT FIRST IMAGE
// ============================================================

function getProductImage(product) {

    if (
        !product ||
        !Array.isArray(product.images) ||
        product.images.length === 0
    ) {

        return null;

    }

    const sortedImages =
        [...product.images].sort(
            (a, b) =>
                (a.sortOrder ?? 0) -
                (b.sortOrder ?? 0)
        );

    return (
        sortedImages[0]?.imageUrl ||
        null
    );

}


// ============================================================
// GET IMAGE URL
// ============================================================

function getImageUrl(imagePath) {

    if (!imagePath) {
        return "";
    }

    // Already complete URL
    if (
        imagePath.startsWith("http://") ||
        imagePath.startsWith("https://") ||
        imagePath.startsWith("data:")
    ) {
        return imagePath;
    }

    // Remove leading slash
    const cleanPath =
        String(imagePath)
            .replace(/^\/+/, "");

    // If VITE_IMAGE_URL is not configured
    if (!API_BASE_URL) {

        console.warn(
            "VITE_IMAGE_URL is not configured."
        );

        return `/${cleanPath}`;

    }

    return `${API_BASE_URL}/${cleanPath}`;

}


// ============================================================
// IMAGE ERROR
// ============================================================

function handleImageError(event) {

    event.target.style.display = "none";

}


// ============================================================
// SAVE PRODUCT
// ============================================================

async function saveProduct() {

    if (saving.value) {
        return;
    }

    try {

        // --------------------------------------------------------
        // VALIDATION
        // --------------------------------------------------------

        if (!form.value.companyId) {

            alert(
                "Please select company."
            );

            return;

        }


        if (!form.value.categoryId) {

            alert(
                "Please select category."
            );

            return;

        }


        if (!form.value.productTypeId) {

            alert(
                "Please select product type."
            );

            return;

        }


        if (
            !form.value.modelNo ||
            !form.value.modelNo.trim()
        ) {

            alert(
                "Model No is required."
            );

            return;

        }


        if (
            !form.value.title ||
            !form.value.title.trim()
        ) {

            alert(
                "Product title is required."
            );

            return;

        }


        saving.value = true;


        // --------------------------------------------------------
        // CREATE FORM DATA
        // --------------------------------------------------------

        const formData =
            new FormData();


        // --------------------------------------------------------
        // PRODUCT DATA
        // --------------------------------------------------------

        formData.append(
            "companyId",
            String(form.value.companyId)
        );

        formData.append(
            "categoryId",
            String(form.value.categoryId)
        );

        formData.append(
            "productTypeId",
            String(form.value.productTypeId)
        );

        formData.append(
            "modelNo",
            form.value.modelNo.trim()
        );

        formData.append(
            "title",
            form.value.title.trim()
        );

        formData.append(
            "description",
            form.value.description || ""
        );

        formData.append(
            "thumbnail",
            form.value.thumbnail || ""
        );

        formData.append(
            "youtubeUrl",
            form.value.youtubeUrl || ""
        );

        formData.append(
            "featured",
            String(form.value.featured)
        );

        formData.append(
            "active",
            String(form.value.active)
        );


        // --------------------------------------------------------
        // PRODUCT IMAGES
        // --------------------------------------------------------

        if (
            form.value.images &&
            form.value.images.length > 0
        ) {

            form.value.images.forEach(file => {

                formData.append(
                    "images",
                    file
                );

            });

        }


        // --------------------------------------------------------
        // CREATE / UPDATE
        // --------------------------------------------------------

        if (!editMode.value) {

            await createProduct(
                formData
            );

            alert(
                "Product created successfully."
            );

        } else {

            await updateProduct(
                form.value.id,
                formData
            );

            alert(
                "Product updated successfully."
            );

        }


        // --------------------------------------------------------
        // RELOAD PRODUCTS
        // --------------------------------------------------------

        await loadProducts();


        // --------------------------------------------------------
        // CLOSE MODAL
        // --------------------------------------------------------

        modalRef.value?.hide();

        resetForm();

    } catch (error) {

        console.error(
            "PRODUCT SAVE ERROR:",
            error
        );

        console.error(
            "SERVER RESPONSE:",
            error.response?.data
        );

        alert(
            error.response?.data?.message ||
            "Failed to save Product."
        );

    } finally {

        saving.value = false;

    }

}


// ============================================================
// DELETE PRODUCT
// ============================================================

async function deleteProductById(id) {

    const confirmed =
        confirm(
            "Delete this Product?"
        );

    if (!confirmed) {
        return;
    }

    try {

        await deleteProduct(id);

        alert(
            "Product deleted successfully."
        );

        await loadProducts();

    } catch (error) {

        console.error(
            "DELETE PRODUCT ERROR:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Failed to delete Product."
        );

    }

}


// ============================================================
// CLOSE MODAL
// ============================================================

function closeModal() {

    modalRef.value?.hide();

    resetForm();

}


// ============================================================
// RESET FORM
// ============================================================

function resetForm() {

    clearPreviewUrls();

    existingImages.value = [];

    if (imageInputRef.value) {
        imageInputRef.value.value = "";
    }

    form.value =
        getEmptyForm();

    categories.value = [];
    productTypes.value = [];

    editMode.value = false;

}


// ============================================================
// COMPONENT MOUNT
// ============================================================

onMounted(async () => {

    await loadCompanies();

    await loadProducts();

});

</script>


<style scoped>

/* ============================================================
   PRODUCT TABLE IMAGE
============================================================ */

.product-table-image {

    width: 60px;

    height: 60px;

    object-fit: cover;

    border-radius: 8px;

    border: 1px solid #dee2e6;

    background: #f8f9fa;

}


/* ============================================================
   NO PRODUCT IMAGE
============================================================ */

.no-product-image {

    width: 60px;

    height: 60px;

    border-radius: 8px;

    background: #f1f3f5;

    display: flex;

    align-items: center;

    justify-content: center;

    color: #adb5bd;

    font-size: 22px;

}


/* ============================================================
   BADGE
============================================================ */

.badge {

    padding: 7px 12px;

    font-size: 12px;

    font-weight: 500;

}


/* ============================================================
   FORM
============================================================ */

.form-label {

    font-weight: 600;

    margin-bottom: 6px;

}


/* ============================================================
   IMAGE PREVIEW CARD
============================================================ */

.image-preview-card {

    position: relative;

    border: 1px solid #dee2e6;

    border-radius: 10px;

    overflow: hidden;

    background: #fff;

    padding: 6px;

}


/* ============================================================
   PRODUCT PREVIEW
============================================================ */

.product-preview-image {

    width: 100%;

    height: 130px;

    object-fit: cover;

    border-radius: 7px;

    display: block;

}


/* ============================================================
   REMOVE IMAGE BUTTON
============================================================ */

.remove-image-btn {

    position: absolute;

    top: 10px;

    right: 10px;

    width: 30px;

    height: 30px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 50%;

    padding: 0;

}


/* ============================================================
   PREVIEW IMAGE NAME
============================================================ */

.preview-image-name {

    font-size: 11px;

    color: #6c757d;

    margin-top: 6px;

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;

}


/* ============================================================
   EXISTING IMAGE CARD
============================================================ */

.existing-image-card {

    position: relative;

    border: 1px solid #dee2e6;

    border-radius: 10px;

    overflow: hidden;

    background: #fff;

    padding: 6px;

}


/* ============================================================
   EXISTING PRODUCT IMAGE
============================================================ */

.existing-product-image {

    width: 100%;

    height: 130px;

    object-fit: cover;

    border-radius: 7px;

    display: block;

}


/* ============================================================
   EXISTING IMAGE ORDER
============================================================ */

.existing-image-order {

    font-size: 11px;

    color: #6c757d;

    padding-top: 5px;

    text-align: center;

}


/* ============================================================
   TABLE
============================================================ */

.table-responsive {

    min-height: 300px;

}


/* ============================================================
   REQUIRED FIELD
============================================================ */

.text-danger {

    font-size: 13px;

}


/* ============================================================
   MOBILE
============================================================ */

@media (max-width: 768px) {

    .d-flex.justify-content-between {

        flex-direction: column;

        align-items: flex-start !important;

        gap: 15px;

    }


    .btn-primary {

        width: 100%;

    }


    .product-table-image,
    .no-product-image {

        width: 50px;

        height: 50px;

    }


    .product-preview-image,
    .existing-product-image {

        height: 110px;

    }

}

</style>
```
