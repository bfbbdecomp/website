<template>
<nav class="navbar is-transparent">
  <div class="container">
    <div class="navbar-brand">
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
        </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
        <a class="navbar-item" href="./">
            Home
        </a>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="field is-grouped">
                    <p class="control">
                        <a target="_blank" class="button" :href="github">
                        <span class="icon">
                            <i class="fab fa-github"></i>
                        </span>
                        <span>
                            GitHub
                        </span>
                        </a>
                    </p>
                    <p class="control">
                        <a target="_blank" class="button is-discord" href="https://discord.gg/Dvu2UAS">
                        <span class="icon">
                            <i class="fab fa-discord"></i>
                        </span>
                        <span>Discord</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
  </div>
</nav>
</template>

<script>
import Info from "./data/info.js";
export default {
    data() {
        return {
            github: Info.repo
        };
    }    
}
</script>

<style lang="scss">


</style>