
<template>
    <div class="container-fluid">

        <!-- Page Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h3 class="mb-1">Company Management</h3>
                <p class="text-muted mb-0">
                    Manage all companies.
                </p>
            </div>

            <button class="btn btn-primary" @click="openCreateModal">
                <i class="bi bi-plus-circle"></i>
                Add Company
            </button>
        </div>

        <!-- Search -->

        <div class="card admin-card shadow-sm mb-3">

            <div class="card-body">
                <input type="text" class="form-control admin-form-control" placeholder="Search company..." v-model="search">
            </div>

        </div>

        <!-- Table -->
        <div class="card admin-card shadow-sm">

            <div class="card-body table-responsive">

                <table class="table admin-table table-hover align-middle">

                    <thead>

                    <tr>

                        <th>Logo</th>
                        <th>website</th>
                        <th>Name</th>
                        <th>Website</th>
                        <th>Status</th>
                        <th width="180">Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="company in filteredCompanies" :key="company.id">

                        <td>
    <img
        v-if="company.logo"
        :src="getImageUrl(company.logo)"
        class="logo"
        :alt="company.name"
    />
    <span v-else class="text-muted">
        No Logo
    </span>
</td>

<td>
    <img
        v-if="company.banner"
        :src="getImageUrl(company.banner)"
        class="logo"
        :alt="company.name"
    />
    <span v-else class="text-muted">
        No Banner
    </span>
</td>

                        <td>{{ company.name }}</td>

                        <td>{{ company.website }}</td>
                        <td>
                            <span class="badge" :class="company.active ? 'bg-success': 'bg-danger'">
                                {{ company.active ? "Active" : "Inactive" }}
                            </span>
                        </td>
                        <td>
                            <button class="btn admin-action-button btn-warning me-2" @click="editCompany(company)">
                                <i class="bi bi-pencil"></i>
                            </button>

                            <button
                                class="btn admin-action-button btn-danger" @click="deleteCompany(company.id)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <tr
                        v-if="filteredCompanies.length===0">
                        <td colspan="5" class="text-center text-muted">
                            No Company Found
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>

        </div>

    </div>

    <!-- Modal -->

        <BaseModal ref="modalRef" id="companyModal" :title="editMode ? 'Edit Company' : 'Add Company'">
            <div class="row">

                <div class="col-md-4 mb-3">
                    <label>Company Name</label>
                    <input class="form-control" v-model="form.name">
                </div>

                <div class="col-md-4 mb-3">
                    <label>Website</label>
                    <input class="form-control" v-model="form.website">
                </div>

                <div class="col-md-4 mb-3">
                    <label>Logo</label>
                    <input type="file" class="form-control" @change="form.logo = $event.target.files[0]">
                </div>

                <div class="col-md-4 mb-3">
                    <label>Banner</label>
                    <input type="file" class="form-control" @change="form.banner = $event.target.files[0]">
                </div>

                <div class="col-md-5 mb-3">
                    <label>Description</label>
                    <textarea rows="2" class="form-control" v-model="form.description"></textarea>
                </div>

                <div class="col-md-3 mb-3 d-flex align-items-center">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="form.active">
                        <label class="form-check-label">
                            Active
                        </label>
                    </div>
                </div>

            </div>

            <template #footer>

                <button class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                </button>

                <button class="btn btn-primary" @click="saveCompany">
                    {{ editMode ? "Update" : "Save" }}
                </button>
            </template>
        </BaseModal>
</template>

<script setup>
import {
    createCompany,
    updateCompany,
    getCompanies,
    deleteCompany as deleteCompanyApi
} from "@/api/company.api";
import BaseModal from "@/components/admin/common/BaseModal.vue";
const API_BASE_URL = import.meta.env.VITE_IMAGE_URL;



import {computed, ref} from "vue";
import { onMounted } from "vue";

const modalRef = ref(null);

const editMode = ref(false);

const search = ref("");

const companies = ref([]);

const form = ref({
    id: null,
    name: "",
    website: "",
    description: "",
    active: true,
    logo: null,
    banner: null
});

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

    return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
};

const filteredCompanies = computed(()=>{
    return companies.value.filter(c=> c.name.toLowerCase() .includes(search.value.toLowerCase()));
});

function openCreateModal(){
    editMode.value=false;
    form.value={
        id:null,
        name:"",
        website:"",
        description:"",
        active:true,
        logo: null,
        banner: null
    };
     modalRef.value.show();
}
function editCompany(company) {
    editMode.value = true;

    form.value = {
        id: company.id,
        name: company.name || "",
        website: company.website || "",
        description: company.description || "",
        active: company.active,
        logo: null,
        banner: null
    };

    modalRef.value.show();
}

async function deleteCompany(id) {
    if (!confirm("Delete this company?")) {
        return;
    }
    try {
        await deleteCompanyApi(id);
        alert("Company deleted successfully.");
        await loadCompanies();
    } catch (error) {
        // console.error(error);
        alert(
            error.response?.data?.message ||
            "Failed to delete company."
        );
    }
}

async function saveCompany() {
    try {
        const formData = new FormData();
        formData.append("name", form.value.name);
        formData.append("website", form.value.website);
        formData.append("description", form.value.description);
        formData.append("active", form.value.active);
        if (form.value.logo instanceof File) {
            formData.append("logo", form.value.logo);
        }

        if (form.value.banner instanceof File) {
            formData.append("banner", form.value.banner);
        }
        if (editMode.value) {
            await updateCompany(form.value.id, formData);
            alert("Company Updated Successfully");
        } else {
            // console.log("Creating company with data:", formData);
            await createCompany(formData);
            alert("Company Added Successfully");

        }
        await loadCompanies();

        modalRef.value.hide();
        
        form.value = {
            id: null,
            name: "",
            website: "",
            description: "",
            active: true,
            logo: null,
            banner: null
        };

        editMode.value = false;

    } catch (error) {
        // console.error(error);
        alert("Something went wrong.");
    }

}

async function loadCompanies() {
    try {
        const response = await getCompanies();
        companies.value = response.data;

    } catch (error) {

        console.error(error);

    }

}
onMounted(async () => {
    await loadCompanies();
});
</script>

<style scoped>

.logo{

    width:60px;
    height:60px;
    object-fit:contain;
    border-radius:6px;

}

</style>