<template>
    <div class="container-fluid">

        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h3 class="mb-1">Product Type Management</h3>
                <p class="text-muted mb-0">
                    Manage all product types.
                </p>
            </div>

            <button class="btn btn-primary" @click="openCreateModal">
                <i class="bi bi-plus-circle"></i>
                Add Product Type
            </button>
        </div>

        <!-- Search -->
        <div class="card admin-card shadow-sm mb-3">
            <div class="card-body">
                <input
                    type="text"
                    class="form-control admin-form-control"
                    placeholder="Search product type..."
                    v-model="search"
                >
            </div>
        </div>

        <!-- Table -->
        <div class="card admin-card shadow-sm">

            <div class="card-body table-responsive">

                <table class="table admin-table table-hover align-middle">

                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Category</th>
                        <th>Product Type</th>
                        <th>Status</th>
                        <th width="170">Action</th>
                    </tr>
                    </thead>

                    <tbody>

                    <tr
                        v-for="productType in filteredProductTypes"
                        :key="productType.id"
                    >

                        <td>{{ productType.companyName }}</td>

                        <td>{{ productType.categoryName }}</td>

                        <td>{{ productType.productTypeName }}</td>

                        <td>

                            <span
                                class="badge"
                                :class="productType.active ? 'bg-success':'bg-danger'"
                            >
                                {{ productType.active ? "Active" : "Inactive" }}
                            </span>

                        </td>

                        <td>

                            <button
                                class="btn admin-action-button btn-warning me-2"
                                @click="editProductType(productType)"
                            >
                                <i class="bi bi-pencil"></i>
                            </button>

                            <button
                                class="btn admin-action-button btn-danger"
                                @click="deleteProductTypeById(productType.id)"
                            >
                                <i class="bi bi-trash"></i>
                            </button>

                        </td>

                    </tr>

                    <tr v-if="filteredProductTypes.length===0">

                        <td colspan="5" class="text-center text-muted">

                            No Product Type Found

                        </td>

                    </tr>

                    </tbody>

                </table>

            </div>

        </div>


        <!-- Modal -->

        <BaseModal
                ref="modalRef"
                id="productTypeModal"
                :title="editMode ? 'Edit Product Type':'Add Product Type'"
                size="md"
                :draggable="true"
        >

            <div class="row">

                <!-- Company -->

                <div class="col-md-6 mb-3">

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


                <!-- Category -->

                <div class="col-md-6 mb-3">

                    <label class="form-label">

                        Category
                        <span class="text-danger">*</span>

                    </label>

                    <select
                            class="form-select"
                            v-model="form.categoryId"
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


                <!-- Name -->

                <div class="col-md-6 mb-3">

                    <label class="form-label">

                        Product Type
                        <span class="text-danger">*</span>

                    </label>

                    <input
                            class="form-control"
                            placeholder="Enter Product Type"
                            v-model="form.name"
                    >

                </div>


                <!-- Status -->

                <div class="col-md-6 d-flex align-items-center">

                    <div class="form-check">

                        <input
                                class="form-check-input"
                                type="checkbox"
                                id="active"
                                v-model="form.active"
                        >

                        <label
                                class="form-check-label"
                                for="active"
                        >

                            Active

                        </label>

                    </div>

                </div>

            </div>

            <template #footer>

                <button
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                >

                    Cancel

                </button>

                <button
                        class="btn btn-primary"
                        @click="saveProductType"
                >

                    <i class="bi bi-check-circle me-1"></i>

                    {{ editMode ? "Update Product Type" : "Save Product Type" }}

                </button>

            </template>

        </BaseModal>

    </div>

</template>

<script setup>

import {ref, computed, onMounted} from "vue";

import BaseModal from "@/components/admin/common/BaseModal.vue";

import {
    createProductType,
    updateProductType,
    getProductTypes,
    deleteProductType
} from "@/api/productType.api";

import {getCompanies} from "@/api/company.api";

import {getCategoriesByCompany} from "@/api/category.api";

const companies = ref([]);

const categories = ref([]);

const productTypes = ref([]);

const search = ref("");

const editMode = ref(false);

const modalRef = ref(null);

const form = ref({

    id: null,

    companyId: null,

    categoryId: null,

    name: "",

    active: true

});

const filteredProductTypes = computed(() => {

    return productTypes.value.filter(productType => {

        const keyword = search.value.toLowerCase();

        return (

            productType.productTypeName.toLowerCase().includes(keyword)

            ||

            productType.companyName.toLowerCase().includes(keyword)

            ||

            productType.categoryName.toLowerCase().includes(keyword)

        );

    });

});

async function loadCompanies(){

    try{

        const response = await getCompanies();

        companies.value = response.data;

    }catch(error){

        console.error(error);

    }

}

async function loadProductTypes(){

    try{

        const response = await getProductTypes();

        productTypes.value = response.data;

    }catch(error){

        console.error(error);

    }

}

async function onCompanyChange(){

    form.value.categoryId = null;

    if(!form.value.companyId){

        categories.value = [];

        return;

    }

    try{

        const response = await getCategoriesByCompany(form.value.companyId);

        categories.value = response.data;

    }catch(error){

        console.error(error);

    }

}

function openCreateModal() {

    editMode.value = false;

    form.value = {
        id: null,
        companyId: null,
        categoryId: null,
        name: "",
        active: true
    };

    categories.value = [];

    modalRef.value.show();

}

async function editProductType(productType) {

    editMode.value = true;

    form.value = {
    id: productType.id,
    companyId: productType.companyId,
    categoryId: null,
    name: productType.productTypeName,
    active: productType.active
    };  

    try {

        const response = await getCategoriesByCompany(productType.companyId);

        categories.value = response.data;

        form.value.categoryId = productType.categoryId;

    } catch (error) {

        console.error(error);

    }

    modalRef.value.show();

}

async function saveProductType() {

    try {

        if (!form.value.companyId) {
            alert("Please select company.");
            return;
        }

        if (!form.value.categoryId) {
            alert("Please select category.");
            return;
        }

        if (!form.value.name.trim()) {
            alert("Product Type name is required.");
            return;
        }

        if (editMode.value) {

            await updateProductType(form.value.id, form.value);

            alert("Product Type updated successfully.");

        } else {

            await createProductType(form.value);

            alert("Product Type created successfully.");

        }

        await loadProductTypes();

        modalRef.value.hide();

        form.value = {
            id: null,
            companyId: null,
            categoryId: null,
            name: "",
            active: true
        };

        categories.value = [];

        editMode.value = false;

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Failed to save Product Type."
        );

    }

}

async function deleteProductTypeById(id) {

    if (!confirm("Delete this Product Type?")) {
        return;
    }

    try {

        await deleteProductType(id);

        alert("Product Type deleted successfully.");

        await loadProductTypes();

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Failed to delete Product Type."
        );

    }

}

onMounted(async () => {

    await loadCompanies();

    await loadProductTypes();

});
</script>

<style scoped>

.badge {
    padding: 7px 12px;
    font-size: 12px;
    font-weight: 500;
}

.form-label {
    font-weight: 600;
    margin-bottom: 6px;
}

.table-responsive {
    min-height: 300px;
}

.text-danger {
    font-size: 13px;
}

@media (max-width: 768px) {

    .d-flex.justify-content-between {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 15px;
    }

    .btn-primary {
        width: 100%;
    }

}

</style>