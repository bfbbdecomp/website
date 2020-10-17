<template>
    <div id="main">
        <Navbar></Navbar>
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
            foo: "foo!!"
        };
    }
}
</script>

<style scoped>
</style>