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
                        <strong @click="showInfo = true" @mouseover="showInfo = true" class="estimate-help">
                            {{ estimate.doneDateString }}</strong>.
                    </h2>
                    <div v-if="showInfo" class="notification is-warning">
                        <button @click="showInfo = false" class="delete"></button>
                        <p>
                            At a rate of {{ estimate.diff.toLocaleString() }} lines of assembly 
                            decompiled every {{ estimate.daysPassed }} days,
                            it will take <strong>{{ estimate.timeBetweenString }}</strong>* to 
                            decompile the remaining {{ remaining }} lines.
                        </p>

                        Learn <router-link to="faq/#how-to-contribute">how you can help</router-link> to improve this time.

                        <p>
                            <i>
                            * This estimation is calculated automatically
                            based on the rate of recent contributions.
                            </i>
                        </p>
                    </div>
                    <progress class="progress is-success" :value="percent" max="100">45%</progress>
                </div>
            </div>
        </section>
        <section id="charts">
            <div class="container">
                <div class="tile">
                    <Timeline class="chart tile is-6" id="0"></Timeline>
                    <!--<Heatmap class="chart tile is-6" id="0"></Heatmap>-->
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Timeline from "./timeline/timeline.vue";
//import Heatmap from "./heatmap/heatmap.vue";
import Info from "./data/info.js";
import { getEstimate } from "./estimate.js";

const est = getEstimate();

export default {
    components: {
        //Heatmap,
        Timeline
    },
    data() {
        return {
            showInfo: false,
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
    cursor: help;
}

.chart {
    height: 100%;
}

</style>