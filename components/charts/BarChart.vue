<script lang="ts">
import Vue from 'vue'
import { Bar, mixins } from 'vue-chartjs'

export default Vue.extend({
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  mounted() {
    // @ts-ignore
    this.renderChart(this.chartData, this.options)
  },
})
</script>
