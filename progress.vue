<template>
    <div id="progress">
        <div class="container">
            <div class="tile">
                <Timeline id="0"></Timeline>
                <Heatmap id="0"></Heatmap>
            </div>
        </div>
    </div>
</template>

<script>
import Timeline from "./timeline/timeline.vue";
import Heatmap from "./heatmap/heatmap.vue";

export default {
    components: {
        Heatmap,
        Timeline
    },
    data() {
        return {};
    }
}
</script>

<style lang="scss">
</style>