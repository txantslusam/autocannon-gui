import React from 'react';
import Chart from 'chart.js';
import { Histogram } from 'autocannon';
import { hexToRGB } from '../../utils/styles/utils';
import { colorGenerator } from '../../utils/getRandomColor';

interface Props {
  title?: string;
  data: BarChartData;
}

export type BarChartData = {
  labels: string[];
  values: number[],
};

function getGradientFill(ctx: CanvasRenderingContext2D, color: string) {
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
  gradientFill.addColorStop(0, hexToRGB(color, 0.2));
  gradientFill.addColorStop(1, hexToRGB(color, 0));
  return gradientFill;
}

export const BarChart: React.FC<Props> = ({ data, title }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>();
  const chartRef = React.useRef<Chart | null>();

  React.useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const colors = data.values.map((_, index) => (index === 0 ? '#f44336' : colorGenerator.next().value));

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          fill: true,
          backgroundColor: colors.map((color: string) => hexToRGB(color, 0.8)),
          borderColor: colors,
          lineTension: 0.1,
        }],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: title?.length > 0 ?? false,
          text: title,
        },
        // maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }, [canvasRef, data]);

  return (
    <div style={{ width: 400, height: 400 }}>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};
