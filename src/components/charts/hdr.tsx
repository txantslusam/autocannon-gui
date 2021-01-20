import React from 'react';
import Chart from 'chart.js';
import { Histogram } from 'autocannon';
import { hexToRGB } from '../../utils/styles/utils';

interface Props {
  data: HdrChartData;
}

export type HdrChartData = Array<{
  name: string;
  data: Histogram,
}>;

function getHdrData(data: Histogram) {
  return [
    data.p0_001,
    data.p0_01,
    data.p0_1,
    data.p1,
    data.p2_5,
    data.p10,
    data.p25,
    data.p50,
    data.p75,
    data.p90,
    data.p97_5,
    data.p99,
    data.p99_9,
    data.p99_99,
    data.p99_999,
  ];
}

function getRandomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

function getGradientFill(ctx: CanvasRenderingContext2D, color: string) {
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
  gradientFill.addColorStop(0, hexToRGB(color, 0.2));
  gradientFill.addColorStop(1, hexToRGB(color, 0));
  return gradientFill;
}

export const HdrChart: React.FC<Props> = ({ data }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>();
  const chartRef = React.useRef<Chart | null>();

  React.useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) return;

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: ['0.001%', '0.01%', '0.1%', '1%', '2.5%', '10%', '25%', '50%', '75%', '90%', '97.5%', '99%', '99.9%', '99.99%', '99.999%'],
        datasets: data.map((datum, index) => {
          const randColor = getRandomColor();

          return {
            label: datum.name,
            data: getHdrData(datum.data),
            fill: true,
            backgroundColor: index === 0 ? getGradientFill(ctx, '#f44336') : getGradientFill(ctx, randColor),
            borderColor: index === 0 ? '#f44336' : randColor,
            lineTension: 0.1,
          };
        }),
      },
      options: {
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
