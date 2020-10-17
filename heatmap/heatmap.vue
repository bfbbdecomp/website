<template>
    <div :id="divID">
    </div>
</template>

<script>
import { getChart } from "./chart.js";

export default {
    props: ["id"],
    data() {
        return {
            divID: "heatmap_" + this.id,
        };
    },
    mounted() {
        getChart(this.divID);
    }
}

</script>