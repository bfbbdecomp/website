<template>
    <div id="main">
        <Navbar></Navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from "./navbar.vue";

export default {
    components: {
        Navbar
    },
    data() {
        return {
        };
    }
}
</script>

<style lang="scss">
</style>