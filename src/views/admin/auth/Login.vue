<template>
    <div class="card shadow p-4 login-card">

        <h3 class="text-center mb-4">
            RBME Admin
        </h3>

        <form @submit.prevent="loginUser">

            <div class="mb-3">

                <label>Email</label>

                <input
                    type="email"
                    class="form-control"
                    v-model="form.email"
                    required
                />

            </div>

            <div class="mb-3">

                <label>Password</label>

                <input
                    type="password"
                    class="form-control"
                    v-model="form.password"
                    required
                />

            </div>

            <button
                class="btn btn-primary w-100"
                :disabled="loading"
            >
                {{ loading ? "Please wait..." : "Login" }}
            </button>

        </form>

    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { loginAdmin } from "@/api/auth.api";
import { saveToken, saveAdmin } from "@/utils/storage";

const router = useRouter();

const loading = ref(false);

const form = reactive({
    email: "",
    password: "",
});

const loginUser = async () => {

    loading.value = true;

    try {

        const { data } = await loginAdmin(form);

        saveToken(data.token);
        saveAdmin(data);

        router.push("/admin/dashboard");

    } catch (error) {

        alert(error.response?.data?.message || "Login Failed");

    } finally {

        loading.value = false;

    }
};
</script>

<style scoped>
.login-card {
    width: 400px;
    border-radius: 12px;
}
</style>