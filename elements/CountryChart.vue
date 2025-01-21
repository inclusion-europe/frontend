<template>
  <canvas id="country-chart" />
</template>
<script>
import { Chart } from 'chart.js/auto';

export default {
  name: 'CountryChart',
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const ctx = document.getElementById('country-chart');
    /* eslint-disable-next-line no-new */
    new Chart(ctx, this.chartData);
  },
};
</script>
