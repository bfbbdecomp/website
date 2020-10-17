<template>
    <div id="progress">
        <div class="container">
            <div class="tile">
                <Timeline id="0"></Timeline>
                <Timeline id="1"></Timeline>
            </div>
        </div>
    </div>
</template>

<script>
import Timeline from "./timeline/timeline.vue";

export default {
    components: {
        Timeline
    },
    data() {
        return {};
    }
}
</script>

<style lang="scss">
</style>