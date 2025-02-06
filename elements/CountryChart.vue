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
    new Chart(ctx, this.chartData);
  },
};
</script>
