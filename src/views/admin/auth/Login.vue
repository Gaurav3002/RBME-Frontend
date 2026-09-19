<template>
    <div class="card shadow p-4 login-card">

        <h3 class="text-center mb-4">
            RBME Admin
        </h3>

        <form @submit.prevent="loginUser">

            <!-- Username -->
            <div class="mb-3">
                <label class="form-label">Username</label>

                <input
                    type="text"
                    class="form-control"
                    v-model.trim="form.username"
                    placeholder="Enter username"
                    autocomplete="username"
                    required
                />
            </div>

            <!-- Password -->
            <div class="mb-3">
                <label class="form-label">Password</label>

                <input
                    type="password"
                    class="form-control"
                    v-model="form.password"
                    placeholder="Enter password"
                    autocomplete="current-password"
                    required
                />
            </div>

            <!-- Login Button -->
            <button
                type="submit"
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
    username: "",
    password: "",
});

const loginUser = async () => {

    if (!form.username || !form.password) {
        alert("Please enter username and password.");
        return;
    }

    loading.value = true;

    try {

        const { data } = await loginAdmin({
            username: form.username,
            password: form.password
        });

        // Save JWT token
        saveToken(data.token);

        // Save logged-in user information
        saveAdmin(data);

        // Redirect to dashboard
        router.push("/admin/dashboard");

    } catch (error) {

        console.error("Login error:", error);

        alert(
            error.response?.data?.message ||
            "Invalid username or password."
        );

    } finally {

        loading.value = false;
    }
};
</script>

<style scoped>
.login-card {
    width: min(400px, calc(100vw - 30px));
    max-width: 100%;
    border-radius: 12px;
}
</style>