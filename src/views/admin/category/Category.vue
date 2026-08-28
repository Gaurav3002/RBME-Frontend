<template>
    <div class="container-fluid">
         <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h3 class="mb-1">Category Management</h3>
                <p class="text-muted mb-0">
                    Manage all categories.
                </p>
            </div>

            <button class="btn btn-primary" @click="openCreateModal">
                <i class="bi bi-plus-circle"></i>
                Add Category
            </button>
        </div>

        <!-- Search -->
        <div class="card shadow-sm mb-3">
            <div class="card-body">
                <input type="text" class="form-control" placeholder="Search category..." v-model="search">
            </div>
        </div>

        <!-- Table -->
        <div class="card shadow-sm">

            <div class="card-body table-responsive">

                <table class="table table-hover align-middle">

                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Category </th>
                        <th>Status </th>
                        <th width="180">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="category in filteredCategories" :key="category.id">

                        

                        <td>{{ category.companyName }}</td>

                        <td>{{ category.name }}</td>
                        <td>
                            <span class="badge" :class="category.active ? 'bg-success': 'bg-danger'">
                                {{ category.active ? "Active" : "Inactive" }}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-warning me-2" @click="editCategory(category)">
                                <i class="bi bi-pencil"></i>
                            </button>

                            <button
                                class="btn btn-sm btn-danger" @click="deleteCategoryById(category.id)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <tr
                        v-if="filteredCategories.length===0">
                        <td colspan="5" class="text-center text-muted">
                            No Category Found
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>

        </div>

        <!-- Create/Edit Modal -->
        <BaseModal ref="modalRef" id="categoryModal" :title="editMode ? 'Edit Category' : 'Add Category'" size="md" :draggable="true">
        <div class="row">
            <!-- Company -->

            <div class="col-md-6 mb-3">
                <label class="form-label">
                    Company <span class="text-danger">*</span>
                </label>

                <select class="form-select" v-model="form.companyId">
                    <option :value="null">
                        -Select Company
                    </option>
                    <option
                        v-for="company in companies" :key="company.id" :value="company.id">
                        {{ company.name }}
                    </option>
                </select>

            </div>

            <!-- Category Name -->

            <div class="col-md-6 mb-3">
                <label class="form-label">
                    Category Name
                    <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control" placeholder="Enter Category Name" v-model="form.name">
            </div>

            <!-- Status -->

            <div class="col-md-6 mb-3 d-flex align-items-center">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="active" v-model="form.active">
                    <label
                        class="form-check-label" for="active">
                        Active
                    </label>
                </div>
            </div>
        </div>
        <template #footer>
            <button class="btn btn-secondary" data-bs-dismiss="modal"> Cancel</button>

            <button class="btn btn-primary" @click="saveCategory">
                <i class="bi bi-check-circle me-1"></i>
                {{ editMode ? "Update Category" : "Save Category" }}
            </button>
        </template>
        </BaseModal>
</div>
</template>
<script setup>
import {ref, computed, onMounted} from "vue";
import BaseModal from "@/components/admin/common/BaseModal.vue";
import {
    createCategory,
    updateCategory,            
    getCategories,
    deleteCategory
} from "@/api/category.api"; 

import {getCompanies} from "@/api/company.api";
const companies = ref([]);
const categories = ref([]);
const search = ref("");
const editMode = ref(false);
const modalRef = ref(null);

const form = ref({
    id: null,
    companyId: null,
    name: "",
    active: true
});
const filteredCategories = computed(() => {
    return categories.value.filter(category => {
        const searchTerm = search.value.toLowerCase();
        return (
            category.name.toLowerCase().includes(searchTerm) ||
            category.companyName.toLowerCase().includes(searchTerm)
        );
    });
})

// load companies and categories on mounted
async function loadCompanies() {
    try {
        const response = await getCompanies();
        companies.value = response.data;
    } catch (error) {
        console.error("Error loading companies:", error);
    }
}

async function loadCategories() {
    try {
        const response = await getCategories();
        categories.value = response.data;
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

function openCreateModal() {
    editMode.value = false;
    form.value = {
        id: null,
        companyId: null,
        name: "",
        active: true
    };
    modalRef.value.show();
}

function editCategory(category) {
    editMode.value = true;
    form.value = {
        id: category.id,
        companyId: category.companyId,
        name: category.name,
        active: category.active
    };
    modalRef.value.show();
}

async function saveCategory() {
    try {
       if(!form.value.companyId){
         alert("Please select company.");
            return;
       }
       if(!form.value.name.trim()){
         alert("Category name is required.");
            return;
       }

       if (editMode.value) {
            await updateCategory(form.value.id, form.value);
            alert("Category updated successfully.");
        } else {
            await createCategory(form.value);
            alert("Category created successfully.");
        }
        await loadCategories();
        modalRef.value.hide();
        form.value = {
            id: null,
            companyId: null,
            name: "",
            active: true
        };

        editMode.value = false;   
    } catch (error) {
        console.error("Error saving category:", error);
        alert(
            error.response?.data?.message ||
            "Failed to save category."
        );
    }
}

async function deleteCategoryById(id) {

    if (!confirm("Delete this category?")) {
        return;
    }

    try {

        await deleteCategory(id);

        alert("Category deleted successfully.");

        await loadCategories();

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Failed to delete category."
        );

    }

}
onMounted(async () => {
    await loadCompanies();
    await loadCategories();
});
</script>
<style scoped>

.card {
    border: none;
    border-radius: 10px;
}

.table th {
    background: #f8f9fa;
    font-weight: 600;
    white-space: nowrap;
}

.table td {
    vertical-align: middle;
}

.badge {
    padding: 7px 12px;
    font-size: 12px;
    font-weight: 500;
}

.btn-sm {
    width: 36px;
    height: 36px;
    padding: 0;
    border-radius: 6px;
}

.btn-sm i {
    font-size: 15px;
}

.form-label {
    font-weight: 600;
    margin-bottom: 6px;
}

.form-control,
.form-select {
    border-radius: 8px;
}

.form-control:focus,
.form-select:focus {
    box-shadow: none;
    border-color: #0d6efd;
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