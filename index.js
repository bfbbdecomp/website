import "./custom.scss";
import "@fortawesome/fontawesome-free/css/all.css";

import Vue from "vue";
import VueRouter from "vue-router";
import App from "./app.vue";
import Faq from "./faq/faq.vue";
import Progress from "./progress.vue";
import NotFound from "./404.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", component: Progress },
    { path: "/progress", component: Progress },
    { path: "/faq", component: Faq },
    { path: "*", component: NotFound },
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