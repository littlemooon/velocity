<script lang="ts">
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'

export default Vue.extend({
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  data() {
    return {
      gradient: undefined,
      gradient2: undefined,
    }
  },
  mounted() {
    const data = {
      backgroundColor: 'transparent',
      fill: false,
      // @ts-ignore
      ...this.chartData,
    }
    // @ts-ignore
    this.renderChart(data, this.options)
  },
})
</script>
