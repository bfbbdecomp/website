import "./custom.scss";
import "@fortawesome/fontawesome-free/css/all.css";

import Vue from "vue";
import VueRouter from "vue-router";
import App from "./app.vue";
import Faq from "./faq.vue";
import Progress from "./progress.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", component: Progress },
    { path: "/progress", component: Progress },
    { path: "/faq", component: Faq },
];

const router = new VueRouter({
    mode: "history",
    routes
});

const app = new Vue({
    el: "#app",
    router,
    render: h => h(App)
});