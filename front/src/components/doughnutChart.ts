import { defineComponent, h, PropType } from 'vue';

import { Doughnut } from 'vue-chartjs';

import {
  Chart as ChartJS,
  Title,
  ArcElement,
  CategoryScale,
  Tooltip,
  Plugin,
} from 'chart.js';

ChartJS.register(Title, Tooltip, ArcElement, CategoryScale);

export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut,
  },
  setup(props) {
    // eslint-disable-next-line no-var
    var arr: string[];
    let arr2: string[];

    if (props.listChampagnesId != null) arr = props.listChampagnesId.split(',');
    else arr = [''];

    if (props.listChampagnesId2 != null)
      arr2 = props.listChampagnesId2.split(',');
    else arr2 = [''];

    const arr3 = arr2.map(Number);

    const chartData = {
      labels: arr,
      datasets: [
        {
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgb(220,20,60, 0.2)',
            'rgb(50,205,50, 0.2)',
            'rgb(0,191,255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgb(220,20,60, 1)',
            'rgb(50,205,50, 1)',
            'rgb(0,191,255, 1)',
          ],
          borderWidth: 1,
          data: arr3,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      tooltips: {
        enabled: true,
        callbacks: {
          label: (tooltipItems: { yLabel: string }) => {
            console.log(tooltipItems);
            return tooltipItems.yLabel + '£';
          },
        },
      },
      plotOptions: {
        series: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1,
          },
        },
      },
    };

    return () =>
      h(Doughnut, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
  props: {
    listChampagnesId: {
      type: String,
      default: '',
    },
    listChampagnesId2: {
      type: String,
      default: '',
    },
    chartId: {
      type: String,
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 250,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      // default: () => {},
    },
    plugins: {
      type: Array as PropType<Plugin<'doughnut'>[]>,
      // default: () => [],
    },
  },
});
