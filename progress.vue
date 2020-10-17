<template>
    <div>
        <section class="hero is-bold mt-3">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Battle for Bikini Bottom is {{ percent }}% decompiled
                    </h1>
                    <h2 class="subtitle">
                        Estimated completion date: 
                        <strong class="estimate-help">{{ estimate.doneDateString }}</strong>.
                    </h2>
                    <progress class="progress is-info" :value="percent" max="100">45%</progress>
                </div>
            </div>
        </section>
        <section class="mb-6">
            <div class="container">
            </div>
        </section>
        <section id="charts">
            <div class="container">
                <div class="tile">
                    <Timeline class="tile is-6" id="0"></Timeline>
                    <Heatmap class="tile is-6" id="0"></Heatmap>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Timeline from "./timeline/timeline.vue";
import Heatmap from "./heatmap/heatmap.vue";
import Info from "./data/info.js";
import { getEstimate } from "./estimate.js";

const est = getEstimate();

export default {
    components: {
        Heatmap,
        Timeline
    },
    data() {
        return {
            percent: Math.round(Info.stats.linesDone / Info.stats.linesTotal * 10000) / 100,
            estimate: est,
            remaining: est.remaining.toLocaleString(),
        };
    }
}
</script>

<style lang="scss">
#info {
    text-align: center;
}

.estimate-help {
    border-bottom: 1px dashed #1b78d0;
/*    cursor: help;*/
}

</style>