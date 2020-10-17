import Vue from "vue";
import App from "./app.vue";

import "./custom.scss";
import "@fortawesome/fontawesome-free/css/all.css";

const app = new Vue({ render: createElement => createElement(App) }).$mount("#app");