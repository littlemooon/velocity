<template>
  <div>
    <LineChart class='chart' v-if="chartData" :chart-data="chartData" :options="chartOptions"></LineChart>
    <Button :onClick="fillData">Randomize</Button>
  </div>
</template>

<script  lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { colors } from '../../utils/styles'
import Button from '../Button.vue'
import LineChart from './LineChart.vue'

export interface IChartData {
  labels: Array<string | number>
  datasets: Array<{
    label: string
    backgroundColor: string
    data: Array<string | number>
  }>
}

@Component({
  components: { LineChart, Button },
  data() {
    return { chartData: undefined }
  },
})
export default class LineExample extends Vue {
  public chartData?: IChartData

  public chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  public mounted() {
    this.fillData()
  }

  public fillData() {
    this.chartData = {
      labels: [1, 2, 3, 4],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: this.getRandomColor(),
          data: [
            this.getRandomInt() / 2,
            this.getRandomInt() / 2,
            this.getRandomInt() / 2,
            this.getRandomInt() / 2,
          ],
        },
        {
          label: 'Data Two',
          backgroundColor: this.getRandomColor(),
          data: [
            this.getRandomInt(),
            this.getRandomInt(),
            this.getRandomInt(),
            this.getRandomInt(),
          ],
        },
      ],
    }
  }

  public getRandomInt() {
    return Math.floor(Math.random() * (50 - 5 + 1)) + 5
  }

  public getRandomColor() {
    const keys = Object.keys(colors)
    // tslint:disable-next-line
    return colors[keys[(keys.length * Math.random()) << 0]]
  }
}
</script>

<style scoped>
.chart {
  max-height: 200px;
}
</style>
