<script lang="ts">
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'

export default Vue.extend({
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  mounted() {
    // @ts-ignore
    this.renderChart(this.chartData, this.options)
  },
})
</script>
