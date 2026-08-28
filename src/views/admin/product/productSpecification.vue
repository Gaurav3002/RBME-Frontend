 ```vue
<template>

    <div class="container-fluid">

        <!-- =====================================================
             HEADER
        ====================================================== -->

        <div class="d-flex justify-content-between align-items-center mb-4">

            <div>

                <h3 class="mb-1">
                    Product Specification Management
                </h3>

                <p class="text-muted mb-0">
                    Manage specifications for your products.
                </p>

            </div>


            <button
                type="button"
                class="btn btn-primary"
                @click="openCreateModal"
            >

                <i class="bi bi-plus-circle me-1"></i>

                Add Specification

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
                    placeholder="Search product, specification name or value..."
                    v-model="search"
                >

            </div>

        </div>


        <!-- =====================================================
             SPECIFICATION TABLE
        ====================================================== -->

        <div class="card admin-card shadow-sm">

            <div class="card-body table-responsive">

                <table class="table admin-table table-hover align-middle">

                    <thead>

                    <tr>

                        <th>
                            #
                        </th>

                        <th>
                            Product
                        </th>

                        <th>
                            Specification Name
                        </th>

                        <th>
                            Specification Value
                        </th>

                        <th width="150">
                            Action
                        </th>

                    </tr>

                    </thead>


                    <tbody>

                    <tr
                        v-for="(specification, index) in filteredSpecifications"
                        :key="specification.id"
                    >

                        <!-- NUMBER -->

                        <td>

                            {{ index + 1 }}

                        </td>


                        <!-- PRODUCT -->

                        <td>

                            <div class="product-name">

                                <strong>

                                    {{
                                        specification.productName || "-"
                                    }}

                                </strong>

                            </div>

                        </td>


                        <!-- SPECIFICATION NAME -->

                        <td>

                            <span class="specification-name">

                                {{
                                    specification.specificationName || "-"
                                }}

                            </span>

                        </td>


                        <!-- SPECIFICATION VALUE -->

                        <td>

                            <span class="specification-value">

                                {{
                                    specification.specificationValue || "-"
                                }}

                            </span>

                        </td>


                        <!-- ACTION -->

                        <td>

                            <button
                                type="button"
                                class="btn admin-action-button btn-warning me-2"
                                title="Edit"
                                @click="editSpecification(specification)"
                            >

                                <i class="bi bi-pencil"></i>

                            </button>


                            <button
                                type="button"
                                class="btn admin-action-button btn-danger"
                                title="Delete"
                                @click="
                                    deleteSpecificationById(
                                        specification.id
                                    )
                                "
                            >

                                <i class="bi bi-trash"></i>

                            </button>

                        </td>

                    </tr>


                    <!-- NO DATA -->

                    <tr
                        v-if="filteredSpecifications.length === 0"
                    >

                        <td
                            colspan="5"
                            class="text-center text-muted py-5"
                        >

                            <i
                                class="bi bi-file-earmark-text fs-3 d-block mb-2"
                            ></i>

                            No Specification Found

                        </td>

                    </tr>

                    </tbody>

                </table>

            </div>

        </div>


        <!-- =====================================================
             ADD / EDIT MODAL
        ====================================================== -->

        <BaseModal ref="modalRef" id="specificationModal" :title=" editMode  ? 'Edit Product Specification' : 'Add Product Specification'" size="lg" :draggable="true">
            <div class="row">

                <div class="col-8 mb-3">
                    <label class="form-label">
                        Product
                        <span class="text-danger">
                            *
                        </span>
                    </label>

                    <select class="form-select" v-model="form.productId" @change="onProductChange($event)">
                        <option value="">
                            Select Product
                        </option>

                        <option v-for="product in products" :key="product.id" :value="product.id" >
                            {{ product.modelNo || "-" }}
                            -
                            {{ product.title || "-" }}
                        </option>
                    </select>
                </div>

                <div v-if="selectedProduct" class="col-8 mb-4">
                    <div class="product-info-card">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="info-label">
                                    Company
                                </div>
                                <div class="info-value">
                                    {{
                                        selectedProduct.companyName || "-"
                                    }}
                                </div>

                            </div>

                            <div class="col-md-4">

                                <div class="info-label">
                                    Category
                                </div>

                                <div class="info-value">

                                    {{
                                        selectedProduct.categoryName || "-"
                                    }}

                                </div>

                            </div>


                            <!-- PRODUCT TYPE -->

                            <div class="col-md-4">

                                <div class="info-label">
                                    Product Type
                                </div>

                                <div class="info-value">

                                    {{
                                        selectedProduct.productTypeName || "-"
                                    }}

                                </div>

                            </div>

                        </div>
                        <div class="row mt-3">
                            <!-- MODEL -->

                            <div class="col-md-4">

                                <div class="info-label">
                                    Model No
                                </div>

                                <div class="info-value">

                                    {{
                                        selectedProduct.modelNo || "-"
                                    }}

                                </div>

                            </div>


                            <!-- TITLE -->

                            <div class="col-md-4">

                                <div class="info-label">
                                    Product
                                </div>

                                <div class="info-value">

                                    {{
                                        selectedProduct.title || "-"
                                    }}

                                </div>

                            </div>


                            <div class="col-md-4">

                                <div class="info-label">
                                    Status
                                </div>

                                <div class="info-value">

                                    <span
                                        class="badge"
                                        :class="
                                            selectedProduct.active
                                                ? 'bg-success'
                                                : 'bg-danger'
                                        "
                                    >

                                        {{
                                            selectedProduct.active
                                                ? "Active"
                                                : "Inactive"
                                        }}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="col-8 mb-3">

                    <label class="form-label">

                        Specification Name

                        <span class="text-danger">
                            *
                        </span>

                    </label>


                    <input
                        type="text"
                        class="form-control"
                        placeholder="Example: Capacity"
                        v-model="form.specificationName"
                    >

                </div>


                <!-- =================================================
                     SPECIFICATION VALUE
                ================================================== -->

                <div class="col-8 mb-3">

                    <label class="form-label">

                        Specification Value

                        <span class="text-danger">
                            *
                        </span>

                    </label>


                    <textarea
                        class="form-control"
                        rows="1"
                        placeholder="Example: 10 Litres"
                        v-model="form.specificationValue"
                    ></textarea>

                </div>

            </div>


            <!-- =====================================================
                 FOOTER
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
                    @click="saveSpecification"
                    :disabled="saving"
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
                                ? "Update Specification"
                                : "Save Specification"
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
    onMounted,
    watch
} from "vue";


import BaseModal
    from "@/components/admin/common/BaseModal.vue";


import {
    getSpecifications,
    createSpecification,
    updateSpecification,
    deleteSpecification
} from "@/api/specification.api";


import {
    getProducts
} from "@/api/product.api";


/* =========================================================
   STATE
========================================================= */

const specifications = ref([]);

const products = ref([]);

const selectedProduct = ref(null);

const search = ref("");

const editMode = ref(false);

const saving = ref(false);

const modalRef = ref(null);


/* =========================================================
   FORM
========================================================= */

const form = ref({

    id: null,

    productId: "",

    specificationName: "",

    specificationValue: ""

});


/* =========================================================
   WATCH PRODUCT ID
========================================================= */

watch(
    () => form.value.productId,

    (newValue) => {

        if (!newValue) {

            selectedProduct.value = null;

            return;

        }

        const selectedId = Number(newValue);

        if (Number.isNaN(selectedId)) {

            selectedProduct.value = null;

            return;

        }

        const product = products.value.find(
            item => Number(item.id) === selectedId
        );

        selectedProduct.value = product || null;

    }
);


/* =========================================================
   FILTER SPECIFICATIONS
========================================================= */

const filteredSpecifications = computed(() => {

    const keyword =
        search.value
            .toLowerCase()
            .trim();


    if (!keyword) {

        return specifications.value;

    }


    return specifications.value.filter(
        specification => {

            const productName =
                (
                    specification.productName || ""
                ).toLowerCase();


            const specificationName =
                (
                    specification.specificationName || ""
                ).toLowerCase();


            const specificationValue =
                (
                    specification.specificationValue || ""
                ).toLowerCase();


            return (

                productName.includes(keyword)

                ||

                specificationName.includes(keyword)

                ||

                specificationValue.includes(keyword)

            );

        }
    );

});


/* =========================================================
   LOAD PRODUCTS
========================================================= */

async function loadProducts() {

    try {

        const response =
            await getProducts();


        if (Array.isArray(response.data)) {

            products.value =
                response.data;

        } else {

            products.value = [];

        }

    } catch (error) {

        products.value = [];

        alert(
            error.response?.data?.message ||
            "Failed to load products."
        );

    }

}


/* =========================================================
   LOAD SPECIFICATIONS
========================================================= */

async function loadSpecifications() {

    try {

        const response =
            await getSpecifications();


        if (Array.isArray(response.data)) {

            specifications.value =
                response.data;

        } else {

            specifications.value = [];

        }

    } catch (error) {

        specifications.value = [];

        alert(
            error.response?.data?.message ||
            "Failed to load specifications."
        );

    }

}


/* =========================================================
   PRODUCT CHANGE
========================================================= */

function onProductChange() {

    const selectedId =
        Number(form.value.productId);


    if (
        !form.value.productId ||
        Number.isNaN(selectedId)
    ) {

        selectedProduct.value = null;

        return;

    }


    const foundProduct =
        products.value.find(
            product =>
                Number(product.id) === selectedId
        );


    selectedProduct.value =
        foundProduct || null;

}


/* =========================================================
   RESET FORM
========================================================= */

function resetForm() {

    form.value = {

        id: null,

        productId: "",

        specificationName: "",

        specificationValue: ""

    };


    selectedProduct.value = null;

}


/* =========================================================
   OPEN CREATE MODAL
========================================================= */

function openCreateModal() {

    editMode.value = false;

    resetForm();


    if (!products.value.length) {

        alert(
            "No products available. Please create a product first."
        );

        return;

    }


    modalRef.value.show();

}


/* =========================================================
   EDIT SPECIFICATION
========================================================= */

function editSpecification(specification) {

    editMode.value = true;


    form.value = {

        id:
            specification.id,

        productId:
            specification.productId
                ? Number(specification.productId)
                : "",

        specificationName:
            specification.specificationName || "",

        specificationValue:
            specification.specificationValue || ""

    };


    const productId =
        Number(specification.productId);


    const product =
        products.value.find(
            item =>
                Number(item.id) === productId
        );


    selectedProduct.value =
        product || null;


    modalRef.value.show();

}


/* =========================================================
   SAVE SPECIFICATION
========================================================= */

async function saveSpecification() {

    try {

        if (!form.value.productId) {

            alert(
                "Please select a product."
            );

            return;

        }


        if (
            !form.value.specificationName ||
            !form.value.specificationName.trim()
        ) {

            alert(
                "Specification name is required."
            );

            return;

        }


        if (
            !form.value.specificationValue ||
            !form.value.specificationValue.trim()
        ) {

            alert(
                "Specification value is required."
            );

            return;

        }


        const payload = {

            productId:
                Number(form.value.productId),

            specificationName:
                form.value.specificationName.trim(),

            specificationValue:
                form.value.specificationValue.trim()

        };


        saving.value = true;


        if (editMode.value) {

            await updateSpecification(
                form.value.id,
                payload
            );


            alert(
                "Specification updated successfully."
            );

        } else {

            await createSpecification(
                payload
            );


            alert(
                "Specification created successfully."
            );

        }


        await loadSpecifications();


        closeModal();

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Failed to save specification."
        );

    } finally {

        saving.value = false;

    }

}


/* =========================================================
   DELETE
========================================================= */

async function deleteSpecificationById(id) {

    if (!id) {

        alert(
            "Specification ID is missing."
        );

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this specification?"
        );


    if (!confirmed) {

        return;

    }


    try {

        await deleteSpecification(id);


        alert(
            "Specification deleted successfully."
        );


        await loadSpecifications();

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Failed to delete specification."
        );

    }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

    if (modalRef.value) {

        modalRef.value.hide();

    }


    resetForm();

    editMode.value = false;

}


/* =========================================================
   INITIAL LOAD
========================================================= */

onMounted(async () => {

    await loadProducts();

    await loadSpecifications();

});

</script>


<style scoped>

/* =========================================================
   CARD
========================================================= */

.product-name {

    min-width: 250px;

}


.product-name strong {

    font-size: 14px;

}


.specification-name {

    font-weight: 600;

}


.specification-value {

    color: #495057;

}


/* =========================================================
   BUTTONS
========================================================= */

/* =========================================================
   FORM
========================================================= */

.form-label {

    font-weight: 600;

    margin-bottom: 6px;

}


textarea.form-control {

    resize: vertical;

}


/* =========================================================
   PRODUCT INFO CARD
========================================================= */

.product-info-card {

    background: #f8f9fa;

    border: 1px solid #e5e7eb;

    border-radius: 10px;

    padding: 18px;

}



.product-info-header strong {

    font-size: 15px;

}


.product-info-header i {

    font-size: 17px;

}


/* =========================================================
   INFO LABEL
========================================================= */

.info-label {

    color: #6c757d;

    font-size: 12px;

    font-weight: 500;

    margin-bottom: 4px;

}


/* =========================================================
   INFO VALUE
========================================================= */

.info-value {

    color: #212529;

    font-size: 14px;

    font-weight: 600;

    word-break: break-word;

}


.description-value {

    white-space: pre-wrap;

    line-height: 1.5;

    font-weight: 500;

}


.info-value a {

    color: #0d6efd;

    text-decoration: none;

    word-break: break-all;

}


.info-value a:hover {

    text-decoration: underline;

}


/* =========================================================
   NO PRODUCT CARD
========================================================= */

.no-product-card {

    background: #f8f9fa;

    border: 1px dashed #ced4da;

    border-radius: 10px;

    padding: 20px;

    text-align: center;

    color: #6c757d;

}


/* =========================================================
   TABLE RESPONSIVE
========================================================= */

.table-responsive {

    min-height: 300px;

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 768px) {

    .d-flex.justify-content-between {

        flex-direction: column;

        align-items: flex-start !important;

        gap: 15px;

    }


    .btn-primary {

        width: 100%;

    }


    .product-info-card {

        padding: 13px;

    }


    .product-name {

        min-width: 200px;

    }

}

</style>
