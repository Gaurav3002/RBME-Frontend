import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// Global CSS
import "@/assets/css/style.css";

// Logo
import logo from "@/assets/logo/logos.png";

// Set favicon
const favicon = document.querySelector('link[rel="icon"]');

if (favicon) {
  favicon.href = logo;
}

createApp(App)
  .use(router)
  .mount("#app");