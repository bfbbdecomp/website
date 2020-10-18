<template>
<section id="faq">
    <div class="container">
        <div v-bind:class="[hash == entry.link ? 'focus-question' : '']" class="my-5" v-for="entry in faq" :key="entry.link">
            <p>
            <strong>{{ entry.question }}</strong>
            </p>
            <p v-html="entry.answer"></p>
        </div>
    </div>
</section>
</template>

<script>
import Navbar from "../navbar.vue";
import FAQinfo from "./faq.js";

export default {
    components: {
        Navbar
    },
    data() {
        return {
            hash: window.location.hash.replace("#", ""),
            faq: FAQinfo
        };
    }
}
</script>

<style lang="scss">
    .focus-question {
        background-color: yellow;
    }
</style>